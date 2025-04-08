import React, { useEffect, useRef, useState } from 'react';
import WebRTCService from '../services/WebRTCService';
import {useParams} from "react-router-dom";
import {Button, Space} from "antd";
import Title from "antd/es/skeleton/Title";

const LiveSession = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const {isInstructor} = useParams();
    const [webRTCService, setWebRTCService] = useState(null);
    const initialized = useRef(false);

    // Örnek sabit oda ID (gerçek sistemde dinamik olmalı)
    const roomId = 'demo-room';

    // Geçici olarak eğitmen/öğrenci rolünü burada belirleyelim
    //const isInstructor = false; // TODO: Kullanıcının rolüne göre ayarla

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const init = async () => {
            const service = new WebRTCService({
                roomId,
                localVideoRef,
                remoteVideoRef,
                isInitiator: isInstructor == 1 ? true : false,
            });

            console.log("DATAAA");
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

    const handleShareScreen = async () => {
        if (webRTCService) {
            await webRTCService.shareScreen();
        }
    };


    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <Title level={2}>Canlı Ders (WebRTC)</Title>

            <Space style={{ justifyContent: 'center', marginBottom: '2rem' }}>
                <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    width={320}
                    height={240}
                    style={{ border: '1px solid #ccc' }}
                />
                <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    width={320}
                    height={240}
                    style={{ border: '1px solid #ccc' }}
                />
            </Space>

            {isInstructor == 1 &&
            <Space direction="vertical">
                <Button type="primary" onClick={handleStartCall}>
                    Bağlantıyı Başlat (Eğitmen)
                </Button>

                <Button onClick={handleShareScreen} disabled={!isInstructor}>
                    Ekran Paylaşımı Başlat
                </Button>
            </Space>
            }
        </div>
    );
};

export default LiveSession;
