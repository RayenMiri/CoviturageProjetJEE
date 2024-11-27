package com.example.projetglsi3.Repository;

import com.example.projetglsi3.Model.Ride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RideRepository extends JpaRepository <Ride, Long>{
    List<Ride> findByDepartureLocationAndDestinationAndDepartureDateTimeAfterAndPricePerSeatLessThanEqual(String departurePoint, String destination, LocalDateTime departureTime, Double maxPrice);
    List<Ride> findByDriverId(Long driverId);
    List<Ride>findByDepartureLocation(String location);
    List<Ride>findByDestination(String destination);
}