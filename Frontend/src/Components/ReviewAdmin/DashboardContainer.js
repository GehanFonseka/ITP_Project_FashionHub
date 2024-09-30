import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// OverviewCard Component
const OverviewCard = ({ title, value }) => {
  return (
    <Card>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </Card>
  );
};

// ReviewTable Component
const ReviewTable = ({ reviews }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>User</th>
          <th>Shop Type</th>
          <th>Rating</th>
          <th>Date</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review) => (
          <tr key={review._id}>
            <td>{review.userId}</td>
            <td>{review.shopType}</td>
            <td>{review.rating}</td>
            <td>{new Date(review.createdAt).toLocaleDateString()}</td>
            <td>{review.comment}</td> {/* Added comment column */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// FilterSection Component
const FilterSection = ({ onFilterChange }) => {
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    onFilterChange({ [name]: value });
  };

  return (
    <FilterContainer>
      <label htmlFor="shopType">Shop Type:</label>
      <select name="shopType" id="shopType" onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="salon">Salon</option>
        <option value="clothing">Clothing</option>
        <option value="footwear">Footwear</option>
      </select>
      <label htmlFor="rating">Rating:</label>
      <select name="rating" id="rating" onChange={handleFilterChange}>
        <option value="">All</option>
        {[1, 2, 3, 4, 5].map((rating) => (
          <option key={rating} value={rating}>
            {rating} Star
          </option>
        ))}
      </select>
    </FilterContainer>
  );
};

// DashboardContainer Component
const DashboardContainer = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ shopType: '', rating: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews/reviews', {
          params: { ...filter, search: searchTerm },
        });
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, [filter, searchTerm]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const totalReviews = reviews.length;

  return (
    <DashboardWrapper>
      <Header>
        <h1>Review Admin Dashboard</h1>
      </Header>
      <OverviewSection>
        <OverviewCard title="Total Reviews" value={totalReviews} />
        {/* Add more OverviewCards as needed */}
      </OverviewSection>
      <FilterSection onFilterChange={(newFilter) => setFilter(newFilter)} />
      <ReviewTable reviews={reviews} />
    </DashboardWrapper>
  );
};

// Styled components
const DashboardWrapper = styled.div`
  padding: 20px;
  background-color: #e6e6e6; /* Slightly darker gray background */
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Modern font */
  margin-top: 80px; /* Adjusted margin top */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #003366; /* Dark blue header background */
  color: #ffffff; /* White text color */
  padding: 15px 25px;
  border-radius: 10px;
`;

const OverviewSection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const Card = styled.div`
  background-color: #ffffff; /* White background for cards */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  flex: 1;
  border-left: 10px solid #003366; /* Dark blue left border for cards */
`;

const Title = styled.h3`
  font-size: 22px; /* Larger font size for titles */
  color: #333;
`;

const Value = styled.p`
  font-size: 32px; /* Larger font size for values */
  color: #003366; /* Dark blue color for values */
  font-weight: bold;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);

  th, td {
    padding: 15px; /* Increased padding for better readability */
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #003366; /* Dark blue background for headers */
    color: #ffffff; /* White text color for headers */
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f4f4f4; /* Slightly darker alternating row colors */
  }

  tr:hover {
    background-color: #e0e0e0; /* Highlight row on hover */
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  label {
    margin-right: 10px;
    font-size: 18px; /* Larger font size for labels */
    color: #333;
  }

  select {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
    color: #333; /* Dark text color */
    background-color: #ffffff; /* White background */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  }
`;

export default DashboardContainer;
