<<<<<<< HEAD
## Getting Started

Welcome to the VS Code Java world. Here is a guideline to help you get started to write Java code in Visual Studio Code.

## Folder Structure

The workspace contains two folders by default, where:

- `src`: the folder to maintain sources
- `lib`: the folder to maintain dependencies

Meanwhile, the compiled output files will be generated in the `bin` folder by default.

> If you want to customize the folder structure, open `.vscode/settings.json` and update the related settings there.

## Dependency Management

The `JAVA PROJECTS` view allows you to manage your dependencies. More details can be found [here](https://github.com/microsoft/vscode-java-dependency#manage-dependencies).
=======
# Hotel Reservation System

A complete hotel reservation management system with both backend (Java + MySQL) and frontend (HTML/CSS/JavaScript) components.

## Features

- **Reserve a room** - Add new guest reservations
- **View all reservations** - Display current reservations in a responsive table
- **Find room by guest** - Search for room assignments by guest name
- **Update existing reservations** - Modify reservation details
- **Delete reservations** - Remove reservations with confirmation
- **Modern web interface** - Responsive design with intuitive navigation
- **Real-time validation** - Form validation and error handling

## Components

### Backend (Java + MySQL)
- **HotelReservationSystem.java** - Main Java application with database connectivity
- **setup_database.sql** - Database schema and sample data

### Frontend (Web Interface)
- **index.html** - Main web interface
- **styles.css** - Modern responsive styling
- **script.js** - Interactive functionality and form handling

## Prerequisites

### For Backend:
1. **Java Development Kit (JDK)** - Version 8 or higher
2. **MySQL Server** - Running on localhost:3306
3. **MySQL JDBC Driver** - mysql-connector-java

### For Frontend:
1. **Web Browser** - Any modern browser (Chrome, Firefox, Safari, Edge)
2. **Local Web Server** (optional) - For better development experience

## Setup Instructions

### 1. Database Setup

First, make sure MySQL is running on your system. Then execute the database setup script:

```bash
mysql -u root -p < setup_database.sql
```

Or manually run the SQL commands in `setup_database.sql` using MySQL Workbench or command line.

### 2. Download MySQL JDBC Driver

Download the MySQL Connector/J from the official MySQL website:
- Visit: https://dev.mysql.com/downloads/connector/j/
- Download the latest version
- Extract the JAR file (mysql-connector-java-x.x.x.jar)

### 3. Compile and Run

#### Option 1: Using Command Line with JDBC Driver

```bash
# Compile with JDBC driver in classpath
javac -cp ".:mysql-connector-java-8.0.33.jar" HotelReservationSystem.java

# Run with JDBC driver in classpath
java -cp ".:mysql-connector-java-8.0.33.jar" HotelReservationSystem
```

#### Option 2: Using IDE

1. Add the MySQL JDBC driver JAR to your project's classpath
2. Compile and run `HotelReservationSystem.java`

## Configuration

Before running the application, update the database credentials in `HotelReservationSystem.java`:

```java
static final String url = "jdbc:mysql://localhost:3306/hotel_db";
static final String user = "root";
static final String password = "your_password_here";
```

## Database Schema

The application uses a single table called `reservations`:

```sql
CREATE TABLE reservations (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    guest_name VARCHAR(100) NOT NULL,
    room_number INT NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Usage

### Backend (Console Application)
1. Run the Java application
2. Choose from the menu options:
   - **1**: Reserve a new room
   - **2**: View all current reservations
   - **3**: Get room number by guest name
   - **4**: Update an existing reservation
   - **5**: Delete a reservation
   - **0**: Exit the system

### Frontend (Web Interface)
1. Open `index.html` in your web browser
2. Use the navigation buttons to access different features:
   - **Reserve Room**: Add new reservations with form validation
   - **View Reservations**: See all current reservations in a table
   - **Find Room**: Search for room assignments by guest name
   - **Update Reservation**: Modify existing reservation details
   - **Delete Reservation**: Remove reservations with confirmation dialogs

### Running the Web Interface

**Option 1: Direct File Access**
```bash
# Simply open the HTML file in your browser
open index.html  # macOS
# or double-click index.html in file explorer
```

**Option 2: Local Web Server (Recommended)**
```bash
# Using Python (if installed)
python3 -m http.server 8000
# Then visit: http://localhost:8000

# Using Node.js (if installed)
npx serve .
# Or install globally: npm install -g serve
```

## Troubleshooting

### Common Issues

1. **MySQL Connection Error**: 
   - Ensure MySQL server is running
   - Check username/password credentials
   - Verify database name exists

2. **ClassNotFoundException**: 
   - Make sure MySQL JDBC driver is in the classpath
   - Download the correct version of mysql-connector-java

3. **Access Denied Error**:
   - Check MySQL user permissions
   - Ensure the user has access to the hotel_db database

## Dependencies

- Java SQL API (java.sql.*)
- Java Utility Scanner (java.util.Scanner)
- MySQL Connector/J JDBC Driver
>>>>>>> 26f7801 (Initial project upload from VS Code)
