import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import authService from '../../Services/authService';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Customer');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register({ name, email, password, role });
      if (response) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Failed to register', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <Title>Register</Title>
        <Label>Name</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Label>Role</Label>
        <Select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="Customer">Customer</option>
          <option value="salon manager">Salon Manager</option>
          <option value="review manager">Review Manager</option>
          <option value="clothing manager">Clothing Manager</option>
          <option value="order manager">Order Manager</option>
          <option value="support manager">Support Manager</option>
          <option value="finance manager">Finance Manager</option>
        </Select>
        <Button type="submit">Register</Button>
        <LinkContainer>
          <LinkText>Already have an account?</LinkText>
          <StyledLink to="/Login">Login</StyledLink>
        </LinkContainer>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;

// Styled Components
const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const RegisterForm = styled.form`
  background-color: #323952;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #ffffff;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #ffffff;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #444b6b;
  background-color: #ffffff;
  color: #000000;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #444b6b;
  background-color: #ffffff;
  color: #000000;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #444b6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #555d7d;
  }
`;

const LinkContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const LinkText = styled.span`
  font-size: 0.9rem;
  color: #ffffff;
`;

const StyledLink = styled(Link)`
  color: #ae2012;
  text-decoration: none;
  margin-left: 5px;

  &:hover {
    text-decoration: underline;
  }
`;
