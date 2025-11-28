import { Request, Response } from 'express';
import Order, { IOrder } from '../models/Order';
import { protect } from '../middleware/auth';
import Stripe from 'stripe';

// Initialize Stripe with secret key (optional for development)
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
}) : null;

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, paymentMethod, shippingAddress } = req.body;
    const userId = (req as any).user.id; // Assuming auth middleware adds user to req

    // Calculate total
    let total = 0;
    for (const item of items) {
      total += item.price * item.quantity;
    }

    const orderData: Partial<IOrder> = {
      user: userId,
      items,
      total,
      paymentInfo: {
        method: paymentMethod,
        status: 'pending',
      },
      shippingAddress,
      status: 'pending',
    };

    const order = new Order(orderData);
    await order.save();

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: (error as Error).message,
    });
  }
};

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create payment intent',
      error: (error as Error).message,
    });
  }
};

export const confirmPayment = async (req: Request, res: Response) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        success: false,
        message: 'Stripe not configured',
      });
    }

    const { paymentIntentId, orderId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      const order = await Order.findById(orderId);
      if (order) {
        order.paymentInfo.status = 'completed';
        order.paymentInfo.stripePaymentIntentId = paymentIntentId;
        order.status = 'processing';
        await order.save();
      }

      res.status(200).json({
        success: true,
        message: 'Payment confirmed successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment not completed',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to confirm payment',
      error: (error as Error).message,
    });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const orders = await Order.find({ user: userId }).populate('items.product').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get orders',
      error: (error as Error).message,
    });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get order',
      error: (error as Error).message,
    });
  }
};