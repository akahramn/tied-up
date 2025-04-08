package com.tiedup.live.socket;

import org.json.JSONObject;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WebRtcSignalingHandler extends TextWebSocketHandler {

    private final Map<String, List<WebSocketSession>> rooms = new HashMap<>();


    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        System.out.println("Yeni WebRTC bağlantısı: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        JSONObject json = new JSONObject(message.getPayload());

        String type = json.getString("type");

        if (type.equals("join")) {
            String roomId = json.getString("roomId");

            rooms.putIfAbsent(roomId, new ArrayList<>());
            List<WebSocketSession> sessionList = rooms.get(roomId);

            // Aynı bağlantı tekrar eklenmesin
            if (!sessionList.contains(session)) {
                sessionList.add(session);
            }

            System.out.println("🟢 Katılan: " + session.getId() + " → " + roomId);
        }

        if (type.equals("offer") || type.equals("candidate")) {
            String roomId = json.getString("roomId");
            List<WebSocketSession> sessionList = rooms.get(roomId);

            if (sessionList != null) {
                for (WebSocketSession s : sessionList) {
                    if (s.isOpen() && !s.getId().equals(session.getId())) {
                        synchronized (s) {
                            s.sendMessage(new TextMessage(message.getPayload()));
                        }
                    }
                }
            }
        }

        if (type.equals("answer")) {
            String roomId = json.getString("roomId");
            List<WebSocketSession> sessionList = rooms.get(roomId);

            if (sessionList != null) {
                for (WebSocketSession s : sessionList) {
                    // Kendine geri gönderme! Sadece karşı tarafa gönder
                    if (s != session && s.isOpen()) {
                        s.sendMessage(new TextMessage(message.getPayload()));
                    }
                }
            }
        }

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        for (List<WebSocketSession> sessions : rooms.values()) {
            sessions.remove(session);
        }
        System.out.println("🔴 Bağlantı kapandı: " + session.getId());
    }

}
