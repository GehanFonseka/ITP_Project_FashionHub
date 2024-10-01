import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #f4f4f4;
  height: 100vh;
  font-family: Arial, sans-serif;
  margin-top: 50px;
`;

const Header = styled.div`
  width: 100%;
  background-color: #f8f9fa;
  color: #333;
  padding: 30px;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const UserName = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin: 0;
  color: #007bff;
`;

const UserEmail = styled.p`
  font-size: 18px;
  color: #555;
  margin-top: 10px;
`;

const Section = styled.div`
  width: 100%;
  background-color: #ffffff;
  padding: 25px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 22px;
  margin-bottom: 15px;
  color: #333;
`;

const Button = styled(Link)`
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if no token
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login'); // Redirect to login on error
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <DashboardContainer>
      <Header>
        <UserName>Welcome, {user.name}!</UserName>
        <UserEmail>{user.email}</UserEmail>
      </Header>
      <Section>
        <SectionTitle>My Reviews</SectionTitle>
        <Button to="/MyReviews">View Reviews</Button>
      </Section>
      <Section>
        <SectionTitle>Delivery Confirmation</SectionTitle>
        <Button to="/delivery">Confirm Delivery</Button>
      </Section>
    </DashboardContainer>
  );
};

export default UserDashboard;
