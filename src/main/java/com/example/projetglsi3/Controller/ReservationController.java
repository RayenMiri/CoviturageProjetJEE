package com.example.projetglsi3.Controller;
import com.example.projetglsi3.Service.ReservationIService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@Controller

@RequestMapping("/api/reservation")

public class ReservationController {

    @Autowired
    ReservationIService resService;

    @PostMapping("/createReservation/{idUser}/{idRide}/{nbSeats}")
    public ResponseEntity<?> createReservation(@PathVariable Long idUser, @PathVariable Long idRide , @PathVariable int nbSeats) {
        return resService.createReservation(idUser, idRide, nbSeats);
    }

    @PutMapping("/cancelReservation/{idRide}/{idUser}")
    public ResponseEntity<?> cancelReservation(
            @PathVariable Long idRide,
            @PathVariable Long idUser) {
        try {
            return resService.cancelReservation(idRide, idUser); // Directly return the response from service
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservation not found");
        }
    }

    @GetMapping("/getReservationByUserId/{IdUser}")
    public ResponseEntity<?> getReservationByUser(@PathVariable Long IdUser){
        return resService.getReservationByUser(IdUser);
    }

    @GetMapping("/getReservationByUserId/{resId}")
    public ResponseEntity<?> getReservationById(@PathVariable Long resId){
        return resService.getReservationById(resId);
    }

    @GetMapping("/getReservationByRideId/{rideId}")
    public ResponseEntity<?> getReservationByRideId(@PathVariable Long rideId){
        return resService.getReservationByRideId(rideId);
    }

}
