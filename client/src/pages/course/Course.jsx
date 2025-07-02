import React, {useEffect, useState} from 'react';
import {Button, Drawer, Form, Input, InputNumber, message, Select, Typography} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {createCourse, getCourseListByUserId} from "../../services/course/CourseService";
import CourseList from "./CourseList";
import {useNavigate} from "react-router-dom";
import CourseEdit from "./CourseEdit";

const { Title } = Typography;
const { Option } = Select;


const Course = ({user}) => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const fetchCourses = async () => {
        try {
            const res = await getCourseListByUserId(user.id);
            setCourses(res.data);
        } catch (err) {
            console.log(err);
            message.error('Dersler alınamadı.');
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Title level={4}>👋 Merhaba, derslerini buradan yönetebilirsin!</Title>
                <Button icon={<PlusOutlined />} type="primary" onClick={() => {
                    setOpen(true)
                    setSelectedCourse(null);
                }}>
                    Yeni Ders Oluştur
                </Button>
            </div>

            <CourseList
                courses={courses}
                onEdit={(course) => {
                    setSelectedCourse(course)
                    setOpen(true)
                }}
                onView={(course) => navigate(`/courses/${course.id}`)}
                onDelete={(id) => console.log("Delete", id)}
            />

            <CourseEdit
                open={open}
                setOpen={setOpen}
                fetchCourses={fetchCourses}
                course={selectedCourse}
                userId={user.id}
            />
        </>
    );
}

export default Course;