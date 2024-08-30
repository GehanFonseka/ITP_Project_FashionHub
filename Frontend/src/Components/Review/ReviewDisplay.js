import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ReviewDisplay = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/reviews/reviews');
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const calculateReviewStats = (reviews) => {
    const totalReviews = reviews.length;
    const starCounts = [0, 0, 0, 0, 0];
    let totalRating = 0;

    reviews.forEach((review) => {
      totalRating += review.rating;
      starCounts[review.rating - 1] += 1;
    });

    const averageRating = totalRating / totalReviews;
    return { totalReviews, averageRating, starCounts };
  };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const { totalReviews, averageRating, starCounts } = calculateReviewStats(reviews);

  return (
    <div>
      <ReviewSummary>
        <AverageRating>
          <span>{averageRating.toFixed(1)}</span>
          <Stars>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} filled={index < Math.round(averageRating)}>★</Star>
            ))}
          </Stars>
          <VerifiedText>All from verified purchases</VerifiedText>
        </AverageRating>
        <RatingBreakdown>
          {starCounts.map((count, index) => (
            <RatingRow key={index}>
              <Stars>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} filled={i <= index}>★</Star>
                ))}
              </Stars>
              <RatingBar>
                <FilledBar width={(count / totalReviews) * 100} />
              </RatingBar>
              <RatingCount>{count}</RatingCount>
            </RatingRow>
          ))}
        </RatingBreakdown>
      </ReviewSummary>
      <ReviewContainer>
        {reviews.map((review) => (
          <ReviewCard key={review._id}>
            <ReviewHeader>
              <UserName>{review.userName}</UserName>
            </ReviewHeader>
            <Rating>
              {Array.from({ length: review.rating }).map((_, index) => (
                <Star key={index}>★</Star>
              ))}
            </Rating>
            <ReviewInfo>
              <ColorInfo>Date: {review.color}</ColorInfo>
              <ReviewDate>{new Date(review.createdAt).toLocaleDateString()}</ReviewDate>
            </ReviewInfo>
            <ReviewText>{review.comment}</ReviewText>
            <ButtonContainer>
              <ActionButton>Edit</ActionButton>
              <ActionButton delete>Delete</ActionButton>
            </ButtonContainer>
          </ReviewCard>
        ))}
      </ReviewContainer>
    </div>
  );
};

export default ReviewDisplay;

// Styled components
const ReviewSummary = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f5f7fa;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 40px;
`;

const AverageRating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  max-width: 200px;
  text-align: center;

  span {
    font-size: 48px;
    font-weight: bold;
    color: #333333;
  }
`;

const Stars = styled.div`
  font-size: 20px;
  color: #ffcc00;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Star = styled.span`
  color: ${(props) => (props.filled ? '#ffcc00' : '#e0e0e0')};
  margin-right: 2px;
`;

const VerifiedText = styled.div`
  font-size: 14px;
  color: #28a745;
  margin-top: 5px;
`;

const RatingBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const RatingBar = styled.div`
  background-color: #e0e0e0;
  width: 150px;
  height: 8px;
  border-radius: 4px;
  margin: 0 10px;
`;

const FilledBar = styled.div`
  background-color: #ffc107;
  height: 100%;
  border-radius: 4px;
  width: ${(props) => props.width}%;
`;

const RatingCount = styled.div`
  font-size: 14px;
  color: #333333;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const ReviewCard = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  max-width: 320px;
  min-height: 250px;
  flex: 1 1 calc(50% - 40px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const UserName = styled.h3`
  font-size: 20px;
  color: #333333;
  margin: 0;
  font-weight: 600;
`;

const Rating = styled.div`
  font-size: 18px;
  color: #ffcc00;
  margin-bottom: 15px;
`;

const ReviewInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 15px;
  color: #666666;
`;

const ColorInfo = styled.div`
  font-weight: 500;
`;

const ReviewDate = styled.div`
  font-weight: 400;
`;

const ReviewText = styled.p`
  font-size: 16px;
  color: #555555;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.delete ? '#dc3545' : '#007bff')};
  color: #ffffff;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.delete ? '#c82333' : '#0056b3')};
  }
`;
