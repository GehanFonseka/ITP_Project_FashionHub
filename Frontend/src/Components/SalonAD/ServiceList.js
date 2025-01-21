import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const categoryOrder = (category) => {
  const categories = ['Hair', 'Facial', 'Nail', 'Makeup', 'Massage'];
  return categories.indexOf(category);
};

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <p>Loading services...</p>;
  }

  if (error) {
    return <p>Error fetching services: {error}</p>;
  }

  const sortedServices = [...services].sort((a, b) => categoryOrder(a.category) - categoryOrder(b.category));

  return (
    <Container>
      <TitleContainer>
        <Title>SERVICE LIST</Title>
        <BookNowButton href="/AppointmentForm">Book Now</BookNowButton>
      </TitleContainer>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Service Category</TableHeader>
            <TableHeader>Service Name</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Price (LKR)</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {services.length > 0 ? (
            sortedServices.map((service) => (
              <TableRow key={service._id}>
                <TableData>{service.category}</TableData>
                <TableData>{service.name}</TableData>
                <TableData>{service.description}</TableData>
                <TableData>LKR {service.price}</TableData>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableData colSpan="4">No services available</TableData>
            </TableRow>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

const Container = styled.div`
  margin: 80px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
  font-family: 'Roboto', sans-serif; /* Body font */

  @media (max-width: 768px) {
    margin: 20px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    margin: 10px;
    padding: 10px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  font-family: 'Playfair Display', serif; /* Heading font */

  @media (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const BookNowButton = styled.a`

  padding: 10px 20px;
  background-color: #E76F51;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s;
  font-family: 'Lato', sans-serif; /* Button font */

  &:hover {
    background-color: #5C646C;
  }

  @media (max-width: 768px) {
    margin-top: 35px;
    width: 100%;
    text-align: center;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Roboto', sans-serif; /* Body font */

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
  }
`;

const TableHeader = styled.th`
  padding: 15px;
  background-color: #333;
  color: #fff;
  text-align: left;
  border-bottom: 2px solid #ddd;
  font-family: 'Poppins', sans-serif; /* Heading font for table */

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const TableData = styled.td`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  color: #333;
  font-family: 'Roboto', sans-serif; /* Body font */

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

export default ServiceList;
