import {Button, Layout, Typography} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import React from "react";
import {Content, Header} from "antd/es/layout/layout";


const CustomHeader = ({fullName, handleLogout, children}) => {

    return (
    <Layout>
        <Header
            style={{
                background: '#fff',
                padding: '0 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            }}
        >
            <Typography.Title level={4} style={{ margin: 0 }}>
                Hoş geldin, {fullName || 'kullanıcı'}
            </Typography.Title>
            <Button icon={<LogoutOutlined />} onClick={handleLogout}>
                Çıkış Yap
            </Button>
        </Header>

        <Content style={{ margin: '24px', padding: 24, background: '#F5F7F0' }}>
            {children}
        </Content>
    </Layout>
    )
}

export default CustomHeader;