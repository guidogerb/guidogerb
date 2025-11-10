-- ============================================================================
-- IDS (Identity Database System) - Database Normal Form 7 (dbNF7)
-- Symbol Table Schema - Exponentially Scalable Symbol System
-- ============================================================================
-- 
-- This schema implements a hierarchical symbol table where keys grow by 8 bits
-- at each level, allowing for exponential scalability (2^8, 2^16, 2^24, etc.).
--
-- Key Concepts:
-- - Each symbol table level builds composite keys from foreign keys in previous levels
-- - Symbols never duplicate; they only relate to other symbols
-- - Complex symbols (Chinese characters, words, sentences, books) are compositions
-- - Ultimate goal: Distributable symbol tables for massive datasets
-- - Reference books, documents, etc. by single symbol key in IDS streams
--
-- Author: GuidoGerb Project
-- Date: November 10, 2025
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

-- ============================================================================
-- ENUMERATED TYPES
-- ============================================================================

-- Symbol types covering all levels of text granularity
CREATE TYPE symbol_type AS ENUM (
    'character',      -- Single character (glyph)
    'ideograph',      -- Ideographic character (CJK, etc.)
    'emoji',          -- Emoji and emoticons
    'punctuation',    -- Punctuation marks
    'symbol',         -- Mathematical, currency, other symbols
    'composite',      -- Composite character (e.g., accented letters)
    'radical',        -- CJK radical component
    'grapheme',       -- Grapheme cluster
    'word',           -- Word (composition of characters)
    'phrase',         -- Short phrase
    'sentence',       -- Sentence
    'paragraph',      -- Paragraph
    'section',        -- Document section
    'chapter',        -- Book chapter
    'document',       -- Complete document
    'book',           -- Book or large work
    'collection',     -- Collection of works
    'corpus'          -- Entire corpus/dataset
);

-- Encoding systems
CREATE TYPE encoding_system AS ENUM (
    'ASCII',
    'UTF-8',
    'UTF-16',
    'UTF-32',
    'ISO-8859-1',
    'GB2312',
    'GBK',
    'Big5',
    'Shift-JIS',
    'EUC-KR',
    'Windows-1252',
    'CUSTOM'
);

-- Relationship types between symbols
CREATE TYPE relationship_type AS ENUM (
    'composition',    -- A is composed of B
    'derived',        -- A is derived from B
    'equivalent',     -- A and B are equivalent
    'similar',        -- A is similar to B
    'variant',        -- A is a variant of B
    'translation',    -- A is translation of B
    'context',        -- A appears in context with B
    'sequence'        -- A follows B in sequence
);

-- ============================================================================
-- BASE TABLE: 8-BIT SYMBOLS (Foundation Layer)
-- ============================================================================
-- This table stores the most fundamental symbols (0-255).
-- All other tables reference this as the base.
-- ============================================================================

CREATE TABLE symbols_8bit (
    -- Primary key: 8-bit integer (0-255)
    id SMALLINT PRIMARY KEY CHECK (id >= 0 AND id <= 255),
    
    -- The actual glyph/character (Unicode text)
    glyph TEXT NOT NULL,
    
    -- Short identifier (e.g., 'A', 'SPACE', 'NULL')
    short_name VARCHAR(50) NOT NULL,
    
    -- Detailed description
    long_description VARCHAR(500),
    
    -- Symbol classification
    symbol_type symbol_type NOT NULL DEFAULT 'character',
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    source VARCHAR(200),  -- Where this symbol was discovered/defined
    
    -- Usage statistics
    usage_count BIGINT DEFAULT 0,
    last_used_at TIMESTAMP WITH TIME ZONE,
    
    -- Indexing
    UNIQUE(short_name),
    CHECK(glyph IS NOT NULL AND length(glyph) > 0)
);

-- Indexes for 8-bit symbols
CREATE INDEX idx_symbols_8bit_type ON symbols_8bit(symbol_type);
CREATE INDEX idx_symbols_8bit_glyph ON symbols_8bit USING gin(to_tsvector('simple', glyph));
CREATE INDEX idx_symbols_8bit_name ON symbols_8bit(short_name);
CREATE INDEX idx_symbols_8bit_usage ON symbols_8bit(usage_count DESC);

COMMENT ON TABLE symbols_8bit IS 'Foundation symbol table: 8-bit symbols (0-255). All higher-level symbols are compositions of these.';

-- ============================================================================
-- LEVEL 2: 16-BIT SYMBOLS (2^16 = 65,536 possible symbols)
-- ============================================================================
-- Composite keys built from two 8-bit symbols
-- ============================================================================

CREATE TABLE symbols_16bit (
    -- Composite primary key from two 8-bit symbols
    id_high SMALLINT NOT NULL CHECK (id_high >= 0 AND id_high <= 255),
    id_low SMALLINT NOT NULL CHECK (id_low >= 0 AND id_low <= 255),
    
    -- Foreign keys to 8-bit table
    FOREIGN KEY (id_high) REFERENCES symbols_8bit(id) ON DELETE RESTRICT,
    FOREIGN KEY (id_low) REFERENCES symbols_8bit(id) ON DELETE RESTRICT,
    
    PRIMARY KEY (id_high, id_low),
    
    -- Symbol data
    glyph TEXT NOT NULL,
    short_name VARCHAR(50) NOT NULL,
    long_description VARCHAR(500),
    symbol_type symbol_type NOT NULL DEFAULT 'character',
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    source VARCHAR(200),
    
    -- Usage statistics
    usage_count BIGINT DEFAULT 0,
    last_used_at TIMESTAMP WITH TIME ZONE,
    
    -- Computed 16-bit value for convenience
    computed_id INTEGER GENERATED ALWAYS AS ((id_high::INTEGER << 8) | id_low::INTEGER) STORED,
    
    UNIQUE(short_name),
    CHECK(glyph IS NOT NULL AND length(glyph) > 0)
);

-- Indexes for 16-bit symbols
CREATE INDEX idx_symbols_16bit_computed ON symbols_16bit(computed_id);
CREATE INDEX idx_symbols_16bit_type ON symbols_16bit(symbol_type);
CREATE INDEX idx_symbols_16bit_glyph ON symbols_16bit USING gin(to_tsvector('simple', glyph));
CREATE INDEX idx_symbols_16bit_name ON symbols_16bit(short_name);
CREATE INDEX idx_symbols_16bit_high ON symbols_16bit(id_high);
CREATE INDEX idx_symbols_16bit_low ON symbols_16bit(id_low);

COMMENT ON TABLE symbols_16bit IS '16-bit symbols (0-65,535). Composite keys from two 8-bit symbols.';

-- ============================================================================
-- LEVEL 3: 24-BIT SYMBOLS (2^24 = 16,777,216 possible symbols)
-- ============================================================================
-- Composite keys built from 16-bit + 8-bit symbols
-- ============================================================================

CREATE TABLE symbols_24bit (
    -- Composite key from 16-bit high + 8-bit low
    id_high_high SMALLINT NOT NULL CHECK (id_high_high >= 0 AND id_high_high <= 255),
    id_high_low SMALLINT NOT NULL CHECK (id_high_low >= 0 AND id_high_low <= 255),
    id_low SMALLINT NOT NULL CHECK (id_low >= 0 AND id_low <= 255),
    
    -- Foreign keys
    FOREIGN KEY (id_high_high, id_high_low) REFERENCES symbols_16bit(id_high, id_low) ON DELETE RESTRICT,
    FOREIGN KEY (id_low) REFERENCES symbols_8bit(id) ON DELETE RESTRICT,
    
    PRIMARY KEY (id_high_high, id_high_low, id_low),
    
    -- Symbol data
    glyph TEXT NOT NULL,
    short_name VARCHAR(50) NOT NULL,
    long_description VARCHAR(500),
    symbol_type symbol_type NOT NULL DEFAULT 'word',
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    source VARCHAR(200),
    
    -- Usage statistics
    usage_count BIGINT DEFAULT 0,
    last_used_at TIMESTAMP WITH TIME ZONE,
    
    -- Computed 24-bit value for convenience
    computed_id INTEGER GENERATED ALWAYS AS (
        (id_high_high::INTEGER << 16) | (id_high_low::INTEGER << 8) | id_low::INTEGER
    ) STORED,
    
    UNIQUE(short_name),
    CHECK(glyph IS NOT NULL AND length(glyph) > 0)
);

-- Indexes for 24-bit symbols
CREATE INDEX idx_symbols_24bit_computed ON symbols_24bit(computed_id);
CREATE INDEX idx_symbols_24bit_type ON symbols_24bit(symbol_type);
CREATE INDEX idx_symbols_24bit_glyph ON symbols_24bit USING gin(to_tsvector('simple', glyph));
CREATE INDEX idx_symbols_24bit_name ON symbols_24bit(short_name);
CREATE INDEX idx_symbols_24bit_high ON symbols_24bit(id_high_high, id_high_low);
CREATE INDEX idx_symbols_24bit_low ON symbols_24bit(id_low);

COMMENT ON TABLE symbols_24bit IS '24-bit symbols (0-16,777,215). Typical for words and short phrases.';

-- ============================================================================
-- LEVEL 4: 32-BIT SYMBOLS (2^32 = 4,294,967,296 possible symbols)
-- ============================================================================
-- Composite keys built from two 16-bit symbols
-- ============================================================================

CREATE TABLE symbols_32bit (
    -- Composite key from two 16-bit symbols
    id_high_high SMALLINT NOT NULL CHECK (id_high_high >= 0 AND id_high_high <= 255),
    id_high_low SMALLINT NOT NULL CHECK (id_high_low >= 0 AND id_high_low <= 255),
    id_low_high SMALLINT NOT NULL CHECK (id_low_high >= 0 AND id_low_high <= 255),
    id_low_low SMALLINT NOT NULL CHECK (id_low_low >= 0 AND id_low_low <= 255),
    
    -- Foreign keys
    FOREIGN KEY (id_high_high, id_high_low) REFERENCES symbols_16bit(id_high, id_low) ON DELETE RESTRICT,
    FOREIGN KEY (id_low_high, id_low_low) REFERENCES symbols_16bit(id_high, id_low) ON DELETE RESTRICT,
    
    PRIMARY KEY (id_high_high, id_high_low, id_low_high, id_low_low),
    
    -- Symbol data
    glyph TEXT NOT NULL,
    short_name VARCHAR(50) NOT NULL,
    long_description VARCHAR(500),
    symbol_type symbol_type NOT NULL DEFAULT 'sentence',
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    source VARCHAR(200),
    
    -- Usage statistics
    usage_count BIGINT DEFAULT 0,
    last_used_at TIMESTAMP WITH TIME ZONE,
    
    -- Computed 32-bit value for convenience
    computed_id BIGINT GENERATED ALWAYS AS (
        (id_high_high::BIGINT << 24) | (id_high_low::BIGINT << 16) | 
        (id_low_high::BIGINT << 8) | id_low_low::BIGINT
    ) STORED,
    
    UNIQUE(short_name),
    CHECK(glyph IS NOT NULL AND length(glyph) > 0)
);

-- Indexes for 32-bit symbols
CREATE INDEX idx_symbols_32bit_computed ON symbols_32bit(computed_id);
CREATE INDEX idx_symbols_32bit_type ON symbols_32bit(symbol_type);
CREATE INDEX idx_symbols_32bit_glyph ON symbols_32bit USING gin(to_tsvector('simple', glyph));
CREATE INDEX idx_symbols_32bit_name ON symbols_32bit(short_name);
CREATE INDEX idx_symbols_32bit_high ON symbols_32bit(id_high_high, id_high_low);
CREATE INDEX idx_symbols_32bit_low ON symbols_32bit(id_low_high, id_low_low);

COMMENT ON TABLE symbols_32bit IS '32-bit symbols (0-4.3B). Sentences, paragraphs, sections.';

-- ============================================================================
-- LEVEL 5: 40-BIT SYMBOLS (2^40 = 1,099,511,627,776 possible symbols)
-- ============================================================================
-- Composite keys: 32-bit + 8-bit
-- ============================================================================

CREATE TABLE symbols_40bit (
    -- Composite key from 32-bit high + 8-bit low
    id_b4 SMALLINT NOT NULL CHECK (id_b4 >= 0 AND id_b4 <= 255),
    id_b3 SMALLINT NOT NULL CHECK (id_b3 >= 0 AND id_b3 <= 255),
    id_b2 SMALLINT NOT NULL CHECK (id_b2 >= 0 AND id_b2 <= 255),
    id_b1 SMALLINT NOT NULL CHECK (id_b1 >= 0 AND id_b1 <= 255),
    id_b0 SMALLINT NOT NULL CHECK (id_b0 >= 0 AND id_b0 <= 255),
    
    -- Foreign keys
    FOREIGN KEY (id_b4, id_b3, id_b2, id_b1) REFERENCES symbols_32bit(id_high_high, id_high_low, id_low_high, id_low_low) ON DELETE RESTRICT,
    FOREIGN KEY (id_b0) REFERENCES symbols_8bit(id) ON DELETE RESTRICT,
    
    PRIMARY KEY (id_b4, id_b3, id_b2, id_b1, id_b0),
    
    -- Symbol data (glyph may reference external storage for large texts)
    glyph TEXT,  -- May be NULL for very large documents, use external reference
    short_name VARCHAR(50) NOT NULL,
    long_description VARCHAR(500),
    symbol_type symbol_type NOT NULL DEFAULT 'chapter',
    external_storage_uri TEXT,  -- For large documents stored externally
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    source VARCHAR(200),
    
    -- Usage statistics
    usage_count BIGINT DEFAULT 0,
    last_used_at TIMESTAMP WITH TIME ZONE,
    
    -- Computed 40-bit value
    computed_id BIGINT GENERATED ALWAYS AS (
        (id_b4::BIGINT << 32) | (id_b3::BIGINT << 24) | (id_b2::BIGINT << 16) | 
        (id_b1::BIGINT << 8) | id_b0::BIGINT
    ) STORED,
    
    UNIQUE(short_name),
    CHECK(glyph IS NOT NULL OR external_storage_uri IS NOT NULL)
);

-- Indexes for 40-bit symbols
CREATE INDEX idx_symbols_40bit_computed ON symbols_40bit(computed_id);
CREATE INDEX idx_symbols_40bit_type ON symbols_40bit(symbol_type);
CREATE INDEX idx_symbols_40bit_name ON symbols_40bit(short_name);
CREATE INDEX idx_symbols_40bit_high ON symbols_40bit(id_b4, id_b3, id_b2, id_b1);

COMMENT ON TABLE symbols_40bit IS '40-bit symbols (0-1.1T). Chapters, documents, books.';

-- ============================================================================
-- LEVEL 6: 48-BIT SYMBOLS (2^48 = 281,474,976,710,656 possible symbols)
-- ============================================================================
-- Composite keys: Three 16-bit symbols
-- ============================================================================

CREATE TABLE symbols_48bit (
    -- Composite key from three 16-bit symbols
    id_b5 SMALLINT NOT NULL CHECK (id_b5 >= 0 AND id_b5 <= 255),
    id_b4 SMALLINT NOT NULL CHECK (id_b4 >= 0 AND id_b4 <= 255),
    id_b3 SMALLINT NOT NULL CHECK (id_b3 >= 0 AND id_b3 <= 255),
    id_b2 SMALLINT NOT NULL CHECK (id_b2 >= 0 AND id_b2 <= 255),
    id_b1 SMALLINT NOT NULL CHECK (id_b1 >= 0 AND id_b1 <= 255),
    id_b0 SMALLINT NOT NULL CHECK (id_b0 >= 0 AND id_b0 <= 255),
    
    -- Foreign keys
    FOREIGN KEY (id_b5, id_b4) REFERENCES symbols_16bit(id_high, id_low) ON DELETE RESTRICT,
    FOREIGN KEY (id_b3, id_b2) REFERENCES symbols_16bit(id_high, id_low) ON DELETE RESTRICT,
    FOREIGN KEY (id_b1, id_b0) REFERENCES symbols_16bit(id_high, id_low) ON DELETE RESTRICT,
    
    PRIMARY KEY (id_b5, id_b4, id_b3, id_b2, id_b1, id_b0),
    
    -- Symbol data
    glyph TEXT,
    short_name VARCHAR(50) NOT NULL,
    long_description VARCHAR(500),
    symbol_type symbol_type NOT NULL DEFAULT 'book',
    external_storage_uri TEXT,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    source VARCHAR(200),
    
    -- Usage statistics
    usage_count BIGINT DEFAULT 0,
    last_used_at TIMESTAMP WITH TIME ZONE,
    
    -- Computed 48-bit value
    computed_id BIGINT GENERATED ALWAYS AS (
        (id_b5::BIGINT << 40) | (id_b4::BIGINT << 32) | (id_b3::BIGINT << 24) | 
        (id_b2::BIGINT << 16) | (id_b1::BIGINT << 8) | id_b0::BIGINT
    ) STORED,
    
    UNIQUE(short_name),
    CHECK(glyph IS NOT NULL OR external_storage_uri IS NOT NULL)
);

-- Indexes for 48-bit symbols
CREATE INDEX idx_symbols_48bit_computed ON symbols_48bit(computed_id);
CREATE INDEX idx_symbols_48bit_type ON symbols_48bit(symbol_type);
CREATE INDEX idx_symbols_48bit_name ON symbols_48bit(short_name);

COMMENT ON TABLE symbols_48bit IS '48-bit symbols (0-281T). Large books, collections, corpora.';

-- ============================================================================
-- SYMBOL ENCODING MAPPINGS
-- ============================================================================
-- Maps symbols to their representations in various encoding systems
-- ============================================================================

CREATE TABLE symbol_encodings (
    id SERIAL PRIMARY KEY,
    
    -- Symbol reference (polymorphic - references any symbol table)
    symbol_table VARCHAR(20) NOT NULL,  -- 'symbols_8bit', 'symbols_16bit', etc.
    symbol_id TEXT NOT NULL,  -- JSON representation of composite key
    
    -- Encoding information
    encoding_system encoding_system NOT NULL,
    encoded_value BYTEA NOT NULL,  -- Actual byte representation
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(symbol_table, symbol_id, encoding_system),
    CHECK(symbol_table IN ('symbols_8bit', 'symbols_16bit', 'symbols_24bit', 
                           'symbols_32bit', 'symbols_40bit', 'symbols_48bit'))
);

CREATE INDEX idx_encodings_table_id ON symbol_encodings(symbol_table, symbol_id);
CREATE INDEX idx_encodings_system ON symbol_encodings(encoding_system);

COMMENT ON TABLE symbol_encodings IS 'Maps symbols to their byte representations in different encoding systems.';

-- ============================================================================
-- SYMBOL RELATIONSHIPS
-- ============================================================================
-- Tracks relationships between symbols (composition, derivation, similarity, etc.)
-- ============================================================================

CREATE TABLE symbol_relationships (
    id SERIAL PRIMARY KEY,
    
    -- Source symbol (polymorphic)
    source_table VARCHAR(20) NOT NULL,
    source_id TEXT NOT NULL,
    
    -- Target symbol (polymorphic)
    target_table VARCHAR(20) NOT NULL,
    target_id TEXT NOT NULL,
    
    -- Relationship metadata
    relationship_type relationship_type NOT NULL,
    strength DECIMAL(5,4) CHECK (strength >= 0 AND strength <= 1),  -- 0.0000 to 1.0000
    position INTEGER,  -- For ordered relationships (e.g., sequence, composition)
    
    -- Additional context
    context JSONB,  -- Flexible metadata storage
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    
    CHECK(source_table IN ('symbols_8bit', 'symbols_16bit', 'symbols_24bit', 
                           'symbols_32bit', 'symbols_40bit', 'symbols_48bit')),
    CHECK(target_table IN ('symbols_8bit', 'symbols_16bit', 'symbols_24bit', 
                           'symbols_32bit', 'symbols_40bit', 'symbols_48bit'))
);

CREATE INDEX idx_relationships_source ON symbol_relationships(source_table, source_id);
CREATE INDEX idx_relationships_target ON symbol_relationships(target_table, target_id);
CREATE INDEX idx_relationships_type ON symbol_relationships(relationship_type);
CREATE INDEX idx_relationships_context ON symbol_relationships USING gin(context);

COMMENT ON TABLE symbol_relationships IS 'Tracks relationships between symbols across all levels.';

-- ============================================================================
-- SYMBOL USAGE STATISTICS
-- ============================================================================
-- Tracks symbol usage for optimization and analytics
-- ============================================================================

CREATE TABLE symbol_usage_log (
    id BIGSERIAL PRIMARY KEY,
    
    -- Symbol reference
    symbol_table VARCHAR(20) NOT NULL,
    symbol_id TEXT NOT NULL,
    
    -- Usage context
    used_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    used_by VARCHAR(100),
    usage_context VARCHAR(100),  -- 'search', 'composition', 'stream', etc.
    
    CHECK(symbol_table IN ('symbols_8bit', 'symbols_16bit', 'symbols_24bit', 
                           'symbols_32bit', 'symbols_40bit', 'symbols_48bit'))
);

-- Partitioned by month for performance
CREATE INDEX idx_usage_table_id ON symbol_usage_log(symbol_table, symbol_id);
CREATE INDEX idx_usage_timestamp ON symbol_usage_log(used_at DESC);

COMMENT ON TABLE symbol_usage_log IS 'Logs symbol usage for analytics and optimization. Consider partitioning by time.';

-- ============================================================================
-- SYMBOL METADATA
-- ============================================================================
-- Flexible metadata storage for symbols
-- ============================================================================

CREATE TABLE symbol_metadata (
    id SERIAL PRIMARY KEY,
    
    -- Symbol reference
    symbol_table VARCHAR(20) NOT NULL,
    symbol_id TEXT NOT NULL,
    
    -- Metadata
    metadata_key VARCHAR(100) NOT NULL,
    metadata_value TEXT,
    metadata_json JSONB,  -- For complex metadata
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(symbol_table, symbol_id, metadata_key),
    CHECK(symbol_table IN ('symbols_8bit', 'symbols_16bit', 'symbols_24bit', 
                           'symbols_32bit', 'symbols_40bit', 'symbols_48bit'))
);

CREATE INDEX idx_metadata_table_id ON symbol_metadata(symbol_table, symbol_id);
CREATE INDEX idx_metadata_key ON symbol_metadata(metadata_key);
CREATE INDEX idx_metadata_json ON symbol_metadata USING gin(metadata_json);

COMMENT ON TABLE symbol_metadata IS 'Flexible key-value metadata storage for symbols.';

-- ============================================================================
-- TRIGGERS FOR AUTOMATED UPDATES
-- ============================================================================

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all symbol tables
CREATE TRIGGER update_symbols_8bit_updated_at BEFORE UPDATE ON symbols_8bit
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_symbols_16bit_updated_at BEFORE UPDATE ON symbols_16bit
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_symbols_24bit_updated_at BEFORE UPDATE ON symbols_24bit
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_symbols_32bit_updated_at BEFORE UPDATE ON symbols_32bit
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_symbols_40bit_updated_at BEFORE UPDATE ON symbols_40bit
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_symbols_48bit_updated_at BEFORE UPDATE ON symbols_48bit
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_symbol_metadata_updated_at BEFORE UPDATE ON symbol_metadata
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VIEWS FOR EASIER QUERYING
-- ============================================================================

-- Unified view of all symbols (for browsing, not for production queries)
CREATE VIEW all_symbols AS
SELECT '8bit' as level, id::TEXT as symbol_id, glyph, short_name, long_description, 
       symbol_type, created_at, usage_count
FROM symbols_8bit
UNION ALL
SELECT '16bit', (id_high::TEXT || ',' || id_low::TEXT), glyph, short_name, 
       long_description, symbol_type, created_at, usage_count
FROM symbols_16bit
UNION ALL
SELECT '24bit', (id_high_high::TEXT || ',' || id_high_low::TEXT || ',' || id_low::TEXT), 
       glyph, short_name, long_description, symbol_type, created_at, usage_count
FROM symbols_24bit
UNION ALL
SELECT '32bit', (id_high_high::TEXT || ',' || id_high_low::TEXT || ',' || 
                 id_low_high::TEXT || ',' || id_low_low::TEXT), 
       glyph, short_name, long_description, symbol_type, created_at, usage_count
FROM symbols_32bit;

COMMENT ON VIEW all_symbols IS 'Unified view of symbols across all levels. Use for browsing only, not production queries.';

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

DO $$ 
BEGIN 
    RAISE NOTICE '=================================================================';
    RAISE NOTICE 'IDS Database Normal Form 7 (dbNF7) Schema Created Successfully';
    RAISE NOTICE '=================================================================';
    RAISE NOTICE 'Symbol Tables Created:';
    RAISE NOTICE '  - symbols_8bit    (256 symbols)';
    RAISE NOTICE '  - symbols_16bit   (65K symbols)';
    RAISE NOTICE '  - symbols_24bit   (16M symbols)';
    RAISE NOTICE '  - symbols_32bit   (4.3B symbols)';
    RAISE NOTICE '  - symbols_40bit   (1.1T symbols)';
    RAISE NOTICE '  - symbols_48bit   (281T symbols)';
    RAISE NOTICE '';
    RAISE NOTICE 'Supporting Tables:';
    RAISE NOTICE '  - symbol_encodings';
    RAISE NOTICE '  - symbol_relationships';
    RAISE NOTICE '  - symbol_usage_log';
    RAISE NOTICE '  - symbol_metadata';
    RAISE NOTICE '';
    RAISE NOTICE 'Next Steps:';
    RAISE NOTICE '  1. Run 002_seed_initial_data.sql to populate base symbols';
    RAISE NOTICE '  2. Run 003_helper_functions.sql for utility functions';
    RAISE NOTICE '  3. Configure partitioning for large-scale deployment';
    RAISE NOTICE '=================================================================';
END $$;
