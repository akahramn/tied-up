import { useEffect, useRef, useState } from "react";

const LiveSession = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerRef = useRef(null);
    const socketRef = useRef(null);
    const [localStream, setLocalStream] = useState(null);

    const roomId = "demo-room"; // Test odası

    useEffect(() => {
        const init = async () => {
            // 1. Kamera ve mikrofona erişim al
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setLocalStream(stream);
            if (localVideoRef.current) localVideoRef.current.srcObject = stream;

            // 2. WebSocket'e bağlan
            socketRef.current = new WebSocket("ws://localhost:8090/ws/signal");

            socketRef.current.onopen = () => {
                console.log("WebSocket bağlandı");
                socketRef.current.send(JSON.stringify({ type: "join", roomId }));
            };

            socketRef.current.onmessage = async (event) => {
                const message = JSON.parse(event.data);

                if (message.type === "offer") {
                    console.log("Gelen offer alındı");
                    peerRef.current = createPeer(stream);

                    await peerRef.current.setRemoteDescription(new RTCSessionDescription(message.offer));
                    const answer = await peerRef.current.createAnswer();
                    await peerRef.current.setLocalDescription(answer);

                    socketRef.current.send(JSON.stringify({ type: "answer", roomId, answer }));
                }

                if (message.type === "answer") {
                    console.log("Gelen answer yükleniyor");
                    await peerRef.current.setRemoteDescription(new RTCSessionDescription(message.answer));
                }

                if (message.type === "candidate" && peerRef.current) {
                    console.log("ICE candidate alındı");
                    await peerRef.current.addIceCandidate(new RTCIceCandidate(message.candidate));
                }
            };
        };

        init();
    }, []);

    const createPeer = (stream) => {
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current.send(JSON.stringify({
                    type: "candidate",
                    roomId,
                    candidate: event.candidate
                }));
            }
        };

        pc.ontrack = (event) => {
            console.log("Uzaktaki stream geldi");
            if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
        };
        console.log("TESTT")
        return pc;
    };

    const startCall = async () => {
        if (!localStream) return;

        console.log("Bağlantı başlatılıyor...");
        peerRef.current = createPeer(localStream);

        const offer = await peerRef.current.createOffer();
        await peerRef.current.setLocalDescription(offer);

        socketRef.current.send(JSON.stringify({ type: "offer", roomId, offer }));
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Canlı Ders (WebRTC)</h2>

            <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
                {localVideoRef.current && (
                    <>
                        <h2>Canlı Ders LOCAl (WebRTC)</h2>
                        <video ref={localVideoRef} autoPlay playsInline muted width={320} height={240} />
                    </>

                )}
                {remoteVideoRef.current && (
                    <>
                        <h2>Canlı Ders LOCAl (WebRTC)</h2>
                        <video ref={remoteVideoRef} autoPlay playsInline width={320} height={240} />
                    </>
                )}


            </div>

            <button onClick={startCall} style={{ marginTop: "2rem", padding: "10px 20px" }}>
                Bağlantıyı Başlat (Eğitmen)
            </button>
        </div>
    );
};

export default LiveSession;