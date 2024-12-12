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
        confirmed, cancelled,finished
    }

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @ManyToOne
    @JoinColumn(name = "id_ride")
    private Ride ride;
    @ManyToOne
    @JoinColumn(name = "id")
    private User user;
}
