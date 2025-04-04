import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const navigation = {
  categories: [
    {
      name: 'Shop',
      featured: [
        { name: 'Custom PCs', href: '/custom-pc', imageSrc: '/images/gaming-pc.jpg' },
        { name: 'Computer Parts', href: '/parts', imageSrc: '/images/parts/gpu/4090.jpg' },
        { name: 'Custom Build', href: '/custom-build', imageSrc: '/images/custom-pc.jpg' },
      ],
    },
  ],
  pages: [
    { name: 'Home', href: '/' },
    { name: 'Custom PCs', href: '/custom-pc' },
    { name: 'Parts', href: '/parts' },
    { name: 'Custom Build', href: '/custom-build' },
  ],
}; 

export default function Header() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout, setShowLoginModal } = useAuth();

  return (
    <div className="bg-white">
      <header className="relative">
        <nav aria-label="Top">
          <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <div className="h-16 flex items-center justify-between">
                  <div className="flex items-center">
                    <a href="/" className="text-lg font-bold text-blue-600">
                    Quantum Tech
                    </a>
                    <div className="hidden ml-8 space-x-8 lg:flex">
                      {navigation.pages.map((page) => (
                        <a
                          key={page.name}
                          href={page.href}
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          {page.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center">
                    {user ? (
                      <div className="flex items-center ml-4 space-x-4">
                        <span className="text-sm text-gray-700">
                          Hello, {user.name || user.email}
                        </span>
                        <button
                          type="button"
                          className="text-sm text-gray-700 hover:text-gray-800"
                          onClick={logout}
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="text-sm text-gray-700 hover:text-gray-800 ml-4"
                        onClick={() => setShowLoginModal(true)}
                      >
                        Login
                      </button>
                    )}

                    <div className="ml-4 flow-root lg:ml-6">
                      <a href="/checkout" className="group -m-2 p-2 flex items-center">
                        <ShoppingBagIcon
                          className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                          {cart.length}
                        </span>
                        <span className="sr-only">items in cart, view bag</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
} 