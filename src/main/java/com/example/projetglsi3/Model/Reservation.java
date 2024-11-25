package com.example.projetglsi3.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReservation;
    private int nbOfSeats;
    @Enumerated(EnumType.STRING)
    private status status;
    public enum status {
        confirmed, cancelled
    }

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    // One ride can have multiple reservations ,One user can make multiple reservations
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "idRide")
    private Ride ride;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "id")
    private User user;

}
