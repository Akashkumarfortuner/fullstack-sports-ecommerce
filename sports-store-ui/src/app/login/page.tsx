"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data.token);
        router.push('/'); // Redirect to homepage on success
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 justify-center py-5">
      <div className="flex flex-col w-full max-w-md py-5">
        <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
          Welcome to FitFlex
        </h2>
        
        <form onSubmit={handleSubmit} className="px-4">
          <div className="py-3">
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-blue-500 border-none bg-[#303030] h-14 placeholder:text-[#ababab] p-4 text-base font-normal leading-normal"
            />
          </div>
          <div className="py-3">
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-blue-500 border-none bg-[#303030] h-14 placeholder:text-[#ababab] p-4 text-base font-normal leading-normal"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center py-2">{error}</p>}

          <div className="py-3">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-white text-black text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 disabled:bg-gray-400"
            >
              <span className="truncate">{loading ? 'Signing In...' : 'Sign In'}</span>
            </button>
          </div>
        </form>
        
        <p className="text-[#ababab] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
          {/* This link is now updated */}
          <Link href="/forgot-password" className="underline hover:text-white">Forgot your password?</Link>
        </p>
        <p className="text-[#ababab] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
          Don't have an account? <Link href="/register" className="underline hover:text-white">Sign up</Link>
        </p>
      </div>
    </div>
  );
}