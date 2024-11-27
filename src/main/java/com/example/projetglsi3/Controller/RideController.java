package com.example.projetglsi3.Controller;

import com.example.projetglsi3.Model.Ride;
import com.example.projetglsi3.Service.RideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/rides")
public class RideController {

    @Autowired
    RideService rideService;

    @PostMapping("/createRide")
    public ResponseEntity<?> createRide(@RequestBody Ride ride) {
        return rideService.createRide(ride);
    }

    @GetMapping("/getAllRides")
    public ResponseEntity<List<Ride>> getAllRides() {
        ResponseEntity<List<Ride>> responseEntity = (ResponseEntity<List<Ride>>) rideService.getAllRides();
        List<Ride> rides = responseEntity.getBody();
        if (rides != null && rides.isEmpty()) {
            System.out.println("No rides found");
        }
        System.out.println("Fetched Rides: " + rides);
        return responseEntity;
    }

    @GetMapping("/getRideById/{id}")
    public ResponseEntity<?> getRideById(@PathVariable Long id) {
        ResponseEntity<?> ride = rideService.getRideById(id);
        if (ride == null) {
            System.out.println("Ride not found");
        }
        System.out.println("Fetched Ride: " + ride);
        return ride;
    }

    @GetMapping("/getRidesByDriverId/{driverId}")
    public ResponseEntity<List<Ride>> getRidesByDriverId(@PathVariable Long driverId) {
        ResponseEntity<List<Ride>> responseEntity = (ResponseEntity<List<Ride>>) rideService.getRidesByDriverId(driverId);
        List<Ride> rides = responseEntity.getBody();
        if (rides.isEmpty()) {
            System.out.println("No rides found");
        }
        System.out.println("Fetched Rides: " + rides);
        return responseEntity;
    }

    @PostMapping("/updateRide/{id}")
    public ResponseEntity<?> updateRide(@PathVariable Long id, @RequestBody Ride updatedRide) {
        ResponseEntity<?> ride = rideService.updateRide(id, updatedRide);
        if (ride == null) {
            System.out.println("Ride not found");
        }
        System.out.println("Updated Ride: " + ride);
        return ride;
    }

    @DeleteMapping("/deleteRide/{id}")
    public ResponseEntity<?> deleteRide(@PathVariable Long id) {
        rideService.deleteRide(id);
        System.out.println("Ride deleted");
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/updateAvailableSeats/{rideId}/{seatsBooked}")
    public ResponseEntity<?> updateAvailableSeats(@PathVariable Long rideId, @PathVariable int seatsBooked) {
        return rideService.updateAvailableSeats(rideId, seatsBooked);
    }

    @GetMapping("/searchRides")
    public ResponseEntity<List<Ride>> searchRides(@RequestParam String departurePoint, @RequestParam String destination, @RequestParam LocalDateTime departureTime, @RequestParam Double maxPrice) {
        ResponseEntity<List<Ride>> responseEntity = (ResponseEntity<List<Ride>>) rideService.searchRides(departurePoint, destination, departureTime, maxPrice);
        List<Ride> rides = responseEntity.getBody();
        if (rides.isEmpty()) {
            System.out.println("No rides found");
        }
        System.out.println("Fetched Rides: " + rides);
        return responseEntity;
    }
    @GetMapping("/searchByDepartLocation/{location}")
    public ResponseEntity<?> getRidesByDepartLocation(@PathVariable String location)
    {
        return rideService.getRidesByDepartLocation(location);
    }
    @GetMapping("/searchByDestination/{location}")
    public ResponseEntity<?> getRidesByDestination(@PathVariable String location)
    {
        return rideService.getRidesByDestination(location);
    }
}