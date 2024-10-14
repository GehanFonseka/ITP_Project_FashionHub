import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginMain = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1a1a1a;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.div`
  width: 400px;
  padding: 40px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 15px 0;
  border: 1px solid #aaa;
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const LinkStyled = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', { email, password });
      if (response.status === 200) {
        toast.success('Login successful!');
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/userDashboard'); // Redirect to dashboard
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <LoginMain>
      <LoginForm>
        <h2 style={{ textAlign: 'center', color: '#AE2012' }}>Login</h2>
        <form onSubmit={handleLogin}>
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit">Login</Button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Don't have an account? <LinkStyled to="/register">Register</LinkStyled>
        </p>
      </LoginForm>
      <ToastContainer />
    </LoginMain>
  );
};

export default Login;
