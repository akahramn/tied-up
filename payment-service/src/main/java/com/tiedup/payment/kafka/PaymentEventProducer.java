package com.tiedup.payment.kafka;

import com.tiedup.payment.dto.PaymentEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentEventProducer {
    private final KafkaTemplate<String, PaymentEvent> kafkaTemplate;
    private static final String PAYMENT_TOPIC = "payment-completed-topic";

    public void sendPaymentEvent(PaymentEvent event) {
        kafkaTemplate.send(PAYMENT_TOPIC, event);
        System.out.println("Kafka'ya ödeme olayı gönderildi: " + event);
    }
}
