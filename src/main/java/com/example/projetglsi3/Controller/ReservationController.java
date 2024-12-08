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

    @PutMapping("/cancelReservation/{idRes}")
    public ResponseEntity<String> cancelReservation(@PathVariable Long idRes)
    {
        try {
            String msg= resService.cancelReservation(idRes);
            return ResponseEntity.ok(msg);
        } catch (RuntimeException e) {
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("Réservation non trouvée");
        }
    }
    @GetMapping("/History/{IdUser}")
    public ResponseEntity<?> consultHistory(@PathVariable Long IdUser){
       return resService.consultHistory(IdUser);

    }

}
