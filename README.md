# CoviturageProjetJEE

## TODO: Entities to Create

1. User
    - Attributes: id, username, email, password, firstName, lastName, phoneNumber, role (driver/passenger), createdAt, updatedAt
    - Methods: register(), login(), updateProfile(), changePassword() najmou nzidou akther depend wel besoint mtaana mba3ed

2. Ride
    - Attributes: id, driverId, departureLocation, destination, departureDateTime, availableSeats, pricePerSeat, comments, restrictions, createdAt, updatedAt
    - Methods: createRide(), updateRide(), cancelRide(), getRideDetails()

3. Reservation
    - Attributes: id, rideId, passengerId, numberOfSeats, status (confirmed, cancelled), createdAt, updatedAt
    - Methods: makeReservation(), cancelReservation(), updateReservation(), getReservationDetails()

4. Review
    - Attributes: id, reviewerId, revieweeId, rideId, rating, comment, createdAt
    - Methods: createReview(), updateReview(), deleteReview(), getReviewsForUser()

5. Location (taw bl google maps njibou list fyha les locatinos lkol kan habyna ngedouha)
    - Attributes: id, latitude, longitude, address, city, country
    - Methods: createLocation(), updateLocation(), getLocationDetails()

6. Notification
    - Attributes: id, userId, message, type (email, in-app), status (read, unread), createdAt
    - Methods: createNotification(), markAsRead(), deleteNotification()

7. Payment (idha kamlna bekry w 7abyna naamelou payment system)
    - Attributes: id, reservationId, amount, status (pending, completed, refunded), paymentMethod, transactionId, createdAt
    - Methods: processPayment(), refundPayment(), getPaymentDetails()

8. Comment (les commentaire mtaa les postes ba3d kol trajet normalement)
    - Attributes: id, senderId, receiverId, content, createdAt
    - Methods: sendComment(), deleteComment()



Remember to implement appropriate relationships between these entities, such as:
    manysh sure b les cardinalités taw ntfahmou fyhom mara jaya 
- One-to-Many: User to Ride (a user can offer multiple rides)
- Many-to-Many: User to Ride (through Reservation, as many users can book many rides)
- One-to-Many: User to Review (a user can have multiple reviews)
- One-to-One: Ride to Location (for departure and destination)