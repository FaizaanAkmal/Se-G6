import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import axios from 'axios';
import Page3 from './pages/onboarding/company/Page3.jsx';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JobPostForm from './pages/createJob.jsx'
import Page1 from './pages/onboarding/company/Page1.jsx';
import Page2 from './pages/onboarding/company/Page2.jsx';

axios.defaults.baseURL= ' http://localhost:8000'
axios.defaults.withCredentials=true
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/main' element={<Page1 />} />
        <Route path='/login' element = {<Login />}/>
        <Route path='/createjob' element = {<JobPostForm />}/>
        <Route path='/' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

