package com.example.projetglsi3.Controller;

import com.example.projetglsi3.Model.Ride;
import com.example.projetglsi3.Service.RideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@Controller
@RequestMapping("/api/rides")
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
    @GetMapping("/{idRide}/seats")
    public int getAvailableSeats(@PathVariable Long idRide){
        int x=rideService.getAvailableSeats(idRide);
        if(x==0){System.out.println("No available seats found");}
        return x;
    }
    @PostMapping("/updateRide/{id}")
    public Ride updateRide(@PathVariable Long id, @RequestBody Ride updatedRide) {
        Ride ride = rideService.updateRide(id, updatedRide);
        if(ride == null){
            System.out.println("Ride not found");
        }
        System.out.println("Updated Ride: " + ride);
        return ride;
    }
}
