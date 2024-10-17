const router = require('express').Router();
const Review = require('../models/reviewSchema'); // Import the Review model
const mongoose = require('mongoose');


// Route to create a review
router.route("/create_Review/:userId").post(async (req, res) => {
    try {
        console.log("create_Review_Api");

        const user_Id = req.params.userId;
        const { shopId, rating, comment } = req.body;

        console.log("user_Id:", user_Id);
        console.log("shopId:", shopId);
        console.log("rating:", rating);
        console.log("comment:", comment);
        

        // Create a new review
        const newReview = new Review({
            userId: user_Id,
            shopId,
            rating,
            comment,
        });

        // Save the review to the database
        const savedReview = await newReview.save();

        // Send a success response with the saved review
        res.status(201).json(savedReview);

    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Route to get all reviews
// Fetch all reviews
router.route('/reviews').get(async (req, res) => {
    console.log('reviews_Api');
    try {
      const reviews = await Review.find(); // Fetch all reviews
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

// Route to get reviews for a specific shop
router.route("/reviews/shop/:shopId").get(async (req, res) => {
    console.log("/reviews/shop/:shopId")
    let shopID = req.params.shopId;
    console.log(shopID);
    try {
        const shopId = req.params.shopId;
        const reviews = await Review.find({ shopId: shopId }); // Fetch reviews by shopId
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route to get reviews for a specific user
router.route("/reviews/user/:userId").get(async (req, res) => {
    console.log("/reviews/user/:userId")
    try {
        const userId = req.params.userId;
        const reviews = await Review.find({ userId: userId }); // Fetch reviews by shopId
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route to update a review
router.route("/update_Review/:reviewId").put(async (req, res) => {
    console.log("aaaaaaaaaaaaaaaa");
    console.log(req.params.reviewId)
    console.log(req.body.formData)
    try {

        const reviewId = req.params.reviewId;
        const { rating, comment } = req.body.formData;
        console.log("ratins",rating)
        console.log("comment",comment)
        console.log(reviewId);
        // Find the review by ID and update it
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { rating: rating, comment: comment, updatedAt: Date.now() },
            { new: true }
        );
        console.log(updatedReview);

        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json(updatedReview);

    } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Route to delete a review
router.route("/delete_Review/:reviewId").delete(async (req, res) => {
    
    console.log("/delete_Review/:reviewId");

    try {
        const reviewId = req.params.reviewId;

        // Find the review by ID and delete it
        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({ message: "Review deleted successfully" });

    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});




// Export reviews as PDF
router.get('/reviews/export/pdf', async (req, res) => {
    try {
      const reviews = await Review.find(); // Fetch all reviews from DB
  
      // Create a new PDF document
      const doc = new PDFDocument();
  
      // Set response headers
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=reviews.pdf');
  
      // Pipe the PDF document to the response
      doc.pipe(res);
  
      // Add a title
      doc.fontSize(20).text('Reviews Report', { align: 'center' });
  
      // Add a table header
      doc.moveDown();
      doc.fontSize(12).text('User ID', { width: 150, continued: true });
      doc.text('Shop ID', { width: 150, continued: true });
      doc.text('Rating', { width: 100, continued: true });
      doc.text('Date', { width: 150, continued: true });
      doc.text('Comment', { width: 200 });
  
      // Add a line separator
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  
      // Add the reviews data to the PDF
      reviews.forEach((review) => {
        doc.moveDown();
        doc.text(review.userId, { width: 150, continued: true });
        doc.text(review.shopId, { width: 150, continued: true });
        doc.text(review.rating.toString(), { width: 100, continued: true });
        doc.text(new Date(review.createdAt).toLocaleDateString(), { width: 150, continued: true });
        doc.text(review.comment || 'No comment', { width: 200 });
      });
  
      // Finalize the PDF and end the stream
      doc.end();
    } catch (err) {
      console.error(err);
      res.status(500).send('Error generating PDF file');
    }
  });
  
  
 


module.exports = router;





