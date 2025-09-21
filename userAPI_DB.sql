CREATE TABLE users (
  name VARCHAR(50) NOT NULL,               -- User's name
  email VARCHAR(100) UNIQUE NOT NULL,      -- User's email (must be unique)
  password VARCHAR(255) NOT NULL           -- Hashed password
);

SELECT * FROM Users;