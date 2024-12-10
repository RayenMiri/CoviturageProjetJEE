package com.example.projetglsi3.Service;
import com.example.projetglsi3.Model.Reservation;
import com.example.projetglsi3.Model.Ride;
import com.example.projetglsi3.Model.User;
import com.example.projetglsi3.Repository.ReservationRepo;
import com.example.projetglsi3.Repository.RideRepository;
import com.example.projetglsi3.Repository.userRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.*;

@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Service
public class ReservationServiceImpl implements ReservationIService {
    private final RideService rideService;
    ReservationRepo resRep;
    userRepository userRepo;
    RideRepository rideRep;

    @Override
    public ResponseEntity<?>getReservationByUser(Long idUser){
        try {
            List<Reservation> reservations = resRep.findByUserId(idUser);
            if (reservations.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No reservations found for user with ID " + idUser);
            }
            return ResponseEntity.ok(reservations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }
    @Override
    public void updateAvailableSeats(Long IdRide, int nbReserv) {
        System.out.println("seats test");
        Ride ride = rideRep.findById(IdRide).orElseThrow(() -> new RuntimeException("Ride not found"));
        int nbSeats = ride.getAvailableSeats();
        if (nbSeats >= nbReserv) {
            nbSeats -= nbReserv;
            ride.setAvailableSeats(nbSeats); // Update the entity
            rideRep.save(ride); // Persist the change
        } else {
            throw new IllegalArgumentException("Not enough available seats");
        }
    }
    @Override
    public void updateAvailableSeats2(Long idRide, int nbReserv) {
        Ride ride = rideRep.findById(idRide).orElseThrow(() -> new RuntimeException("Ride not found"));
        int nbSeats = ride.getAvailableSeats();

        // Add the cancelled seats back to the available seats
        nbSeats += nbReserv;

        ride.setAvailableSeats(nbSeats); // Update the entity
        rideRep.save(ride); // Persist the change
    }
    @Override
    public ResponseEntity<?> cancelReservation(Long idRide, Long idUser) {
        try {
            List<Reservation> resList = resRep.findByRideIdRideAndUserId(idRide, idUser);

            if (resList.isEmpty()) {
                throw new ReservationNotFoundException("No reservation found for this ride and user.");
            }
            if (resList.size() > 1) {
                throw new ReservationNotFoundException("Multiple reservations found for this ride and user.");
            }
            Reservation res = resList.get(0);
            int nbReservedSeats = res.getNbOfSeats();
            // Update reservation status and timestamp
            res.setStatus(Reservation.status.cancelled);
            res.setUpdatedAt(LocalDateTime.now());

            resRep.save(res);
            updateAvailableSeats2(idRide, nbReservedSeats);
            return ResponseEntity.ok("Reservation cancelled successfully.");
        } catch (ReservationNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request.");
        }
    }

    @Override
    public ResponseEntity<?> createReservation(Long idUser, Long idRide, int nbSeats) {
        try {
            System.out.println("Creating reservation...");

            // Find the user
            User user = userRepo.findById(idUser)
                    .orElseThrow(() -> new UserNotFoundException("User with ID " + idUser + " not found."));
            System.out.println("User found: " + user);

            // Find the ride
            Ride ride = rideRep.findById(idRide)
                    .orElseThrow(() -> new RideNotFoundException("Ride with ID " + idRide + " not found."));
            System.out.println("Ride found: " + ride);

            // Check if the user already has a reservation for this ride
            List<Reservation> existingReservations = resRep.findByRideIdRideAndUserId(idRide, idUser);
            if (!existingReservations.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("User already has a reservation for this ride.");
            }

            // Check if there are enough available seats
            if (ride.getAvailableSeats() < nbSeats) {
                throw new SeatsNotAvailableException("Requested seats " + nbSeats + " exceed available seats " + ride.getAvailableSeats());
            }

            // Log the available seats before updating
            System.out.println("Available seats before update: " + ride.getAvailableSeats());

            // Update the available seats on the ride
            int updatedSeats = ride.getAvailableSeats() - nbSeats;
            ride.setAvailableSeats(updatedSeats);
            rideRep.save(ride);

            // Log the available seats after update
            System.out.println("Available seats after update: " + updatedSeats);

            // Create a new reservation
            Reservation reservation = new Reservation();
            reservation.setUser(user);
            reservation.setRide(ride);
            reservation.setNbOfSeats(nbSeats);
            reservation.setStatus(Reservation.status.confirmed);
            reservation.setCreatedAt(LocalDateTime.now());
            reservation.setUpdatedAt(LocalDateTime.now());

            System.out.println("New reservation: " + reservation);

            resRep.save(reservation); // Save reservation
            System.out.println("Reservation saved!");

            // Return success response
            return ResponseEntity.ok(reservation);
        } catch (UserNotFoundException | RideNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (SeatsNotAvailableException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> getReservationById(Long id) {
        try {
            Reservation reservation = resRep.findById(id)
                    .orElseThrow(() -> new ReservationNotFoundException("Reservation with ID " + id + " not found."));
            return ResponseEntity.ok(reservation);
        } catch (ReservationNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> getReservationByRideId(Long idRide) {
        try {
            List<Reservation> reservations = resRep.findByRideIdRide(idRide);
            if (reservations.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No reservations found for ride with ID " + idRide);
            }
            return ResponseEntity.ok(reservations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }

//    @Override
//    public ResponseEntity<?> consultHistory(Long IdUser)
//    {
//        try {
//            // Fetch all reservations for the given user ID
//            List<Reservation> reservations = resRep.findByUserId(IdUser);
//
//            // If no reservations are found, return a not found response
//            if (reservations.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No reservations found for user with ID " + IdUser);
//            }
//
//            // Return the list of reservations
//            return ResponseEntity.ok(reservations);
//
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
//        }
//    }
    public static class UserNotFoundException extends RuntimeException {
        public UserNotFoundException(String message) {
            super(message);
        }
    }

    public static class RideNotFoundException extends RuntimeException {
        public RideNotFoundException(String message) {
            super(message);
        }
    }

    public static class SeatsNotAvailableException extends RuntimeException {
        public SeatsNotAvailableException(String message) {
            super(message);
        }

    }
    public static class ReservationNotFoundException extends RuntimeException {
        public ReservationNotFoundException(String message) {
            super(message);
        }
    }
}