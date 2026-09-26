async function testBooking() {
  const bookingPayload = {
    customerName: 'Karthik Raja',
    phone: '9842145678',
    email: 'karthik@example.com',
    travelDate: '2026-10-15',
    passengers: 4,
    packageSlug: 'local-tour',
    packageName: 'LOCAL TOUR',
    vehicleType: 'Sedan',
    pickupLocation: 'Kodaikanal Bus Stand',
    dropLocation: 'Fern Hill Hotel',
    stayRequired: false,
    calculatedPrice: 2500,
    pricingMode: 'OFF_SEASON'
  };

  const res = await fetch('http://localhost:3000/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingPayload)
  });

  const data = await res.json();
  console.log('Status:', res.status);
  console.log('Created Booking Response:', data);
}

testBooking();
