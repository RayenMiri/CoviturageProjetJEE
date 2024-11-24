package com.example.projetglsi3.Repository;

import com.example.projetglsi3.Model.Ride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RideRepo extends JpaRepository <Ride, Long>{}