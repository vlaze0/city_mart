"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const express_validator_1 = require("express-validator");
const Product_1 = __importDefault(require("../models/Product"));
const Category_1 = __importDefault(require("../models/Category"));
const Review_1 = __importDefault(require("../models/Review"));
const error_1 = require("../middleware/error");
const getProducts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const category = req.query.category;
        const search = req.query.search;
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
        let filter = {};
        if (category) {
            const categoryDoc = await Category_1.default.findOne({ slug: category });
            if (categoryDoc) {
                filter.category = categoryDoc._id;
            }
        }
        if (search) {
            filter.$text = { $search: search };
        }
        const products = await Product_1.default.find(filter)
            .populate('category', 'name slug')
            .sort({ [sortBy]: sortOrder })
            .limit(limit)
            .skip((page - 1) * limit);
        const total = await Product_1.default.countDocuments(filter);
        res.json({
            products,
            page,
            pages: Math.ceil(total / limit),
            total,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res, next) => {
    try {
        const product = await Product_1.default.findById(req.params.id).populate('category', 'name slug');
        if (!product) {
            return next(new error_1.AppError('Product not found', 404));
        }
        const reviews = await Review_1.default.find({ product: req.params.id })
            .populate('user', 'name')
            .sort({ createdAt: -1 })
            .limit(5);
        const totalReviews = await Review_1.default.countDocuments({ product: req.params.id });
        let averageRating = 0;
        if (totalReviews > 0) {
            const ratingResult = await Review_1.default.aggregate([
                { $match: { product: product._id } },
                { $group: { _id: null, average: { $avg: '$rating' } } }
            ]);
            averageRating = ratingResult[0]?.average || 0;
        }
        res.json({
            ...product.toObject(),
            reviews,
            averageRating: Math.round(averageRating * 10) / 10,
            totalReviews,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return next(new error_1.AppError('Validation failed', 400, errors.array()));
        }
        const { name, description, price, category, images, stock } = req.body;
        const categoryDoc = await Category_1.default.findOne({ slug: category });
        if (!categoryDoc) {
            return next(new error_1.AppError('Invalid category', 400));
        }
        const product = new Product_1.default({
            name,
            description,
            price,
            category: categoryDoc._id,
            images: images || [],
            stock: stock || 0,
        });
        const createdProduct = await product.save();
        await createdProduct.populate('category', 'name slug');
        res.status(201).json(createdProduct);
    }
    catch (error) {
        next(error);
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return next(new error_1.AppError('Validation failed', 400, errors.array()));
        }
        const { name, description, price, category, images, stock, featured } = req.body;
        const product = await Product_1.default.findById(req.params.id);
        if (!product) {
            return next(new error_1.AppError('Product not found', 404));
        }
        if (category) {
            const categoryDoc = await Category_1.default.findOne({ slug: category });
            if (!categoryDoc) {
                return next(new error_1.AppError('Invalid category', 400));
            }
            product.category = categoryDoc._id;
        }
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.images = images || product.images;
        product.stock = stock !== undefined ? stock : product.stock;
        product.featured = featured !== undefined ? featured : product.featured;
        const updatedProduct = await product.save();
        await updatedProduct.populate('category', 'name slug');
        res.json(updatedProduct);
    }
    catch (error) {
        next(error);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map