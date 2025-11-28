"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = exports.getUserOrders = exports.confirmPayment = exports.createPaymentIntent = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-06-20',
});
const createOrder = async (req, res) => {
    try {
        const { items, paymentMethod, shippingAddress } = req.body;
        const userId = req.user.id;
        let total = 0;
        for (const item of items) {
            total += item.price * item.quantity;
        }
        const orderData = {
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
        const order = new Order_1.default(orderData);
        await order.save();
        res.status(201).json({
            success: true,
            data: order,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create order',
            error: error.message,
        });
    }
};
exports.createOrder = createOrder;
const createPaymentIntent = async (req, res) => {
    try {
        const { amount, currency = 'usd' } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create payment intent',
            error: error.message,
        });
    }
};
exports.createPaymentIntent = createPaymentIntent;
const confirmPayment = async (req, res) => {
    try {
        const { paymentIntentId, orderId } = req.body;
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status === 'succeeded') {
            const order = await Order_1.default.findById(orderId);
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
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Payment not completed',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to confirm payment',
            error: error.message,
        });
    }
};
exports.confirmPayment = confirmPayment;
const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order_1.default.find({ user: userId }).populate('items.product').sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: orders,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get orders',
            error: error.message,
        });
    }
};
exports.getUserOrders = getUserOrders;
const getOrderById = async (req, res) => {
    try {
        const order = await Order_1.default.findById(req.params.id).populate('items.product');
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get order',
            error: error.message,
        });
    }
};
exports.getOrderById = getOrderById;
//# sourceMappingURL=orderController.js.map