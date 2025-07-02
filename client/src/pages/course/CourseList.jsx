import { Card, Col, Row, Tooltip, Tag } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    CalendarOutlined,
    TeamOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const CourseList = ({ courses, onEdit, onDelete, onView }) => {
    if (!courses.length) {
        return (
            <div style={{ textAlign: 'center', marginTop: 100 }}>
                <img src="/empty-state.svg" alt="No courses" width={200} />
                <p>Henüz ders oluşturmadınız.</p>
            </div>
        );
    }

    return (
        <Row gutter={[16, 16]}>
            {courses.map(course => (
                <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
                    <Card
                        title={
                            <span style={{ fontWeight: 600 }}>{course.title}</span>
                        }
                        extra={<Tag color="green">Aktif</Tag>}
                        actions={[
                            <Tooltip title="Görüntüle"><EyeOutlined onClick={() => onView(course)} /></Tooltip>,
                            <Tooltip title="Düzenle"><EditOutlined onClick={() => onEdit(course)} /></Tooltip>,
                            <Tooltip title="Sil"><DeleteOutlined onClick={() => onDelete(course.id)} /></Tooltip>
                        ]}
                    >
                        <p>{course.description}</p>
                        <p><CalendarOutlined /> {dayjs(course.date).format('DD MMM YYYY HH:mm')}</p>
                        <p><TeamOutlined /> Fiyat: {course.price || 'Belirtilmemiş'}</p>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default CourseList;
