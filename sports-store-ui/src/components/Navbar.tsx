"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext'; // 1. Import useAuth
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const { itemCount } = useCart();
  const { isAuthenticated, logout } = useAuth(); // 2. Get auth state

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            SportzStore
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-gray-800">
              <ShoppingCartIcon className="h-7 w-7" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {/* 3. Conditionally render Login/Logout button */}
            {isAuthenticated ? (
              <button onClick={logout} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Logout
              </button>
            ) : (
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}