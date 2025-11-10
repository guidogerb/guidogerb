# Communique Service - Development Tasks

**Last Updated:** November 10, 2025  
**Service:** communique-python (Port 8084)

## 🚨 High Priority

### P1: Conversation Persistence
**Priority:** High | **Effort:** Medium (6-8 hours)

Add database storage for chat conversations.

**Tasks:**
1. Create Conversation and Message models
2. Add PostgreSQL/SQLite database
3. Store messages with timestamps and metadata
4. Add GET /api/conversations endpoint
5. Add GET /api/conversations/{id} endpoint
6. Add DELETE /api/conversations/{id} endpoint
7. Link messages to user accounts (auth integration)

---

### P1: Streaming Responses
**Priority:** High | **Effort:** Small (3-4 hours)

Support server-sent events for real-time streaming.

**Tasks:**
1. Add streaming parameter to chat endpoint
2. Use OpenAI streaming API
3. Implement SSE response
4. Add proper error handling for streams

---

### P1: User Authentication & API Keys
**Priority:** High | **Effort:** Medium (6-8 hours)

Secure the service with authentication.

**Tasks:**
1. Integrate with backend-python authentication
2. Require JWT tokens for requests
3. Add user-specific API key management
4. Track usage per user
5. Add rate limiting per user

---

## 🔧 Medium Priority

### P2: Usage Tracking & Analytics
**Priority:** Medium | **Effort:** Medium (5-6 hours)

Track token usage and costs.

**Tasks:**
1. Record tokens used per request
2. Calculate costs based on model pricing
3. Add usage dashboard endpoint
4. Generate usage reports (daily, monthly)
5. Add budget alerts

---

### P2: Prompt Templates
**Priority:** Medium | **Effort:** Medium (5-6 hours)

Manage reusable prompt templates.

**Tasks:**
1. Create PromptTemplate model
2. Add template variables support
3. Add CRUD endpoints for templates
4. Add template versioning
5. Add predefined templates (summarization, Q&A, etc.)

---

### P2: Function Calling Support
**Priority:** Medium | **Effort:** Medium (6-8 hours)

Add OpenAI function calling capabilities.

**Tasks:**
1. Support function definitions in requests
2. Handle function call responses
3. Add function registry
4. Add built-in utility functions
5. Document function calling patterns

---

## 🎨 Low Priority

### P3: Multi-Provider Support
**Priority:** Low | **Effort:** Large (12-15 hours)

Support multiple AI providers.

**Tasks:**
1. Abstract provider interface
2. Add Anthropic (Claude) support
3. Add Cohere support
4. Add local model support (Ollama)
5. Provider selection per request

---

### P3: Response Caching
**Priority:** Low | **Effort:** Small (3-4 hours)

Cache responses for identical requests.

**Tasks:**
1. Add Redis caching layer
2. Cache based on message hash
3. Add cache TTL configuration
4. Add cache invalidation

---

### P3: Content Moderation
**Priority:** Low | **Effort:** Medium (4-5 hours)

Add content filtering.

**Tasks:**
1. Use OpenAI moderation API
2. Filter harmful content
3. Add custom moderation rules
4. Log moderation events

---

## 📊 Summary

**Total Tasks:** 11  
**High Priority:** 3 (~15-20 hours)  
**Medium Priority:** 3 (~16-20 hours)  
**Low Priority:** 5 (~20-25 hours)

**Estimated Total Effort:** ~50-65 hours
