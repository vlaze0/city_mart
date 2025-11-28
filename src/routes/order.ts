import express from 'express';
import {
  createOrder,
  createPaymentIntent,
  confirmPayment,
  getUserOrders,
  getOrderById,
} from '../controllers/orderController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Protected routes
router.post('/create', protect, createOrder);
router.post('/create-payment-intent', protect, createPaymentIntent);
router.post('/confirm-payment', protect, confirmPayment);
router.get('/my-orders', protect, getUserOrders);
router.get('/:id', protect, getOrderById);

export default router;