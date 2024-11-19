-- schema.sql

-- Creating the Questions table
CREATE TABLE IF NOT EXISTS Questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    option_a TEXT,
    option_b TEXT,
    option_c TEXT,
    option_d TEXT,
    correct_answer CHAR(1) NOT NULL
);

-- Creating the Users table
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    class_number VARCHAR(255) NOT NULL,
    test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating the Results table
CREATE TABLE IF NOT EXISTS Results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    question_id INT,
    selected_answer CHAR(1),
    is_correct BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (question_id) REFERENCES Questions(id)
);

-- Example insert into Questions
INSERT INTO Questions (question, option_a, option_b, option_c, option_d, correct_answer)
VALUES 
    ('What is 2 + 2?', '2', '3', '4', '5', 'C'),
    ('What is the capital of France?', 'Madrid', 'Berlin', 'London', 'Paris', 'D'),
    ('Which gas do plants absorb from the atmosphere?', 'Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen', 'C');

-- Committing all changes
COMMIT;
