import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Product from '../models/Product';
import Category from '../models/Category';
import Review from '../models/Review';
import errorHandler, { AppError } from '../middleware/error';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const category = req.query.category as string;
    const search = req.query.search as string;
    const sortBy = req.query.sortBy as string || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    // Build filter object
    let filter: any = {};
    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }
    if (search) {
      filter.$text = { $search: search };
    }

    const products = await Product.find(filter)
      .populate('category', 'name slug')
      .sort({ [sortBy]: sortOrder })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug');

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    // Get reviews and rating info
    const reviews = await Review.find({ product: req.params.id as string })
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .limit(5); // Get latest 5 reviews

    const totalReviews = await Review.countDocuments({ product: req.params.id as string });
    let averageRating = 0;

    if (totalReviews > 0) {
      const ratingResult = await Review.aggregate([
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
  } catch (error) {
    next(error);
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError('Validation failed', 400, errors.array()));
    }

    const { name, description, price, category, images, stock } = req.body;

    const categoryDoc = await Category.findOne({ slug: category });
    if (!categoryDoc) {
      return next(new AppError('Invalid category', 400));
    }

    const product = new Product({
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
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError('Validation failed', 400, errors.array()));
    }

    const { name, description, price, category, images, stock, featured } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (!categoryDoc) {
        return next(new AppError('Invalid category', 400));
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
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};