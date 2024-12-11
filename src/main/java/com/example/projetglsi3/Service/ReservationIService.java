package com.example.projetglsi3.Service;

import org.springframework.http.ResponseEntity;

public interface ReservationIService {
    void updateAvailableSeats(Long IdRide,int nbRes);
    ResponseEntity<?> cancelReservation(Long idRide,Long idUser);
    ResponseEntity<?> createReservation(Long idUser, Long idRide, int nbSeats);
    // ResponseEntity<?> consultHistory(Long IdUSer);
    void updateAvailableSeats2(Long idRide, int nbReserv);
    ResponseEntity<?>getReservationByUser(Long idUser);
    ResponseEntity<?> getReservationById(Long idReservation);
    ResponseEntity<?> getReservationByRideId(Long rideId);
}
