import {Avatar, Menu, Typography} from "antd";
import React, {useEffect, useMemo, useState} from "react";
import Sider from "antd/es/layout/Sider";
import {
    UserOutlined,
    BookOutlined,
    PlusCircleOutlined,
    SearchOutlined,
    CalendarOutlined,
    UploadOutlined,
    TeamOutlined,
    CreditCardOutlined,
    MessageOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import {useLocation, useNavigate} from "react-router-dom";

export const menuConfig = {
    STUDENT: [
        { key: 'dashboard', label: 'Panel', icon: <HomeOutlined />, path: '/' },
        { key: 'courses', label: 'Derslerim', icon: <BookOutlined />, path: '/courses' },
        { key: 'explore', label: 'Yeni Dersler', icon: <SearchOutlined />, path: '/explore' },
        { key: 'calendar', label: 'Takvimim', icon: <CalendarOutlined />, path: '/calendar' },
        { key: 'notes', label: 'Paylaşılan Notlar', icon: <UploadOutlined />, path: '/notes' },
        { key: 'messages', label: 'Mesajlar', icon: <MessageOutlined />, path: '/messages' },
    ],

    ADMIN: [
        { key: 'dashboard', label: 'Panel', icon: <HomeOutlined />, path: '/' },
        { key: 'create-course', label: 'Ders Oluştur', icon: <PlusCircleOutlined />, path: '/courses/create' },
        { key: 'participants', label: 'Katılımcılarım', icon: <TeamOutlined />, path: '/participants' },
        { key: 'courses', label: 'Derslerim', icon: <BookOutlined />, path: '/courses' },
        { key: 'calendar', label: 'Ders Takvimi', icon: <CalendarOutlined />, path: '/calendar' },
        { key: 'billing', label: 'Abonelik', icon: <CreditCardOutlined />, path: '/billing' },
        { key: 'messages', label: 'Mesajlar', icon: <MessageOutlined />, path: '/messages' },
    ],

    INSTRUCTOR: [
        { key: 'dashboard', label: 'Panel', icon: <HomeOutlined />, path: '/' },
        { key: 'courses', label: 'Derslerim', icon: <BookOutlined />, path: '/courses' },
        { key: 'participants', label: 'Katılımcılarım', icon: <TeamOutlined />, path: '/participants' },
        { key: 'calendar', label: 'Ders Takvimi', icon: <CalendarOutlined />, path: '/calendar' },
        { key: 'billing', label: 'Abonelik', icon: <CreditCardOutlined />, path: '/billing' },
        { key: 'messages', label: 'Mesajlar', icon: <MessageOutlined />, path: '/messages' },
    ]
};

const Sidebar = ({ fullName, role }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Menü item'larını dinamik olarak oluştur
    const menuItems = menuConfig[role]?.map((item) => ({
        key: item.key,
        icon: item.icon,
        label: item.label,
        path: item.path,
    })) || [];

    // Aktif route'a göre seçili item'ı belirle
    const selectedKey = menuItems.find(item => location.pathname.endsWith(item.path))?.key;

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            style={{ backgroundColor: '#B5DDA4' }}
        >
            <div style={{ padding: 16, textAlign: 'center' }}>
                <Avatar size={64} icon={<UserOutlined />} />
                <Typography.Title level={5} style={{ color: '#fff', marginTop: 8 }}>
                    {fullName || 'Kullanıcı'}
                </Typography.Title>
            </div>

            <Menu
                theme="light"
                mode="inline"
                selectedKeys={[selectedKey]}
                style={{ backgroundColor: '#B5DDA4' }}
                items={menuItems.map(item => ({
                    key: item.key,
                    icon: item.icon,
                    label: item.label,
                }))}
                onClick={({ key }) => {
                    const target = menuItems.find(item => item.key === key);
                    if (target) navigate(target.path);
                }}
            />
        </Sider>
    );
};

export default Sidebar;