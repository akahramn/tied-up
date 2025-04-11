// src/pages/Register.js
import React from 'react';
import { Form, Input, Button, Typography, Select, Card } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;

const Register = () => {
    const onFinish = (values) => {
        console.log('Kayıt Bilgileri:', values);
        // TODO: API çağrısı
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F5F7F0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem'
        }}>
            <Card style={{ maxWidth: 450, width: '100%', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <img src="/logo.png" alt="Logo" style={{ height: 48, marginBottom: 8 }} />
                    <Typography.Title level={3}>Kayıt Ol</Typography.Title>
                </div>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item name="fullName" label="Ad Soyad" rules={[{ required: true, message: 'Adınızı girin' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="email" label="E-posta" rules={[{ required: true, message: 'E-posta girin' }]}>
                        <Input type="email" />
                    </Form.Item>

                    <Form.Item name="password" label="Şifre" rules={[{ required: true, message: 'Şifre girin' }]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="role" label="Rol" rules={[{ required: true, message: 'Rol seçin' }]}>
                        <Select placeholder="Rol Seçin">
                            <Option value="student">Öğrenci</Option>
                            <Option value="instructor">Eğitmen</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Kayıt Ol
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ textAlign: 'center', marginTop: 16 }}>
                    <Typography.Text>
                        Zaten hesabın var mı? <Link to="/login">Giriş Yap</Link>
                    </Typography.Text>
                </div>
            </Card>
        </div>
    );
};

export default Register;
