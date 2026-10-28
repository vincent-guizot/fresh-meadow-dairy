import React, { useState, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import FarmStory from './components/FarmStory';
import Footer from './components/Footer';
import { products } from './data/products';
import { useCart } from './context/CartContext';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProduct, setSelectedProduct } = useCart();
  const catalogRef = useRef(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleScrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7EF] text-[#17324D] font-sans selection:bg-[#2563A6] selection:text-white">
      {/* Top Navigation */}
      <Navbar onSearch={setSearchTerm} searchTerm={searchTerm} />

      {/* Main Hero Banner */}
      <Hero onShopClick={handleScrollToCatalog} />

      {/* Product Catalog Section */}
      <main ref={catalogRef} id="catalog" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#356B4B] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct From Highland Valley</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#17324D] tracking-tight mt-0.5">
              Morning Fresh Dairy Selection
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Bottled cold and delivered to preserve full nutritional richness.
            </p>
          </div>

          {/* Category Filter Pills */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8">
            <p className="text-sm font-bold text-slate-700">No dairy products match your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="mt-3 px-4 py-2 bg-[#2563A6] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Farm Heritage & Quality Section */}
      <FarmStory />

      {/* Footer */}
      <Footer />

      {/* Interactive Quick View Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Instant Checkout Modal */}
      <CheckoutModal />
    </div>
  );
}
