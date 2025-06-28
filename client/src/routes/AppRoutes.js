import React, {useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Course from "../pages/course/Course";
import UserCalendar from "../pages/calendar/UserCalendar";
import SharedNotes from "../pages/notes/SharedNotes";
import SubscriptionPage from "../pages/billing/SubscriptionPage";


const AppRoutes = ({ user }) => {

    return (
        <Routes>
            <Route path="/dashboard" element={<DashboardLayout user={user} />}>
                <Route index element={<DashboardHome />} />
                <Route path="courses" element={<Course />} />
                <Route path="courses/create" element={<Course />} />
                <Route path="explore" element={<Course />} />
                <Route path="/calendar" element={<UserCalendar />} />
                <Route path="notes" element={<SharedNotes />} />
                <Route path="billing" element={<SubscriptionPage />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;