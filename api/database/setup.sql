DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar(20) UNIQUE NOT NULL,
    email varchar(100) UNIQUE NOT NULL,
    user_password CHAR(60) NOT NULL,
    avatar VARCHAR
);

CREATE TABLE posts (
    id serial PRIMARY KEY,
    title varchar(50),
    content varchar
);