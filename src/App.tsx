import React, { useState } from 'react';
import { products } from './data/products';
import { CartProvider } from './context/CartContext';
import { Search } from 'lucide-react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-3xl mx-auto mt-8 mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
            />
            <Search className="absolute right-6 top-3.5 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <main className="max-w-7xl mx-auto">
          <ProductList products={products} searchQuery={searchQuery} />
        </main>

        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setIsCartOpen(false)}></div>
            <div className="absolute inset-y-0 right-0 max-w-full flex">
              <div className="relative w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto">
                    <Cart onClose={() => setIsCartOpen(false)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Open cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </button>
      </div>
    </CartProvider>
  );
}

export default App;