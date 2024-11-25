package com.example.projetglsi3.Service;

import com.example.projetglsi3.Model.Ride;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RideService {
    List<Ride> getAllRides();
    public int getAvailableSeats(Long idRide);
    Ride updateRide(Long id, Ride updatedRide);
}
