import express from 'express';
import {
  createReview,
  getProductReviews,
  getUserReviews,
  updateReview,
  deleteReview,
  getProductRating,
} from '../controllers/reviewController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public routes
router.route('/product/:productId').get(getProductReviews);
router.route('/product/:productId/rating').get(getProductRating);

// Protected routes
router.route('/').post(protect, createReview);
router.route('/myreviews').get(protect, getUserReviews);
router.route('/:id').put(protect, updateReview).delete(protect, deleteReview);

export default router;