import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ServiceListAD = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ category: '', name: '', description: '', price: '' });
  const [editingService, setEditingService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('/api/services/');
        const sortedServices = res.data.sort((a, b) => categoryOrder(a.category) - categoryOrder(b.category));
        setServices(sortedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  const categoryOrder = (category) => {
    const categories = ['Hair', 'Facial', 'Nail', 'Makeup', 'Massage'];
    return categories.indexOf(category);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingService) {
      setEditingService({ ...editingService, [name]: value });
    } else {
      setNewService({ ...newService, [name]: value });
    }
  };

  const addService = async () => {
    try {
      const res = await axios.post('/api/services/', newService);
      const updatedServices = [...services, res.data].sort((a, b) => categoryOrder(a.category) - categoryOrder(b.category));
      setServices(updatedServices);
      setNewService({ category: '', name: '', description: '', price: '' });
      navigate('/ServiceList', { state: { services: updatedServices } });
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const updateService = async (id) => {
    try {
      const res = await axios.put(`/api/services/${id}`, editingService);
      const updatedServices = services.map(service =>
        service._id === id ? res.data.updatedService : service
      );
      setServices(updatedServices.sort((a, b) => categoryOrder(a.category) - categoryOrder(b.category)));
      setEditingService(null);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };
  
  const deleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`/api/services/${id}`);
        setServices(services.filter(service => service._id !== id).sort((a, b) => categoryOrder(a.category) - categoryOrder(b.category)));
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };
  
  return (
    <Container>
      <TitleContainer>
        <Title>Service List</Title>
      </TitleContainer>

      {/* Service Form */}
      <FormContainer>
        <Select name="category" value={editingService ? editingService.category : newService.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="Hair">Hair</option>
          <option value="Facial">Facial</option>
          <option value="Nail">Nail</option>
          <option value="Makeup">Makeup</option>
          <option value="Massage">Massage</option>
        </Select>

        <Input
          name="name"
          value={editingService ? editingService.name : newService.name}
          onChange={handleChange}
          placeholder="Service Name"
        />
        <Input
          name="description"
          value={editingService ? editingService.description : newService.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <Input
          name="price"
          value={editingService ? editingService.price : newService.price}
          onChange={handleChange}
          placeholder="LKR"
        />
        <Button onClick={editingService ? () => updateService(editingService._id) : addService}>
          {editingService ? 'Update Service' : 'Add Service'}
        </Button>
      </FormContainer>

      {/* Service List */}
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Category</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {services.map(service => (
            <TableRow key={service._id}>
              <TableData>{service.category}</TableData>
              <TableData>{service.name}</TableData>
              <TableData>{service.description}</TableData>
              <TableData>LKR {service.price}</TableData>
              <TableData>
                <Button onClick={() => setEditingService(service)}>Edit</Button>
                <Button onClick={() => deleteService(service._id)}>Delete</Button>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  margin-top: 100px;
  padding: 20px;
`;

const TitleContainer = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; 
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const Select = styled.select`
  padding: 10px;
  flex: 1;
  min-width: 150px;
`;

const Input = styled.input`
  padding: 10px;
  flex: 1;
  min-width: 150px;
  background-color: #fff; 
  color: #000;
  border: 1px solid #000; 
`;

const Button = styled.button`
  padding: 8px 16px; 
  background-color: #ae2012;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #920d0d;
  }

  margin-right: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: #333;
  color: #fff;
  text-align: left;
`;

const TableData = styled.td`
  padding: 12px; 
`;

export default ServiceListAD;