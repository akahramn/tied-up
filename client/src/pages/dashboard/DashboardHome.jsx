import React,{useState} from "react";

const DashboardHome = () => {

    const role = localStorage.getItem('role');

    return (
        <div>
            <h2>Hoş geldin!</h2>
            {role === 'STUDENT' && <p>Bugünkü derslerini kaçırma 🎓</p>}
            {(role === 'ADMIN' || role === 'INSTRUCTOR') && <p>Yeni ders açabilir, katılımcıları yönetebilirsin 👨‍🏫</p>}
        </div>
    );
};

export default DashboardHome;
