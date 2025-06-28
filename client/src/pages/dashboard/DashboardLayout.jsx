import React, {useEffect, useState} from 'react';
import {Layout} from 'antd';
import {useNavigate} from 'react-router-dom';
import CustomHeader from "../../components/CustomHeader";
import Sidebar from "../../components/Sidebar";
import AppRoutes from "../../routes/AppRoutes";
import {Content} from "antd/es/layout/layout";

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
        <Layout style={{minHeight: '100vh'}}>

            <Sidebar
                fullName={fullName}
                role={role}
                navigate={navigate}
            />

            <CustomHeader
                fullName={fullName}
                handleLogout={handleLogout}
                children={children}
            />

            <Content style={{margin: '24px', padding: 24, background: '#F5F7F0'}}>
                <AppRoutes user={user}/>
            </Content>
        </Layout>
    );
};

export default DashboardLayout;
