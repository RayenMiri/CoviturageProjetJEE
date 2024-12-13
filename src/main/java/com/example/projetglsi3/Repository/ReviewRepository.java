package com.example.projetglsi3.Repository;

import com.example.projetglsi3.Model.Review;
import com.example.projetglsi3.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository <Review, Long>{
    List <Review> findByUserId(Long userId);
    List <Review> findByRideIdRide(Long rideId);
    List <Review> findByUser(User user);
    Review findByRideIdRideAndUserId(Long rideId, Long userId);
}
