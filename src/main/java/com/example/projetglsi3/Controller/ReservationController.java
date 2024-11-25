package com.example.projetglsi3.Controller;
import com.example.projetglsi3.Auth.Security.CUserDetailsService;
import com.example.projetglsi3.Model.Reservation;
import com.example.projetglsi3.Model.Ride;
import com.example.projetglsi3.Model.User;
import com.example.projetglsi3.Service.ReservationIService;
import com.example.projetglsi3.Service.RideService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reservation")

public class ReservationController {

    @Autowired

    ReservationIService resService;
    RideService rideService;
    CUserDetailsService userr;
    @PostMapping("/res/{idUser}/{idRide}/{nbSeats}")

//    public ResponseEntity<Reservation> addRes(@RequestBody Reservation reservation,@PathVariable Long idUser,@PathVariable Long idRide){
//    public ResponseEntity<Reservation> addRes(@RequestBody Reservation reservation,@PathVariable Long idRide){
//        Ride ride = rideService.getRideById(idRide);
//        return resService.addRes(reservation, idRide);
//
//    }
    @GetMapping("/allRes")
    public List<Reservation> getAllRes() {
        List<Reservation> reservations = resService.getAllRes();  // Call service method$
        if(reservations.isEmpty()){
            System.out.println("No reservations found");
        }
        System.out.println("Freservations : " + reservations);
        return reservations;

    }
//    @PostMapping("/reserve/{idUser}/{idRide}/{nbSeats}")
//    public Reservation makeRes(@PathVariable Long idUser, @PathVariable Long idRide, @PathVariable int nbSeats) {
//        if(res.isEmpty()){
//            System.out.println("No rides found");
//        }
//        return resService.makeRes(idUser, idRide, nbSeats);
//    }
//    public Reservation makeRes(@RequestBody Reservation reservation, @PathVariable Long idUser, @PathVariable Long idRide ,@PathVariable int nbSeats) {
//        return resService.makeRes(idUser, idRide, nbSeats);
//    }

    @PutMapping("/cancel/{idRes}")
    public ResponseEntity<String> annulerRes(@PathVariable Long idRes)
    {
        try {
            String msg= resService.annulerRes(idRes);
            return ResponseEntity.ok(msg);
        } catch (RuntimeException e) {
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("Réservation non trouvée");
        }
    }

}
