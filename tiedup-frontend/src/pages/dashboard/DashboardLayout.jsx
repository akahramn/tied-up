import React, {useEffect, useState} from 'react';
import { Layout, Menu, Avatar, Typography, Button } from 'antd';
import { UserOutlined, LogoutOutlined, BookOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children, user }) => {
    const navigate = useNavigate();
    const[fullName, setFullName] = useState('');
    const[role, setRole] = useState('');

    useEffect(() => {
        setFullName(localStorage.getItem('fullname'));
        setRole(localStorage.getItem('role'));
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Sol Menü */}
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                style={{
                    backgroundColor: '#B5DDA4',
                }}
            >
                <div style={{ padding: 16, textAlign: 'center' }}>
                    <Avatar size={64} icon={<UserOutlined />} />
                    <Typography.Title level={5} style={{ color: '#fff', marginTop: 8 }}>
                        {fullName || 'Kullanıcı'}
                    </Typography.Title>
                </div>

                <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} style={{ backgroundColor: '#B5DDA4' }}>
                    <Menu.Item key="1" icon={<BookOutlined />} onClick={() => navigate('/')}>
                        Panel
                    </Menu.Item>

                    {role === 'ADMIN' && (
                        <Menu.Item key="2" icon={<PlusCircleOutlined />} onClick={() => navigate('/courses/create')}>
                            Ders Oluştur
                        </Menu.Item>
                    )}

                    {role=== 'STUDENT' && (
                        <Menu.Item key="3" icon={<BookOutlined />} onClick={() => navigate('/courses')}>
                            Derslere Göz At
                        </Menu.Item>
                    )}
                </Menu>
            </Sider>

            {/* Üst Bar ve İçerik */}
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
        </Layout>
    );
};

export default DashboardLayout;
