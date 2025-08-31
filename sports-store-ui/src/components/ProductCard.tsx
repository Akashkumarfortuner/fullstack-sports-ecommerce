import Link from 'next/link';
import { Product } from '@/types';

// The 'image' prop is a fallback for when a product from the DB has no image
export default function ProductCard({ product, image }: { product: Product, image: string }) {
  const imageUrl = product.image_urls?.[0] || image;

  return (
    <Link href={`/products/${product.id}`} className="group flex flex-col gap-3 pb-3">
      <div
        className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      ></div>
      <div>
        <p className="text-white text-base font-medium leading-normal truncate">{product.name}</p>
        <p className="text-[#ababab] text-sm font-normal leading-normal">{product.brand_name}</p>
        <p className="text-white text-base font-semibold leading-normal mt-1">₹{parseFloat(product.price).toFixed(2)}</p>
      </div>
    </Link>
  );
}