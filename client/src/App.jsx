import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import axios from 'axios';
import Page1 from './pages/onboarding/company/Page1.jsx';
import Page3 from './pages/onboarding/company/Page3.jsx';
// import Page1 from './pages/onboarding/dev/Page1.jsx';
// import Page2 from './pages/onboarding/dev/Page2.jsx';
// import Page3 from './pages/onboarding/dev/Page3.jsx';

axios.defaults.baseURL= ' http://localhost:8000'
axios.defaults.withCredentials=true
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />

        <Route path='/main' element={<Page1 />} />
        {/* <Route path='/' element={<Page3 />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

