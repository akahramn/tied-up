let socket = null;

export function connectWebSocket(roomId, onMessage) {
    socket = new WebSocket(`ws://localhost:8090/ws/signal`);

    socket.onopen = () => {
        console.log("WebSocket connected");
        socket.send(JSON.stringify({ type: "join", roomId }));
    };

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        onMessage(message);
    };

    socket.onerror = (e) => {
        console.error("WebSocket error", e);
    };

    socket.onclose = () => {
        console.log("WebSocket closed");
    };
}

export function sendMessage(message) {
    console.log("Sending message", message);
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    }
}