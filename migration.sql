DROP TABLE IF EXISTS todos;

CREATE TABLE todos(
   id SERIAL PRIMARY KEY,
   task VARCHAR NOT NULL
);