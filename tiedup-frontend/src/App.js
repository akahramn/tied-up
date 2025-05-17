import './App.css';
import '@ant-design/v5-patch-for-react-19';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LiveSession from "./pages/LiveSession";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import DashboardLayout from "./pages/dashboard/DashboardLayout";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />} />
          <Route path="/live/:isInstructor" element={<LiveSession />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
