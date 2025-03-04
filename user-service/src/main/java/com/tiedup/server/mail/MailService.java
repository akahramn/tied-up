package com.tiedup.server.mail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    public void sendPasswordResetEmail(String to, String token) {
        String resetLink = "https://frontend-url.com/reset-password?token=" + token;
        String subject = "Şifre Sıfırlama Talebi";
        String content = "<p>Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:</p>"
                + "<p><a href=\"" + resetLink + "\">Şifremi Sıfırla</a></p>"
                + "<p>Bu bağlantı 30 dakika içinde geçersiz olacaktır.</p>"
                + "<p>Eğer şifre sıfırlama talebinde bulunmadıysanız, bu e-postayı görmezden gelebilirsiniz.";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Mail gönderilemedi: " + e.getMessage());
        }
    }
}
