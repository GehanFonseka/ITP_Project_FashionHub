import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import authService from '../../Services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login({ email, password });
      if (response) {
        navigate('/home'); // Redirect to home page or dashboard upon successful login
      }
    } catch (error) {
      console.error('Failed to login', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Login</Title>
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
        <Button type="submit">Login</Button>
        <LinkContainer>
          <LinkText>Don't have an account?</LinkText>
          <StyledLink to="/register">Register</StyledLink>
        </LinkContainer>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;

// Styled Components
const LoginContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LoginForm = styled.form`
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
