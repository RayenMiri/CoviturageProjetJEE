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
    @ManyToOne
    @JoinColumn(name = "id_ride")
    private Ride ride;
    @ManyToOne
    @JoinColumn(name = "id_reviewer")
    private User user;
}
