import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
// import Page1 from './pages/onboarding/company/Page1.jsx';
// import Page2 from './pages/onboarding/company/Page2.jsx';
// import Page3 from './pages/onboarding/company/Page3.jsx';
// import Page1 from './pages/onboarding/dev/Page1.jsx';
import Page2 from './pages/onboarding/dev/Page2.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} /> */}
        {/* <Route path='/' element={<Page1 />} /> */}
        <Route path='/' element={<Page2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
