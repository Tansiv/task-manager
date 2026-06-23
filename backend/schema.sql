CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'To Do'
        CHECK (status IN ('To Do', 'In Progress', 'Done')),
    created_at TIMESTAMP DEFAULT NOW()
);