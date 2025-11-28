"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.getAllReviews = exports.updateOrderStatus = exports.getAllOrders = exports.deleteProduct = exports.updateProduct = exports.getAllProducts = exports.deleteUser = exports.updateUserRole = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const Product_1 = __importDefault(require("../models/Product"));
const Order_1 = __importDefault(require("../models/Order"));
const Review_1 = __importDefault(require("../models/Review"));
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.default.find().select('-password');
        res.status(200).json({
            success: true,
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.getAllUsers = getAllUsers;
const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role',
            });
        }
        const user = await User_1.default.findByIdAndUpdate(userId, { role }, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(200).json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating user role',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.updateUserRole = updateUserRole;
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User_1.default.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.deleteUser = deleteUser;
const getAllProducts = async (req, res) => {
    try {
        const products = await Product_1.default.find().populate('category');
        res.status(200).json({
            success: true,
            data: products,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.getAllProducts = getAllProducts;
const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const updateData = req.body;
        const product = await Product_1.default.findByIdAndUpdate(productId, updateData, { new: true }).populate('category');
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.status(200).json({
            success: true,
            data: product,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product_1.default.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.deleteProduct = deleteProduct;
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order_1.default.find()
            .populate('user')
            .populate('items.product');
        res.status(200).json({
            success: true,
            data: orders,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.getAllOrders = getAllOrders;
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status',
            });
        }
        const order = await Order_1.default.findByIdAndUpdate(orderId, { status }, { new: true }).populate('user').populate('items.product');
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
            message: 'Error updating order status',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.updateOrderStatus = updateOrderStatus;
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review_1.default.find()
            .populate('user')
            .populate('product');
        res.status(200).json({
            success: true,
            data: reviews,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching reviews',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.getAllReviews = getAllReviews;
const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await Review_1.default.findByIdAndDelete(reviewId);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Review deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting review',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.deleteReview = deleteReview;
//# sourceMappingURL=adminController.js.map