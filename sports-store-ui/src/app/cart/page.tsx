"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cartItems, clearCart } = useCart();
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const orderPayload = {
      items: cartItems.map(item => ({ variantId: item.variantId, quantity: item.quantity })),
      shipping_address: { // In a real app, this would come from a form
        address_line1: "123 Test St",
        city: "Testville",
        state: "Testland",
        postal_code: "12345",
        country: "India"
      }
    };

    const res = await fetch('http://localhost:3001/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderPayload)
    });

    if (res.ok) {
      alert('Order placed successfully!');
      clearCart();
      router.push('/'); // Redirect to homepage
    } else {
      const errorData = await res.json();
      alert(`Failed to place order: ${errorData.error}`);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.variantId} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="text-lg font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between font-bold text-xl mt-4 pt-4 border-t">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}