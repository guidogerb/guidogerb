-- ============================================================================
-- IDS Symbol Table - Example Queries
-- Quick reference for common operations
-- ============================================================================

-- ============================================================================
-- BASIC QUERIES
-- ============================================================================

-- 1. Count symbols at each level
SELECT 'symbols_8bit' as table_name, COUNT(*) as count FROM symbols_8bit
UNION ALL
SELECT 'symbols_16bit', COUNT(*) FROM symbols_16bit
UNION ALL
SELECT 'symbols_24bit', COUNT(*) FROM symbols_24bit
UNION ALL
SELECT 'symbols_32bit', COUNT(*) FROM symbols_32bit;

-- 2. View sample 8-bit symbols
SELECT id, glyph, short_name, symbol_type 
FROM symbols_8bit 
ORDER BY id 
LIMIT 20;

-- 3. Find specific characters
SELECT id, glyph, short_name 
FROM symbols_8bit 
WHERE glyph IN ('A', 'B', 'C', 'a', 'b', 'c');

-- 4. Get all punctuation symbols
SELECT id, glyph, short_name, long_description
FROM symbols_8bit
WHERE symbol_type = 'punctuation'
ORDER BY id;

-- ============================================================================
-- SEARCH QUERIES
-- ============================================================================

-- 5. Search for symbols by glyph content
SELECT * FROM search_symbols_by_glyph('hello');

-- 6. Search for symbols by name
SELECT * FROM search_symbols_by_name('LATIN');

-- 7. Find all uppercase letters
SELECT id, glyph, short_name
FROM symbols_8bit
WHERE short_name LIKE 'LATIN_%'
  AND glyph ~ '^[A-Z]$'
ORDER BY id;

-- 8. Find all digits
SELECT id, glyph, short_name
FROM symbols_8bit
WHERE short_name LIKE 'DIGIT_%'
ORDER BY id;

-- ============================================================================
-- COMPOSITION EXAMPLES
-- ============================================================================

-- 9. Create a simple word (manually)
-- First, let's create "OK" as a 16-bit symbol
SELECT compose_symbols_8_8(
    79,   -- 'O'
    75,   -- 'K'
    'OK_WORD',
    'The word OK',
    'word',
    'example_user'
);

-- 10. Verify the composed symbol exists
SELECT id_high, id_low, glyph, short_name, symbol_type
FROM symbols_16bit
WHERE short_name = 'OK_WORD';

-- 11. Get composition of the symbol
SELECT * FROM get_symbol_composition('symbols_16bit', '79,75');

-- 12. Create another word "HI"
SELECT compose_symbols_8_8(
    72,   -- 'H'
    73,   -- 'I'
    'HI_WORD',
    'The word HI',
    'word',
    'example_user'
);

-- ============================================================================
-- RELATIONSHIP QUERIES
-- ============================================================================

-- 13. Create a similarity relationship (uppercase/lowercase)
INSERT INTO symbol_relationships (
    source_table, source_id, target_table, target_id,
    relationship_type, strength
) VALUES 
    ('symbols_8bit', '65', 'symbols_8bit', '97', 'variant', 0.95),  -- A -> a
    ('symbols_8bit', '66', 'symbols_8bit', '98', 'variant', 0.95),  -- B -> b
    ('symbols_8bit', '67', 'symbols_8bit', '99', 'variant', 0.95);  -- C -> c

-- 14. Find variants of 'A'
SELECT * FROM find_similar_symbols('symbols_8bit', '65', 0.9);

-- 15. View all relationships
SELECT 
    sr.source_table,
    sr.source_id,
    s1.glyph as source_glyph,
    sr.relationship_type,
    sr.target_table,
    sr.target_id,
    s2.glyph as target_glyph,
    sr.strength
FROM symbol_relationships sr
LEFT JOIN symbols_8bit s1 ON sr.source_table = 'symbols_8bit' 
    AND sr.source_id = s1.id::TEXT
LEFT JOIN symbols_8bit s2 ON sr.target_table = 'symbols_8bit' 
    AND sr.target_id = s2.id::TEXT
WHERE sr.relationship_type != 'composition'
LIMIT 20;

-- ============================================================================
-- USAGE TRACKING
-- ============================================================================

-- 16. Record some usage
SELECT record_symbol_usage('symbols_8bit', '65', 'example_user', 'test_query');
SELECT record_symbol_usage('symbols_8bit', '65', 'example_user', 'test_query');
SELECT record_symbol_usage('symbols_8bit', '65', 'example_user', 'test_query');
SELECT record_symbol_usage('symbols_8bit', '101', 'example_user', 'test_query');

-- 17. Get top used symbols
SELECT * FROM get_top_symbols(10);

-- 18. View usage log
SELECT * FROM symbol_usage_log ORDER BY used_at DESC LIMIT 10;

-- 19. Usage by context
SELECT 
    usage_context,
    COUNT(*) as usage_count,
    COUNT(DISTINCT symbol_id) as unique_symbols
FROM symbol_usage_log
GROUP BY usage_context
ORDER BY usage_count DESC;

-- ============================================================================
-- ENCODING EXAMPLES
-- ============================================================================

-- 20. Add UTF-8 encoding for ASCII characters (0-127)
-- Note: In ASCII range, UTF-8 encoding is identical to the ASCII value
INSERT INTO symbol_encodings (symbol_table, symbol_id, encoding_system, encoded_value)
SELECT 
    'symbols_8bit',
    id::TEXT,
    'UTF-8',
    decode(to_hex(id), 'hex')
FROM symbols_8bit
WHERE id BETWEEN 0 AND 127
ON CONFLICT (symbol_table, symbol_id, encoding_system) DO NOTHING;

-- 21. View encodings
SELECT 
    se.symbol_id,
    s.glyph,
    s.short_name,
    se.encoding_system,
    encode(se.encoded_value, 'hex') as hex_value
FROM symbol_encodings se
JOIN symbols_8bit s ON se.symbol_id = s.id::TEXT
WHERE se.symbol_table = 'symbols_8bit'
ORDER BY se.symbol_id::INTEGER
LIMIT 20;

-- 22. Get encoding for specific symbol
SELECT encode(get_symbol_encoding('symbols_8bit', '65', 'UTF-8'), 'hex');

-- ============================================================================
-- STATISTICS AND ANALYTICS
-- ============================================================================

-- 23. Get comprehensive statistics
SELECT * FROM get_symbol_statistics();

-- 24. Symbol type distribution
SELECT 
    symbol_type,
    COUNT(*) as count,
    ROUND(COUNT(*)::NUMERIC / SUM(COUNT(*)) OVER () * 100, 2) as percentage
FROM symbols_8bit
GROUP BY symbol_type
ORDER BY count DESC;

-- 25. Most used symbol types
SELECT 
    symbol_type,
    COUNT(*) as symbol_count,
    SUM(usage_count) as total_usage,
    ROUND(AVG(usage_count), 2) as avg_usage_per_symbol
FROM symbols_8bit
GROUP BY symbol_type
ORDER BY total_usage DESC;

-- 26. Recently updated symbols
SELECT 
    id, glyph, short_name, symbol_type, 
    usage_count, last_used_at, updated_at
FROM symbols_8bit
ORDER BY updated_at DESC
LIMIT 10;

-- ============================================================================
-- ADVANCED QUERIES
-- ============================================================================

-- 27. Find all composite symbols (16-bit or higher)
SELECT 
    '16bit' as level,
    (id_high::TEXT || ',' || id_low::TEXT) as symbol_id,
    glyph,
    short_name
FROM symbols_16bit
WHERE symbol_type = 'composite'
UNION ALL
SELECT 
    '24bit',
    (id_high_high::TEXT || ',' || id_high_low::TEXT || ',' || id_low::TEXT),
    glyph,
    short_name
FROM symbols_24bit
WHERE symbol_type = 'composite';

-- 28. Symbol composition tree (for a specific symbol)
WITH RECURSIVE composition_tree AS (
    -- Base case: the symbol we're analyzing
    SELECT 
        'symbols_16bit' as table_name,
        '79,75' as symbol_id,  -- "OK" symbol
        0 as depth,
        'OK_WORD' as name
    
    UNION ALL
    
    -- Recursive case: get components
    SELECT 
        sr.target_table,
        sr.target_id,
        ct.depth + 1,
        CASE 
            WHEN sr.target_table = 'symbols_8bit' THEN
                (SELECT short_name FROM symbols_8bit WHERE id::TEXT = sr.target_id)
            ELSE 'unknown'
        END
    FROM composition_tree ct
    JOIN symbol_relationships sr 
        ON sr.source_table = ct.table_name 
        AND sr.source_id = ct.symbol_id
        AND sr.relationship_type = 'composition'
    WHERE ct.depth < 10
)
SELECT 
    REPEAT('  ', depth) || name as hierarchy,
    table_name,
    symbol_id,
    depth
FROM composition_tree
ORDER BY depth, symbol_id;

-- 29. Find symbols with no usage
SELECT id, glyph, short_name, created_at
FROM symbols_8bit
WHERE usage_count = 0
ORDER BY created_at DESC
LIMIT 20;

-- 30. Calculate storage efficiency
SELECT 
    table_name,
    pg_size_pretty(pg_total_relation_size(table_name::regclass)) as total_size,
    pg_size_pretty(pg_relation_size(table_name::regclass)) as table_size,
    pg_size_pretty(pg_indexes_size(table_name::regclass)) as indexes_size,
    (SELECT COUNT(*) FROM symbols_8bit) as row_count
FROM (
    SELECT 'symbols_8bit' as table_name
    UNION ALL SELECT 'symbols_16bit'
    UNION ALL SELECT 'symbols_24bit'
    UNION ALL SELECT 'symbols_32bit'
) t;

-- ============================================================================
-- DATA QUALITY CHECKS
-- ============================================================================

-- 31. Find symbols with empty glyphs
SELECT * FROM symbols_8bit WHERE glyph = '' OR glyph IS NULL;

-- 32. Find duplicate short_names (should be none due to UNIQUE constraint)
SELECT short_name, COUNT(*)
FROM symbols_8bit
GROUP BY short_name
HAVING COUNT(*) > 1;

-- 33. Verify foreign key integrity in 16-bit table
SELECT 
    s16.id_high, s16.id_low, s16.short_name,
    s8h.short_name as high_ref,
    s8l.short_name as low_ref
FROM symbols_16bit s16
LEFT JOIN symbols_8bit s8h ON s16.id_high = s8h.id
LEFT JOIN symbols_8bit s8l ON s16.id_low = s8l.id
WHERE s8h.id IS NULL OR s8l.id IS NULL;

-- 34. Check for orphaned relationships
SELECT sr.*
FROM symbol_relationships sr
LEFT JOIN symbols_8bit s8_src 
    ON sr.source_table = 'symbols_8bit' AND sr.source_id = s8_src.id::TEXT
LEFT JOIN symbols_16bit s16_src 
    ON sr.source_table = 'symbols_16bit' 
    AND sr.source_id = (s16_src.id_high::TEXT || ',' || s16_src.id_low::TEXT)
WHERE (sr.source_table = 'symbols_8bit' AND s8_src.id IS NULL)
   OR (sr.source_table = 'symbols_16bit' AND s16_src.id_high IS NULL);

-- ============================================================================
-- PERFORMANCE ANALYSIS
-- ============================================================================

-- 35. Index usage statistics
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan as scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
  AND tablename LIKE 'symbols_%'
ORDER BY idx_scan DESC;

-- 36. Table bloat check
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS total_size,
    n_live_tup as live_tuples,
    n_dead_tup as dead_tuples,
    ROUND(n_dead_tup::NUMERIC / NULLIF(n_live_tup, 0) * 100, 2) as bloat_pct
FROM pg_stat_user_tables
WHERE schemaname = 'public'
  AND tablename LIKE 'symbols_%'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- ============================================================================
-- MAINTENANCE OPERATIONS
-- ============================================================================

-- 37. Run maintenance
SELECT maintain_symbol_tables();

-- 38. Refresh statistics
ANALYZE symbols_8bit;
ANALYZE symbols_16bit;
ANALYZE symbol_relationships;

-- 39. Check last vacuum/analyze times
SELECT 
    schemaname,
    relname as table_name,
    last_vacuum,
    last_autovacuum,
    last_analyze,
    last_autoanalyze
FROM pg_stat_user_tables
WHERE schemaname = 'public'
  AND relname LIKE 'symbols_%'
ORDER BY relname;

-- ============================================================================
-- EXAMPLE: Building a Complete Word
-- ============================================================================

-- 40. Create the word "HELLO" step by step

-- Step 1: Verify we have the base characters
SELECT id, glyph, short_name FROM symbols_8bit 
WHERE id IN (72, 69, 76, 76, 79)  -- H, E, L, L, O
ORDER BY id;

-- Step 2: Create digraph "HE"
SELECT compose_symbols_8_8(72, 69, 'HE_DIGRAPH', 'Letters H and E', 'composite', 'example');

-- Step 3: Create digraph "LL"  
SELECT compose_symbols_8_8(76, 76, 'LL_DIGRAPH', 'Double L', 'composite', 'example');

-- Step 4: View our composed symbols
SELECT id_high, id_low, computed_id, glyph, short_name 
FROM symbols_16bit 
WHERE short_name IN ('HE_DIGRAPH', 'LL_DIGRAPH');

-- Step 5: Create full word (would need 24-bit table population for full example)
-- For now, just show the relationship structure
SELECT * FROM get_symbol_composition('symbols_16bit', '72,69');

-- ============================================================================
-- COMPLETION
-- ============================================================================

DO $$ 
BEGIN 
    RAISE NOTICE '=================================================================';
    RAISE NOTICE 'Example queries executed successfully!';
    RAISE NOTICE '=================================================================';
    RAISE NOTICE 'You can copy and modify any of these queries for your needs.';
    RAISE NOTICE 'For more examples, see the README.md file.';
    RAISE NOTICE '=================================================================';
END $$;
