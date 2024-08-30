import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ReviewForm = () => {
  const [userId, setUserId] = useState('');
  const [shopId, setShopId] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const reviewData = {
        shopId,
        rating,
        comment,
      };
  
      // Send a POST request to create a new review
      const response = await axios.post(`http://localhost:8070/api/reviews/create_Review/${userId}`, reviewData);
      
      console.log('Review submitted:', response.data); // Log the response
      
      setMessage('Review submitted successfully');
      // Clear the form
      setUserId('');
      setShopId('');
      setRating(0); 
      setComment('');
    } catch (error) {
      console.error('There was an error submitting the review:', error);
      setMessage('Failed to submit review. Please try again later.');
    }
  };
  

  return (
    <Container>
      <h2>Submit Your Review</h2>
      {message && <Message>{message}</Message>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="userId">User ID:</Label>
          <Input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="shopId">Shop ID:</Label>
          <Input
            type="text"
            id="shopId"
            value={shopId}
            onChange={(e) => setShopId(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Rating:</Label>
          <RatingContainer>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                isActive={star <= rating}
                onClick={() => setRating(star)}
              >
                ★
              </Star>
            ))}
          </RatingContainer>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="comment">Comment:</Label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave your comments here"
            maxLength={500}
          />
        </FormGroup>

        <SubmitButton type="submit">Submit Review</SubmitButton>
      </Form>
    </Container>
  );
};

export default ReviewForm;

// Styled components
const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const RatingContainer = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Star = styled.span`
  cursor: pointer;
  color: ${props => (props.isActive ? 'gold' : '#888')};
  transition: color 0.2s;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 16px;
  color: ${props => (props.isError ? 'red' : 'green')};
  margin-bottom: 20px;
`;
