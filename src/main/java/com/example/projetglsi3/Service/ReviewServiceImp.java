package com.example.projetglsi3.Service;

import com.example.projetglsi3.Model.Review;
import com.example.projetglsi3.Repository.ReviewRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewServiceImp implements ReviewService {

    ReviewRepository reviewRepository;

    @Override
    public ResponseEntity<?> createReview(Review review){
        try{
            System.out.println(review);
            Review newReview = reviewRepository.save(review);
            return ResponseEntity.status(HttpStatus.CREATED).body(newReview);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error Reviewing: " + e.getMessage());
        }
    }

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
