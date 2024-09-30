import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterMain = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1a1a1a; /* Darker background for men's fashion */
  justify-content: center;
  align-items: center;
`;

const RegisterForm = styled.div`
  width: 400px;
  padding: 40px;
  border-radius: 12px;
  background-color: #ffffff; /* Light contrast */
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 15px 0;
  border: 1px solid #aaa; /* Lighter gray border */
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.3s;

  &:focus {
    border-color: #007bff; /* Highlighted border */
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #007bff; /* Blue button */
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
`;

const LinkStyled = styled(Link)`
  color: #007bff; /* Adjusted to match the new theme */
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const AdminButton = styled(Button)`
  background-color: #AE2012; /* Red for admin login */
  margin-top: 20px;

  &:hover {
    background-color: #8b1b0f; /* Darker red on hover */
  }
`;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/User/', { name, email, password });
      if (response.status === 201) {
        toast.success('Registration successful! You can now login.');
        navigate('/login');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const handleAdminLogin = () => {
    navigate('/loginregister'); // Adjust the path as per your routing setup
  };
  
  return (
    <RegisterMain>
      <RegisterForm>
        <h2 style={{ textAlign: 'center', color: '#AE2012' }}>Register</h2>
        <form onSubmit={handleRegister}>
          <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit">Register</Button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Already have an account? <LinkStyled to="/login">Login</LinkStyled>
        </p>
        <AdminButton onClick={handleAdminLogin}>Login as Admin</AdminButton>
      </RegisterForm>
      <ToastContainer />
    </RegisterMain>
  );
};

export default Register;
