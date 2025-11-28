import React, { useMemo, useState } from "react";
import productsData from "./data/products";
import ProductCard from "./components/ProductCard";

export default function App() {
  const [query, setQuery] = useState("");

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return productsData;
    return productsData.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  const categories = useMemo(() => {
    const map = new Map<string, { id: string; title: string; image: string }>();
    productsData.forEach((p) => {
      if (!map.has(p.category)) {
        map.set(p.category, { id: p.category, title: p.category, image: p.image });
      }
    });
    return Array.from(map.values());
  }, []);

  return (
    <div className="site-bg">
      <div className="site-container">
        <header className="nav">
          <div className="logo">CityMart</div>

          <nav className="nav-links">
            <a className="active">Home</a>
            <a>Products</a>
          </nav>

          <div className="nav-actions">
            <input
              className="search-input"
              placeholder="Search products or category"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn-outline">Login</button>
          </div>
        </header>

        <section className="hero">
          <div className="hero-inner">
            <h1>Welcome to CityMart</h1>
            <p>Your local marketplace for fresh products delivered to your door</p>
            <button className="btn-primary">Shop Now</button>
          </div>
        </section>

        <section className="categories">
          <h2>Shop by Category</h2>
          <div className="category-grid">
            {categories.map((c) => (
              <div key={c.id} className="category-card">
                <img src={c.image} alt={c.title} />
                <div className="category-overlay">
                  <h3>{c.title}</h3>
                  <p>Popular items from {c.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="featured">
          <h2>Featured Products</h2>
          <div className="product-grid">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="view-all-wrap">
            <button className="btn-primary">View All Products</button>
          </div>
        </section>

        <footer className="footer">© {new Date().getFullYear()} CityMart — Sell your city’s products</footer>
      </div>
    </div>
  );
}