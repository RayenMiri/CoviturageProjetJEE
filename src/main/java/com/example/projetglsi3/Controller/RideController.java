package com.example.projetglsi3.Controller;

import com.example.projetglsi3.Model.Ride;
import com.example.projetglsi3.Service.RideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@Controller
public class RideController {
    @Autowired
    RideService rideService;
    @GetMapping("/getAllRides")
    public List<Ride> getAllRides() {
        List<Ride> rides;
        rides = rideService.getAllRides();
        if(rides.isEmpty()){
            System.out.println("No rides found");
        }
        System.out.println("Fetched Rides: " + rides);
        return rides;
    }
}
