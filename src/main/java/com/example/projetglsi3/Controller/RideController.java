package com.example.projetglsi3.Controller;

import com.example.projetglsi3.Model.Ride;
import com.example.projetglsi3.Service.RideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@RestController
<<<<<<< HEAD
@Controller
@RequestMapping("/api/rides")
=======
@RequestMapping("/api/rides")

>>>>>>> 046645e23fd3c564e81dfb5d9d203a24106e88ac
public class RideController {

    @Autowired
    RideService rideService;

    @PostMapping("/createRide")
    public Ride createRide(@RequestBody Ride ride) {
        Ride createdRide = rideService.createRide(ride);
        return rideService.createRide(createdRide);
    }

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
<<<<<<< HEAD
    @GetMapping("/{idRide}/seats")
    public int getAvailableSeats(@PathVariable Long idRide){
        int x=rideService.getAvailableSeats(idRide);
        if(x==0){System.out.println("No available seats found");}
        return x;
    }
=======

    @GetMapping("/getRideById/{id}")
    public Ride getRideById(@PathVariable Long id) {
        Ride ride = rideService.getRideById(id);
        if(ride == null){
            System.out.println("Ride not found");
        }
        System.out.println("Fetched Ride: " + ride);
        return ride;
    }

    @GetMapping("/getRidesByDriverId/{driverId}")
    public List<Ride> getRidesByDriverId(@PathVariable Long driverId) {
        List<Ride> rides = rideService.getRidesByDriverId(driverId);
        if(rides.isEmpty()){
            System.out.println("No rides found");
        }
        System.out.println("Fetched Rides: " + rides);
        return rides;
    }

>>>>>>> 046645e23fd3c564e81dfb5d9d203a24106e88ac
    @PostMapping("/updateRide/{id}")
    public Ride updateRide(@PathVariable Long id, @RequestBody Ride updatedRide) {
        Ride ride = rideService.updateRide(id, updatedRide);
        if(ride == null){
            System.out.println("Ride not found");
        }
        System.out.println("Updated Ride: " + ride);
        return ride;
    }
<<<<<<< HEAD
}
=======

    @DeleteMapping("/deleteRide/{id}")
    public void deleteRide(@PathVariable Long id) {
        rideService.deleteRide(id);
        System.out.println("Ride deleted");
    }

    @PostMapping("/updateAvailableSeats/{rideId}/{seatsBooked}")
    public ResponseEntity<?> updateAvailableSeats(@PathVariable Long rideId, @PathVariable int seatsBooked) {
        return rideService.updateAvailableSeats(rideId, seatsBooked);
    }

    @GetMapping("/searchRides")
    public List<Ride> searchRides(@RequestParam String departurePoint, @RequestParam String destination, @RequestParam LocalDateTime departureTime, @RequestParam Double maxPrice) {
        List<Ride> rides = rideService.searchRides(departurePoint, destination, departureTime, maxPrice);
        if(rides.isEmpty()){
            System.out.println("No rides found");
        }
        System.out.println("Fetched Rides: " + rides);
        return rides;
    }
}
>>>>>>> 046645e23fd3c564e81dfb5d9d203a24106e88ac
