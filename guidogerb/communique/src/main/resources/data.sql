CREATE TABLE IF NOT EXISTS Usage (
    id SERIAL PRIMARY KEY,
    requestDateTime TIMESTAMP,
    prompt_tokens INTEGER,
    completion_tokens INTEGER,
    total_tokens INTEGER
);

CREATE TABLE IF NOT EXISTS Engine (
    object TEXT,
    id TEXT UNIQUE,
    ready BOOLEAN,
    owner TEXT,
    permissions TEXT,
    created DATE
);

CREATE TABLE IF NOT EXISTS OpenAiApiRequest (
    pkId SERIAL PRIMARY KEY,
    requestDateTime TIMESTAMP,
    prompt TEXT,
    model TEXT,
    max_tokens INTEGER
);

CREATE TABLE IF NOT EXISTS OpenAiApiResponse (
    id SERIAL PRIMARY KEY,
    requestDateTime TIMESTAMP,
    responseId TEXT,
    object TEXT,
    created TIMESTAMP,
    model TEXT,
    usage_id INTEGER REFERENCES Usage(id)
);

CREATE TABLE IF NOT EXISTS Choice (
    id SERIAL PRIMARY KEY,
    text TEXT,
    index INTEGER,
    logprobs REAL,
    finish_reason TEXT,
    response_id INTEGER REFERENCES OpenAiApiResponse(id)
);


