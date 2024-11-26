package com.example.projetglsi3.Service;

import com.example.projetglsi3.Model.Ride;
import com.example.projetglsi3.Repository.RideRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RideServiceImpl implements RideService {

    RideRepository rideRepository;

    @Override
    public ResponseEntity<?> createRide(Ride ride) {
        try {
            Ride newRide = rideRepository.save(ride);
            return ResponseEntity.status(HttpStatus.CREATED).body(newRide);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating ride: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> getRideById(Long id) {
        try {
            Ride ride = rideRepository.findById(id)
                    .orElseThrow(() -> new RideNotFoundException("Ride with ID " + id + " not found."));
            return ResponseEntity.ok(ride);
        } catch (RideNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> updateRide(Long id, Ride updatedRide) {
        try {
            Ride ride = rideRepository.findById(id)
                    .orElseThrow(() -> new RideNotFoundException("Ride with ID " + id + " not found."));

            ride.setDepartureLocation(updatedRide.getDepartureLocation());
            ride.setDestination(updatedRide.getDestination());
            ride.setDepartureDateTime(updatedRide.getDepartureDateTime());
            ride.setAvailableSeats(updatedRide.getAvailableSeats());
            ride.setPricePerSeat(updatedRide.getPricePerSeat());

            Ride savedRide = rideRepository.save(ride);
            return ResponseEntity.ok(savedRide);
        } catch (RideNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> deleteRide(Long id) {
        try {
            Ride ride = rideRepository.findById(id)
                    .orElseThrow(() -> new RideNotFoundException("Ride with ID " + id + " not found."));
            rideRepository.deleteById(id);
            return ResponseEntity.ok("Ride deleted successfully.");
        } catch (RideNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> getRidesByDriverId(Long driverId) {
        try {
            List<Ride> rides = rideRepository.findByDriverId(driverId);
            return ResponseEntity.ok(rides);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching rides for driver: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> getAllRides() {
        try {
            List<Ride> rides = rideRepository.findAll();
            return ResponseEntity.ok(rides);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching all rides: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> searchRides(String departureLocation, String destination, LocalDateTime departureTime, Double maxPrice) {
        try {
            List<Ride> rides = rideRepository.findByDepartureLocationAndDestinationAndDepartureDateTimeAfterAndPricePerSeatLessThanEqual(
                    departureLocation, destination, departureTime, maxPrice);
            return ResponseEntity.ok(rides);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error searching for rides: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> updateAvailableSeats(Long rideId, int seatsBooked) {
        try {
            Ride ride = rideRepository.findById(rideId)
                    .orElseThrow(() -> new RideNotFoundException("Ride with ID " + rideId + " not found."));

            if (ride.getAvailableSeats() < seatsBooked) {
                throw new InsufficientSeatsException("Not enough available seats for the booking.");
            }

            ride.setAvailableSeats(ride.getAvailableSeats() - seatsBooked);
            rideRepository.save(ride);
            return ResponseEntity.ok("Available seats updated successfully.");
        } catch (RideNotFoundException | InsufficientSeatsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    public static class RideNotFoundException extends RuntimeException {
        public RideNotFoundException(String message) {
            super(message);
        }
    }

    public static class InsufficientSeatsException extends RuntimeException {
        public InsufficientSeatsException(String message) {
            super(message);
        }
    }

}
