import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
