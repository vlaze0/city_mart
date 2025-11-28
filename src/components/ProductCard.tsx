import React from "react";
import type { Product } from "../data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="product-card">
      <div className="product-media">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-body">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-meta">
          <div className="price">${product.price.toFixed(2)}</div>
          <button className="btn-sm">Add to cart</button>
        </div>
      </div>
    </div>
  );
}