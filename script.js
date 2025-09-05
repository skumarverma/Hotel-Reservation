// Hotel Reservation System Frontend JavaScript

class HotelReservationSystem {
    constructor() {
        this.reservations = [];
        this.init();
        this.loadSampleData();
    }

    init() {
        this.setupNavigation();
        this.setupForms();
        this.setupEventListeners();
    }

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const sections = document.querySelectorAll('.section');

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetSection = button.getAttribute('data-section');
                
                // Remove active class from all buttons and sections
                navButtons.forEach(btn => btn.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked button and corresponding section
                button.classList.add('active');
                document.getElementById(targetSection).classList.add('active');
            });
        });
    }

    setupForms() {
        // Reserve Room Form
        document.getElementById('reserveForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.reserveRoom();
        });

        // Search Form
        document.getElementById('searchForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.searchRoom();
        });

        // Update Form
        document.getElementById('updateForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateReservation();
        });

        // Delete Form
        document.getElementById('deleteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.deleteReservation();
        });
    }

    setupEventListeners() {
        // Refresh button
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.displayReservations();
            this.showMessage('Reservations refreshed successfully!', 'success');
        });
    }

    loadSampleData() {
        // Load some sample data for demonstration
        this.reservations = [
            {
                id: 1,
                guestName: 'John Doe',
                roomNumber: 101,
                contactNumber: '555-1234',
                reservationDate: new Date().toISOString().slice(0, 19).replace('T', ' ')
            },
            {
                id: 2,
                guestName: 'Jane Smith',
                roomNumber: 102,
                contactNumber: '555-5678',
                reservationDate: new Date(Date.now() - 86400000).toISOString().slice(0, 19).replace('T', ' ')
            },
            {
                id: 3,
                guestName: 'Bob Johnson',
                roomNumber: 103,
                contactNumber: '555-9012',
                reservationDate: new Date(Date.now() - 172800000).toISOString().slice(0, 19).replace('T', ' ')
            }
        ];
        this.displayReservations();
    }

    reserveRoom() {
        const form = document.getElementById('reserveForm');
        const formData = new FormData(form);
        
        const guestName = formData.get('guestName').trim();
        const roomNumber = parseInt(formData.get('roomNumber'));
        const contactNumber = formData.get('contactNumber').trim();

        // Validation
        if (!guestName || !roomNumber || !contactNumber) {
            this.showMessage('Please fill in all fields!', 'error');
            return;
        }

        // Check if room is already reserved
        const existingReservation = this.reservations.find(r => r.roomNumber === roomNumber);
        if (existingReservation) {
            this.showMessage(`Room ${roomNumber} is already reserved by ${existingReservation.guestName}!`, 'error');
            return;
        }

        // Create new reservation
        const newReservation = {
            id: this.getNextId(),
            guestName: guestName,
            roomNumber: roomNumber,
            contactNumber: contactNumber,
            reservationDate: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };

        this.reservations.push(newReservation);
        this.showMessage(`Room ${roomNumber} reserved successfully for ${guestName}!`, 'success');
        
        // Clear form
        form.reset();
        
        // Update display if on view section
        this.displayReservations();
    }

    searchRoom() {
        const guestName = document.getElementById('searchGuestName').value.trim();
        const resultContainer = document.getElementById('searchResult');
        
        if (!guestName) {
            this.showMessage('Please enter a guest name!', 'error');
            return;
        }

        const reservation = this.reservations.find(r => 
            r.guestName.toLowerCase() === guestName.toLowerCase()
        );

        if (reservation) {
            resultContainer.innerHTML = `
                <div class="success">
                    <h3><i class="fas fa-check-circle"></i> Reservation Found</h3>
                    <p><strong>Guest Name:</strong> ${reservation.guestName}</p>
                    <p><strong>Room Number:</strong> ${reservation.roomNumber}</p>
                    <p><strong>Contact Number:</strong> ${reservation.contactNumber}</p>
                    <p><strong>Reservation Date:</strong> ${reservation.reservationDate}</p>
                </div>
            `;
            resultContainer.className = 'result-container success';
        } else {
            resultContainer.innerHTML = `
                <div class="error">
                    <h3><i class="fas fa-times-circle"></i> No Reservation Found</h3>
                    <p>No reservation found for guest: <strong>${guestName}</strong></p>
                </div>
            `;
            resultContainer.className = 'result-container error';
        }
    }

    updateReservation() {
        const form = document.getElementById('updateForm');
        const formData = new FormData(form);
        
        const reservationId = parseInt(formData.get('updateReservationId'));
        const newGuestName = formData.get('updateGuestName').trim();
        const newRoomNumber = parseInt(formData.get('updateRoomNumber'));
        const newContactNumber = formData.get('updateContactNumber').trim();

        // Validation
        if (!reservationId || !newGuestName || !newRoomNumber || !newContactNumber) {
            this.showMessage('Please fill in all fields!', 'error');
            return;
        }

        // Find reservation
        const reservationIndex = this.reservations.findIndex(r => r.id === reservationId);
        
        if (reservationIndex === -1) {
            this.showMessage(`Reservation ID ${reservationId} not found!`, 'error');
            return;
        }

        // Check if new room number conflicts with existing reservations (excluding current one)
        const conflictingReservation = this.reservations.find(r => 
            r.roomNumber === newRoomNumber && r.id !== reservationId
        );
        
        if (conflictingReservation) {
            this.showMessage(`Room ${newRoomNumber} is already reserved by ${conflictingReservation.guestName}!`, 'error');
            return;
        }

        // Update reservation
        this.reservations[reservationIndex] = {
            ...this.reservations[reservationIndex],
            guestName: newGuestName,
            roomNumber: newRoomNumber,
            contactNumber: newContactNumber
        };

        this.showMessage(`Reservation ID ${reservationId} updated successfully!`, 'success');
        
        // Clear form
        form.reset();
        
        // Update display
        this.displayReservations();
    }

    deleteReservation() {
        const reservationId = parseInt(document.getElementById('deleteReservationId').value);
        
        if (!reservationId) {
            this.showMessage('Please enter a reservation ID!', 'error');
            return;
        }

        const reservationIndex = this.reservations.findIndex(r => r.id === reservationId);
        
        if (reservationIndex === -1) {
            this.showMessage(`Reservation ID ${reservationId} not found!`, 'error');
            return;
        }

        // Confirm deletion
        const reservation = this.reservations[reservationIndex];
        if (confirm(`Are you sure you want to delete the reservation for ${reservation.guestName} in room ${reservation.roomNumber}?`)) {
            this.reservations.splice(reservationIndex, 1);
            this.showMessage(`Reservation ID ${reservationId} deleted successfully!`, 'success');
            
            // Clear form
            document.getElementById('deleteForm').reset();
            
            // Update display
            this.displayReservations();
        }
    }

    displayReservations() {
        const tbody = document.getElementById('reservationsBody');
        
        if (this.reservations.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; color: #666; font-style: italic;">
                        No reservations found
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = this.reservations.map(reservation => `
            <tr>
                <td>${reservation.id}</td>
                <td>${reservation.guestName}</td>
                <td>${reservation.roomNumber}</td>
                <td>${reservation.contactNumber}</td>
                <td>${reservation.reservationDate}</td>
            </tr>
        `).join('');
    }

    getNextId() {
        return this.reservations.length > 0 
            ? Math.max(...this.reservations.map(r => r.id)) + 1 
            : 1;
    }

    showMessage(message, type = 'info') {
        const messageContainer = document.getElementById('messageContainer');
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}"></i>
            ${message}
        `;
        
        messageContainer.appendChild(messageElement);
        
        // Auto remove message after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, 5000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HotelReservationSystem();
});

// Additional utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

function validatePhoneNumber(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

function validateRoomNumber(roomNumber) {
    return roomNumber > 0 && roomNumber <= 9999;
}