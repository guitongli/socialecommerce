drop table if exists users;

CREATE TABLE users (
    id SERIAL primary key,
    firstname TEXT NOT NULL CHECK (firstname <> ''), 
    lastname TEXT NOT NULL CHECK(lastname <> ''), 
    email TEXT NOT NULL CHECK (email <> ''),
    hashkeys TEXT NOT NULL CHECK (hashkeys <> ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
