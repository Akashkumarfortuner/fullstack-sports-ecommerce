"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { CaretDown, CaretLeft, CaretRight } from '@phosphor-icons/react';

// Using the exact image URLs from your provided HTML as placeholders
const placeholderImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCaHfyXqtmLZO88OFzFN35KcI5Uwm4wJBVhZCZxrPyD0u89YeZFf3Unw_M1iTWCEh0dBo37hPo10nA1zHJmfi6hYdI0ADlHwAtoil40MEI5LVWf2jPSW3y6mVCGzjwnqxOeC4MDprzFqqznmChxzg-hWCodCv7n807Cy6P1VquCFSsLtY2gN9auZyFek92oCOBBQany-eYSPsTT6tSfy491GUxtmQDu6V7LgMUMK1ct_Vkqd9jrtHTXVdEKAzPXqkmmfGdijWN4NLcU", "https://lh3.googleusercontent.com/aida-public/AB6AXuDyIq5pPRTYgydR2Qgg_gnVstdhpGEYL2zf8TbyzL9LWU4c0AhrOvm73QM1p1a04wiFpkOdHr2_7Qu-4_WFtWcowopjZQXJZDQIyHRrrChYp2V4ONArNQnqOcdGSgWPq8rgEuUbUe1FdIXyK-uQ6yxVl77ctV9IfbR8mMA5sQoIFmLVMj_PmNH20PfAFgkYyjwcdyrjhucN7a9YTKiH1c_8imK7lusS89iYIGX-LtTlzchO3gbyRsDCg6Y4jocLz_ZACvutqjtPRZj-",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA7lHopKWlZefAmtzA_uP7lzMWgFe4RH35A-pk7YyfIfZZp6AIhSEfxeYm6oMMVLAXRZ34JvXilbbZIFqeRAzyrdBoqoeF1V8W2-lXuz3DkByupdNcWX-fnb6iZdNdKpExw7zG7Sm2Hw0OMI3vXoXfI79EcVRK4Q8fgr9OrQCKqUBVgm2em_gzN-rfZDlRkuy12k6i38ULAn0i83W9Gn67B3LLZNY6pPnmFN42SQwWtUBxfqUBgqIfQcsa6RraCeSJ9sqPdLYnnRkAU", "https://lh3.googleusercontent.com/aida-public/AB6AXuBnjTasH3xkSjAxYPCBhonOKpEp0ymoAooujULRzDIee2BO8y2wbSD1VONAEMyKyhu-5BMZ8yMShTtB1vEVnR7qh1IGTMbAz4vbKDCrbw0xQxcA1HArkdBVCppXOUCxPRkiolQxVpYvwYNDz0vlfG5rI9LEpIZXpdT4zjQRNGFl-coPZR7h9aUpKEtqrjbrharnNFqqViT7u7gcSwfXbkujn-kGeyOHRMRnWW4hSCqZ5tWSvZCrpuzZyXyDQ7sSu99y5bwaC_c8AXfG",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDNSpQlZ4gSKhPfW_tuon0tvPo4GKLoJe9cik0L48jKfcyrvVrryjVpog9KbTsHTHA4O20MV7znnalo64m3b33u3KVKqQFJzYE_7Y4kBx599YubeGjFcRItfKDCmzu4dITEMgwbmAoStgVLDtqc7iaTAmeTxSe5Ijre2Fnmn4mbRBrZl58FDO3PnuNKAIS8Se7SpE2hElj2ZsNK0i8eeDrj6dbIuWdsX-txR6D6WZnnBibdURmsyiR5guZNaa2-JNEEEVLwSDkdM1EB", "https://lh3.googleusercontent.com/aida-public/AB6AXuBgnbgZPlosqxiC9pd7ngWzDVFmvintl6z2WfvhzYaeatSkew97G5oxFYQAOrq2YZ_KlxDRyM9xdOFggpemZx5w8u-USWjWIisUGA7PrRYzXRQ_EDJCSccvfy34zYDIkRxNC3zy9nwexfYzFB4SZrN6VBSXfMP2JSDsZn6gVS9A1Irv2yZlmTj9DMsVZy9wvTqnI5dEAdqV5_EwPW_Pa06G44QkEq7KzKi9emrOCAqLlUwlAhUZ08ghZvuoSnPcW3akCuxEQ63m5Xvi",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA4kS5wfh-Jwj3scjkG_g4TLmAAgT_fX27ksn1O5FjxmpGNZ81ubzjUl5srf88S8v7sYFQVQcIuGlJuSNcg1lLFlspYWEYGvkXTkn4OjZ5_XO6QN9Y7iGDo88sT14kuxFXA3NiHvdwP_LXHXpsl2FKGnbFO5rnBLy9ScQwG4pxRLX-glx-wLzULmxUzUMiJGzPTQR_IWA8cb41fMkBafpfIAQNok3WD1otHJIMxkdIXkyfz7iYF2iWOQqYyN7QDIU4iik0llRavu3Ii", "https://lh3.googleusercontent.com/aida-public/AB6AXuDgXInV9khGrcKsfrEDlGlFKqq00TegyaRwScsfK8AsJi0ouytQwYtjaYRCHYikpisnvJaJNhPJ7yqYb5kD5bUtoVKzWuQLreBSie3CQrtJ848_sD0ofvp9Q-h3hhnb9qQ_mCzI2PJ6j2fGJiTdRbHU6ZKuHv74IgX0i0UoDPR9iMYMD_I3-n2n65YpvJz1XVyaL9PnR_FTmNsFRlogS6rRmE1LDnwbICBXpunBaJ7UT0_WyfxfPvN4W7Chfo_o-46uq7d_A-yYFyFb",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDS3yeJ5OwQ9d8xhjCZJVWoBLqg4RISKqQ3x3Dv1cTK_JTbyJnAB1GXQ_2u3sTfd4NOXTtIDx_9cXuxLzHhwBNEJEIOZbBguXSB6Kyq5i9JZcOuqKxODWJCIoNdFRpUqJaZUVWdhWuQL3JvSPvxxTXH1w79mq2KYefm0vODIDcje-qe3rN_cmmdYD8q6IWhtsWl7advQ3yRyUg-x9ubj2zlMKIWfuFAVjREiDSzmF3r1KLl1HKZoNyYPUrz-Fe81BBKAppcb9TDQarD", "https://lh3.googleusercontent.com/aida-public/AB6AXuAYTzxSdH-knK6CHhvY5VFFD4Ok3G4OSwmvNgFFef5mzIlXC1BAyl6qqz6hX1MfT5yayHvL_qrdL4N1-RzTOhIzQ8A_tQEtfbyCOTNb7AvyxdZrWrX8boz2GdBiwiFjj8_jhGkr6wjA6ntzNAurOhckPFiVb73f20eDYkwE_5Vj9stkrfUWJtc9XCM17U2aI8aymCXgOotole6dgCIfBBauPAj9wWCV19azpMclpzatWjTHXLklzlrcJQk_6AG7Tk4VECu484I0sCy4",
];

// Placeholder product data for filling the grid
const placeholderProduct: Product = {
  id: '#',
  name: 'Sample Product',
  brand_name: 'FitGear',
  price: '0.00'
};


export default function MenCollectionPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/products');
        if (res.ok) {
          const data = await res.json();
          // We still filter for real products to display first
          const mensProducts = data.filter((p: Product) => p.category_name === 'Apparel');
          setAllProducts(mensProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading Collection...</div>;
  }

  return (
    <div className="layout-content-container flex flex-col max-w-7xl mx-auto px-4 md:px-10">
      {/* Hero Banner */}
      <div className="py-8">
        <div
          className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-lg min-h-[218px]"
          style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDEAOjbzdPD0mxv9cLl9vSZugIO5rFJ6K2isKNKr4ObMhn9HQ6iD21uvYeukurOhBqsVFgAn904WkdU0nKXGv8ytzs6JZrFp88y1FbyN3DbMzSe0wZwM53isYDiQR-MIY6x4rhef0m0YHAId_-arrLcr-IpzlSFLKAtaXZRNt9j93sxjjNKBw2Y9GG0JlrZF-XmxzeYRxD_krPsl-UAX1Fm3jH8exEUvNYfbdK3rPKeMBnUw6lEAhN32p9Lc76zpqMXajJybloI8Voi")' }}
        >
          <div className="flex p-6">
            <p className="text-white tracking-light text-[28px] font-bold leading-tight">Men's Collection</p>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 p-3 flex-wrap">
        <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#303030] pl-4 pr-2 text-white text-sm font-medium">Clothing <CaretDown size={20} /></button>
        <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#303030] pl-4 pr-2 text-white text-sm font-medium">Shoes <CaretDown size={20} /></button>
        <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#303030] pl-4 pr-2 text-white text-sm font-medium">Accessories <CaretDown size={20} /></button>
      </div>

      {/* Product Grid - This logic now ensures all 10 placeholders are shown */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {placeholderImages.map((image, index) => {
          // Use a real product if available, otherwise use a placeholder
          const product = allProducts[index] || placeholderProduct;
          return (
            <ProductCard 
              key={product.id === '#' ? `placeholder-${index}` : product.id} 
              product={product} 
              image={image}
            />
          )
        })}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center p-4">
        <Link href="#" className="flex size-10 items-center justify-center text-white"><CaretLeft size={18} /></Link>
        <Link href="#" className="text-sm font-bold flex size-10 items-center justify-center text-white rounded-full bg-[#303030]">1</Link>
        <Link href="#" className="text-sm font-normal flex size-10 items-center justify-center text-white rounded-full">2</Link>
        <Link href="#" className="text-sm font-normal flex size-10 items-center justify-center text-white rounded-full">3</Link>
        <Link href="#" className="flex size-10 items-center justify-center text-white"><CaretRight size={18} /></Link>
      </div>
    </div>
  );
}