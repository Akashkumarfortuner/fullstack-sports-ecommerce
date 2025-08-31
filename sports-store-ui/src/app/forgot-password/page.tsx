"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would call your backend API here.
    setMessage(`If an account with ${email} exists, a password reset link has been sent.`);
    alert("This feature is not yet implemented on the backend.");
  };

  return (
    <div className="flex flex-1 justify-center py-5">
      <div className="flex flex-col w-full max-w-md py-5">
        <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
          Reset Your Password
        </h2>
        <p className="text-gray-400 text-center px-4 mb-6">
          Enter your email and we'll send you a link to get back into your account.
        </p>
        
        <form onSubmit={handleSubmit} className="px-4">
          <div className="py-3">
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-blue-500 border-none bg-[#303030] h-14 placeholder:text-[#ababab] p-4 text-base font-normal"
            />
          </div>

          {message && <p className="text-green-500 text-sm text-center py-2">{message}</p>}

          <div className="py-3">
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-white text-black text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-200"
            >
              <span className="truncate">Send Reset Link</span>
            </button>
          </div>
        </form>
        
        <p className="text-[#ababab] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
          <Link href="/login" className="underline hover:text-white">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}