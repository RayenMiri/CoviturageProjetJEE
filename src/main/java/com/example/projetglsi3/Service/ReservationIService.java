package com.example.projetglsi3.Service;

import org.springframework.http.ResponseEntity;

public interface ReservationIService {
    public void updateAvailableSeats(Long IdRide,int nbRes);
    public ResponseEntity<?> cancelReservation(Long idRide,Long idUser);
    public ResponseEntity<?> createReservation(Long idUser, Long idRide, int nbSeats);
    public ResponseEntity<?> consultHistory(Long IdUSer);
    public void updateAvailableSeats2(Long idRide, int nbReserv);
}
