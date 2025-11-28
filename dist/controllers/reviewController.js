"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductRating = exports.deleteReview = exports.updateReview = exports.getUserReviews = exports.getProductReviews = exports.createReview = void 0;
const Review_1 = __importDefault(require("../models/Review"));
const Product_1 = __importDefault(require("../models/Product"));
const createReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user._id;
        const product = await Product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const existingReview = await Review_1.default.findOne({ user: userId, product: productId });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this product' });
        }
        const review = new Review_1.default({
            user: userId,
            product: productId,
            rating,
            comment,
        });
        const createdReview = await review.save();
        await createdReview.populate('user', 'name');
        await createdReview.populate('product', 'name');
        res.status(201).json(createdReview);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createReview = createReview;
const getProductReviews = async (req, res) => {
    try {
        const reviews = await Review_1.default.find({ product: req.params.productId })
            .populate('user', 'name')
            .sort({ createdAt: -1 });
        res.json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getProductReviews = getProductReviews;
const getUserReviews = async (req, res) => {
    try {
        const reviews = await Review_1.default.find({ user: req.user._id })
            .populate('product', 'name images')
            .sort({ createdAt: -1 });
        res.json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getUserReviews = getUserReviews;
const updateReview = async (req, res) => {
    try {
        const review = await Review_1.default.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const { rating, comment } = req.body;
        review.rating = rating || review.rating;
        review.comment = comment || review.comment;
        const updatedReview = await review.save();
        await updatedReview.populate('user', 'name');
        await updatedReview.populate('product', 'name');
        res.json(updatedReview);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateReview = updateReview;
const deleteReview = async (req, res) => {
    try {
        const review = await Review_1.default.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        await review.deleteOne();
        res.json({ message: 'Review removed' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteReview = deleteReview;
const getProductRating = async (req, res) => {
    try {
        const productId = req.params.productId;
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }
        const reviews = await Review_1.default.find({ product: productId });
        if (reviews.length === 0) {
            return res.json({ averageRating: 0, totalReviews: 0 });
        }
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        res.json({
            averageRating: Math.round(averageRating * 10) / 10,
            totalReviews: reviews.length,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getProductRating = getProductRating;
//# sourceMappingURL=reviewController.js.map