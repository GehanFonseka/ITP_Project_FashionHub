import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';



const DashboardContainer = styled.div`
    display: flex;
    height: 100vh;
    background-color: #f7f7f7;
    color: #333;
    font-family: 'Roboto', sans-serif;
    overflow: hidden;
`;

// Sidebar Styling
const Sidebar = styled.div`
    background-color: #111; 
    width: 260px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SidebarProfile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
`;

const ProfileImage = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #f44336; 
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    color: #fff;
`;

const ProfileName = styled.h3`
    margin-top: 15px;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
`;

// Sidebar List
const SidebarList = styled.ul`
    list-style-type: none;
    padding: 0;
    width: 100%;
`;

const SidebarItem = styled.li`
    margin: 15px 0;
    width: 100%;
`;

const SidebarLink = styled.a`
    color: #d3d3d3;
    text-decoration: none;
    font-size: 16px;
    font-weight: 400;
    padding: 12px 20px;
    border-radius: 10px;
    display: block;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: #f44336; /* Red hover effect for contrast */
        color: #fff;
    }
`;

// Main Content Styling
const MainContent = styled.div`
    flex: 1;
    padding: 30px;
    background-color: #fff;
    overflow-y: auto;
    border-top-left-radius: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: 'Roboto', sans-serif;
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
`;

const OverviewCard = styled.div`
    flex: 1;
    background-color: ${(props) => props.color || "#f44336"};
    padding: 25px;
    border-radius: 15px;
    margin: 0 15px;
    color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const OverviewCardHeader = styled.h3`
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    text-align: center;
`;

const OverviewCardNumber = styled.p`
    font-size: 34px;
    font-weight: 700;
    text-align: center;
`;

// Appointments Schedule Styling
const ContentSection = styled.div`
    flex: 1;
    background-color: #f0f3f5;
    padding: 30px;
    border-radius: 20px;
    margin: 0 15px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
    font-size: 20px;
    font-weight: 500;
    color: #333;
    margin-bottom: 15px;
    text-align: center;
`;

const Schedule = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
`;

const ScheduleItem = styled.div`
    background-color: #e1e5ee;
    padding: 20px;
    border-radius: 12px;
    color: #333;
    text-align: center;
    border: 1px solid #f44336; 
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }

    p {
        margin: 5px 0;
        font-size: 16px;
        font-weight: 400;
    }
`;

const ContentRow = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
    justify-content: space-between;
`;



const Dashboard = () => {
    const [totalAppointments, setTotalAppointments] = useState(0);
    const [totalServices, setTotalServices] = useState(0);
    const [todaysAppointments, setTodaysAppointments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/appointment/total');
                setTotalAppointments(response.data.totalAppointment);
                const servicesResponse = await axios.get('/api/services/total');
                setTotalServices(servicesResponse.data.totalServices);

                // Fetch daily appointments
                const todayResponse = await axios.get('/api/appointment/today');
                setTodaysAppointments(todayResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error);
                alert('Error fetching data. Please try again.');
            }
        };

        fetchData();
    }, []);

    return (
        <DashboardContainer>
            <Sidebar>
                <SidebarProfile>
                    <ProfileImage>
                        <FontAwesomeIcon icon={faUser} />
                    </ProfileImage>
                    <ProfileName>Salon Manager</ProfileName>
                </SidebarProfile>
                <SidebarList>
                    <SidebarItem><SidebarLink href="/">Home</SidebarLink></SidebarItem>
                    <SidebarItem><SidebarLink href="/Salonhome">Saloon</SidebarLink></SidebarItem>
                    <SidebarItem><SidebarLink href="/ALLAppointments">Appointments</SidebarLink></SidebarItem>
                    <SidebarItem><SidebarLink href="/ServiceListAD">Services</SidebarLink></SidebarItem>
                    <SidebarItem><SidebarLink href="/Register">Log Out</SidebarLink></SidebarItem>
                  
                </SidebarList>
            </Sidebar>
            <MainContent>
                <Overview>
                    <OverviewCard color="#2c3e50">
                        <OverviewCardHeader>Total Appointments</OverviewCardHeader>
                        <OverviewCardNumber>{totalAppointments}</OverviewCardNumber>
                    </OverviewCard>
                    <OverviewCard color="#34495e">
                        <OverviewCardHeader>Total Services</OverviewCardHeader>
                        <OverviewCardNumber>{totalServices}</OverviewCardNumber>
                    </OverviewCard>
                </Overview>
                <ContentRow>
                    <ContentSection>
                        <SectionTitle><b>Today's Appointments</b></SectionTitle>
                        <Schedule style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
  {todaysAppointments.length === 0 ? (
    <ScheduleItem style={{ padding: '15px', fontSize: '16px', color: '#777', textAlign: 'center' }}>
      No appointments for today.
    </ScheduleItem>
  ) : (
    todaysAppointments.map((appt) => (
      <ScheduleItem
        key={appt._id}
        style={{
          padding: '15px',
          marginBottom: '10px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#333' }}>Customer Name: {appt.name}</p>
        <p style={{ margin: '5px 0', fontSize: '16px', color: '#555' }}>Date: {new Date(appt.date).toLocaleDateString()}</p>
        <p style={{ margin: '5px 0', fontSize: '16px', color: '#555' }}>Time: {appt.time}</p>
        <p style={{ margin: '5px 0', fontSize: '16px', color: '#555' }}>Services: {appt.services.join(', ')}</p>
      </ScheduleItem>
    ))
  )}
</Schedule>

                    </ContentSection>
                </ContentRow>
            </MainContent>
        </DashboardContainer>
    );
};

export default Dashboard;
