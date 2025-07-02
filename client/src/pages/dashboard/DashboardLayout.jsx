import React, {useEffect, useState} from 'react';
import {Layout} from 'antd';
import {Outlet, useNavigate} from 'react-router-dom';
import CustomHeader from "../../components/CustomHeader";
import Sidebar from "../../components/Sidebar";
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const DashboardLayout = ({children, user}) => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('');

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
            {/* Sol Sidebar */}
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                style={{
                    backgroundColor: '#B5DDA4',
                    position: 'fixed',
                    height: '100vh',
                    left: 0,
                    top: 0,
                    zIndex: 100,
                }}
            >
                <Sidebar
                    fullName={fullName}
                    role={role}
                    navigate={navigate}
                />
            </Sider>

            {/* Sağ İçerik + Header Alanı */}
            <Layout style={{ marginLeft: 200 }}>
                <Header
                    style={{
                        background: '#fff',
                        padding: '0 32px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 64,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        position: 'sticky',
                        top: 0,
                        zIndex: 99,
                    }}
                >
                    <CustomHeader
                        fullName={fullName}
                        handleLogout={handleLogout}
                        children={children}
                    />
                </Header>

                <Content
                    style={{
                        margin: '24px',
                        padding: 24,
                        background: '#F5F7F0',
                        minHeight: 'calc(100vh - 64px)',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
