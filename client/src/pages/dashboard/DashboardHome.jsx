import React, {useEffect, useState} from "react";
import StudentDashboard from "./StudentDashboard";
import InstructorDashboard from "./InstructorDashboard";
import AdminDashboard from "./AdminDashboard";
import {Typography} from "antd";

const DashboardHome = ({user}) => {
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        setFullName(localStorage.getItem('fullname'));
    }, [])
    const role = localStorage.getItem('role')?.replaceAll('"', '') || 'STUDENT';

    const renderDashboard = () => {
        if (role === 'STUDENT') return <StudentDashboard />;
        if (role === 'ADMIN') return <AdminDashboard />;
        if (true) return <InstructorDashboard />;

    }

    return (
        <div style={{ padding: 12 }}>
            <Typography.Title level={4}>
                {role === 'STUDENT' && `👋 Merhaba ${fullName}, bugün yeni bilgiler seni bekliyor!`}
                {role === 'INSTRUCTOR' && `👋 Merhaba ${fullName}, öğrencilerin seni bekliyor!`}
                {role === 'ADMIN' && `👋 Merhaba ${fullName}, sistemin durumu parmaklarınızın ucunda!`}
            </Typography.Title>
            <Typography/>
            <Typography.Text type="secondary">
                Bugünkü özet bilgileri aşağıda görebilirsin.
            </Typography.Text>

            {renderDashboard()}
        </div>
    );
};

export default DashboardHome;
