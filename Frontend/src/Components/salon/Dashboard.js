import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import logo from '../../assets/Logo6.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const styles = {
    dashboard: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#1f2937',
        color: '#ecf0f1',
        marginTop: '80px',
    },
   
    sidebarTitle: {
        marginTop: '30px',
        margin: 0,
        fontSize: '24px',
        marginBottom: '20px',
    },
    sidebarList: {
        listStyleType: 'none',
        padding: 0,
    },
    sidebarItem: {
        marginBottom: '10px',
    },
    sidebarLink: {
        color: '#ecf0f1',
        textDecoration: 'none',
        fontSize: '18px',
        display: 'block',
        padding: '20px',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
    },
    sidebarLinkHover: {
        backgroundColor: '#34495e',
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        overflowY: 'auto',
    },
    topBar: {
        backgroundColor: '#34495e',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topBarTitle: {
        margin: 0,
        fontSize: '24px',
    },
    overview: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    overviewCard: {
        flex: 1,
        backgroundColor: '#2d3748',
        padding: '20px',
        borderRadius: '8px',
        margin: '0 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    overviewCardHeader: {
        fontSize: '20px',
        marginBottom: '10px',
    },
    overviewCardNumber: {
        fontSize: '36px',
        fontWeight: 'bold',
    },
    contentRow: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    contentSection: {
        flex: 1,
        backgroundColor: '#2d3748',
        padding: '20px',
        borderRadius: '8px',
        margin: '0 10px',
        display: 'flex',
        flexDirection: 'column',
    },
    sectionTitle: {
        fontSize: '18px',
        marginBottom: '10px',
    },
    schedule: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '10px',
    },
    scheduleItem: {
        backgroundColor: '#3b4252',
        padding: '10px',
        borderRadius: '8px',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    statsGraph: {
        height: '150px',
        backgroundColor: '#2c5282',
        borderRadius: '8px',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    revenueGraph: {
        height: '150px',
        backgroundColor: '#2c5282',
        borderRadius: '8px',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

const Dashboard = () => {
    const [totalAppointments, setTotalAppointments] = useState(0);
    const [totalServices, setTotalServices] = useState(0);

    // Fetch total appointments and services from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/appointment/total');
                setTotalAppointments(response.data.totalAppointment);
                const servicesResponse = await axios.get('/api/services/total');
                setTotalServices(servicesResponse.data.totalServices);
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Error fetching data. Please try again.');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Nav>
                <Logo src={logo} alt="Logo" />
                <Menu>
                    <MenuItem href="/">Home</MenuItem>
                    
                    <MenuItem href="/salon">Saloon</MenuItem>

                    <MenuItem href="/AllAppointments">Appointments</MenuItem>

                    <MenuItem href="/ServiceListAD">Services</MenuItem>

                    <MenuItem href="/ServicePopularityReport">Reports</MenuItem>
                
                </Menu>
               
                <IconContainer>
                   
                    <IconLink href="/Dashboard">
                        <FontAwesomeIcon icon={faUser} />
                    </IconLink>
                </IconContainer>
            </Nav>

            <div style={styles.dashboard}>
              

                <div style={styles.mainContent}>
                   
                    <div style={styles.overview}>
                        <div style={styles.overviewCard}>
                            <div style={styles.overviewCardHeader}>Total Appointments</div>
                            <div style={styles.overviewCardNumber}>{totalAppointments}</div>
                        </div>
                        <div style={styles.overviewCard}>
                            <div style={styles.overviewCardHeader}>Total Services</div>
                            <div style={styles.overviewCardNumber}>{totalServices}</div>
                        </div>
                    </div>
                    <div style={styles.contentRow}>
                        <div style={styles.contentSection}>
                            <h2 style={styles.sectionTitle}>Day Schedule</h2>
                            <div style={styles.schedule}>
                                <div style={styles.scheduleItem}>Hair Cut & Botox</div>
                                <div style={styles.scheduleItem}>Hair Cut</div>
                                <div style={styles.scheduleItem}>Hair Style & Beard</div>
                                <div style={styles.scheduleItem}>Waxing</div>
                                <div style={styles.scheduleItem}>Pedicure & Manicure</div>
                            </div>
                        </div>
                        <div style={styles.contentSection}>
                            <h2 style={styles.sectionTitle}>Statistics</h2>
                            <div style={styles.statsGraph}>
                                <p>Graph Placeholder</p>
                            </div>
                        </div>
                    </div>
                    <div style={styles.contentRow}>
                        <div style={styles.contentSection}>
                            <h2 style={styles.sectionTitle}>Revenue Overview</h2>
                            <div style={styles.revenueGraph}>
                                <p>Revenue Graph Placeholder</p>
                            </div>
                        </div>
                        <div style={styles.contentSection}>
                            <h2 style={styles.sectionTitle}>Recent Reports</h2>
                            <p>No new reports</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Styled Components for the Header section
const Nav = styled.nav`
 display: flex;
  padding: 15px 25px; /* Increased padding by 5px */
  background-color: #000;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000; /* Ensure the nav stays on top */
`;

const Logo = styled.img`
padding-top:9px;
  height: 49px; /* Slightly increased logo height */
`;

const Menu = styled.div`
  margin-left: 50px;
  display: flex;
  gap: 25px;
  padding-top: 23px; /* Adjusted padding to align menu items */
`;

const MenuItem = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  margin-left: 15px;

  &:hover {
    color: #AE2012; /* Optional: Add hover effect */
  }
`;

const SearchContainer = styled.div`
  margin-left: 260px; /* Adjust this to position the search bar */
  margin-top: 15px; /* Adjusted margin to align search bar */
`;

const SearchInput = styled.input`
  padding: 12px 14px; /* Slightly increased padding for input */
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 150px; /* Adjusted width slightly */
  outline: none;

  &:focus {
    border-color: #AE2012; /* Change the border color when focused */
  }
`;

const IconContainer = styled.div`
  display: flex;
  padding-top: 23px; /* Adjusted padding to align icons */
  gap: 35px; /* Adjusted gap between icons */
  margin-left: 55px; /* Adjust this value as needed */
`;

const IconLink = styled.a`
  color: #fff;
  font-size: 20px;
  text-decoration: none;

  &:hover {
    color: #8b0000; /* Optional: Add hover effect */
  }
`;
export default Dashboard;
