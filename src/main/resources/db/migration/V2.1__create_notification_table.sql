CREATE TABLE notification (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    user_id INT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
