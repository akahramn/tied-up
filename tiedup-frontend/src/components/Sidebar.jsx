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
import {useLocation} from "react-router-dom";

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
        { key: 'dashboard', label: 'Panel', icon: <HomeOutlined />, path: '/dashboard' },
        { key: 'create-course', label: 'Ders Oluştur', icon: <PlusCircleOutlined />, path: '/dashboard/courses/create' },
        { key: 'participants', label: 'Katılımcılarım', icon: <TeamOutlined />, path: '/dashboard/participants' },
        { key: 'my-courses', label: 'Derslerim', icon: <BookOutlined />, path: '/dashboard/my-courses' },
        { key: 'share-note', label: 'Not Paylaş', icon: <UploadOutlined />, path: '/dashboard/notes/share' },
        { key: 'calendar', label: 'Ders Takvimi', icon: <CalendarOutlined />, path: '/dashboard/calendar' },
        { key: 'billing', label: 'Abonelik', icon: <CreditCardOutlined />, path: '/dashboard/billing' },
        { key: 'messages', label: 'Mesajlar', icon: <MessageOutlined />, path: '/dashboard/messages' },
    ],

    INSTRUCTOR: [
        // Eğer INSTRUCTOR ayrı bir rolsen yine ADMIN ile aynı yapıyı kullanabilirsin:
        // ...menuConfig.ADMIN
    ]
};

const Sidebar = ({fullName, role, navigate}) => {
    const location = useLocation();

    const selectedKey = useMemo(() => {
        const current = location.pathname;
        const items = menuConfig[role] || [];
        const matched = items.find((item) => current.startsWith(item.path));
        return matched?.key || 'dashboard';
    }, [location.pathname, role]);

    const menuItems = useMemo(() => menuConfig[role] || [], [role]);

    return (
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

            <Menu theme="light" mode="inline" style={{ backgroundColor: '#B5DDA4' }}>
                {menuItems.map((item) => (
                    <Menu.Item
                        key={item.key}
                        icon={item.icon}
                        onClick={() => navigate(item.path)}
                        style={{ color: '#2E4E2B', fontWeight: 500 }}
                    >
                        {item.label}
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
    )
}

export default Sidebar;