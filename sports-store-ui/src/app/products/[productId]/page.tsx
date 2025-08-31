"use client"; // This makes it a Client Component

import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';

// --- Type Definitions ---
type Variant = {
    variant_id: string;
    sku: string;
    price: string;
    attributes: {
      size?: string;
      color?: string;
      gender?: string;
    };
    quantity: number;
    image_urls?: string[]; // Added image_urls to the type
};

type Product = {
    id: string;
    name: string;
    description: string;
    brand_name: string;
    category_name: string;
    variants: Variant[];
};


export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  
  const params = useParams();
  const productId = params.productId as string;

  useEffect(() => {
    if (!productId) return;

    const getProduct = async () => {
      const res = await fetch(`http://localhost:3001/api/products/${productId}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      }
      setLoading(false);
    };
    getProduct();
  }, [productId]);

  if (loading) {
    return <p className="p-8 text-center">Loading...</p>;
  }

  if (!product) {
    return <p className="p-8 text-center">Product not found.</p>;
  }

  // Find the first image from the first variant that has one
  const mainImageUrl = product.variants.find(v => v.image_urls && v.image_urls.length > 0)?.image_urls?.[0];

  const handleAddToCart = (variant: Variant) => {
    addToCart({
      productId: product.id,
      variantId: variant.variant_id,
      name: `${product.name} (${variant.attributes.color || ''}, ${variant.attributes.size || ''})`,
      price: parseFloat(variant.price),
      quantity: 1,
    });
    alert('Item added to cart!');
  };

  return (
    <main className="p-8">
      {/* The main container is now a 2-column grid on medium screens and up */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        
        {/* Column 1: Image Section */}
        <div className="w-full">
          {mainImageUrl ? (
            <img 
              src={mainImageUrl} 
              alt={product.name} 
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>
        
        {/* Column 2: Details Section */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-4">
            By <span className="font-semibold">{product.brand_name}</span> in <span className="font-semibold">{product.category_name}</span>
          </p>
          <p className="text-gray-800 mb-6">{product.description}</p>
          
          <h2 className="text-2xl font-semibold border-t pt-4 mt-6">Available Options</h2>
          <div className="mt-4 space-y-4">
            {product.variants.map(variant => (
              <div key={variant.variant_id} className="sm:flex justify-between items-center border p-4 rounded-md">
                <div className="mb-4 sm:mb-0">
                  <p className="font-medium text-lg">
                    {variant.attributes.color} {variant.attributes.size && `- Size: ${variant.attributes.size}`}
                  </p>
                  <p className="text-sm text-gray-500">SKU: {variant.sku}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xl font-bold">₹{parseFloat(variant.price).toFixed(2)}</p>
                    <p className={`text-sm ${variant.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {variant.quantity > 0 ? `${variant.quantity} in stock` : 'Out of Stock'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(variant)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                    disabled={variant.quantity === 0}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}