package com.example.projetglsi3.Service;

import com.example.projetglsi3.Model.Ride;
import com.example.projetglsi3.Repository.RideRepo;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@FieldDefaults (level = AccessLevel.PRIVATE)
@Service
public class RideServiceImpl implements RideService {
    RideRepo rideRepo;
    @Override
    public List<Ride> getAllRides()
    {
        return rideRepo.findAll();
    }

    @Override
    public int getAvailableSeats(Long idRide){
       Ride ride= rideRepo.findById(idRide)
                .orElseThrow(() -> new RuntimeException("Ride not found"));
        return ride.getAvailableSeats();
    }
    @Override
    public Ride updateRide(Long id, Ride updatedRide) {
        Optional<Ride> existingRide = rideRepo.findById(id);
        if (existingRide.isPresent()) {
            Ride ride = existingRide.get();
            ride.setDepartureLocation(updatedRide.getDepartureLocation());
            ride.setDestination(updatedRide.getDestination());
            ride.setDepartureDateTime(updatedRide.getDepartureDateTime());
            ride.setAvailableSeats(updatedRide.getAvailableSeats());
            ride.setPricePerSeat(updatedRide.getPricePerSeat());

            return rideRepo.save(ride);
        }
        return null;
    }
}
