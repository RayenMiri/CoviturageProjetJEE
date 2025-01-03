package com.example.projetglsi3.Repository;

import com.example.projetglsi3.Model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation,Long> {
    List<Reservation> findByRideIdRideAndUserId(Long idRide, Long idUser);
    List<Reservation> findByUserId(Long userId);
    List<Reservation> findByRideIdRide(Long idRide);
}
