#!/bin/bash
# ============================================================================
# IDS Symbol Table Setup Script
# Initializes the PostgreSQL database with the symbol table schema
# ============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration (can be overridden by environment variables)
DB_NAME="${IDS_DB_NAME:-ids_symbols}"
DB_USER="${IDS_DB_USER:-postgres}"
DB_HOST="${IDS_DB_HOST:-localhost}"
DB_PORT="${IDS_DB_PORT:-5432}"

# Script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo -e "${GREEN}==================================================================${NC}"
echo -e "${GREEN}IDS Symbol Table Setup${NC}"
echo -e "${GREEN}==================================================================${NC}"
echo ""
echo "Configuration:"
echo "  Database: $DB_NAME"
echo "  User: $DB_USER"
echo "  Host: $DB_HOST"
echo "  Port: $DB_PORT"
echo ""

# Function to check if PostgreSQL is running
check_postgres() {
    echo -e "${YELLOW}Checking PostgreSQL connection...${NC}"
    if psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres -c '\q' 2>/dev/null; then
        echo -e "${GREEN}✓ PostgreSQL is running${NC}"
        return 0
    else
        echo -e "${RED}✗ Cannot connect to PostgreSQL${NC}"
        echo "Please ensure PostgreSQL is running and credentials are correct."
        return 1
    fi
}

# Function to create database
create_database() {
    echo ""
    echo -e "${YELLOW}Creating database '$DB_NAME'...${NC}"
    
    # Check if database exists
    if psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
        echo -e "${YELLOW}Database '$DB_NAME' already exists.${NC}"
        read -p "Do you want to drop and recreate it? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo -e "${YELLOW}Dropping existing database...${NC}"
            psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;" || {
                echo -e "${RED}✗ Failed to drop database${NC}"
                return 1
            }
            echo -e "${YELLOW}Creating database...${NC}"
            psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres -c "CREATE DATABASE $DB_NAME;" || {
                echo -e "${RED}✗ Failed to create database${NC}"
                return 1
            }
            echo -e "${GREEN}✓ Database created${NC}"
        else
            echo -e "${YELLOW}Using existing database${NC}"
        fi
    else
        psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres -c "CREATE DATABASE $DB_NAME;" || {
            echo -e "${RED}✗ Failed to create database${NC}"
            return 1
        }
        echo -e "${GREEN}✓ Database created${NC}"
    fi
}

# Function to run SQL file
run_sql_file() {
    local file=$1
    local description=$2
    
    echo ""
    echo -e "${YELLOW}$description${NC}"
    echo "File: $file"
    
    if [ ! -f "$file" ]; then
        echo -e "${RED}✗ File not found: $file${NC}"
        return 1
    fi
    
    if psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$file" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Success${NC}"
        return 0
    else
        echo -e "${RED}✗ Failed${NC}"
        echo "Running with verbose output for debugging:"
        psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$file"
        return 1
    fi
}

# Function to verify installation
verify_installation() {
    echo ""
    echo -e "${YELLOW}Verifying installation...${NC}"
    
    # Check if tables exist
    local table_count=$(psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t -c \
        "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public' AND table_name LIKE 'symbols_%';")
    
    echo "Tables found: $table_count"
    
    if [ "$table_count" -ge 6 ]; then
        echo -e "${GREEN}✓ Symbol tables created successfully${NC}"
    else
        echo -e "${RED}✗ Some tables are missing${NC}"
        return 1
    fi
    
    # Check if 8-bit symbols are seeded
    local symbol_count=$(psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t -c \
        "SELECT COUNT(*) FROM symbols_8bit;")
    
    echo "8-bit symbols: $symbol_count"
    
    if [ "$symbol_count" -eq 256 ]; then
        echo -e "${GREEN}✓ Initial seed data loaded (256 symbols)${NC}"
    else
        echo -e "${YELLOW}⚠ Expected 256 symbols, found $symbol_count${NC}"
    fi
    
    # Check if helper functions exist
    local function_count=$(psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t -c \
        "SELECT COUNT(*) FROM pg_proc WHERE proname LIKE '%symbol%';")
    
    echo "Helper functions: $function_count"
    
    if [ "$function_count" -gt 10 ]; then
        echo -e "${GREEN}✓ Helper functions created${NC}"
    else
        echo -e "${YELLOW}⚠ Expected more helper functions${NC}"
    fi
}

# Function to show next steps
show_next_steps() {
    echo ""
    echo -e "${GREEN}==================================================================${NC}"
    echo -e "${GREEN}Installation Complete!${NC}"
    echo -e "${GREEN}==================================================================${NC}"
    echo ""
    echo "Next steps:"
    echo ""
    echo "1. Test the installation:"
    echo "   psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME"
    echo ""
    echo "2. Run example queries:"
    echo "   psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f $SCRIPT_DIR/examples.sql"
    echo ""
    echo "3. Check statistics:"
    echo "   SELECT * FROM get_symbol_statistics();"
    echo ""
    echo "4. Search for symbols:"
    echo "   SELECT * FROM search_symbols_by_glyph('A');"
    echo ""
    echo "5. Read the documentation:"
    echo "   cat $SCRIPT_DIR/README.md"
    echo ""
    echo "Connection string for your application:"
    echo "  postgresql://$DB_USER@$DB_HOST:$DB_PORT/$DB_NAME"
    echo ""
}

# Main installation flow
main() {
    # Check PostgreSQL connection
    check_postgres || exit 1
    
    # Create database
    create_database || exit 1
    
    # Run schema creation
    run_sql_file "$SCRIPT_DIR/001_create_symbol_tables.sql" \
        "Creating symbol tables, indexes, and triggers..." || exit 1
    
    # Seed initial data
    run_sql_file "$SCRIPT_DIR/002_seed_initial_data.sql" \
        "Seeding initial 8-bit symbols (ASCII + Latin-1)..." || exit 1
    
    # Install helper functions
    run_sql_file "$SCRIPT_DIR/003_helper_functions.sql" \
        "Installing helper functions..." || exit 1
    
    # Apply case handling and styling optimization
    if [ -f "$SCRIPT_DIR/004_schema_optimization_case_and_styling.sql" ]; then
        run_sql_file "$SCRIPT_DIR/004_schema_optimization_case_and_styling.sql" \
            "Applying case handling & styling optimization..." || {
            echo -e "${YELLOW}⚠ Optimization partially applied${NC}"
        }
    fi
    
    # Verify installation
    verify_installation || {
        echo -e "${YELLOW}⚠ Installation completed with warnings${NC}"
    }
    
    # Show next steps
    show_next_steps
}

# Handle command line arguments
case "${1:-}" in
    --help|-h)
        echo "Usage: $0 [OPTIONS]"
        echo ""
        echo "Options:"
        echo "  --help, -h     Show this help message"
        echo "  --drop         Force drop existing database without prompting"
        echo ""
        echo "Environment Variables:"
        echo "  IDS_DB_NAME    Database name (default: ids_symbols)"
        echo "  IDS_DB_USER    Database user (default: postgres)"
        echo "  IDS_DB_HOST    Database host (default: localhost)"
        echo "  IDS_DB_PORT    Database port (default: 5432)"
        echo ""
        echo "Example:"
        echo "  IDS_DB_NAME=my_symbols $0"
        exit 0
        ;;
    --drop)
        export FORCE_DROP=1
        ;;
esac

# Run main installation
main
