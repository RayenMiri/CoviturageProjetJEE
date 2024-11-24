package com.example.projetglsi3.Model;

import jakarta.persistence.*;
import lombok.*;

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
 private String departureLocation, destination, departureDateTime ;
 private int availableSeats;
 private double pricePerSeat;
 private String  restrictions, createdAt, updatedAt;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "id")
    private User user;
}