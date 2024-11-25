package com.example.projetglsi3.Service;

import com.example.projetglsi3.Model.Reservation;

public interface ReservationIService {
    public void updateAvailableSeats(Long IdRide,int nbRes);
    public String annulerRes(Long idRes);
    public Reservation createReservation(Long idUser, Long idRide, int nbSeats);
}
