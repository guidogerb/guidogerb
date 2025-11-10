# IDS - Database Normalization Framework (Python/FastAPI)

**Port:** 8087  
**Status:** 🚧 Early Development / Research Stage  
**Converted from:** Java Spring Boot Application

## 📋 Overview

The IDS (Identity and Database System) service is a research framework for implementing **Database Normal Form 7 (dbNF7)**, an advanced normalization specification beyond the traditional Boyce-Codd Normal Form (BCNF). This is a theoretical and experimental project exploring higher-order database normalization.

## 🎯 Purpose

The service aims to:
- Research and implement dbNF7 specification
- Provide tools for analyzing database schemas
- Automatically normalize databases to higher normal forms
- Offer utilities for bitarray operations, indexing, and hashing
- Serve as a testbed for database normalization research

## 🏗️ Current Implementation Status

### Implemented ✅
- **Basic FastAPI skeleton** - Health check and root endpoints
- **BitArray utility class** - Basic bitarray operations for indexing
  - Set/get bits
  - Count set bits
  - Byte serialization/deserialization

### Missing / Needs Implementation 🚧

**Almost everything is missing.** This service is in very early stages.

**Core Missing Features:**
- Database schema analysis engine
- Normalization algorithms (1NF → 2NF → 3NF → BCNF → 4NF → 5NF → dbNF7)
- Functional dependency detection
- Schema transformation engine
- Normalization validation
- API endpoints for normalization operations
- Database connectors (PostgreSQL, MySQL, etc.)
- Schema visualization
- Normalization reports and recommendations

## 🏗️ Architecture

```
ids-python/
├── src/app/
│   ├── main.py                   # FastAPI app (minimal)
│   ├── utils/
│   │   └── bitarray_util.py      # BitArray implementation
│   └── [MISSING] models/         # Schema models
│   └── [MISSING] services/       # Normalization services
│   └── [MISSING] analyzers/      # Schema analysis
│   └── [MISSING] transformers/   # Schema transformation
├── pyproject.toml                # Dependencies
└── [MISSING] README, tests, docs
```

## 📚 Database Normal Forms (Background)

### Standard Normal Forms
1. **1NF (First Normal Form):** Atomic values, no repeating groups
2. **2NF (Second Normal Form):** 1NF + no partial dependencies
3. **3NF (Third Normal Form):** 2NF + no transitive dependencies
4. **BCNF (Boyce-Codd):** 3NF + every determinant is a candidate key
5. **4NF (Fourth Normal Form):** BCNF + no multi-valued dependencies
6. **5NF (Fifth Normal Form):** 4NF + no join dependencies

### Proposed dbNF7
**Database Normal Form 7** (dbNF7) is a research specification that aims to address:
- Complex identity relationships
- Multi-tenant data isolation at schema level
- Temporal data versioning
- Advanced functional dependencies
- Bitarray-indexed key relationships

**Note:** dbNF7 is not a standard form and is specific to this research project.

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Understanding of database normalization theory

### Installation

```bash
cd guidogerb/ids-python
poetry install
poetry run uvicorn app.main:app --reload --port 8087
```

### Current Endpoints

```bash
# Health check
curl http://localhost:8087/health

# Root info
curl http://localhost:8087/
```

**Note:** No functional endpoints are implemented yet. All normalization features need to be built.

## 📖 Planned API (Not Yet Implemented)

### Schema Analysis
- `POST /api/analyze` - Analyze a database schema
- `GET /api/analyze/{schema_id}` - Get analysis results
- `POST /api/detect-dependencies` - Detect functional dependencies

### Normalization
- `POST /api/normalize` - Normalize schema to target form
- `GET /api/normalize/{job_id}` - Get normalization status
- `POST /api/validate` - Validate normalization level

### Schema Management
- `POST /api/schemas` - Import database schema
- `GET /api/schemas/{id}` - Get schema details
- `GET /api/schemas/{id}/diagram` - Visualize schema

## 🔬 Research Areas

### 1. dbNF7 Specification
Define formal rules and algorithms for dbNF7:
- Mathematical definition of dbNF7
- Algorithms to detect dbNF7 violations
- Transformation rules from BCNF/5NF to dbNF7
- Proof of preservation of data integrity

### 2. BitArray Indexing
Use bitarrays for efficient relationship indexing:
- Bitarray-based foreign key indexes
- Fast set operations for joins
- Compressed index storage
- Performance benchmarking vs. traditional indexes

### 3. Identity Management
Advanced identity and key management:
- Composite key optimization
- Surrogate key generation strategies
- Natural key preservation
- Multi-tenant key isolation

### 4. Schema Evolution
Handle schema changes while maintaining normalization:
- Version control for schemas
- Migration path generation
- Backward compatibility checking
- Automated denormalization for performance

## 🧪 Testing

Currently no tests implemented. Need to create:
- Unit tests for normalization algorithms
- Integration tests for schema analysis
- Performance benchmarks for large schemas
- Test databases with known normalization levels

## ⚠️ Development Status

**This service is in PROOF-OF-CONCEPT stage.**

**Progress:** ~2% complete
- ✅ Basic project structure
- ✅ BitArray utility
- ❌ Core normalization engine (0%)
- ❌ Schema analysis (0%)
- ❌ API endpoints (0%)
- ❌ Database connectors (0%)
- ❌ Documentation (5%)
- ❌ Tests (0%)

## 📝 Implementation Roadmap

See `tasks.md` for detailed implementation tasks. High-level phases:

1. **Phase 1: Foundation** (8-10 weeks)
   - Define dbNF7 mathematical specification
   - Implement schema model classes
   - Build dependency detection engine
   - Create basic normalization algorithms

2. **Phase 2: Core Features** (10-12 weeks)
   - Implement 1NF → BCNF normalization
   - Add database schema importers
   - Build transformation engine
   - Create validation tools

3. **Phase 3: dbNF7** (12-15 weeks)
   - Implement dbNF7 analysis
   - Build dbNF7 transformation algorithms
   - Add advanced bitarray indexing
   - Performance optimization

4. **Phase 4: Production** (6-8 weeks)
   - Add API endpoints
   - Build web UI for visualization
   - Create comprehensive documentation
   - Write research whitepaper

## 🤝 Contributing

This is a research project. Contributions welcome in:
- Database theory and normalization algorithms
- Schema analysis techniques
- Performance optimization
- Testing and validation
- Documentation and examples

## 📖 Related Documentation

- [dbNF7 Specification](../../../docs/research/dbNF7-specification.md) (draft)
- [Python Services Overview](../../../docs/services/python/)
- [Java IDS (Historical)](../../../docs/services/java/ids.md)

## 📚 References

To be added:
- Academic papers on higher normal forms
- Database normalization theory
- Related research projects
