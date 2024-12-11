package com.example.projetglsi3.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRev;
    private int rating;
    private String createdAt;
    @OneToOne
    @JoinColumn(name = "id_ride")
    private Ride ride;
    @OneToOne
    @JoinColumn(name = "id_reviewed")
    private User user;
}
