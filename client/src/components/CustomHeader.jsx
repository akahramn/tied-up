import {Avatar, Button, Layout, Space, Typography} from "antd";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import React from "react";
import {Content, Header} from "antd/es/layout/layout";


const CustomHeader = ({fullName, handleLogout, children}) => {

    return (
        <Header
            style={{
                backgroundColor: '#ffffff',
                height: '64px',
                padding: '0 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            }}
        >
            {/* Sol Logo / Başlık */}
            <Typography.Title level={5} style={{ margin: 0 }}>
                🎓 TiedUp Panel
            </Typography.Title>

            {/* Sağ Kullanıcı Bilgisi */}
            <Space>
                <Typography.Text strong>{fullName || 'Kullanıcı'}</Typography.Text>
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#B5DDA4' }} />
                <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>
                    Çıkış Yap
                </Button>
            </Space>
        </Header>
    );
}

export default CustomHeader;