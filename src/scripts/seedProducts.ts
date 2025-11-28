import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product';
import Category from '../models/Category';
import connectDB from '../config/database';

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();

    // Create sample categories
    const electronicsCategory = await Category.findOneAndUpdate(
      { slug: 'electronics' },
      {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Electronic devices and gadgets'
      },
      { upsert: true, new: true }
    );

    const clothingCategory = await Category.findOneAndUpdate(
      { slug: 'clothing' },
      {
        name: 'Clothing',
        slug: 'clothing',
        description: 'Fashion and apparel'
      },
      { upsert: true, new: true }
    );

    const booksCategory = await Category.findOneAndUpdate(
      { slug: 'books' },
      {
        name: 'Books',
        slug: 'books',
        description: 'Books and literature'
      },
      { upsert: true, new: true }
    );

    // Sample products
    const sampleProducts = [
      {
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
        price: 99.99,
        category: electronicsCategory._id,
        images: ['https://via.placeholder.com/300x300?text=Headphones'],
        stock: 50,
        featured: true,
      },
      {
        name: 'Smartphone Case',
        description: 'Protective case for smartphones with shock absorption and stylish design.',
        price: 19.99,
        category: electronicsCategory._id,
        images: ['https://via.placeholder.com/300x300?text=Phone+Case'],
        stock: 100,
        featured: false,
      },
      {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt available in multiple colors and sizes.',
        price: 14.99,
        category: clothingCategory._id,
        images: ['https://via.placeholder.com/300x300?text=T-Shirt'],
        stock: 200,
        featured: false,
      },
      {
        name: 'Leather Wallet',
        description: 'Premium leather wallet with multiple card slots and RFID protection.',
        price: 29.99,
        category: clothingCategory._id,
        images: ['https://via.placeholder.com/300x300?text=Wallet'],
        stock: 75,
        featured: true,
      },
      {
        name: 'Programming Book: JavaScript Guide',
        description: 'Comprehensive guide to modern JavaScript development and best practices.',
        price: 39.99,
        category: booksCategory._id,
        images: ['https://via.placeholder.com/300x300?text=JS+Book'],
        stock: 30,
        featured: false,
      },
      {
        name: 'Novel: The Tech Revolution',
        description: 'A thrilling novel about technology and innovation in the modern world.',
        price: 24.99,
        category: booksCategory._id,
        images: ['https://via.placeholder.com/300x300?text=Novel'],
        stock: 45,
        featured: true,
      },
      {
        name: 'Gaming Mouse',
        description: 'Ergonomic gaming mouse with customizable RGB lighting and programmable buttons.',
        price: 49.99,
        category: electronicsCategory._id,
        images: ['https://via.placeholder.com/300x300?text=Gaming+Mouse'],
        stock: 60,
        featured: true,
      },
      {
        name: 'Denim Jeans',
        description: 'Classic denim jeans made from high-quality cotton with perfect fit.',
        price: 59.99,
        category: clothingCategory._id,
        images: ['https://via.placeholder.com/300x300?text=Jeans'],
        stock: 80,
        featured: false,
      },
    ];

    // Insert products
    for (const productData of sampleProducts) {
      await Product.findOneAndUpdate(
        { name: productData.name },
        productData,
        { upsert: true, new: true }
      );
    }

    console.log('Sample products seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();