package com.example.projetglsi3.Service;

import com.example.projetglsi3.Model.Reservation;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ReservationIService {
    public Reservation makeRes(Long idUser, Long idRide, int nbSeats) ;
    public void updateAvailableSeats(Long IdRide,int nbRes);
    public String annulerRes(Long idRes);

    public ResponseEntity<Reservation> addRes(Reservation reservation, Long idUser, Long idRide);
    public List<Reservation> getAllRes();
}
