import { Card, Row, Col, Statistic, Typography } from 'antd';
import {
    BookOutlined, CalendarOutlined, MessageOutlined, UploadOutlined
} from '@ant-design/icons';

const StudentDashboard = () => {
    return (
        <>
            <Typography.Title level={4}>🎓 Öğrenci Paneli</Typography.Title>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic title="Kayıtlı Ders" value={4} prefix={<BookOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic title="Yaklaşan Ders" value="12:00 / 2 Tem" prefix={<CalendarOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic title="Yeni Notlar" value={2} prefix={<UploadOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic title="Yeni Mesajlar" value={1} prefix={<MessageOutlined />} />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default StudentDashboard;
