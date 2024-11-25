package com.example.projetglsi3.Controller;
import com.example.projetglsi3.Model.Reservation;
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

    @PostMapping("/reserve/{idUser}/{idRide}/{nbSeats}")
//    public Reservation makeRes(@PathVariable Long idUser, @PathVariable Long idRide, @PathVariable int nbSeats) {
//        return resService.makeRes(idUser, idRide, nbSeats);
//    }
    public Reservation makeRes(@RequestBody Reservation reservation, @PathVariable Long idUser, @PathVariable Long idRide ,@PathVariable int nbSeats) {
        return resService.makeRes(idUser, idRide, nbSeats);
    }

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
