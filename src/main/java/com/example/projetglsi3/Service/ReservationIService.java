package com.example.projetglsi3.Service;

import com.example.projetglsi3.Model.Reservation;

public interface ReservationIService {
    public Reservation makeRes(Long idUser, Long idRide, int nbSeats) ;
    public void updateAvailableSeats(Long IdRide,int nbRes);
    public String annulerRes(Long idRes);
}
