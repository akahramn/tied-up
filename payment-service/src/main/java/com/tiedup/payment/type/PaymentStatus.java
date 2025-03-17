package com.tiedup.payment.type;

public enum PaymentStatus {
    PENDING,   // Ödeme bekleniyor
    COMPLETED, // Ödeme tamamlandı
    FAILED,    // Ödeme başarısız
    REFUNDED   // Ödeme iade edildi
}
