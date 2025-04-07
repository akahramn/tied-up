import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LiveSession from "./pages/LiveSession";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/live/:isInstructor" element={<LiveSession />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
