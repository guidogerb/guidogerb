# IDS Database Normal Form 7 (dbNF7) - Symbol Table System

## Overview

This SQL schema implements a **hierarchical, exponentially scalable symbol table** designed to represent all possible text encodings through a unified addressing system. The core innovation is that symbol keys grow by 8 bits at each level, allowing for massive scalability while maintaining referential integrity through composite foreign keys.

## Key Concepts

### 1. **Exponential Growth by 8-Bit Increments**
Each table level adds 8 bits of addressing space:
- **8-bit**: 256 symbols (foundational characters)
- **16-bit**: 65,536 symbols (extended characters, digraphs)
- **24-bit**: 16,777,216 symbols (words, short phrases)
- **32-bit**: 4,294,967,296 symbols (sentences, paragraphs)
- **40-bit**: 1.1 trillion symbols (chapters, documents)
- **48-bit**: 281 trillion symbols (books, collections, corpora)

### 2. **Composite Foreign Keys**
Every higher-level symbol is built from **references to lower-level symbols**:
- 16-bit symbols = two 8-bit symbols
- 24-bit symbols = one 16-bit + one 8-bit symbol
- 32-bit symbols = two 16-bit symbols
- 40-bit symbols = one 32-bit + one 8-bit symbol
- 48-bit symbols = three 16-bit symbols

This creates an **immutable composition tree** where complex symbols are always traceable to their atomic components.

### 3. **No Duplication**
Symbols never duplicate content. Instead, they reference other symbols through:
- **Direct composition** (composite foreign keys in primary key)
- **Relationships table** (tracks composition, derivation, similarity, etc.)

Example: The Chinese word "好" (hǎo, meaning "good") is composed of:
- Symbol 女 (woman) - stored as an 8-bit or 16-bit symbol
- Symbol 子 (child) - stored as an 8-bit or 16-bit symbol  
- Composite 好 - stored as a 16-bit or 24-bit symbol with foreign keys to its components

### 4. **Universal Encoding Support**
The `symbol_encodings` table maps symbols to their byte representations in various encodings:
- UTF-8, UTF-16, UTF-32
- ASCII, ISO-8859-1
- GB2312, GBK, Big5 (Chinese)
- Shift-JIS (Japanese)
- EUC-KR (Korean)
- Custom encodings

### 5. **Distributed Symbol Tables**
The ultimate goal is **distributable symbol tables** for massive datasets:
- A client referencing "War and Peace" only needs the single 40-bit or 48-bit symbol ID
- IDS streams become extremely compact
- Symbol resolution happens through distributed lookup
- Sharding and partitioning strategies enable petabyte-scale symbol storage

## Database Schema

### Core Symbol Tables

```sql
symbols_8bit     -- Foundation: 256 atomic symbols
symbols_16bit    -- 65K symbols (2 × 8-bit)
symbols_24bit    -- 16M symbols (16-bit + 8-bit)
symbols_32bit    -- 4.3B symbols (2 × 16-bit)
symbols_40bit    -- 1.1T symbols (32-bit + 8-bit)
symbols_48bit    -- 281T symbols (3 × 16-bit)
```

Each table includes:
- Composite primary keys (foreign keys to lower levels)
- `glyph`: The actual text content (TEXT, supports all Unicode)
- `short_name`: Human-readable identifier
- `symbol_type`: Enum (character, word, sentence, book, etc.)
- Usage statistics and metadata
- Computed ID column for convenience

### Supporting Tables

```sql
symbol_relationships  -- Tracks composition, similarity, derivation, etc.
symbol_encodings      -- Maps symbols to byte representations in various encodings
symbol_usage_log      -- Logs symbol access for analytics and optimization
symbol_metadata       -- Flexible key-value storage for symbol properties
```

## Installation

### 1. Create Database

```bash
# Create PostgreSQL database
createdb ids_symbols

# Or with psql
psql -U postgres -c "CREATE DATABASE ids_symbols;"
```

### 2. Run Schema Scripts in Order

```bash
# 1. Create tables, enums, indexes, triggers
psql -U postgres -d ids_symbols -f sql/001_create_symbol_tables.sql

# 2. Seed initial 8-bit symbols (ASCII + Latin-1)
psql -U postgres -d ids_symbols -f sql/002_seed_initial_data.sql

# 3. Install helper functions
psql -U postgres -d ids_symbols -f sql/003_helper_functions.sql

# 4. Apply case handling & styling optimization (recommended)
psql -U postgres -d ids_symbols -f sql/004_schema_optimization_case_and_styling.sql
```

### 3. Verify Installation

```sql
-- Check symbol count
SELECT * FROM get_symbol_statistics();

-- Search for symbols
SELECT * FROM search_symbols_by_glyph('hello');

-- Get top symbols
SELECT * FROM get_top_symbols(10);
```

## Usage Examples

### Example 1: Find a Symbol

```sql
-- Search by glyph (case-insensitive)
SELECT * FROM search_symbols_by_glyph('A');

-- Search by name
SELECT * FROM search_symbols_by_name('LATIN');

-- Get specific 8-bit symbol
SELECT * FROM get_symbol_8bit(65);  -- Returns 'A'
```

### Example 2: Create Composite Symbols

```sql
-- Compose two 8-bit symbols into a 16-bit symbol
SELECT compose_symbols_8_8(
    104,  -- 'h'
    105,  -- 'i'
    'HI_WORD',
    'The word "hi"',
    'word',
    'user123'
);

-- Create a word from multiple characters
SELECT create_word_symbol(
    ARRAY[104, 101, 108, 108, 111],  -- 'h','e','l','l','o'
    'HELLO_WORD',
    'The word "hello"',
    'user123'
);
```

### Example 3: Track Symbol Composition

```sql
-- Get composition of a symbol
SELECT * FROM get_symbol_composition('symbols_16bit', '104,105');

-- Result shows:
-- position | component_table | component_id | glyph | short_name
-- ---------+-----------------+--------------+-------+------------
-- 1        | symbols_8bit    | 104          | h     | LATIN_h
-- 2        | symbols_8bit    | 105          | i     | LATIN_i
```

### Example 4: Record Usage

```sql
-- Record that a symbol was used
SELECT record_symbol_usage(
    'symbols_8bit',
    '65',
    'user123',
    'document_processing'
);

-- Get most frequently used symbols
SELECT * FROM get_top_symbols(100, 'character');
```

### Example 5: Add Encoding Mappings

```sql
-- Map symbol to UTF-8 encoding
SELECT add_symbol_encoding(
    'symbols_8bit',
    '65',
    'UTF-8',
    '\x41'::BYTEA  -- 'A' in UTF-8
);

-- Retrieve encoding
SELECT get_symbol_encoding('symbols_8bit', '65', 'UTF-8');
```

### Example 6: Create Relationships

```sql
-- Mark two symbols as similar
INSERT INTO symbol_relationships (
    source_table, source_id,
    target_table, target_id,
    relationship_type, strength
) VALUES (
    'symbols_8bit', '65',  -- 'A'
    'symbols_8bit', '97',  -- 'a'
    'variant', 0.95
);

-- Find similar symbols
SELECT * FROM find_similar_symbols('symbols_8bit', '65', 0.8);
```

## Advanced Features

### 1. **Full-Text Search**

```sql
-- Search across all symbol tables
SELECT * FROM search_symbols_by_glyph('hello world');

-- GIN indexes enable fast full-text search on glyph content
```

### 2. **Usage Analytics**

```sql
-- Get comprehensive statistics
SELECT * FROM get_symbol_statistics();

-- Analyze usage patterns
SELECT 
    symbol_type,
    COUNT(*) as type_count,
    SUM(usage_count) as total_usage,
    AVG(usage_count) as avg_usage
FROM symbols_8bit
GROUP BY symbol_type
ORDER BY total_usage DESC;
```

### 3. **Relationship Graphs**

```sql
-- Find all symbols derived from a base symbol
WITH RECURSIVE symbol_tree AS (
    -- Base case: start with a specific symbol
    SELECT source_table, source_id, target_table, target_id, 1 as depth
    FROM symbol_relationships
    WHERE source_table = 'symbols_8bit' AND source_id = '65'
    
    UNION ALL
    
    -- Recursive case: find symbols derived from previous level
    SELECT sr.source_table, sr.source_id, sr.target_table, sr.target_id, st.depth + 1
    FROM symbol_relationships sr
    JOIN symbol_tree st ON sr.source_table = st.target_table 
                        AND sr.source_id = st.target_id
    WHERE st.depth < 5  -- Limit recursion depth
)
SELECT * FROM symbol_tree;
```

### 4. **Bulk Import**

```sql
-- Import Unicode characters into 16-bit table
INSERT INTO symbols_16bit (id_high, id_low, glyph, short_name, symbol_type, source)
SELECT 
    (unicode_val >> 8)::SMALLINT as id_high,
    (unicode_val & 255)::SMALLINT as id_low,
    chr(unicode_val) as glyph,
    'U+' || to_hex(unicode_val) as short_name,
    'character' as symbol_type,
    'Unicode' as source
FROM generate_series(256, 65535) as unicode_val
WHERE unicode_val NOT IN (SELECT computed_id FROM symbols_16bit);
```

## Performance Optimization

### 1. **Partitioning**

For very large deployments, partition tables by key ranges:

```sql
-- Example: Partition 24-bit table by id_high_high
CREATE TABLE symbols_24bit_p0 PARTITION OF symbols_24bit
    FOR VALUES FROM (0) TO (64);

CREATE TABLE symbols_24bit_p1 PARTITION OF symbols_24bit
    FOR VALUES FROM (64) TO (128);

-- ... etc.
```

### 2. **Indexing Strategy**

All key indexes are already created. For custom queries, add:

```sql
-- Index on specific metadata
CREATE INDEX idx_metadata_custom ON symbol_metadata(metadata_key, metadata_value)
WHERE metadata_key = 'language';

-- Partial indexes for hot data
CREATE INDEX idx_symbols_8bit_hot ON symbols_8bit(usage_count)
WHERE usage_count > 1000;
```

### 3. **Materialized Views**

Cache expensive queries:

```sql
CREATE MATERIALIZED VIEW symbol_summary AS
SELECT 
    '8bit' as level,
    COUNT(*) as symbol_count,
    SUM(usage_count) as total_usage
FROM symbols_8bit
UNION ALL
SELECT '16bit', COUNT(*), SUM(usage_count) FROM symbols_16bit
UNION ALL
SELECT '24bit', COUNT(*), SUM(usage_count) FROM symbols_24bit;

-- Refresh periodically
REFRESH MATERIALIZED VIEW symbol_summary;
```

### 4. **Sharding (Citus Extension)**

For distributed PostgreSQL:

```sql
-- Distribute 24-bit and higher tables
SELECT create_distributed_table('symbols_24bit', 'computed_id');
SELECT create_distributed_table('symbols_32bit', 'computed_id');
```

## Integration with IDS Service

### Python/FastAPI Integration

```python
from sqlalchemy import select, insert
from app.models.symbol import Symbol8Bit, Symbol16Bit

# Query symbols
async def get_symbol(session: AsyncSession, symbol_id: int) -> Symbol8Bit:
    result = await session.execute(
        select(Symbol8Bit).where(Symbol8Bit.id == symbol_id)
    )
    return result.scalar_one_or_none()

# Create composite symbol
async def create_composite(session: AsyncSession, id1: int, id2: int, name: str):
    # Use helper function
    await session.execute(
        text("SELECT compose_symbols_8_8(:id1, :id2, :name, NULL, 'composite', :user)"),
        {"id1": id1, "id2": id2, "name": name, "user": "system"}
    )
    await session.commit()
```

### REST API Endpoints

- `GET /api/symbols/{level}/{id}` - Retrieve symbol by ID
- `POST /api/symbols/{level}` - Create new symbol
- `GET /api/symbols/search?q={query}` - Search symbols
- `GET /api/symbols/{level}/{id}/composition` - Get composition tree
- `POST /api/symbols/{level}/{id}/usage` - Record usage
- `GET /api/statistics` - Get system statistics

## Maintenance

### Regular Maintenance

```sql
-- Run weekly
SELECT maintain_symbol_tables();

-- Check fragmentation
SELECT 
    schemaname, tablename, 
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE tablename LIKE 'symbols_%'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Backup Strategy

```bash
# Full backup
pg_dump -U postgres -Fc ids_symbols > ids_symbols_$(date +%Y%m%d).dump

# Table-specific backup (for large systems)
pg_dump -U postgres -t symbols_8bit -Fc ids_symbols > symbols_8bit.dump
```

### Migration Strategy

```sql
-- For adding new symbol levels (e.g., 56-bit)
-- 1. Create new table following the pattern
-- 2. Add to helper functions
-- 3. Update views
-- 4. Update application code
```

## Future Enhancements

1. **64-bit and Beyond**: Extend to 64-bit, 72-bit for even larger symbol spaces
2. **Vector Embeddings**: Add embedding columns for semantic similarity search
3. **Blockchain Integration**: Immutable symbol registration with blockchain verification
4. **Distributed Caching**: Redis/Memcached layer for hot symbols
5. **Graph Database Integration**: Neo4j for advanced relationship queries
6. **ML-Based Symbol Discovery**: Automatic symbol extraction from corpora
7. **Multi-Tenancy**: Namespace isolation for different organizations

## Contributing

This schema is part of the **GuidoGerb IDS (Identity Database System)** project, implementing Database Normal Form 7 (dbNF7) concepts.

For questions, issues, or contributions:
- Repository: https://github.com/guidogerb/guidogerb
- Documentation: `/docs/research/dbNF7-specification.md`

## License

See LICENSE file in the root of the GuidoGerb project.
