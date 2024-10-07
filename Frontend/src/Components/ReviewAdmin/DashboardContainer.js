import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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
          <th>Shop</th>
          <th>Rating</th>
          <th>Date</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review) => (
          <tr key={review._id}>
            <td>{review.userId}</td>
            <td>{review.shopId}</td>
            <td>{review.rating}</td>
            <td>{new Date(review.createdAt).toLocaleDateString()}</td>
            <td>{review.comment}</td> {/* Added comment column */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// DashboardContainer Component
const DashboardContainer = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Added searchTerm state
  const [filteredReviews, setFilteredReviews] = useState([]); // Added filtered reviews

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews/reviews');
        setReviews(response.data);
        setFilteredReviews(response.data); // Initially, set all reviews to filteredReviews
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Function to handle search input changes
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    const filtered = reviews.filter((review) =>
      review.comment.toLowerCase().includes(e.target.value.toLowerCase()) ||
      review.userId.toLowerCase().includes(e.target.value.toLowerCase()) ||
      review.shopId.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredReviews(filtered);
  };

  // Function to handle data export to PDF
  const exportData = () => {
    const doc = new jsPDF();

    // Add title
    doc.text('Review Report', 14, 20);

    // Define the table content
    const tableColumn = ['User', 'Shop', 'Rating', 'Date', 'Comment'];
    const tableRows = [];

    filteredReviews.forEach((review) => {
      const reviewData = [
        review.userId,
        review.shopId,
        review.rating,
        new Date(review.createdAt).toLocaleDateString(),
        review.comment,
      ];
      tableRows.push(reviewData);
    });

    // Generate the table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30, // Space between the title and the table
    });

    // Save the generated PDF
    doc.save('reviews.pdf');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const totalReviews = reviews.length;
  const avgRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(2);

  return (
    <DashboardWrapper>
      <Header>
        <h1>Review Admin Dashboard</h1>
      </Header>
      <OverviewSection>
        <OverviewCard title="Average Rating" value={avgRating} />
        <OverviewCard title="Total Reviews" value={totalReviews} />
      </OverviewSection>
      <SearchAndFilter>
        <SearchBar
          placeholder="Search reviews"
          value={searchTerm}
          onChange={handleSearch} // Added onChange handler
        />
        <ExportButton onClick={exportData}>Export</ExportButton> {/* Updated onClick */}
      </SearchAndFilter>
      <ReviewTable reviews={filteredReviews} /> {/* Display filtered reviews */}
    </DashboardWrapper>
  );
};

// Styled components

const DashboardWrapper = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #003366;
  color: white;
  padding: 15px 25px;
  border-radius: 10px;
`;

const OverviewSection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const Card = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  flex: 1;
`;

const Title = styled.h3`
  font-size: 18px;
  color: #333;
`;

const Value = styled.p`
  font-size: 24px;
  color: #003366;
  font-weight: bold;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #003366;
    color: white;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f4f4f4;
  }

  tr:hover {
    background-color: #e0e0e0;
  }
`;

const SearchAndFilter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 300px;
`;

const ExportButton = styled.button`
  padding: 10px 20px;
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #002244;
  }
`;

export default DashboardContainer;
