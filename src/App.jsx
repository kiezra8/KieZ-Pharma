import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import ProductDetail from './pages/ProductDetail';
import AdminPage from './pages/AdminPage';
import SplashScreen from './components/SplashScreen';
import './App.css';

export default function App() {
  const [page, setPage] = useState('home');
  const [targetCategory, setTargetCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setPage('product');
  };

  const handleCategoryClick = (category) => {
    setTargetCategory(category);
    setPage('categories');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (target) => {
    setSelectedProduct(null);
    setSearchQuery('');
    setTargetCategory(null); // Reset so it defaults to the first category if coming via BottomNav
    setPage(target);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedProduct(null);
    setPage('home');
    window.scrollTo(0, 0);
  };

  if (selectedProduct) {
    return (
      <AppProvider>
        <SplashScreen />
        <CartProvider>
          <div className="app-shell">
            <ProductDetail product={selectedProduct} onBack={handleBack} />
            <BottomNav activePage={page} onNavigate={handleNavigate} />
          </div>
        </CartProvider>
      </AppProvider>
    );
  }

  return (
    <AppProvider>
      <SplashScreen />
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
            <CategoriesPage onProductClick={handleProductClick} initialCategory={targetCategory} />
          )}
          {page === 'cart' && (
            <CartPage onProductClick={handleProductClick} />
          )}
          {page === 'account' && <AccountPage onNavigate={handleNavigate} />}
          {page === 'admin' && <AdminPage onBack={() => handleNavigate('account')} />}
        </main>

        <BottomNav activePage={page} onNavigate={handleNavigate} />
      </div>
      </CartProvider>
    </AppProvider>
  );
}
