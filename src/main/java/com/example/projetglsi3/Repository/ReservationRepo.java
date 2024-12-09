package com.example.projetglsi3.Repository;

import com.example.projetglsi3.Model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepo extends JpaRepository<Reservation,Long> {
    List<Reservation> findByRideIdRideAndUserId(Long idRide, Long idUser);
    List<Reservation> findByUserId(Long userId);
}
