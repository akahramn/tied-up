//1. A -> getUserMedia() → Kamera & ses verisini alır
//2. A -> B'ye "offer" gönderir (signaling ile)
//3. B -> getUserMedia() → Kamera & ses verisini alır
//4. B -> A'ya "answer" gönderir
//5. Her iki taraf ICE (bağlantı adayı) bilgilerini paylaşır
//6. Bağlantı kurulur → Ses & video gider
//Signaling aşamasında WebRTC kendi başına çalışmaz, WebSocket gibi bir iletişim kanalı gerekir.

class WebRTCService {
    constructor({ roomId, localVideoRef, remoteVideoRef, isInitiator = false }) {
        this.roomId = roomId;
        this.localVideoRef = localVideoRef;
        this.remoteVideoRef = remoteVideoRef;
        this.isInitiator = isInitiator;

        this.peer = null;
        this.socket = null;
        this.localStream = null;

        this.offerReceived = false;
        this.connectionStarted = false;
        this.pendingCandidates = [];
    }


    async initialize() {
        await this.setupLocalMedia();
        this.createPeerConnection();
        this.connectSignalingServer();
    }

    async setupLocalMedia() {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (this.localVideoRef.current) {
                this.localVideoRef.current.srcObject = this.localStream;
            }
        } catch (error) {
            console.error("🎥 Kamera/mikrofon erişim hatası:", error);
        }
    }

    createPeerConnection() {
        if (this.peer) return;

        this.peer = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        });

        // 📡 signalingState değişimlerini takip et
        this.peer.onsignalingstatechange = () => {
            console.log("📶 signalingState değişti:", this.peer.signalingState);
        };

        this.peer.onicecandidate = (event) => {
            if (event.candidate) {
                this.sendMessage({ type: 'candidate', candidate: event.candidate });
            }
        };

        this.peer.ontrack = (event) => {
            console.log("📺 Uzaktaki stream alındı.");
            if (this.remoteVideoRef.current) {
                this.remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        if (this.localStream) {
            this.localStream.getTracks().forEach((track) => {
                this.peer.addTrack(track, this.localStream);
            });
        }
    }



    connectSignalingServer() {
        this.socket = new WebSocket(`ws://localhost:8090/ws/signal`);

        this.socket.onopen = () => {
            console.log("🔌 WebSocket bağlantısı kuruldu.");
            if (this.socket.readyState === WebSocket.OPEN) {
                this.sendMessage({ type: 'join' });
            }
        };

        this.socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            const { type } = message;

            switch (type) {
                case 'offer':
                    await this.handleOffer(message.offer);
                    break;
                case 'answer':
                    await this.handleAnswer(message.answer);
                    break;
                case 'candidate':
                    await this.handleCandidate(message.candidate);
                    break;
                default:
                    console.warn("⚠️ Bilinmeyen mesaj tipi:", type);
            }
        };

        this.socket.onerror = (err) => {
            console.error("❌ WebSocket hatası:", err);
        };
    }

    async startCall() {
        if (!this.isInitiator) {
            console.warn("⛔ Initiator olmayan biri startCall çağırdı.");
            return;
        }

        if (this.connectionStarted || this.offerReceived) {
            console.warn("⚠️ Bağlantı zaten başlatıldı veya offer geldi.");
            return;
        }

        this.connectionStarted = true;

        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(offer);

        this.sendMessage({ type: 'offer', offer });
        console.log("📤 Offer gönderildi.");
    }


    async handleOffer(offer) {
        if (this.isInitiator) {
            console.warn("⛔ Bu taraf initiator, offer işlenmeyecek.");
            return;
        }

        this.offerReceived = true;

        await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await this.peer.createAnswer();
        await this.peer.setLocalDescription(answer);

        this.sendMessage({ type: 'answer', answer });
        console.log("📤 Answer gönderildi.");
    }


    async handleAnswer(answer) {
        if (!this.isInitiator) {
            console.warn("⛔ Initiator olmayan biri answer aldı.");
            return;
        }

        if (!this.peer || this.peer.signalingState !== 'have-local-offer') {
            console.warn("⛔ Answer yanlış durumda alındı:", this.peer?.signalingState);
            return;
        }

        await this.peer.setRemoteDescription(new RTCSessionDescription(answer));
        this.remoteDescriptionSet = true;
        console.log("✅ Answer başarıyla set edildi.");

        // ICE kuyruğunu işleyelim
        this.pendingCandidates.forEach(async (candidate) => {
            try {
                await this.peer.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (err) {
                console.error("❌ ICE kuyruğu hatası:", err);
            }
        });
        this.pendingCandidates = [];
    }

    async handleCandidate(candidate) {
        if (!this.peer) {
            console.warn("⚠️ Peer yok, candidate saklandı.");
            return;
        }

        if (!this.remoteDescriptionSet) {
            console.log("⏳ Remote SDP yok, ICE kuyruğa alındı.");
            this.pendingCandidates.push(candidate);
            return;
        }

        try {
            await this.peer.addIceCandidate(new RTCIceCandidate(candidate));
            console.log("✅ ICE Candidate eklendi.");
        } catch (err) {
            console.error("❌ ICE Candidate eklenemedi:", err);
        }
    }

    sendMessage(message) {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ ...message, roomId: this.roomId }));
        }
    }

    async shareScreen() {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });

            const screenTrack = screenStream.getVideoTracks()[0];

            // 🎥 Local ekrana da göster
            if (this.localVideoRef.current) {
                this.localVideoRef.current.srcObject = screenStream;
            }

            // 🎯 Peer'daki video sender'ı bul
            const videoSender = this.peer.getSenders().find(
                (sender) => sender.track?.kind === 'video'
            );

            if (videoSender) {
                await videoSender.replaceTrack(screenTrack);
                console.log("🖥️ Ekran paylaşımı başladı");

                // Paylaşım bitince kameraya geri dön
                screenTrack.onended = async () => {
                    if (this.localStream) {
                        const cameraTrack = this.localStream.getVideoTracks()[0];
                        if (cameraTrack) {
                            await videoSender.replaceTrack(cameraTrack);
                            this.localVideoRef.current.srcObject = this.localStream;
                            console.log("🎥 Kamera geri alındı");
                        }
                    }
                };
            }
        } catch (error) {
            console.error("❌ Ekran paylaşımı hatası:", error);
        }
    }

}

export default WebRTCService;




