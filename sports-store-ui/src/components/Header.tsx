"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const { itemCount } = useCart();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="flex items-center justify-between whitespace-nowrap bg-[#141414] border-b border-solid border-b-[#303030] px-4 sm:px-10 py-3 sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-4 text-white">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">FitFlex</h2>
      </Link>
      
      {/* Main Navigation */}
      <nav className="hidden lg:flex items-center gap-9">
        <Link className="text-white text-sm font-medium leading-normal hover:text-gray-300" href="/men">Men</Link>
        <Link className="text-white text-sm font-medium leading-normal hover:text-gray-300" href="/women">Women</Link>
        <Link className="text-white text-sm font-medium leading-normal hover:text-gray-300" href="/kids">Kids</Link>
        <Link className="text-white text-sm font-medium leading-normal hover:text-gray-300" href="/accessories">Accessories</Link>
        <Link className="text-white text-sm font-medium leading-normal hover:text-gray-300" href="/sale">Sale</Link>
      </nav>

      {/* User Actions */}
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <button 
            onClick={logout}
            className="hidden sm:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#303030] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#454545]"
          >
            <span className="truncate">Logout</span>
          </button>
        ) : (
          <Link 
            href="/login"
            className="hidden sm:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#303030] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#454545]"
          >
            <span className="truncate">Sign In</span>
          </Link>
        )}

        <Link href="/wishlist" className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#303030] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#454545]">
          <HeartIcon className="h-5 w-5" />
        </Link>
        
        <Link href="/cart" className="relative flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#303030] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#454545]">
          <ShoppingBagIcon className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}