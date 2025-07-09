import {
    CalendarOutlined, TeamOutlined, DollarOutlined,
    UploadOutlined, VideoCameraOutlined,
    FileTextOutlined, LockOutlined, StarFilled
} from '@ant-design/icons';
import {
    Avatar, Button, Card, Col, Input, List, Modal,
    Row, Space, Tabs, Tooltip, Typography, Upload, message
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import {enrollCourse, getCourseById} from "../../services/course/CourseService"; // kendi axios instance'ını buradan import et

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const isInstructor = (user, course) => user?.role === 'INSTRUCTOR' && course?.instructorId === user?.id;
const isStudent = (user) => user?.role === 'STUDENT';

const CourseDetail = ({ user }) => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [materialModalOpen, setMaterialModalOpen] = useState(false);
    const [materialTitle, setMaterialTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [enrollment, setEnrollment] = useState(null);

    // Kayıt talebi modalı için
    const [requestModalOpen, setRequestModalOpen] = useState(false);
    const [enrollmentMessage, setEnrollmentMessage] = useState('');

    /*useEffect(() => {
        console.log("SETUP");
        setup()
    })*/


    useEffect(() => {
        console.log("DENEME");
        fetchCourse();
    }, [id]);

    const setup = async () => {
        fetchCourse();
    }

    const fetchCourse = async () => {
        try {
            const res = await getCourseById(id);
            setCourse(res.data);
            setEnrollment(res.data.enrollments.find(e => e.studentId === user?.id));
        } catch (err) {
            console.error("Kurs verisi alınırken hata:", err);
        }
    };

    const handleMaterialUpload = () => {
        // Upload işlemi (geliştirilecek)
        setMaterialModalOpen(false);
        setFileList([]);
        setMaterialTitle('');
    };

    const handleCommentSubmit = () => {
        // Yorum gönderme işlemi
        console.log('Yeni yorum:', newComment);
        setNewComment('');
    };

    const handleEnrollmentRequest = async () => {
        try {
            const data = {
                studentId: user?.id,
                courseId: course?.id,
                note: enrollmentMessage
            };
           await enrollCourse(data);
            message.success("Kayıt talebiniz gönderildi.");
            setRequestModalOpen(false);
            fetchCourse(); // sayfayı güncelle
        } catch (err) {
            console.error(err);
            message.error("Talep gönderilirken hata oluştu.");
        }
    };

    if (!course) return <Paragraph>Yükleniyor...</Paragraph>;

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

                {(isInstructor(user, course) || user?.role === 'ADMIN') && (
                    <Col xs={24} sm={12} md={16}>
                        <Space wrap>
                            <Button icon={<UploadOutlined />} onClick={() => setMaterialModalOpen(true)}>
                                Materyal Ekle
                            </Button>
                            <Button icon={<VideoCameraOutlined />} type="dashed">
                                Canlı Derse Başla
                            </Button>
                        </Space>
                    </Col>
                )}

                {isStudent(user) && enrollment == null && (
                    <Col span={24}>
                        <Button type="primary" onClick={() => setRequestModalOpen(true)}>
                            Kayıt Talebi Gönder
                        </Button>
                    </Col>
                )}

                {isStudent(user) && enrollment !== null && enrollment.status === "PENDING" && (
                    <Col span={24}>
                        <Paragraph type="secondary">Kayıt talebiniz eğitmen tarafından değerlendiriliyor.</Paragraph>
                    </Col>
                )}
            </Row>

            <Tabs defaultActiveKey="1" style={{ marginTop: 32 }}>
                <Tabs.TabPane tab="Tanım" key="1">
                    <Paragraph>{course.longDescription || 'Bu ders hakkında detaylı bilgi yakında.'}</Paragraph>
                </Tabs.TabPane>

                {(isInstructor(user, course) || user?.role === 'ADMIN') && (
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
                )}

                <Tabs.TabPane tab="Materyaller" key="3">
                    <List
                        dataSource={course.materials}
                        renderItem={(material) => (
                            <List.Item>
                                <FileTextOutlined style={{ marginRight: 8 }} />
                                {enrollment !== null && enrollment.status === "SUCCESS" ?  (
                                    <a href={material.url} target="_blank" rel="noreferrer">
                                        {material.title}
                                    </a>
                                ) : (
                                    <Tooltip title="Bu materyali görmek için derse kayıt olun.">
                                        <span style={{ color: 'gray', cursor: 'not-allowed' }}>
                                            <LockOutlined style={{ marginRight: 4 }} />
                                            {material.title}
                                        </span>
                                    </Tooltip>
                                )}
                            </List.Item>
                        )}
                    />
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

                    {enrollment !== null && enrollment.status === "SUCCESS" && (
                        <div style={{ marginTop: 16 }}>
                            <TextArea
                                rows={3}
                                placeholder="Yorumunuzu yazın..."
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                            />
                            <Button type="primary" onClick={handleCommentSubmit} style={{ marginTop: 8 }}>
                                Gönder
                            </Button>
                        </div>
                    )}
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

            {/* Kayıt Talebi Modal */}
            <Modal
                title="Kayıt Talebi Gönder"
                open={requestModalOpen}
                onOk={handleEnrollmentRequest}
                onCancel={() => setRequestModalOpen(false)}
                okText="Gönder"
                cancelText="İptal"
            >
                <TextArea
                    rows={4}
                    placeholder="Eğitmene bir mesaj bırakabilirsiniz..."
                    value={enrollmentMessage}
                    onChange={e => setEnrollmentMessage(e.target.value)}
                />
            </Modal>
        </Card>
    );
};

export default CourseDetail;
