package com.example.projetglsi3.Service;

import com.example.projetglsi3.Model.Review;
import com.example.projetglsi3.Model.Ride;
import com.example.projetglsi3.Model.User;
import com.example.projetglsi3.Repository.ReviewRepository;
import com.example.projetglsi3.Repository.RideRepository;
import com.example.projetglsi3.Repository.userRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewServiceImp implements ReviewService {

    ReviewRepository reviewRepository;
    RideRepository rideRepository;
    userRepository userRepo;

    @Override
    public ResponseEntity<?> createReview(Review review) {
        try {
            Long rideId = review.getRide().getIdRide();
            if (rideId == null) {
                throw new IllegalArgumentException("Ride ID cannot be null");
            }

            Long userId = review.getUser().getId();
            if (userId == null) {
                throw new IllegalArgumentException("User ID cannot be null");
            }

            // Check if a review by the same user for the same ride already exists
            Review existingReview = reviewRepository.findByRideIdRideAndUserId(rideId, userId);
            if (existingReview != null) {
                // Update the existing review
                existingReview.setRating(review.getRating());
                existingReview.setCreatedAt(new Date().toString());
                reviewRepository.save(existingReview);
                return ResponseEntity.status(HttpStatus.OK).body("Review updated successfully.");
            }

            // Validate ride and user existence
            Ride ride = rideRepository.findById(rideId)
                    .orElseThrow(() -> new IllegalArgumentException("Ride not found with ID: " + rideId));
            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new ReservationServiceImpl.UserNotFoundException("User not found with ID: " + userId));

            // Create a new review
            review.setRide(ride);
            review.setUser(user);
            review.setCreatedAt(new Date().toString());
            reviewRepository.save(review);

            return ResponseEntity.status(HttpStatus.CREATED).body("Review created successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error reviewing: " + e.getMessage());
        }
    }
    /*@Override
    public ResponseEntity<?> createReview(Review review) {
        try {
            Long rideId = review.getRide().getIdRide();
            if (rideId == null) {
                throw new IllegalArgumentException("Ride ID cannot be null");
            }

            Long userId = review.getUser().getId();
            if (userId == null) {
                throw new IllegalArgumentException("User ID cannot be null");
            }

            // Check if a review by the same user for the same ride already exists
            Review existingReview = reviewRepository.findByUserAndRideId(review.getUser(), rideId);
            if (existingReview != null) {
                // Update the existing review
                existingReview.setRating(review.getRating());
                existingReview.setCreatedAt(new Date().toString());
                reviewRepository.save(existingReview);
                return ResponseEntity.status(HttpStatus.OK).body("Review updated successfully.");
            }

            // Validate ride and user existence
            Ride ride = rideRepository.findById(rideId)
                    .orElseThrow(() -> new IllegalArgumentException("Ride not found with ID: " + rideId));
            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new ReservationServiceImpl.UserNotFoundException("User not found with ID: " + userId));

            // Create a new review
            review.setRide(ride);
            review.setUser(user);
            review.setCreatedAt(new Date().toString());
            reviewRepository.save(review);

            return ResponseEntity.status(HttpStatus.CREATED).body("Review created successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error reviewing: " + e.getMessage());
        }
    }

    */
    @Override
    public ResponseEntity<?> getReviewByIdReviewed(Long idUser){
        try{
            List<Review> reviews = reviewRepository.findByUserId(idUser);
            int s = 0;
            for(Review review : reviews){
                s += review.getRating();
            }
            return ResponseEntity.status(HttpStatus.OK).body(s/reviews.size());
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error getting Review: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> getReviewsByIdRide(Long idRide){
        try{
            List<Review> reviews = reviewRepository.findByRideIdRide(idRide);
            return ResponseEntity.status(HttpStatus.OK).body(reviews);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error getting Review: " + e.getMessage());
        }
    }


    @Override
    public ResponseEntity<?> updateReview(Review review){
        try{
            reviewRepository.save(review);

            return ResponseEntity.status(HttpStatus.OK).body(review);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating Review: " + e.getMessage());
        }
    }

}
