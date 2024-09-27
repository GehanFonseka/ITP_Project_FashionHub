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
    <Container>
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
              <UserName>{review.userId}</UserName>
            </ReviewHeader>
            <Rating>
              {Array.from({ length: review.rating }).map((_, index) => (
                <Star key={index} filled>★</Star>
              ))}
            </Rating>
            <ReviewInfo>
              <ColorInfo>Date: {review.color}</ColorInfo>
              <ReviewDate>{new Date(review.createdAt).toLocaleDateString()}</ReviewDate>
            </ReviewInfo>
            <ReviewText>{review.comment}</ReviewText>
          </ReviewCard>
        ))}
      </ReviewContainer>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  padding: 20px;
  background: #f9f9f9;
  min-height: 100vh;
`;

const ReviewSummary = styled.div`
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
`;

const AverageRating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 250px;
  text-align: center;

  span {
    font-size: 60px;
    font-weight: bold;
    color: #333;
  }
`;

const Stars = styled.div`
  font-size: 24px;
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
  font-size: 16px;
  color: #28a745;
  margin-top: 8px;
`;

const RatingBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const RatingBar = styled.div`
  background: #e0e0e0;
  width: 180px;
  height: 10px;
  border-radius: 5px;
  margin: 0 15px;
`;

const FilledBar = styled.div`
  background: #ffc107;
  height: 100%;
  border-radius: 5px;
  width: ${(props) => props.width}%;
`;

const RatingCount = styled.div`
  font-size: 16px;
  color: #333;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const ReviewCard = styled.div`
  background: linear-gradient(145deg, #ffffff, #f4f6f8);
  padding: 25px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 340px;
  min-height: 280px;
  flex: 1 1 calc(33% - 40px);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const ReviewHeader = styled.div`
  margin-bottom: 20px;
`;

const UserName = styled.h3`
  font-size: 22px;
  color: #333;
  margin: 0;
  font-weight: 600;
`;

const Rating = styled.div`
  font-size: 20px;
  color: #ffcc00;
  margin-bottom: 20px;
`;

const ReviewInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 20px;
  color: #666;
`;

const ColorInfo = styled.div`
  font-weight: 500;
`;

const ReviewDate = styled.div`
  font-weight: 400;
`;

const ReviewText = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.6;
`;

export default ReviewDisplay;
