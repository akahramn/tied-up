package com.tiedup.live.socket;

import org.json.JSONObject;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;
import java.util.Map;

public class WebRtcSignalingHandler extends TextWebSocketHandler {

    private final Map<String, WebSocketSession> clients = new HashMap<>();

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
            clients.put(roomId, session);
        } else if (type.equals("offer") || type.equals("answer") || type.equals("candidate")) {
            String roomId = json.getString("roomId");
            WebSocketSession receiver = clients.get(roomId);

            if (receiver != null && receiver.isOpen() && receiver != session) {
                receiver.sendMessage(new TextMessage(message.getPayload()));
            }
        }
    }
}
