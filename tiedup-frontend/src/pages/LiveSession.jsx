import React, { useEffect, useRef, useState } from 'react';
import WebRTCService from '../services/WebRTCService';
import {useParams} from "react-router-dom";

const LiveSession = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const {isInstructor} = useParams();
    const [webRTCService, setWebRTCService] = useState(null);

    console.log("Deneme",isInstructor);
    // Örnek sabit oda ID (gerçek sistemde dinamik olmalı)
    const roomId = 'demo-room';

    // Geçici olarak eğitmen/öğrenci rolünü burada belirleyelim
    //const isInstructor = false; // TODO: Kullanıcının rolüne göre ayarla

    useEffect(() => {
        const init = async () => {
            const service = new WebRTCService({
                roomId,
                localVideoRef,
                remoteVideoRef,
                isInitiator: isInstructor == 1 ? true : false,
            });

            await service.initialize();
            setWebRTCService(service);
        };

        init();
    }, []);

    const handleStartCall = async () => {
        if (webRTCService) {
            await webRTCService.startCall();
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>📡 Canlı Ders Oturumu</h2>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                <div>
                    <p><strong>Kendi Görüntün</strong></p>
                    <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        playsInline
                        width={320}
                        height={240}
                        style={{ border: '1px solid #ccc', borderRadius: '8px' }}
                    />
                </div>
                <div>
                    <p><strong>Karşı Tarafın Görüntüsü</strong></p>
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        width={320}
                        height={240}
                        style={{ border: '1px solid #ccc', borderRadius: '8px' }}
                    />
                </div>
            </div>

            {isInstructor == 1 && (
                <button
                    onClick={handleStartCall}
                    style={{
                        marginTop: '2rem',
                        padding: '10px 20px',
                        fontSize: '1rem',
                        backgroundColor: '#1890ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Bağlantıyı Başlat (Eğitmen)
                </button>
            )}
        </div>
    );
};

export default LiveSession;
