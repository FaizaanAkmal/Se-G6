import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import JobPostForm from './pages/createJob.jsx'
import Page1 from './pages/onboarding/company/Page1.jsx';
import Page2 from './pages/onboarding/company/Page2.jsx';

function App() {
  const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} /> */}
        {/* <Route path='/' element={<Page1 />} /> */}
        <Route path='/signup' element = {<Signup />}/>
        <Route path='/login' element = {<Login />}/>
        <Route path='/createjob' element = {<JobPostForm />}/>
        <Route path='/' element={<Page2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
