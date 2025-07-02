import React, {use, useEffect} from "react";
import {Button, Drawer, Form, Input, InputNumber, message, Select} from "antd";
import {createCourse, updateCourse} from "../../services/course/CourseService";
const { Option } = Select;


const CourseEdit = ({open, setOpen, fetchCourses, userId, course}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (course) {
            form.setFieldsValue(course);
        } else {
            form.resetFields();
        }
    }, [course, form]);

    const handleCreateOrUpdate = async (values) => {
        try {
            const payload = {
                ...values,
                instructorId: userId,
            };

            if (course && course.id) {
                await updateCourse(course.id, payload);
                message.success('Ders güncellendi');
            } else {
                await createCourse(payload);
                message.success('Ders oluşturuldu');
            }

            setOpen(false);
            form.resetFields();
            fetchCourses();
        } catch (err) {
            console.error(err);
            message.error('Bir hata oluştu.');
        }
    };

    return (
        <Drawer
            title={course ? 'Dersi Düzenle' : 'Yeni Ders Oluştur'}
            placement="right"
            onClose={() => setOpen(false)}
            open={open}
            width={400}
        >
            <Form layout="vertical" form={form} onFinish={handleCreateOrUpdate}>
                <Form.Item name="title" label="Ders Adı" rules={[{ required: true, message: 'Bu alan zorunludur' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Açıklama" rules={[{ required: true, message: 'Bu alan zorunludur' }]}>
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Fiyat (₺)"
                    rules={[
                        { required: true, message: 'Lütfen bir fiyat girin' },
                        {
                            type: 'number',
                            min: 1,
                            message: 'Fiyat en az 1 ₺ olmalıdır'
                        }
                    ]}
                >
                    <InputNumber
                        min={1}
                        style={{ width: '100%' }}
                        formatter={(value) => `₺ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/₺\s?|(,*)/g, '')}
                        step={5}
                        placeholder="Örn: 150"
                    />
                </Form.Item>

                <Form.Item name="category" label="Kategori" rules={[{ required: true, message: 'Bu alan zorunludur' }]}>
                    <Select placeholder="Kategori seçin">
                        <Option value="Yazılım">Yazılım</Option>
                        <Option value="Müzik">Müzik</Option>
                        <Option value="Sanat">Sanat</Option>
                        <Option value="Dil">Dil</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Kaydet
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
}

export default CourseEdit;