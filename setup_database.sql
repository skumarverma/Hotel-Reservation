-- Hotel Reservation System Database Setup

-- Create the database
CREATE DATABASE IF NOT EXISTS hotel_db;

-- Use the database
USE hotel_db;

-- Create the reservations table
CREATE TABLE IF NOT EXISTS reservations (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    guest_name VARCHAR(100) NOT NULL,
    room_number INT NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data for testing
INSERT INTO reservations (guest_name, room_number, contact_number) VALUES 
('John Doe', 101, '555-1234'),
('Jane Smith', 102, '555-5678'),
('Bob Johnson', 103, '555-9012');

-- Show the table structure
DESCRIBE reservations;

-- Display sample data
SELECT * FROM reservations;