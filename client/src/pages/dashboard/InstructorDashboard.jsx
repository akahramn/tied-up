import { Card, Row, Col, Statistic, Typography } from 'antd';
import {
    BookOutlined, CalendarOutlined, TeamOutlined, UploadOutlined
} from '@ant-design/icons';

const InstructorDashboard = () => {
    return (
        <>
            <Typography.Title level={4}>👨‍🏫 Eğitmen Paneli</Typography.Title>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic title="Verilen Ders" value={5} prefix={<BookOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic title="Toplam Öğrenci" value={18} prefix={<TeamOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic title="Yaklaşan Ders" value="15:00 / 3 Tem" prefix={<CalendarOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic title="Paylaşılan Not" value={7} prefix={<UploadOutlined />} />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default InstructorDashboard;
