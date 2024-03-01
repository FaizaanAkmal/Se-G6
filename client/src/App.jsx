import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'
import MainPage from './pages/Main'



axios.defaults.baseURL= ' http://localhost:8000'
axios.defaults.withCredentials=true
function App() {
 
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/main' element={<MainPage/>} />
        
      </Routes>
    </>
  )
}

export default App
