import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LiveSession from "./pages/LiveSession";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/live/:isInstructor" element={<LiveSession />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
