package com.example.projetglsi3.Service;

import org.springframework.http.ResponseEntity;

public interface ReservationIService {
    public void updateAvailableSeats(Long IdRide,int nbRes);
    public String cancelReservation(Long idRes);
    public ResponseEntity<?> createReservation(Long idUser, Long idRide, int nbSeats);
    public ResponseEntity<?> consultHistory(Long IdUSer);

}
