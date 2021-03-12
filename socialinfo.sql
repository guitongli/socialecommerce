drop table if exists codes;
drop table if exists users;

CREATE TABLE users (
    id SERIAL primary key,
    username TEXT NOT NULL UNIQUE  CHECK (username <> ''), 
    yourname TEXT NOT NULL CHECK(yourname <> ''), 
    email TEXT NOT NULL UNIQUE CHECK (email <> ''),
    hashkeys TEXT NOT NULL CHECK (hashkeys <> ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    bio TEXT,
    pic TEXT
);


CREATE TABLE codes (
    id SERIAL primary key,
    email TEXT NOT NULL UNIQUE CHECK (email <> ''),
    code TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);