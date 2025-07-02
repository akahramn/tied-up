import {Avatar, Button, Card, Col, Input, List, message, Modal, Row, Space, Tabs, Typography, Upload} from 'antd';
import {
    CalendarOutlined, DollarOutlined,
    EditOutlined,
    FileTextOutlined,
    StarFilled,
    TeamOutlined,
    UploadOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import {useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {getCourseById} from "../../services/course/CourseService";

const { Title, Paragraph } = Typography;

const CourseDetail = ({ user }) => {
    const { id } = useParams();

    const [materialModalOpen, setMaterialModalOpen] = useState(false);
    const [materialTitle, setMaterialTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [open, setOpen] = useState(false);
    const [course, setCourse] = useState(null);

    useEffect(() => {
        setup()
    }, [id]);

    const setup = () => {
        getCourseById(id).then(res => setCourse(res.data));
    }

    const handleMaterialUpload = () => {
        if (!materialTitle || fileList.length === 0) {
            message.warning("Başlık ve dosya yüklemelisiniz.");
            return;
        }
        // API çağrısı yapılabilir
        message.success("Materyal başarıyla eklendi.");
        setMaterialModalOpen(false);
        setMaterialTitle('');
        setFileList([]);
    };

    if (!course) return <p>Yükleniyor...</p>;

    const isLiveAvailable = dayjs(course.date).isBefore(dayjs().add(15, 'minute'));

    return (
        <Card style={{ background: '#fff', padding: 24 }}>
            <Title level={3}>{course.title}</Title>
            <Paragraph>{course.description}</Paragraph>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} sm={12} md={8}>
                    <Space direction="vertical" size="small">
                        <p><CalendarOutlined /> {dayjs(course.date).format('DD MMM YYYY HH:mm')}</p>
                        <p><TeamOutlined /> Kontenjan: {course.capacity}</p>
                        <p><DollarOutlined /> Fiyat: ₺{course.price}</p>
                    </Space>
                </Col>

                {(user?.role === 'INSTRUCTOR' || user?.role === 'ADMIN') && (
                    <Col xs={24} sm={12} md={16}>
                        <Space wrap>
                            <Button icon={<UploadOutlined />}>
                                Materyal Ekle
                            </Button>
                            <Button icon={<VideoCameraOutlined />} type="dashed">
                                Canlı Derse Başla
                            </Button>
                        </Space>
                    </Col>
                )}
            </Row>

            <Tabs defaultActiveKey="1" style={{ marginTop: 32 }}>
                <Tabs.TabPane tab="Tanım" key="1">
                    <Paragraph>{course.longDescription || 'Bu ders hakkında detaylı bilgi yakında.'}</Paragraph>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Katılımcılar" key="2">
                    {course.participants?.length > 0 ? (
                        <List
                            dataSource={course.participants}
                            renderItem={(p) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar>{p.name?.charAt(0)}</Avatar>}
                                        title={p.name}
                                        description={p.email}
                                    />
                                </List.Item>
                            )}
                        />
                    ) : <Paragraph>Henüz katılımcı yok.</Paragraph>}
                </Tabs.TabPane>

                <Tabs.TabPane tab="Materyaller" key="3">
                    {course.materials?.length > 0 ? (
                        <List
                            dataSource={course.materials}
                            renderItem={(m) => (
                                <List.Item>
                                    <FileTextOutlined style={{ marginRight: 8 }} />
                                    <a href={m.url} target="_blank" rel="noreferrer">{m.title}</a>
                                </List.Item>
                            )}
                        />
                    ) : <Paragraph>Henüz materyal eklenmedi.</Paragraph>}
                </Tabs.TabPane>

                <Tabs.TabPane tab="Yorumlar" key="4">
                    {course.comments?.length > 0 ? (
                        <List
                            dataSource={course.comments}
                            renderItem={(c) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar>{c.author?.charAt(0)}</Avatar>}
                                        title={<span>{c.author} <StarFilled style={{ color: '#fadb14', marginLeft: 8 }} /></span>}
                                        description={c.content}
                                    />
                                </List.Item>
                            )}
                        />
                    ) : <Paragraph>Henüz yorum yapılmadı.</Paragraph>}
                </Tabs.TabPane>
            </Tabs>

            {/* Materyal Ekle Modal */}
            <Modal
                title="Yeni Materyal Ekle"
                open={materialModalOpen}
                onOk={handleMaterialUpload}
                onCancel={() => setMaterialModalOpen(false)}
                okText="Ekle"
                cancelText="İptal"
            >
                <Input
                    placeholder="Materyal Başlığı"
                    value={materialTitle}
                    onChange={e => setMaterialTitle(e.target.value)}
                    style={{ marginBottom: 16 }}
                />
                <Upload
                    fileList={fileList}
                    beforeUpload={(file) => {
                        setFileList([file]);
                        return false;
                    }}
                    onRemove={() => setFileList([])}
                >
                    <Button icon={<UploadOutlined />}>Dosya Seç</Button>
                </Upload>
            </Modal>
        </Card>
    );
};

export default CourseDetail;
