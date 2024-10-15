import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Dashboard Container with modern spacing and responsive height
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #f7f8fc; /* Clean light background for a modern feel */
  min-height: 100vh; /* Ensure it covers full viewport height */
  font-family: 'Roboto', sans-serif; /* Modern font */
  margin-top: 70px; /* Adjusted for spacing */
`;

// Header with larger padding and soft shadow
const Header = styled.div`
  width: 100%;
  max-width: 900px; /* Limit width for better readability */
  background-color: #E76F51; /* Primary color */
  color: #ffffff; /* White text for contrast */
  padding: 40px;
  text-align: center;
  border-radius: 15px;
  margin-bottom: 40px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); /* Softer and larger shadow */
  position: relative;
`;

// User Name with improved font size and weight
const UserName = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
`;

// User Email with a lighter font and subtle margin
const UserEmail = styled.p`
  font-size: 20px;
  color: #fcefe9;
  margin-top: 12px;
`;

// Section with more padding and spacing
const Section = styled.div`
  width: 100%;
  max-width: 900px; /* Keep the sections aligned with the header */
  background-color: #ffffff;
  padding: 30px;
  margin-bottom: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Light shadow for section */
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px); /* Slight lift on hover for interactivity */
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12); /* Enhanced shadow on hover */
  }
`;

// Section Title with bold font
const SectionTitle = styled.h3`
  font-size: 26px;
  margin-bottom: 15px;
  color: #2f3640; /* Darker color for a professional look */
`;

// Button styling remains the same as per your request
const Button = styled(Link)`
  display: inline-block;
  width: 200px;
  height: 50px;
  background-color: #5C646C;
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
    background-color: #4a575c;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

// Logout Button with more padding and a slight shadow
const LogoutButton = styled.button`
  position: absolute;
  top: 20px;
  right: 30px;
  background-color: #c0392b;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #a93226;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Add shadow effect on hover */
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

  // Logout Functionality
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/Register'); // Redirect to Register page after logout
  };

  if (!user) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <DashboardContainer>
      <Header>
        <UserName>Welcome, {user.name}!</UserName>
        <UserEmail>{user.email}</UserEmail>
        {/* Logout Button */}
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
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
