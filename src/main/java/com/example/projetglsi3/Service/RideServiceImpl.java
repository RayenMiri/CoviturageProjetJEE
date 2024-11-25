package com.example.projetglsi3.Service;

import com.example.projetglsi3.Model.Ride;
import com.example.projetglsi3.Repository.RideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RideServiceImpl implements RideService {

    @Autowired
    private RideRepository rideRepository;

    @Override
    public Ride createRide(Ride ride) {
        return rideRepository.save(ride);
    }

    @Override
    public Ride getRideById(Long id) {
        return rideRepository.findById(id).orElse(null);
    }

    @Override
    public Ride updateRide(Long id, Ride updatedRide) {
        Optional<Ride> existingRide = rideRepository.findById(id);
        if (existingRide.isPresent()) {
            Ride ride = existingRide.get();
            ride.setDepartureLocation(updatedRide.getDepartureLocation());
            ride.setDestination(updatedRide.getDestination());
            ride.setDepartureDateTime(updatedRide.getDepartureDateTime());
            ride.setAvailableSeats(updatedRide.getAvailableSeats());
            ride.setPricePerSeat(updatedRide.getPricePerSeat());

            return rideRepository.save(ride);
        }
        return null;
    }

    @Override
    public void deleteRide(Long id) {
        rideRepository.deleteById(id);
    }

    @Override
    public List<Ride> getRidesByDriverId(Long driverId) {
        return rideRepository.findByDriverId(driverId);
    }

    @Override
    public List<Ride> getAllRides() {
        return rideRepository.findAll();
    }

    @Override
    public List<Ride> searchRides(String departureLocation, String destination, LocalDateTime departureTime, Double maxPrice) {
        return rideRepository.findByDepartureLocationAndDestinationAndDepartureDateTimeAfterAndPricePerSeatLessThanEqual(
                departureLocation, destination, departureTime, maxPrice);
    }

    @Override
    public ResponseEntity<?> updateAvailableSeats(Long rideId, int seatsBooked) {
        Optional<Ride> optionalRide = rideRepository.findById(rideId);
        if (optionalRide.isPresent()) {
            Ride ride = optionalRide.get();
            int availableSeats = ride.getAvailableSeats();
            if (availableSeats >= seatsBooked) {
                ride.setAvailableSeats(availableSeats - seatsBooked);
                rideRepository.save(ride);
                return ResponseEntity.ok().build();
            }
        }
        return ResponseEntity.badRequest().build();
    }
}