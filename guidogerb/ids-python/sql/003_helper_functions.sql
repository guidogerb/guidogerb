-- ============================================================================
-- IDS (Identity Database System) - Helper Functions
-- Utility functions for working with the symbol table hierarchy
-- ============================================================================

-- ============================================================================
-- SYMBOL LOOKUP FUNCTIONS
-- ============================================================================

-- Get symbol by computed ID (convenience function)
CREATE OR REPLACE FUNCTION get_symbol_8bit(symbol_id INTEGER)
RETURNS TABLE(
    id SMALLINT,
    glyph TEXT,
    short_name VARCHAR(50),
    long_description VARCHAR(500),
    symbol_type symbol_type
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.id, s.glyph, s.short_name, s.long_description, s.symbol_type
    FROM symbols_8bit s
    WHERE s.id = symbol_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_symbol_16bit(symbol_id INTEGER)
RETURNS TABLE(
    id_high SMALLINT,
    id_low SMALLINT,
    computed_id INTEGER,
    glyph TEXT,
    short_name VARCHAR(50),
    long_description VARCHAR(500),
    symbol_type symbol_type
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.id_high, s.id_low, s.computed_id, s.glyph, s.short_name, 
           s.long_description, s.symbol_type
    FROM symbols_16bit s
    WHERE s.computed_id = symbol_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SYMBOL CREATION FUNCTIONS
-- ============================================================================

-- Insert 16-bit symbol from computed value
CREATE OR REPLACE FUNCTION insert_symbol_16bit(
    p_computed_id INTEGER,
    p_glyph TEXT,
    p_short_name VARCHAR(50),
    p_long_description VARCHAR(500) DEFAULT NULL,
    p_symbol_type symbol_type DEFAULT 'character',
    p_source VARCHAR(200) DEFAULT NULL,
    p_created_by VARCHAR(100) DEFAULT NULL
)
RETURNS TABLE(id_high SMALLINT, id_low SMALLINT) AS $$
DECLARE
    v_high SMALLINT;
    v_low SMALLINT;
BEGIN
    -- Decompose 16-bit value
    v_high := (p_computed_id >> 8) & 255;
    v_low := p_computed_id & 255;
    
    -- Insert the symbol
    INSERT INTO symbols_16bit (
        id_high, id_low, glyph, short_name, long_description, 
        symbol_type, source, created_by
    ) VALUES (
        v_high, v_low, p_glyph, p_short_name, p_long_description,
        p_symbol_type, p_source, p_created_by
    );
    
    RETURN QUERY SELECT v_high, v_low;
END;
$$ LANGUAGE plpgsql;

-- Insert 24-bit symbol from computed value
CREATE OR REPLACE FUNCTION insert_symbol_24bit(
    p_computed_id INTEGER,
    p_glyph TEXT,
    p_short_name VARCHAR(50),
    p_long_description VARCHAR(500) DEFAULT NULL,
    p_symbol_type symbol_type DEFAULT 'word',
    p_source VARCHAR(200) DEFAULT NULL,
    p_created_by VARCHAR(100) DEFAULT NULL
)
RETURNS TABLE(id_high_high SMALLINT, id_high_low SMALLINT, id_low SMALLINT) AS $$
DECLARE
    v_hh SMALLINT;
    v_hl SMALLINT;
    v_l SMALLINT;
BEGIN
    -- Decompose 24-bit value
    v_hh := (p_computed_id >> 16) & 255;
    v_hl := (p_computed_id >> 8) & 255;
    v_l := p_computed_id & 255;
    
    -- Insert the symbol
    INSERT INTO symbols_24bit (
        id_high_high, id_high_low, id_low, glyph, short_name, 
        long_description, symbol_type, source, created_by
    ) VALUES (
        v_hh, v_hl, v_l, p_glyph, p_short_name, 
        p_long_description, p_symbol_type, p_source, p_created_by
    );
    
    RETURN QUERY SELECT v_hh, v_hl, v_l;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SYMBOL COMPOSITION FUNCTIONS
-- ============================================================================

-- Create a composite symbol from two 8-bit symbols
CREATE OR REPLACE FUNCTION compose_symbols_8_8(
    p_id1 SMALLINT,
    p_id2 SMALLINT,
    p_short_name VARCHAR(50),
    p_long_description VARCHAR(500) DEFAULT NULL,
    p_symbol_type symbol_type DEFAULT 'composite',
    p_created_by VARCHAR(100) DEFAULT NULL
)
RETURNS TABLE(id_high SMALLINT, id_low SMALLINT, glyph TEXT) AS $$
DECLARE
    v_glyph1 TEXT;
    v_glyph2 TEXT;
    v_combined TEXT;
BEGIN
    -- Get glyphs from source symbols
    SELECT s.glyph INTO v_glyph1 FROM symbols_8bit s WHERE s.id = p_id1;
    SELECT s.glyph INTO v_glyph2 FROM symbols_8bit s WHERE s.id = p_id2;
    
    IF v_glyph1 IS NULL OR v_glyph2 IS NULL THEN
        RAISE EXCEPTION 'Source symbols not found';
    END IF;
    
    v_combined := v_glyph1 || v_glyph2;
    
    -- Insert 16-bit symbol
    INSERT INTO symbols_16bit (
        id_high, id_low, glyph, short_name, long_description,
        symbol_type, created_by
    ) VALUES (
        p_id1, p_id2, v_combined, p_short_name, p_long_description,
        p_symbol_type, p_created_by
    );
    
    -- Create composition relationships
    INSERT INTO symbol_relationships (
        source_table, source_id, target_table, target_id,
        relationship_type, position
    ) VALUES
        ('symbols_16bit', p_id1::TEXT || ',' || p_id2::TEXT, 'symbols_8bit', p_id1::TEXT, 'composition', 1),
        ('symbols_16bit', p_id1::TEXT || ',' || p_id2::TEXT, 'symbols_8bit', p_id2::TEXT, 'composition', 2);
    
    RETURN QUERY SELECT p_id1, p_id2, v_combined;
END;
$$ LANGUAGE plpgsql;

-- Create a word symbol from multiple 8-bit character symbols
CREATE OR REPLACE FUNCTION create_word_symbol(
    p_character_ids SMALLINT[],
    p_short_name VARCHAR(50),
    p_long_description VARCHAR(500) DEFAULT NULL,
    p_created_by VARCHAR(100) DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_glyph TEXT := '';
    v_char_id SMALLINT;
    v_symbol_id INTEGER;
    v_result JSONB;
BEGIN
    -- Concatenate glyphs
    FOREACH v_char_id IN ARRAY p_character_ids
    LOOP
        SELECT glyph INTO v_glyph FROM symbols_8bit WHERE id = v_char_id;
        IF v_glyph IS NULL THEN
            RAISE EXCEPTION 'Character symbol % not found', v_char_id;
        END IF;
        v_glyph := v_glyph || v_glyph;
    END LOOP;
    
    -- Generate next available symbol ID in 24-bit range
    -- This is a simplified version; in production, use a sequence or more sophisticated allocation
    SELECT COALESCE(MAX(computed_id), 0) + 1 INTO v_symbol_id FROM symbols_24bit;
    
    -- Insert the word symbol
    PERFORM insert_symbol_24bit(
        v_symbol_id,
        v_glyph,
        p_short_name,
        p_long_description,
        'word',
        'composition',
        p_created_by
    );
    
    -- Create composition relationships
    FOR i IN 1..array_length(p_character_ids, 1)
    LOOP
        INSERT INTO symbol_relationships (
            source_table, source_id, target_table, target_id,
            relationship_type, position
        ) VALUES (
            'symbols_24bit', 
            v_symbol_id::TEXT,
            'symbols_8bit',
            p_character_ids[i]::TEXT,
            'composition',
            i
        );
    END LOOP;
    
    v_result := jsonb_build_object(
        'symbol_id', v_symbol_id,
        'glyph', v_glyph,
        'short_name', p_short_name
    );
    
    RETURN v_result;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SYMBOL SEARCH FUNCTIONS
-- ============================================================================

-- Search symbols by glyph across all tables
CREATE OR REPLACE FUNCTION search_symbols_by_glyph(p_search TEXT)
RETURNS TABLE(
    level VARCHAR(10),
    symbol_id TEXT,
    glyph TEXT,
    short_name VARCHAR(50),
    symbol_type symbol_type,
    usage_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    -- 8-bit symbols
    SELECT '8bit'::VARCHAR(10), 
           s.id::TEXT,
           s.glyph,
           s.short_name,
           s.symbol_type,
           s.usage_count
    FROM symbols_8bit s
    WHERE s.glyph ILIKE '%' || p_search || '%'
    
    UNION ALL
    
    -- 16-bit symbols
    SELECT '16bit'::VARCHAR(10),
           (s.id_high::TEXT || ',' || s.id_low::TEXT),
           s.glyph,
           s.short_name,
           s.symbol_type,
           s.usage_count
    FROM symbols_16bit s
    WHERE s.glyph ILIKE '%' || p_search || '%'
    
    UNION ALL
    
    -- 24-bit symbols
    SELECT '24bit'::VARCHAR(10),
           (s.id_high_high::TEXT || ',' || s.id_high_low::TEXT || ',' || s.id_low::TEXT),
           s.glyph,
           s.short_name,
           s.symbol_type,
           s.usage_count
    FROM symbols_24bit s
    WHERE s.glyph ILIKE '%' || p_search || '%'
    
    ORDER BY usage_count DESC
    LIMIT 100;
END;
$$ LANGUAGE plpgsql;

-- Search symbols by name across all tables
CREATE OR REPLACE FUNCTION search_symbols_by_name(p_search TEXT)
RETURNS TABLE(
    level VARCHAR(10),
    symbol_id TEXT,
    glyph TEXT,
    short_name VARCHAR(50),
    symbol_type symbol_type
) AS $$
BEGIN
    RETURN QUERY
    SELECT '8bit'::VARCHAR(10), 
           s.id::TEXT,
           s.glyph,
           s.short_name,
           s.symbol_type
    FROM symbols_8bit s
    WHERE s.short_name ILIKE '%' || p_search || '%'
    
    UNION ALL
    
    SELECT '16bit'::VARCHAR(10),
           (s.id_high::TEXT || ',' || s.id_low::TEXT),
           s.glyph,
           s.short_name,
           s.symbol_type
    FROM symbols_16bit s
    WHERE s.short_name ILIKE '%' || p_search || '%'
    
    UNION ALL
    
    SELECT '24bit'::VARCHAR(10),
           (s.id_high_high::TEXT || ',' || s.id_high_low::TEXT || ',' || s.id_low::TEXT),
           s.glyph,
           s.short_name,
           s.symbol_type
    FROM symbols_24bit s
    WHERE s.short_name ILIKE '%' || p_search || '%'
    
    ORDER BY short_name
    LIMIT 100;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SYMBOL RELATIONSHIP FUNCTIONS
-- ============================================================================

-- Get all symbols that compose a given symbol
CREATE OR REPLACE FUNCTION get_symbol_composition(
    p_table VARCHAR(20),
    p_symbol_id TEXT
)
RETURNS TABLE(
    position INTEGER,
    component_table VARCHAR(20),
    component_id TEXT,
    glyph TEXT,
    short_name VARCHAR(50)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        sr.position,
        sr.target_table,
        sr.target_id,
        CASE 
            WHEN sr.target_table = 'symbols_8bit' THEN 
                (SELECT s.glyph FROM symbols_8bit s WHERE s.id::TEXT = sr.target_id)
            WHEN sr.target_table = 'symbols_16bit' THEN 
                (SELECT s.glyph FROM symbols_16bit s 
                 WHERE (s.id_high::TEXT || ',' || s.id_low::TEXT) = sr.target_id)
            ELSE NULL
        END,
        CASE 
            WHEN sr.target_table = 'symbols_8bit' THEN 
                (SELECT s.short_name FROM symbols_8bit s WHERE s.id::TEXT = sr.target_id)
            WHEN sr.target_table = 'symbols_16bit' THEN 
                (SELECT s.short_name FROM symbols_16bit s 
                 WHERE (s.id_high::TEXT || ',' || s.id_low::TEXT) = sr.target_id)
            ELSE NULL
        END
    FROM symbol_relationships sr
    WHERE sr.source_table = p_table
      AND sr.source_id = p_symbol_id
      AND sr.relationship_type = 'composition'
    ORDER BY sr.position;
END;
$$ LANGUAGE plpgsql;

-- Find symbols similar to a given symbol (based on relationships)
CREATE OR REPLACE FUNCTION find_similar_symbols(
    p_table VARCHAR(20),
    p_symbol_id TEXT,
    p_min_strength DECIMAL DEFAULT 0.5
)
RETURNS TABLE(
    target_table VARCHAR(20),
    target_id TEXT,
    relationship_type relationship_type,
    strength DECIMAL(5,4)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        sr.target_table,
        sr.target_id,
        sr.relationship_type,
        sr.strength
    FROM symbol_relationships sr
    WHERE sr.source_table = p_table
      AND sr.source_id = p_symbol_id
      AND sr.relationship_type IN ('similar', 'variant', 'equivalent')
      AND (sr.strength IS NULL OR sr.strength >= p_min_strength)
    ORDER BY sr.strength DESC NULLS LAST;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- USAGE TRACKING FUNCTIONS
-- ============================================================================

-- Record symbol usage and update statistics
CREATE OR REPLACE FUNCTION record_symbol_usage(
    p_table VARCHAR(20),
    p_symbol_id TEXT,
    p_used_by VARCHAR(100) DEFAULT NULL,
    p_context VARCHAR(100) DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    -- Log the usage
    INSERT INTO symbol_usage_log (symbol_table, symbol_id, used_by, usage_context)
    VALUES (p_table, p_symbol_id, p_used_by, p_context);
    
    -- Update usage count in the symbol table
    CASE p_table
        WHEN 'symbols_8bit' THEN
            UPDATE symbols_8bit 
            SET usage_count = usage_count + 1,
                last_used_at = CURRENT_TIMESTAMP
            WHERE id::TEXT = p_symbol_id;
            
        WHEN 'symbols_16bit' THEN
            UPDATE symbols_16bit 
            SET usage_count = usage_count + 1,
                last_used_at = CURRENT_TIMESTAMP
            WHERE (id_high::TEXT || ',' || id_low::TEXT) = p_symbol_id;
            
        WHEN 'symbols_24bit' THEN
            UPDATE symbols_24bit 
            SET usage_count = usage_count + 1,
                last_used_at = CURRENT_TIMESTAMP
            WHERE (id_high_high::TEXT || ',' || id_high_low::TEXT || ',' || id_low::TEXT) = p_symbol_id;
            
        WHEN 'symbols_32bit' THEN
            UPDATE symbols_32bit 
            SET usage_count = usage_count + 1,
                last_used_at = CURRENT_TIMESTAMP
            WHERE (id_high_high::TEXT || ',' || id_high_low::TEXT || ',' || 
                   id_low_high::TEXT || ',' || id_low_low::TEXT) = p_symbol_id;
    END CASE;
END;
$$ LANGUAGE plpgsql;

-- Get most frequently used symbols
CREATE OR REPLACE FUNCTION get_top_symbols(
    p_limit INTEGER DEFAULT 100,
    p_symbol_type symbol_type DEFAULT NULL
)
RETURNS TABLE(
    level VARCHAR(10),
    symbol_id TEXT,
    glyph TEXT,
    short_name VARCHAR(50),
    symbol_type symbol_type,
    usage_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    WITH all_symbols AS (
        SELECT '8bit'::VARCHAR(10) as level,
               s.id::TEXT as symbol_id,
               s.glyph,
               s.short_name,
               s.symbol_type,
               s.usage_count
        FROM symbols_8bit s
        WHERE p_symbol_type IS NULL OR s.symbol_type = p_symbol_type
        
        UNION ALL
        
        SELECT '16bit'::VARCHAR(10),
               (s.id_high::TEXT || ',' || s.id_low::TEXT),
               s.glyph,
               s.short_name,
               s.symbol_type,
               s.usage_count
        FROM symbols_16bit s
        WHERE p_symbol_type IS NULL OR s.symbol_type = p_symbol_type
        
        UNION ALL
        
        SELECT '24bit'::VARCHAR(10),
               (s.id_high_high::TEXT || ',' || s.id_high_low::TEXT || ',' || s.id_low::TEXT),
               s.glyph,
               s.short_name,
               s.symbol_type,
               s.usage_count
        FROM symbols_24bit s
        WHERE p_symbol_type IS NULL OR s.symbol_type = p_symbol_type
    )
    SELECT a.*
    FROM all_symbols a
    ORDER BY a.usage_count DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ENCODING FUNCTIONS
-- ============================================================================

-- Add encoding for a symbol
CREATE OR REPLACE FUNCTION add_symbol_encoding(
    p_table VARCHAR(20),
    p_symbol_id TEXT,
    p_encoding encoding_system,
    p_encoded_value BYTEA
)
RETURNS INTEGER AS $$
DECLARE
    v_id INTEGER;
BEGIN
    INSERT INTO symbol_encodings (symbol_table, symbol_id, encoding_system, encoded_value)
    VALUES (p_table, p_symbol_id, p_encoding, p_encoded_value)
    ON CONFLICT (symbol_table, symbol_id, encoding_system)
    DO UPDATE SET encoded_value = p_encoded_value
    RETURNING id INTO v_id;
    
    RETURN v_id;
END;
$$ LANGUAGE plpgsql;

-- Get encoding for a symbol
CREATE OR REPLACE FUNCTION get_symbol_encoding(
    p_table VARCHAR(20),
    p_symbol_id TEXT,
    p_encoding encoding_system
)
RETURNS BYTEA AS $$
DECLARE
    v_encoded BYTEA;
BEGIN
    SELECT encoded_value INTO v_encoded
    FROM symbol_encodings
    WHERE symbol_table = p_table
      AND symbol_id = p_symbol_id
      AND encoding_system = p_encoding;
    
    RETURN v_encoded;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- STATISTICS AND MAINTENANCE FUNCTIONS
-- ============================================================================

-- Get symbol table statistics
CREATE OR REPLACE FUNCTION get_symbol_statistics()
RETURNS TABLE(
    table_name VARCHAR(20),
    symbol_count BIGINT,
    total_usage BIGINT,
    avg_usage NUMERIC,
    last_update TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 'symbols_8bit'::VARCHAR(20),
           COUNT(*)::BIGINT,
           SUM(s.usage_count)::BIGINT,
           AVG(s.usage_count)::NUMERIC,
           MAX(s.updated_at)
    FROM symbols_8bit s
    
    UNION ALL
    
    SELECT 'symbols_16bit'::VARCHAR(20),
           COUNT(*)::BIGINT,
           SUM(s.usage_count)::BIGINT,
           AVG(s.usage_count)::NUMERIC,
           MAX(s.updated_at)
    FROM symbols_16bit s
    
    UNION ALL
    
    SELECT 'symbols_24bit'::VARCHAR(20),
           COUNT(*)::BIGINT,
           SUM(s.usage_count)::BIGINT,
           AVG(s.usage_count)::NUMERIC,
           MAX(s.updated_at)
    FROM symbols_24bit s
    
    UNION ALL
    
    SELECT 'symbols_32bit'::VARCHAR(20),
           COUNT(*)::BIGINT,
           SUM(s.usage_count)::BIGINT,
           AVG(s.usage_count)::NUMERIC,
           MAX(s.updated_at)
    FROM symbols_32bit s;
END;
$$ LANGUAGE plpgsql;

-- Vacuum and analyze all symbol tables (for maintenance)
CREATE OR REPLACE FUNCTION maintain_symbol_tables()
RETURNS TEXT AS $$
BEGIN
    VACUUM ANALYZE symbols_8bit;
    VACUUM ANALYZE symbols_16bit;
    VACUUM ANALYZE symbols_24bit;
    VACUUM ANALYZE symbols_32bit;
    VACUUM ANALYZE symbols_40bit;
    VACUUM ANALYZE symbols_48bit;
    VACUUM ANALYZE symbol_relationships;
    VACUUM ANALYZE symbol_encodings;
    VACUUM ANALYZE symbol_metadata;
    
    RETURN 'Maintenance completed successfully';
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

DO $$ 
BEGIN 
    RAISE NOTICE '=================================================================';
    RAISE NOTICE 'Helper Functions Created Successfully';
    RAISE NOTICE '=================================================================';
    RAISE NOTICE 'Available Functions:';
    RAISE NOTICE '';
    RAISE NOTICE 'Lookup:';
    RAISE NOTICE '  - get_symbol_8bit(id)';
    RAISE NOTICE '  - get_symbol_16bit(id)';
    RAISE NOTICE '';
    RAISE NOTICE 'Creation:';
    RAISE NOTICE '  - insert_symbol_16bit(id, glyph, name, ...)';
    RAISE NOTICE '  - insert_symbol_24bit(id, glyph, name, ...)';
    RAISE NOTICE '  - compose_symbols_8_8(id1, id2, name, ...)';
    RAISE NOTICE '  - create_word_symbol(char_ids[], name, ...)';
    RAISE NOTICE '';
    RAISE NOTICE 'Search:';
    RAISE NOTICE '  - search_symbols_by_glyph(text)';
    RAISE NOTICE '  - search_symbols_by_name(text)';
    RAISE NOTICE '  - get_top_symbols(limit, type)';
    RAISE NOTICE '';
    RAISE NOTICE 'Relationships:';
    RAISE NOTICE '  - get_symbol_composition(table, id)';
    RAISE NOTICE '  - find_similar_symbols(table, id, strength)';
    RAISE NOTICE '';
    RAISE NOTICE 'Usage:';
    RAISE NOTICE '  - record_symbol_usage(table, id, user, context)';
    RAISE NOTICE '';
    RAISE NOTICE 'Maintenance:';
    RAISE NOTICE '  - get_symbol_statistics()';
    RAISE NOTICE '  - maintain_symbol_tables()';
    RAISE NOTICE '=================================================================';
END $$;
