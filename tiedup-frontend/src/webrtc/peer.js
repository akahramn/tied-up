export function createPeerConnection(localStream, onRemoteTrack) {
    const pc = new RTCPeerConnection({
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" }
        ]
    });

    localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
    });

    pc.onicecandidate = (event) => {
        if (event.candidate) {
            console.log("ICE candidate oluştu:", event.candidate);
        }
    };

    pc.ontrack = (event) => {
        console.log("Uzaktaki stream geldi");
        onRemoteTrack(event.streams[0]);
    };

    return pc;
}

