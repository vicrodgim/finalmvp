
-- (Re)create the tables

DROP TABLE IF EXISTS students;

CREATE TABLE students (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL
);

-- Insert some sample data

INSERT INTO students (first_name, last_name)
VALUES
    ("Student1First", "Student1Last"),
    ("Student2First", "Student2Last");