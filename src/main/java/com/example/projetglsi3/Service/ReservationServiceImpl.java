package com.example.projetglsi3.Service;
import com.example.projetglsi3.Model.Reservation;
import com.example.projetglsi3.Model.Ride;
import com.example.projetglsi3.Model.User;
import com.example.projetglsi3.Repository.ReservationRepo;
import com.example.projetglsi3.Repository.RideRepository;
import com.example.projetglsi3.Repository.userRepository;
import jakarta.persistence.metamodel.SetAttribute;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Service
public class ReservationServiceImpl implements ReservationIService {
    private final RideService rideService;
    ReservationRepo resRep;
    userRepository userRepo;
    RideRepository rideRep;

    @Override
    public void updateAvailableSeats(Long IdRide, int nbReserv) {
        System.out.println("seats test");
        Ride ride = rideRep.findById(IdRide).orElseThrow(() -> new RuntimeException("Ride not found"));
        int nbSeats = ride.getAvailableSeats();
        if (nbSeats >= nbReserv) {
            nbSeats -= nbReserv;
            ride.setAvailableSeats(nbSeats); // Update the entity
            rideRep.save(ride); // Persist the change
        } else {
            throw new IllegalArgumentException("Not enough available seats");
        }
    }

    /*public Reservation makeRes(Long idUser, Long idRide, int nbSeats) {
        User user = userRepo.findById(idUser).orElseThrow(() -> new RuntimeException("User not found"));
        Ride ride = rideRep.findById(idRide).orElseThrow(() -> new RuntimeException("Ride not found"));
        ride.setAvailableSeats(nbSeats);
        rideService.updateRide(idRide,ride);
        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setRide(ride);
        reservation.setNbOfSeats(nbSeats);
        reservation.setStatus(Reservation.status.confirmed);
        reservation.setCreatedAt(LocalDateTime.now());
        reservation.setUpdatedAt(LocalDateTime.now());
        System.out.println("tessssssssssssssssssssssssst"+reservation.toString());
        resRep.save(reservation);
        return reservation;
    }*/

    @Override
    public String annulerRes(Long idRes) {
        Reservation res = resRep.findById(idRes).orElseThrow(() -> new RuntimeException("Reservation not found"));
        res.setStatus(Reservation.status.cancelled);
        res.setUpdatedAt(LocalDateTime.now());
        resRep.save(res);
        return "Réservation annulée avec succès";
    }

    @Override
    public Reservation createReservation(Long idUser, Long idRide, int nbSeats) {
        System.out.println("Creating reservation...");

        User user = userRepo.findById(idUser).orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println("User found: " + user.toString());

        Ride ride = rideRep.findById(idRide).orElseThrow(() -> new RuntimeException("Ride not found"));
        System.out.println("Ride found: " + ride.toString());

        if (ride.getAvailableSeats() < nbSeats) {
            throw new IllegalArgumentException("Not enough available seats");
        }

        ride.setAvailableSeats(ride.getAvailableSeats() - nbSeats);
        rideService.updateRide(idRide, ride);
        System.out.println("Available seats updated for ride: " + idRide);

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setRide(ride);
        reservation.setNbOfSeats(nbSeats);
        reservation.setStatus(Reservation.status.confirmed);
        reservation.setCreatedAt(LocalDateTime.now());
        reservation.setUpdatedAt(LocalDateTime.now());

        System.out.println("New reservation: " + reservation.toString());

        resRep.save(reservation);
        System.out.println("Reservation saved!");

        return reservation;
    }
}