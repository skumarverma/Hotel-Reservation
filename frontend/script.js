document.getElementById('reservationForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const guestName = document.getElementById('guestName').value;
    const roomNumber = document.getElementById('roomNumber').value;
    const contactNumber = document.getElementById('contactNumber').value;
  
    const response = await fetch('http://localhost:8080/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        guestName,
        roomNumber,
        contactNumber
      })
    });
  
    const result = await response.text();
    alert(result);
    getReservations();
  });
  
  async function getReservations() {
    const response = await fetch('http://localhost:8080/api/reservations');
    const reservations = await response.json();
  
    const container = document.getElementById('reservationList');
    container.innerHTML = '';
    reservations.forEach(res => {
      container.innerHTML += `
        <div>
          <strong>${res.guestName}</strong> - Room ${res.roomNumber} - ${res.contactNumber}
        </div>
      `;
    });
  }
  