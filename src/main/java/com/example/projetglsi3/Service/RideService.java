package com.example.projetglsi3.Service;

import com.example.projetglsi3.Model.Ride;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public interface RideService {
    Ride createRide(Ride ride);
    Ride getRideById(Long id);
    Ride updateRide(Long id, Ride updatedRide);
    void deleteRide(Long id);
    List<Ride> getRidesByDriverId(Long driverId);
    List<Ride> getAllRides();
    List<Ride> searchRides(String departurePoint, String destination, LocalDateTime departureTime, Double maxPrice);
    ResponseEntity<?> updateAvailableSeats(Long rideId, int seatsBooked);
}