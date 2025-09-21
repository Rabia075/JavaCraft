CREATE TABLE Departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    department_code VARCHAR(20) UNIQUE NOT NULL
);

SELECT * FROM Departments;

CREATE TABLE Students (
    student_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) CHECK (phone ~ '^\+92(3|1)[0-9]{9}$'),
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
    date_of_birth DATE,
    address VARCHAR(255),
    registration_date DATE DEFAULT CURRENT_DATE,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

SELECT * FROM Students;

CREATE TABLE Courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    credit_hours INT NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

SELECT * FROM Courses;

CREATE TABLE Instructors (
  instructor_id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20),
  department_id INT,
  CONSTRAINT fk_department
  FOREIGN KEY (department_id)
  REFERENCES Departments(department_id)
  ON DELETE SET NULL
);

SELECT * FROM Instructors;

CREATE TABLE Registrations (
  registration_id SERIAL PRIMARY KEY,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  registration_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(20) CHECK (status IN ('approved', 'rejected', 'pending')),
  FOREIGN KEY (student_id) REFERENCES Students(student_id),
  FOREIGN KEY (course_id) REFERENCES Courses(course_id),
  UNIQUE(student_id, course_id)
);

SELECT * FROM Registrations;

CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  role VARCHAR(20) CHECK (role IN ('admin', 'student', 'instructor'))
);

SELECT * FROM Users;
