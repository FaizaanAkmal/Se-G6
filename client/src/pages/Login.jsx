import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });
    
      localStorage.setItem('authToken', response.data.token);

      navigate('/main');
      
      console.log('Login successful');
      setSuccessMessage('Login successful');
    } 
    catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>} 
      {successMessage && <p>{successMessage}</p>} 
      <form onSubmit={loginUser}>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email"  
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}