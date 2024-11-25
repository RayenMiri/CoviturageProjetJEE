package com.example.projetglsi3.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ride {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRide;
    private String departureLocation;
    private String destination;
    private LocalDateTime departureDateTime;
    private int availableSeats;
    private double pricePerSeat;
    private String restrictions;
    private LocalDateTime createdAt, updatedAt;

    @Column(name = "id", nullable = false)
    private Long driverId;
}