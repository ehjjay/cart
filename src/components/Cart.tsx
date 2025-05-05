import React from 'react';
import { Trash2, Plus, Minus, Download } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { generatePDF } from '../utils/pdfUtils';

interface CartProps {
  onClose?: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleGeneratePDF = () => {
    generatePDF(cart.items);
    if (onClose) {
      setTimeout(() => onClose(), 1000);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-2 text-gray-500">Start adding some products to your cart!</p>
          </div>
        ) : (
          <div>
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {cart.items.map(item => (
                  <li key={item.id} className="py-6 flex">
                    <div className="flex-1">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {cart.items.length > 0 && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex justify-between mb-4 text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${cart.totalPrice.toFixed(2)}</p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={handleGeneratePDF}
              className="w-full flex items-center justify-center py-3 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              <span>Download as PDF</span>
            </button>
            
            <button
              onClick={clearCart}
              className="w-full flex items-center justify-center py-3 px-4 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Trash2 className="h-5 w-5 mr-2" />
              <span>Clear Cart</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart