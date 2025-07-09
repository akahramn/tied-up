import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Input, Radio, Row, Select, Tag} from 'antd';
import {
    BookOutlined,
    CalendarOutlined,
    EditOutlined,
    EyeOutlined,
    MoneyCollectOutlined, UserAddOutlined,
    UserOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import {enrollCourse, searchCourse} from "../../services/course/CourseService";
import {useNavigate} from "react-router-dom";

const { Search } = Input;
const { Option } = Select;
const initialFilters = {
    query: null,
    category: null,
    priceType: "all",
    page: 0,
    size: 12,
    sortBy: "createdAt",
    sortDirection: "DESC"
};
const ExploreCourses = ({ user }) => {
    const [courses, setCourses] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filters, setFilters] = useState(initialFilters);
    const navigate = useNavigate();

    useEffect(() => {
        // tüm kursları getir
        searchCourse(filters).then(res => {
            console.log('res', res.data);
            setCourses(res.data.content);
            setFiltered(res.data);
        });
    }, []);

    useEffect(() => {
        searchCourse(filters).then(res => {
            setCourses(res.data.content);
            setFiltered(res.data);
        })
    }, [filters])

    useEffect(() => {
        // filtre uygulama
        let result = [...courses];

        if (filters.search)
            result = result.filter(c =>
                c.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                c.instructorName?.toLowerCase().includes(filters.search.toLowerCase())
            );

        if (filters.category)
            result = result.filter(c => c.category === filters.category);

        if (filters.freeOnly !== null)
            result = result.filter(c => filters.freeOnly ? c.price === 0 : c.price > 0);

        if (filters.date)
            result = result.filter(c =>
                dayjs(c.date).isSame(filters.date, 'day')
            );

        setFiltered(result);
    }, [filters, courses]);

    const handleReset = () => {
        setFilters({
            search: '',
            category: null,
            freeOnly: null,
            date: null
        });
    };

    return (
        <div style={{ padding: '24px' }}>
            {/* Arama Satırı */}
            <Row justify="center" style={{marginBottom: 16}}>
                <Col xs={24} md={16}>
                    <Search
                        onSearch={(value) => setFilters(prev => ({
                            ...prev,
                            query: value
                        }))}
                        placeholder="Kurs adı veya eğitmen ara" enterButton allowClear/>
                </Col>
            </Row>

            {/* Filtreleme Satırı */}
            <Row justify="center" gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={12} md={5}>
                    <Select
                        onChange={(value) => setFilters(prev => ({
                            ...prev,
                            category: value
                        }))}
                        placeholder="Kategori seçin" style={{width: '100%'}}>
                        <Option value="Yazılım">Yazılım</Option>
                        <Option value="Müzik">Müzik</Option>
                        <Option value="Sanat">Sanat</Option>
                        <Option value="Dil">Dil</Option>
                    </Select>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <Radio.Group
                        onChange={(e) => setFilters(prev => ({
                            ...prev,
                            priceType: e.target.value
                        }))}
                        defaultValue="all">
                        <Radio value="all">Tümü</Radio>
                        <Radio value="free">Sadece Ücretsiz</Radio>
                        <Radio value="paid">Sadece Ücretli</Radio>
                    </Radio.Group>
                </Col>

                <Col xs={24} sm={12} md={4}>
                    <Button onClick={() => setFilters(initialFilters)} block type="default">Filtreleri Temizle</Button>
                </Col>
            </Row>

            {/* Kurs Kartları */}
            <Row gutter={[16, 16]} justify="center">
                {courses.map(course => (
                    <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
                        <Card
                            title={course.title}
                            extra={<Tag icon={<BookOutlined />}>{course.category}</Tag>}
                            actions={[
                                <EyeOutlined onClick={() => navigate(`/courses/${course.id}`)} />,
                                <UserAddOutlined onClick={() => enrollCourse(course.id)} />
                            ]}
                        >
                            <p><CalendarOutlined /> {dayjs(course.date).format('DD MMM YYYY HH:mm')}</p>
                            <p><UserOutlined /> Eğitmen: {course.instructorName || 'Bilinmiyor'}</p>
                            <p><MoneyCollectOutlined /> Fiyat: ₺{course.price}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ExploreCourses;