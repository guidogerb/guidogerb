# FSUtil Service - Development Tasks

**Last Updated:** November 10, 2025  
**Service:** fsutil-python (Port 8083)

## 🎯 High Priority

### P1: File Search & Query
**Priority:** High | **Effort:** Medium (6-8 hours)

Add comprehensive file search capabilities.

**Tasks:**
1. Add GET /api/files/search endpoint
2. Search by filename (partial match, regex)
3. Filter by file size (min/max)
4. Filter by date range (created, modified)
5. Filter by file type/extension
6. Add full-text content search (for text files)
7. Pagination support
8. Add indexes to database for performance

---

### P1: File Organization Tools
**Priority:** High | **Effort:** Medium (8-10 hours)

Add file moving and organizing capabilities.

**Tasks:**
1. Add POST /api/files/move endpoint
2. Add POST /api/files/organize endpoint (auto-organize by type/date)
3. Implement smart file categorization (documents, images, videos, etc.)
4. Add dry-run mode (preview without moving)
5. Add undo capability
6. Generate organization report
7. Add safety checks (prevent data loss)

---

### P1: Storage Analytics Dashboard
**Priority:** High | **Effort:** Medium (6-8 hours)

Visualize storage usage and trends.

**Tasks:**
1. Add GET /api/files/analytics endpoint
2. Calculate total storage used
3. Break down by file type
4. Identify largest files/directories
5. Show storage trends over time
6. Generate recommendations (files to delete/archive)
7. Create visual charts (pie chart, tree map)

---

## 🔧 Medium Priority

### P2: File Watching & Real-Time Monitoring
**Priority:** Medium | **Effort:** Large (10-12 hours)

Monitor filesystem changes in real-time.

**Tasks:**
1. Add filesystem watcher (watchdog library)
2. Detect file creation, modification, deletion
3. Update database in real-time
4. Add WebSocket endpoint for live updates
5. Add event filtering (ignore temp files, etc.)
6. Handle high-frequency changes efficiently

---

### P2: Smart Tagging System
**Priority:** Medium | **Effort:** Medium (6-8 hours)

Add manual and automatic file tagging.

**Tasks:**
1. Create Tag model
2. Add tag CRUD endpoints
3. Add POST /api/files/{id}/tags endpoint
4. Implement auto-tagging (based on filename, content, location)
5. Add tag-based search
6. Add tag suggestions

---

### P2: Compression Recommendations
**Priority:** Medium | **Effort:** Medium (5-6 hours)

Identify compressible files to save space.

**Tasks:**
1. Analyze file types for compression potential
2. Estimate space savings
3. Generate compression recommendations
4. Add compression action endpoint
5. Track compression results

---

### P2: Cloud Storage Integration
**Priority:** Medium | **Effort:** Large (12-15 hours)

Sync with cloud storage providers.

**Tasks:**
1. Add S3 integration
2. Add Google Drive integration
3. Add OneDrive integration
4. Sync local scans with cloud
5. Track files across local and cloud
6. Add cloud upload/download endpoints

---

## 🎨 Low Priority

### P3: Scheduled Scans
**Priority:** Low | **Effort:** Small (3-4 hours)

Automate directory scanning.

**Tasks:**
1. Add scan schedule configuration
2. Use Celery Beat for scheduling
3. Add CRUD for scan schedules
4. Send notifications on completion
5. Store historical scan results

---

### P3: File Preview Generation
**Priority:** Low | **Effort:** Medium (8-10 hours)

Generate thumbnails and previews.

**Tasks:**
1. Generate image thumbnails
2. Generate PDF previews
3. Generate video thumbnails
4. Add preview endpoint
5. Cache previews

---

### P3: Duplicate Auto-Resolution
**Priority:** Low | **Effort:** Medium (6-8 hours)

Automatically handle duplicates.

**Tasks:**
1. Add duplicate resolution strategies (keep newest, keep largest, etc.)
2. Add POST /api/files/duplicates/resolve endpoint
3. Move duplicates to trash/archive
4. Add confirmation step
5. Track resolution history

---

## 🐛 Bug Fixes

### BUG-1: Large Directory Performance
**Priority:** Medium | **Effort:** Small (3-4 hours)

Optimize scanning for directories with 100k+ files.

**Fix:**
1. Implement chunked processing
2. Add progress reporting
3. Optimize database batch inserts
4. Add memory usage monitoring

---

## 📊 Summary

**Total Tasks:** 13  
**High Priority:** 3 (~20-26 hours)  
**Medium Priority:** 4 (~33-41 hours)  
**Low Priority:** 3 (~17-22 hours)  
**Bug Fixes:** 1 (~3-4 hours)

**Estimated Total Effort:** ~70-90 hours
