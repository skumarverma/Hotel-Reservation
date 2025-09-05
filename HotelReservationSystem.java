import java.sql.*;
import java.util.Scanner;

public class HotelReservationSystem {
    static final String url = "jdbc:mysql://localhost:3306/hotel_db";
    static final String user = "root";
    static final String password = "23acbvkSs@8650"; // update this if your root has a password

    public static void main(String[] args) {
        Connection connection = null;
        Scanner scanner = new Scanner(System.in);

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(url, user, password);
            System.out.println("Connected to MySQL successfully!");

            while (true) {
                System.out.println();
                System.out.println("HOTEL MANAGEMENT SYSTEM");
                System.out.println("1. Reserve a Room");
                System.out.println("2. View Reservation");
                System.out.println("3. Get Room Number");
                System.out.println("4. Update Reservation");
                System.out.println("5. Delete Reservation");
                System.out.println("0. Exit");
                System.out.print("Choose an Option: ");

                int choice = scanner.nextInt();
                scanner.nextLine(); // consume newline

                switch (choice) {
                    case 0:
                        System.out.println("Exiting the system...");
                        return;
                    case 1:
                        reserveRoom(connection, scanner);
                        break;
                    case 2:
                        viewReservations(connection);
                        break;
                    case 3:
                        getRoomNumber(connection, scanner);
                        break;
                    case 4:
                        updateReservation(connection, scanner);
                        break;
                    case 5:
                        deleteReservation(connection, scanner);
                        break;
                    default:
                        System.out.println("Invalid Option. Try Again.");
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (connection != null && !connection.isClosed()) {
                    connection.close();
                    System.out.println("Database connection closed.");
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
            scanner.close();
        }
    }

    public static void reserveRoom(Connection conn, Scanner scanner) throws SQLException {
        System.out.print("Enter Guest Name: ");
        String guestName = scanner.nextLine();

        System.out.print("Enter Room Number: ");
        int roomNumber = scanner.nextInt();
        scanner.nextLine();

        System.out.print("Enter Contact Number: ");
        String contactNumber = scanner.nextLine();

        String sql = "INSERT INTO reservations (guest_name, room_number, contact_number) VALUES (?, ?, ?)";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, guestName);
            stmt.setInt(2, roomNumber);
            stmt.setString(3, contactNumber);
            int rowsInserted = stmt.executeUpdate();
            if (rowsInserted > 0) {
                System.out.println("Room reserved successfully!");
            }
        }
    }

    public static void viewReservations(Connection conn) throws SQLException {
        String sql = "SELECT * FROM reservations";
        try (Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

               System.out.println("Current Reservation: ");

               System.out.println("+-----------------+----------------+-------------------+------------------+---------------------+");
               System.out.println("|  Reservation Id | Guest Name     | Room Number       |  Contact Number  | Reservation Date    |");
               System.out.println("+-----------------+----------------+-------------------+------------------+---------------------+");
            while (rs.next()) {
    int reservationId = rs.getInt("reservation_id");
    String guestName = rs.getString("guest_name");
    int roomNumber = rs.getInt("room_number");
    String contactNumber = rs.getString("contact_number");
    String reservationDate = rs.getString("reservation_date");

    System.out.printf("| %-16d| %-15s| %-18d| %-17s| %-20s|\n",
                      reservationId, guestName, roomNumber, contactNumber, reservationDate);

    // Add newline after each row border
    System.out.println("+-----------------+----------------+-------------------+------------------+---------------------+");
}
        }
    }

    public static void getRoomNumber(Connection conn, Scanner scanner) throws SQLException {
        System.out.print("Enter Guest Name: ");
        String guestName = scanner.nextLine();

        String sql = "SELECT room_number FROM reservations WHERE guest_name = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, guestName);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                System.out.println("Room Number: " + rs.getInt("room_number"));
            } else {
                System.out.println("No reservation found for " + guestName);
            }
        }
    }

    public static void updateReservation(Connection conn, Scanner scanner) throws SQLException {
        System.out.print("Enter Reservation ID to update: ");
        int id = scanner.nextInt();
        scanner.nextLine();

        System.out.print("Enter new Guest Name: ");
        String newName = scanner.nextLine();

        System.out.print("Enter new Room Number: ");
        int newRoom = scanner.nextInt();
        scanner.nextLine();

        System.out.print("Enter new Contact Number: ");
        String newContact = scanner.nextLine();

        String sql = "UPDATE reservations SET guest_name = ?, room_number = ?, contact_number = ? WHERE reservation_id = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, newName);
            stmt.setInt(2, newRoom);
            stmt.setString(3, newContact);
            stmt.setInt(4, id);

            int rowsUpdated = stmt.executeUpdate();
            if (rowsUpdated > 0) {
                System.out.println("Reservation updated successfully.");
            } else {
                System.out.println("Reservation ID not found.");
            }
        }
    }

    public static void deleteReservation(Connection conn, Scanner scanner) throws SQLException {
        System.out.print("Enter Reservation ID to delete: ");
        int id = scanner.nextInt();
        scanner.nextLine();

        String sql = "DELETE FROM reservations WHERE reservation_id = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            int rowsDeleted = stmt.executeUpdate();
            if (rowsDeleted > 0) {
                System.out.println("Reservation deleted successfully.");
            } else {
                System.out.println("Reservation ID not found.");
            }
        }
    }
}