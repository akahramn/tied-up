import React, {useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Course from "../pages/course/Course";
import UserCalendar from "../pages/calendar/UserCalendar";
import SharedNotes from "../pages/notes/SharedNotes";
import SubscriptionPage from "../pages/billing/SubscriptionPage";
import CourseDetail from "../pages/course/CourseDetail";
import ExploreCourses from "../pages/explore/ExploreCourses";


const AppRoutes = ({ user }) => {

    return (
        <Routes>
            <Route path="/" element={<DashboardLayout user={user} />}>
                <Route index element={<DashboardHome />} />
                {/*Course*/}
                <Route path="courses" element={<Course user={user} />} />
                <Route path="courses/:id" element={<CourseDetail user={user} />} />
                <Route path="explore" element={<ExploreCourses user={user} />} />
                <Route path="calendar" element={<UserCalendar />} />
                <Route path="notes" element={<SharedNotes />} />
                <Route path="notes/share" element={<SharedNotes />} />
                <Route path="billing" element={<SubscriptionPage />} />
                <Route path="messages" element={<div>Mesajlar</div>} />
                <Route path="participants" element={<div>Katılımcılarım</div>} />

                {/* Catch-All */}
                <Route path="*" element={<Navigate to="/" />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;