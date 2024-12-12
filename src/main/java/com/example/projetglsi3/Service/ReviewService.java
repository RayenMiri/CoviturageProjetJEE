package com.example.projetglsi3.Service;

import com.example.projetglsi3.Model.Review;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

public interface ReviewService {
    ResponseEntity<?> createReview(Review review);
    ResponseEntity<?> getReviewByIdReviewed(Long idUser);
    ResponseEntity<?> updateReview(Review review);
}
