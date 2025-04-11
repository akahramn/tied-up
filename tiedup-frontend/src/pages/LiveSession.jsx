import React, {useEffect, useRef, useState} from 'react';
import WebRTCService from '../services/WebRTCService';
import {useParams} from "react-router-dom";

import { Layout, Row, Col, Avatar, Space, Button, Card, theme } from 'antd';
import {
    AudioOutlined,
    AudioMutedOutlined,
    VideoCameraOutlined,
    ShareAltOutlined,
    MessageOutlined,
    PoweroffOutlined,
    AppstoreAddOutlined,
} from '@ant-design/icons';
import './LiveClassroom.css'; // pastel tonları için custom stil

const { Header, Footer, Content, Sider } = Layout;

const participants = Array.from({ length: 2 }, (_, i) => ({
    name: `Öğrenci ${i + 1}`,
    id: i,
}));


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
        <Layout className="classroom-layout">
            {/* Üst bar */}
            <Header className="header-bar">
                <Space>
                    <Avatar size="large">👩‍🏫</Avatar>
                    <span className="class-title">Canlı Ders: Matematik</span>
                </Space>
            </Header>

            <Layout>
                {/* Yan Panel */}
                <Sider width={280} className="side-panel">
                    <div className="side-title">Araçlar</div>
                    <Space direction="vertical" size="large" className="side-buttons">
                        <Button icon={<MessageOutlined />} block>Chat</Button>
                        <Button icon={<AppstoreAddOutlined />} block>Whiteboard</Button>
                        <Button icon={<ShareAltOutlined />} block>Ekran Paylaşımı</Button>
                    </Space>
                </Sider>

                <Layout>
                    {/* Görüntüler */}
                    <Content className="video-area">
                        <Row gutter={[16, 16]} className="video-grid">
                            <Col span={24}>
                                <Card className="main-speaker" title="Aktif Konuşan">
                                    <div className="video-box">🎤 Eğitmen Görüntüsü</div>
                                </Card>
                            </Col>

                            {participants.map((p) => (
                                <Col xs={12} md={6} key={p.id}>
                                    <Card title={p.name} className="participant-card">
                                        <div className="video-box small">🎥</div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Content>

                    {/* Alt bar */}
                    <Footer className="control-footer">
                        <Space size="middle">
                            <Button shape="circle" icon={<AudioOutlined />} />
                            <Button shape="circle" icon={<AudioMutedOutlined />} />
                            <Button shape="circle" icon={<VideoCameraOutlined />} />
                            <Button shape="circle" icon={<ShareAltOutlined />} />
                            <Button danger shape="circle" icon={<PoweroffOutlined />} />
                        </Space>
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default LiveSession;
