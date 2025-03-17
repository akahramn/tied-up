package com.tiedup.payment.service;

import com.tiedup.payment.dto.PaymentEvent;
import com.tiedup.payment.dto.PaymentRequest;
import com.tiedup.payment.dto.PaymentResponse;
import com.tiedup.payment.kafka.PaymentEventProducer;
import com.tiedup.payment.model.Payment;
import com.tiedup.payment.repository.PaymentRepository;
import com.tiedup.payment.type.PaymentStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final PaymentEventProducer paymentEventProducer; // Kafka Producer

    @Transactional
    public PaymentResponse processPayment(PaymentRequest request) {
        Payment payment = Payment.builder()
                .userId(request.getUserId())
                .courseId(request.getCourseId())
                .status(PaymentStatus.PENDING) // Ödeme işlemi başlatıldı
                .amount(request.getAmount())
                .currency(request.getCurrency())
                .createdAt(LocalDateTime.now())
                .build();

        payment = paymentRepository.save(payment);

        // Burada gerçek ödeme işlemi yapılır (Stripe, Iyzico entegrasyonu)
        boolean paymentSuccess = mockPaymentProcessing();

        if (paymentSuccess) {
            payment.setStatus(PaymentStatus.COMPLETED);
        } else {
            payment.setStatus(PaymentStatus.FAILED);
        }

        paymentRepository.save(payment);

        //todo course servise iletilecek
        // Kafka'ya mesaj gönder
        PaymentEvent event = new PaymentEvent(payment.getUserId(), payment.getCourseId(), "COMPLETED");
        paymentEventProducer.sendPaymentEvent(event);

        return mapToPaymentResponse(payment);
    }

    public PaymentResponse getPaymentById(UUID paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Ödeme bulunamadı!"));

        return mapToPaymentResponse(payment);
    }

    private boolean mockPaymentProcessing() {
        // Gerçek ödeme işlemi burada yapılır.
        // Şimdilik ödeme işlemini başarıyla tamamlanmış gibi simüle ediyoruz.
        return true;
    }

    private PaymentResponse mapToPaymentResponse(Payment payment) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .userId(payment.getUserId())
                .courseId(payment.getCourseId())
                .status(payment.getStatus())
                .amount(payment.getAmount())
                .currency(payment.getCurrency())
                .createdAt(payment.getCreatedAt())
                .build();
    }
}
