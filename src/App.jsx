import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import ProductDetail from './pages/ProductDetail';
import './App.css';

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setPage('product');
  };

  const handleCategoryClick = (category) => {
    setPage('categories');
  };

  const handleNavigate = (target) => {
    setSelectedProduct(null);
    setSearchQuery('');
    setPage(target);
  };

  const handleBack = () => {
    setSelectedProduct(null);
    setPage('home');
  };

  if (selectedProduct) {
    return (
      <CartProvider>
        <div className="app-shell">
          <ProductDetail product={selectedProduct} onBack={handleBack} />
          <BottomNav activePage={page} onNavigate={handleNavigate} />
        </div>
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="app-shell">
        {page !== 'product' && (
          <Header
            onCartClick={() => handleNavigate('cart')}
            onSearchChange={setSearchQuery}
            searchQuery={searchQuery}
          />
        )}

        <main className="app-main">
          {page === 'home' && (
            <HomePage
              onProductClick={handleProductClick}
              onCategoryClick={handleCategoryClick}
              searchQuery={searchQuery}
            />
          )}
          {page === 'categories' && (
            <CategoriesPage onProductClick={handleProductClick} />
          )}
          {page === 'cart' && (
            <CartPage onProductClick={handleProductClick} />
          )}
          {page === 'account' && <AccountPage />}
        </main>

        <BottomNav activePage={page} onNavigate={handleNavigate} />
      </div>
    </CartProvider>
  );
}
