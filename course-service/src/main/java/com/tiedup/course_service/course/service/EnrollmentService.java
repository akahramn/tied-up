package com.tiedup.course_service.course.service;

import com.tiedup.course_service.course.dto.PaymentEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EnrollmentService {
    @Value("${payment.kafka.topic}")
    private String topicName;
    //TODO belirli bir sınıf tipinde nasıl yollanıyor arastır
    @KafkaListener(topics = "${payment.kafka.topic}", groupId = "course-service-group")
    public void enrollStudent(String event) {
        System.out.println("Kafka'dan ödeme mesajı alındı, öğrenci derse kayıt ediliyor: " + event);
        // Course Service içinde öğrenciyi kayıt eden metodu çağır
    }
}
