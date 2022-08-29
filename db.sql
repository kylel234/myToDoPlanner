CREATE DATABASE planner;

-- schema of db todo/todo table
CREATE TABLE todo (
    id SERIAL,
    description VARCHAR(300),
    PRIMARY KEY(id) 
);

--more features
ALTER TABLE todo
ADD COLUMN duedate DATE,
ADD COLUMN datepublished DATE DEFAULT CURRENT_DATE,
ADD COLUMN iscomplete BOOLEAN DEFAULT FALSE;



ALTER TABLE todo
DROP COLUMN dueDate;

--create extension to generate uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--users table
CREATE TABLE users (
    user_id UUID DEFAULT uuid_generate_v4(),
    username VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(300) NOT NULL,
    PRIMARY KEY(user_id)
);

--add foreign key to todo table so user can be associated w/ respective todo planner
ALTER TABLE todo ADD user_id UUID;
ALTER TABLE todo ADD CONSTRAINT fk_usersToDos FOREIGN KEY (user_id) REFERENCES users(user_id);


--test user
INSERT INTO users (username, email, password) VALUES ('kylo', 'kylo@gmail.com', 'fkdhfkjsd');

--test todo
INSERT INTO todo (description, iscomplete, user_id) VALUES ('coding time', FALSE, 'b749b7ea-3bc2-424d-9ca4-401cf2ea5798');