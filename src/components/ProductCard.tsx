import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product);
    
    const notification = document.createElement('div');
    notification.className = 'fixed z-50 bg-green-500 text-white py-2 px-4 rounded shadow-lg';
    notification.style.top = `${Math.random() * 20 + 60}px`;
    notification.style.right = `${Math.random() * 20 + 20}px`;
    notification.innerHTML = `Added ${product.name} to cart`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-20px)';
      notification.style.transition = 'opacity 0.5s, transform 0.5s';
      setTimeout(() => notification.remove(), 500);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-blue-600 font-bold">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="group flex items-center bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white py-1.5 px-3 rounded-full transition-colors duration-300"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard