import { Card, Row, Col, Statistic, Typography } from 'antd';
import {
    TeamOutlined, BookOutlined, CreditCardOutlined, NotificationOutlined
} from '@ant-design/icons';

const AdminDashboard = () => {
    return (
        <>
            <Typography.Title level={4}>🛠️ Admin Paneli</Typography.Title>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic title="Toplam Kullanıcı" value={122} prefix={<TeamOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic title="Aktif Ders" value={37} prefix={<BookOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic title="Aboneliği Aktif Eğitmen" value={22} prefix={<CreditCardOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic title="Yeni Bildirim" value={3} prefix={<NotificationOutlined />} />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default AdminDashboard;
