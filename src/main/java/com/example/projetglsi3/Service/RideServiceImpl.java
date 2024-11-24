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

@AllArgsConstructor
@FieldDefaults (level = AccessLevel.PRIVATE)
@Service
public class RideServiceImpl implements RideService {
    RideRepo rideRepo;
    @Override
    public List<Ride> getAllRides(){
        return rideRepo.findAll();
    }
}
