package com.example.projetglsi3.Controller;

import com.example.projetglsi3.Service.EmailRequest;
import com.example.projetglsi3.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @GetMapping("/send")
    public String sendEmail(@RequestParam String to, @RequestParam String subject, @RequestParam String text) {
        emailService.sendSimpleMessage(to, subject, text);
        return "Email sent successfully";

    }
    @PostMapping("/sendemail")  // Changer en POST
    public String sendEmail(@RequestBody EmailRequest emailRequest) {  // Utiliser @RequestBody pour recevoir les données
        emailService.sendSimpleMessage(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getText());
        return "Email sent successfully";
    }
}