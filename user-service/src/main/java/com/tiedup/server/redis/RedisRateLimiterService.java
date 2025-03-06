package com.tiedup.server.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisRateLimiterService {

    private final StringRedisTemplate redisTemplate;

    public boolean isAllowed(String ip) {
        String key = "rate_limit:" + ip; // Kullanıcı IP adresine özel key

        // Redis'te IP için mevcut deneme sayısını al
        Long attempts = redisTemplate.opsForValue().increment(key);

        if (attempts == 1) {
            // İlk kez giriş denemesi yaptıysa 10 dakikalık süre başlat
            redisTemplate.expire(key, 10, TimeUnit.MINUTES);
        }

        // Eğer kullanıcı 10 dakikada 5'ten fazla giriş yapmaya çalışırsa, erişim reddedilir
        return attempts <= 5;
    }

}
