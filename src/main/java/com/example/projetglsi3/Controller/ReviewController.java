package com.example.projetglsi3.Controller;

import com.example.projetglsi3.Model.Review;
import com.example.projetglsi3.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @PostMapping("/createReview")
    public ResponseEntity<?> createReview(@RequestBody Review review) {
        return reviewService.createReview(review);
    }

    @GetMapping("/getReviewByIdReviewed/{idUser}")
    public ResponseEntity<?> getReviewByIdReviewed(@PathVariable Long idUser) {
        return reviewService.getReviewByIdReviewed(idUser);
    }

    @PutMapping("/updateReview")
    public ResponseEntity<?> updateReview(@RequestBody Review review) {
        return reviewService.updateReview(review);
    }

}