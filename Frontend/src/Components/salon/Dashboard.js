import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faShoppingCart, faUser, faSignOutAlt, faHome, faScissors, faClipboardList } from '@fortawesome/free-solid-svg-icons';


const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: 'Inter', sans-serif;
`;


const Sidebar = styled.div`
  background-color: #001529; /* Dark blue */
  width: 250px;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

const SidebarLogo = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
`;

const SidebarItem = styled.a`
  color: #bfbfbf;
  padding: 15px 20px;
  text-decoration: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  transition: all 0.3s;

  &:hover {
    background-color: #1890ff; /* Blue */
    color: #fff;
  }

  &.active {
    background-color: #1890ff; /* Blue */
    color: #fff;
  }

  svg {
    margin-right: 15px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
`;


const Header = styled.div`
  background-color: #fff;
  padding: 15px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
`;

const ProfileMenu = styled.div`
  display: flex;
  align-items: center;

  .profile-name {
    margin-right: 15px;
    font-size: 16px;
    color: #333;
  }

  .profile-icon {
    font-size: 24px;
    color: #1890ff;
    cursor: pointer;
  }
`;


const OverviewCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const Card = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  min-width: 250px;

  &:last-child {
    margin-right: 0;
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #8c8c8c;
  margin-bottom: 10px;
`;

const CardNumber = styled.p`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #000;
`;


const Section = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  background-color: #fafafa;
  color: #8c8c8c;
  border-bottom: 1px solid #f0f0f0;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #fafafa;
  }
`;

const TableData = styled.td`
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
`;


const Button = styled.button`
  background-color: #1890ff;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;

  &:hover {
    background-color: #40a9ff;
  }
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
      {/* Sidebar */}
      <Sidebar>
        <SidebarLogo>Salon Manager</SidebarLogo>
        <SidebarItem href="/">
          <FontAwesomeIcon icon={faHome} />
          Home
        </SidebarItem>
        <SidebarItem href="/Salonhome">
          <FontAwesomeIcon icon={faScissors} />
          Salon
        </SidebarItem>
        <SidebarItem href="/ALLAppointments">
          <FontAwesomeIcon icon={faCalendarAlt} />
          Appointments
        </SidebarItem>
        <SidebarItem href="/ServiceListAD">
          <FontAwesomeIcon icon={faClipboardList} />
          Services
        </SidebarItem>
        <SidebarItem href="/Register">
          <FontAwesomeIcon icon={faSignOutAlt} />
          Log Out
        </SidebarItem>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        {/* Header */}
        <Header>
          <HeaderTitle>Dashboard</HeaderTitle>
          <ProfileMenu>
            <span className="profile-name">Admin</span>
            <FontAwesomeIcon className="profile-icon" icon={faUser} />
          </ProfileMenu>
        </Header>

        {/* Overview Cards */}
        <OverviewCards>
          <Card>
            <CardTitle>Total Appointments</CardTitle>
            <CardNumber>{totalAppointments}</CardNumber>
          </Card>
          <Card>
            <CardTitle>Total Services</CardTitle>
            <CardNumber>{totalServices}</CardNumber>
          </Card>
          {/* Add more cards as needed */}
        </OverviewCards>

        {/* Today's Appointments */}
        <Section>
          <SectionTitle>Today's Appointments</SectionTitle>
          {todaysAppointments.length === 0 ? (
            <p>No appointments for today.</p>
          ) : (
            <Table>
              <thead>
                <tr>
                  <TableHeader>Customer Name</TableHeader>
                  <TableHeader>Date</TableHeader>
                  <TableHeader>Time</TableHeader>
                  <TableHeader>Services</TableHeader>
                </tr>
              </thead>
              <tbody>
                {todaysAppointments.map((appt) => (
                  <TableRow key={appt._id}>
                    <TableData>{appt.name}</TableData>
                    <TableData>{new Date(appt.date).toLocaleDateString()}</TableData>
                    <TableData>{appt.time}</TableData>
                    <TableData>{appt.services.join(', ')}</TableData>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}
        </Section>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
