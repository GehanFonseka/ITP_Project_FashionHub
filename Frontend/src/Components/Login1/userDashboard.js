import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Dashboard Container
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #f0f2f5; /* Soft gray background for a professional feel */
  height: 100vh;
  font-family: 'Roboto', sans-serif; /* Modern font */
  margin-top: 90px;
`;

// Header
const Header = styled.div`
  width: 100%;
  background-color: #E76F51; /* Primary color */
  color: #ffffff; /* White text for contrast */
  padding: 30px;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Softer shadow */
`;

// User Name
const UserName = styled.h2`
  font-size: 34px;
  font-weight: bold;
  margin: 0;
  color: #ffffff; /* White for better visibility */
`;

// User Email
const UserEmail = styled.p`
  font-size: 18px;
  color: #f0f2f5; /* Light gray for subtlety */
  margin-top: 10px;
`;

// Section Container
const Section = styled.div`
  width: 100%;
  background-color: #ffffff;
  padding: 25px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Light shadow */
`;

// Section Title
const SectionTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 15px;
  color: #5C646C; /* Secondary color */
`;

// Button
const Button = styled(Link)`
  display: inline-block;
  width: 200px; /* Set a fixed width for all buttons */
  height: 50px; /* Set a fixed height for uniformity */
  background-color: #5C646C; /* Secondary color */
  color: white;
  padding: 12px 20px; /* Padding can remain the same */
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #4a575c; /* Darker shade on hover */
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
        <SectionTitle>My Salon Appointments</SectionTitle>
        <Button to="/MyAppointmentForm">View Appointments</Button>
      </Section>
      <Section>
        <SectionTitle>My Tickets</SectionTitle>
        <Button to="/View">View Tickets</Button>
      </Section>
    
    </DashboardContainer>
  );
};

export default UserDashboard;
