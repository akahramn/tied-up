// src/pages/Login.js
import React from 'react';
import {Form, Input, Button, Typography, Card, message} from 'antd';
import { Link } from 'react-router-dom';
import {login} from "../../services/authService";

const Login = () => {
    const onFinish = async (values) => {
        try {
            const loginResponse = await login(values);
            if (loginResponse && loginResponse.status === 200) {
                localStorage.setItem('token', loginResponse.data.access_token);
                localStorage.setItem('fullname', loginResponse.data.full_name);
                localStorage.setItem('role', loginResponse.data.role);
                window.location.href = "/";
            }
        } catch (error) {
            message.error(error.response.data.message);
        }

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
            <Card style={{ maxWidth: 400, width: '100%', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <img src="/logo.png" alt="Logo" style={{ height: 48, marginBottom: 8 }} />
                    <Typography.Title level={3}>Giriş Yap</Typography.Title>
                </div>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item name="email" label="E-posta" rules={[{ required: true, message: 'E-posta giriniz' }]}>
                        <Input type="email" placeholder="example@mail.com" />
                    </Form.Item>

                    <Form.Item name="password" label="Şifre" rules={[{ required: true, message: 'Şifre giriniz' }]}>
                        <Input.Password placeholder="••••••" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Giriş Yap
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ textAlign: 'center', marginTop: 16 }}>
                    <Typography.Text>
                        Hesabın yok mu? <Link to="/register">Kayıt Ol</Link>
                    </Typography.Text>
                </div>
            </Card>
        </div>
    );
};

export default Login;
