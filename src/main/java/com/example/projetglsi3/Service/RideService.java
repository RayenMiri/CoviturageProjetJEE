package com.example.projetglsi3.Service;

import com.example.projetglsi3.Model.Ride;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public interface RideService {
    ResponseEntity<?> createRide(Ride ride);
    ResponseEntity<?> getRideById(Long id);
    ResponseEntity<?> updateRide(Long id, Ride updatedRide);
    ResponseEntity<?> deleteRide(Long id);
    ResponseEntity<?> getRidesByDriverId(Long driverId);
    ResponseEntity<?> getAllRides();
    ResponseEntity<?> searchRides(String departurePoint, String destination, LocalDateTime departureTime, Double maxPrice);
    ResponseEntity<?> updateAvailableSeats(Long rideId, int seatsBooked);
    ResponseEntity<?> getRidesByDepartLocation(String location);
    ResponseEntity<?> getRidesByDestination(String location);

}
