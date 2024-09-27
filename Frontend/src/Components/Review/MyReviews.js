import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ rating: '', comment: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

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

  const handleEdit = (review) => {
    setEditingReview(review);
    setFormData({ rating: review.rating, comment: review.comment });
    setModalOpen(true);
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:8070/api/reviews/delete_Review/${reviewId}`);
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleUpdate = async () => {
    console.log("dfdsfdfs");
    console.log(editingReview._id)
    console.log(formData)
    try {
      const response = await axios.put("http://localhost:8070/api/reviews/update_Review/"+editingReview._id, {formData});
      console.log(response);
      setReviews(reviews.map((review) => (review._id === editingReview._id ? response.data : review)));
      setModalOpen(false);
      setEditingReview(null);
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>UserID</TableHeaderCell>
              <TableHeaderCell>Comment</TableHeaderCell>
              <TableHeaderCell>Stars</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentReviews.map((review) => (
              <TableRow key={review._id}>
                <TableCell>{review.userId}</TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={index}>★</Star>
                  ))}
                </TableCell>
                <TableCell>
                  <ButtonContainer>
                    <ActionButton onClick={() => handleEdit(review)}>Edit</ActionButton>
                    <ActionButton delete onClick={() => handleDelete(review._id)}>Delete</ActionButton>
                  </ButtonContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {reviews.length > reviewsPerPage && (
        <Pagination>
          {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }, (_, index) => (
            <PageButton
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
        </Pagination>
      )}

      {modalOpen && (
        <Modal>
          <ModalContent>
            <h2>Edit Review</h2>
            <Form>
              <Label>
                Rating:
                <Input type="number" name="rating" value={formData.rating} onChange={handleInputChange} min="1" max="5" />
              </Label>
              <Label>
                Comment:
                <Textarea name="comment" value={formData.comment} onChange={handleInputChange} />
              </Label>
              <ButtonContainer>
                <ActionButton onClick={handleUpdate}>Update</ActionButton>
                <ActionButton onClick={() => setModalOpen(false)}>Cancel</ActionButton>
              </ButtonContainer>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

// Styled components
const Container = styled.div`
  padding: 20px;
  margin-top: 80px;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #f5f7fa;
`;

const TableHeader = styled.thead`
  background-color: #ffffff;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #dddddd;
`;

const TableHeaderCell = styled.th`
  padding: 15px;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
`;

const TableBody = styled.tbody`
  background-color: #ffffff;
`;

const TableCell = styled.td`
  padding: 15px;
  font-size: 14px;
  color: #333333;
`;

const Star = styled.span`
  color: gold;
  margin-right: 2px;
`;

const ButtonContainer = styled.div`
  display: flex;
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 80px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.active ? '#007bff' : '#ffffff')};
  color: ${(props) => (props.active ? '#ffffff' : '#007bff')};
  border: 1px solid #007bff;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  margin: 0 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? '#0056b3' : '#e2e6ea')};
  }
`;

export default MyReviews;
