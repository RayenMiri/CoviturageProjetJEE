package com.example.projetglsi3.Auth.Model;

import jakarta.persistence.*;

@Entity
public class Ride {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
 private long idRide;
 private String departureLocation, destination, departureDateTime ;
 private int availableSeats;
 private double pricePerSeat;
 private String  restrictions, createdAt, updatedAt;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "id")
    private User user;
}
