import type { Metadata } from "next";
// 1. Import the 'Plus_Jakarta_Sans' font
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header"; // Make sure this points to your new Header

// 2. Configure the font
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitFlex",
  description: "High-performance sports gear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Apply the font className and background color to the body */}
      <body className={`${jakarta.className} bg-[#141414] text-white`} suppressHydrationWarning={true}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main>
              {children}
            </main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}