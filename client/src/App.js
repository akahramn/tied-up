import './App.css';
import '@ant-design/v5-patch-for-react-19';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LiveSession from "./pages/LiveSession";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AppRoutes from "./routes/AppRoutes";
import {useEffect, useState} from "react";
import {getMe} from "./services/authService";
import {Spin} from "antd";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const resp = await getMe();
                setUser(resp.data);
            } catch (err) {
                console.warn('Giriş yapılmamış ya da token hatalı');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spin size="large" tip="Yükleniyor..." />
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<AppRoutes user={user} />} />
                <Route path="/live/:isInstructor" element={<LiveSession />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
