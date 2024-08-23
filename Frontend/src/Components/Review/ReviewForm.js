import React, { useState } from "react";
import styled, { createGlobalStyle } from 'styled-components';
import backgroundImage from '../../assets/car-review-reputation-text-online-260nw-2357632809.webp';
// Import the image

// Global style for the background image
const GlobalStyle = createGlobalStyle`
   body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-image:  url(${backgroundImage});  /* Local image URL */
    background-size: cover;
    background-position: center;
    background-attachment: fixed; /* Optional: makes the background image fixed during scroll */
  }
`;

const ReviewForm = () => {
  const [review, setReview] = useState("");
  const [images, setImages] = useState([]); // State to manage multiple images
  const [rating, setRating] = useState(0); // State to manage star rxfdating

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImages([...images, URL.createObjectURL(file)]);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Review submitted:", review);
    console.log("Rating:", rating);
    console.log("Images uploaded:", images);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <ProductInfo>
          
          
          <ProductDetails>
            <ProductTitle>Your feedback helps us improve and continue delivering excellence.</ProductTitle>
          
          </ProductDetails>
        </ProductInfo>

        <Form onSubmit={handleSubmit}>
          <RatingContainer>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => handleRatingChange(star)}
                isActive={star <= rating}
              >
                ★
              </Star>
            ))}
          </RatingContainer>

          <UploadContainer>
            {images.map((image, index) => (
              <ImageWrapper key={index}>
                <UploadedImage src={image} alt={`Uploaded ${index + 1}`} />
                <RemoveButton onClick={() => handleRemoveImage(index)}>−</RemoveButton>
              </ImageWrapper>
            ))}
            <AddButtonContainer>
              <UploadLabel htmlFor="upload-input">
                <PlusSign>+</PlusSign>
                <UploadInput
                  id="upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <PlaceholderText>Upload Image</PlaceholderText>
              </UploadLabel>
            </AddButtonContainer>
          </UploadContainer>

          <ReviewContainer>
            <Textarea
              value={review}
              onChange={handleReviewChange}
              placeholder="Would you like to write anything about this product?"
              maxLength={400}
            />
            <CharCount>{400 - review.length} characters remaining</CharCount>
          </ReviewContainer>

          <SubmitButton type="submit">
            Submit Review
          </SubmitButton>
        </Form>
      </Container>
    </>
  );
};

export default ReviewForm;

const Container = styled.div`
max-width: 600px;
height: 600px;
margin: 100px auto;
padding: 20px;
font-family: Arial, sans-serif;
background-color: rgba(0, 0, 0, 0.6); /* Black background with 60% opacity */
color: white;
border: 2px solid #AE2012;
border-radius: 10px;
`;


const ProductInfo = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 10px;
`;

const ProductDetails = styled.div`
  flex-grow: 1;
`;

const ProductTitle = styled.h3`
  color: #FFFF00 /* Soft gold color */
  margin: 0;
  text-align: center;
  font-size: 20px;
`;


const ProductDescription = styled.p`
  margin: 5px 0 0 0;
  font-size: 14px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const RatingContainer = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

const Star = styled.span`
  cursor: pointer;
  color: ${props => (props.isActive ? 'gold' : '#888')};
  transition: color 0.2s;
`;

const UploadContainer = styled.div`
  margin-bottom: 60px;
`;

const ImageWrapper = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const UploadedImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 60px;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #AE2012;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 18px;
  line-height: 18px;
  text-align: center;
`;

const AddButtonContainer = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const UploadLabel = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  background-color: #222;
  border: 1px solid #AE2012;
  border-radius: 5px;
  padding: 10px 20px;
  text-align: center;
  color: #AE2012;
  font-size: 16px;
`;

const PlusSign = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
`;

const PlaceholderText = styled.span`
  display: inline-block;
  margin-left: 30px;
  font-size: 16px;
`;

const UploadInput = styled.input`
  display: none;
`;

const ReviewContainer = styled.div`
  margin-bottom: 20px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 160px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #AE2012;
  font-size: 14px;
  background-color: #222;
  color: white;
`;

const CharCount = styled.p`
  text-align: right;
  color: #888;
  font-size: 12px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #AE2012;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8b0000;
  }
`;
