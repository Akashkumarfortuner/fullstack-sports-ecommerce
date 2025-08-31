import Link from 'next/link';

// --- Type Definitions to match our API data ---
type Product = {
  id: string;
  name: string;
  brand_name: string;
  price: string;
};

type Category = {
  id:string;
  name: string;
};

// --- Data Fetching Functions ---
async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('http://localhost:3001/api/products', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch('http://localhost:3001/api/categories', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}


export default async function HomePage() {
  const products = await getProducts();
  const categories = await getCategories();

  // Define the placeholder images and default text
  const categoryPlaceholders = [
    { name: "Running Shoes", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgGhkZhXbrqbuVqRrKVp2hkC0fDC7iZrHA4TKj4zGB1sFa2-zHSunvzljVIqiYm0XFu6j8Si6NLU6iOMYGji01x8yeYbs_DYfOGRQKX2xPEPQjGza9H9VyTjBmqi7dcNua11mYcNIo4uNd8RBbGlC-BNkL5ss2cLWInfnszJ47gfWQTu7ISf0drQQtKVFSg4_6NoqJv_ve87viXDDU92bzVbD7XHM9y0NyoHP_kWY9DniLKTe2XNhv8lObVurwfKAwI4ori26u5gyd" },
    { name: "Basketball Gear", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzEtOPKooltJSdJsKpONO-atYjsqyPRAQImGJuPyWpAxS4McLBiV3ZQspvOWMw8V-ZBirivLJFEuM60Pv3LYhprzTcKUWFqvFX0eRZh3HKHJf-rMQnIgbjbVqMFGCQv77jGcSf7Wrtmjw96WOv1nzkzWgf9heNXAs5lxw0eZZ133FypaoU8Osn3A_ASPm53wZSsO24F3OfDrhNVJeV3nXDvCqsNzaz4jqVtX8tn480CgJlQRvtUhMfJV_cIUlIu9ZI1Qr-LZW3Nnmi" },
    { name: "Tennis Equipment", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBw1jbEixQPD1qxOMknavu6toOljEzrNDPW1vGQ2wNDi2dSXJ4m2cGeF_0K0iflOdJSdxGXY-Rd26AK4bdvXs71h0K-2UE_iB2Aui_CA251bickQGgsCjmR_ixggkKbuRbGpkt-ar8DELFwZSH05VbtO0XxOvlQrsZ_0g16QCg8WJLhwOcbXurnH80w-VQXanVRPN9pbjRWDu8O935B1kMoV75D6tr5xLZrhcvp2TXDyrwJjQzE93bHNNrvfxPh7u-89pnrSwFY3OaD" },
    { name: "Yoga & Fitness", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMTbciizRH4oaTSxF2F32mmGiVLFK5dztjBVpd3J2jTwlWEfmDMUdzmL_iZUdpW8avKaLvdmrxQyTaOXrd94aZXRXrx6qSX_7lq7L3LRPVxwlZI3NOuRSKsX8FxnXuaMNybsjviiHTcbzA-aQ-Pu9n8aKRJ43rxLTJl4x11-5_75Gk9PxbgdtQX_chCCosBMOV1gyX13WQwCrGF_RgyAkH59HpHBznJMkDlF_8oQ0ml-s6qY-qPvmLx71bVaI7zn83VMlgXDnM6N_i" },
  ];

  const trendingPlaceholders = [
    { name: "Performance Running Shoes", brand: "Engineered for speed", price: "7999.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXxGr8OYUIXy6DkElQAyFKLPlci-nVkFdJRn8zN95DWJPrDfKL5lDJeXsf3Q35wbm0AmW6kCiapcEXXRPXDxkPUD9i_GQsGdHUiK-R0JbVp7W1Z0nzZITd0OycP-27zmfTejcN6snkR4L_6K0JE3HKJxPYiuvYw4P30mIEFShoTbQJVF1xbtbKchkJh6dLD2uFRwyeOXChVHQ_yk7MgBlTcu-iNZ3FRWc5zO44sHrjdA_zhu9lZ6xC2Db6HCbRjVaRd2Ms0yD9AB_T" },
    { name: "Official Basketball", brand: "Durable and high-grip", price: "2499.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwvbU60Kq--52TuvOmZSHQIq2qHBVwMJaOyiMYZ1fTW8mgNj-BQYVOXBdX8baLm5xav5Ogt8tVaUm6Uz9-cIlCbvSMjDprF8a5f77hYXpqmPVIZAsFD5qylXJNtE5KskQ8qpSt-HvUIrzl6vIdjrxz8UFm1kwg08cEJ8OOmdoaWTfGWlChslEmSnpmbaMGpXDDX6LI_VD4kVPUD4e_VJQLNgD9DgvCUFHGyZnir4iza0BKYOfewQd71nL9gsilvmx9fJdm6-YX5lv0" },
    { name: "Pro Tennis Racket", brand: "Precision and control", price: "12999.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLpimU9TZTv6j-_NrAnxISZL2aZMNSxk75schjUjz5-JDKd9E4UYrQsv0mL4_yjSxkFhmfX3mdaRj5F8k-J6pDsff3LDHDtBUZ0FjUYb3aNMfsa2hvEKSIfI0uIsSCHTmtyfUeBBZ946Kg9BAEJxA_Eb3q6kVPmQZsSewYIL1lEGihcRFFTeLl2eB4ZUuC7SaxzrV7WT4s702qV1i-R_tMH6gtxKFAAB0ZNLdmJ29sXzBZ7KgxRf5WnXxqxfDfnzUnp6cS4OEnpQ8M" },
    { name: "Eco-Friendly Yoga Mat", brand: "Sustainable and non-slip", price: "3499.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXkd9WGICU6YgBNOhmhldRTRrSHy4Wq-7l7PF06wZcVSah_voVlL4HTxa39J8dNLubb4iBdp0CLKdF5rdm5vRzseCJQSOMzDoWEnSuP7DExQ6GmqEsdYPtbfXVlP_hTy7LaUW7ejt6QkZVVuZ8Dv-iQvYLXaXVuSK_azbecS7xBdkjgtM-ZBHlQQYNFZRurRQVPOB065RjAJtvX6NkeHAUx1tOoteqX-mY-EUJcAyI-G7EXXMJuHluSVOHhgegh6g_mf-j58jTmdbz" },
  ];


  return (
    <div className="bg-[#141414] text-white">
      <div className="layout-content-container flex flex-col max-w-7xl mx-auto px-4">
        
        {/* 1. Hero Section */}
        <div className="py-16">
          <div
            className="flex min-h-[480px] flex-col gap-8 rounded-lg items-center justify-center p-4 bg-cover bg-center"
            style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCypZajo0hX7ANSPg7-cK8CifNYcWYk--JTQzDUVgDd2FUuVLM-gwv1opGMYhCXpac1nT-03vkAFGpSy-z1TH0yLSjtCe7cAAvbfLBfa62yWQhGxh1R_OBPFKnyjJXRUvEU0VTtoFKgKIT6OMLBpQOVsKD5wvl61y3UrcOlxjM8tyVK3Tufw5kpGnmaa5wNWSYyVqc54GPBDVFapC7eH8UaDDUsJooY2wRkfQUUhQ0GhWAYB_IUJhsXSs3UQ_w9DwM1jHl-JbdQeQcN")' }}
          >
            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] text-center">
              Define Your Edge
            </h1>
            <Link
              href="/products"
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-white text-black text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-200"
            >
              <span className="truncate">Shop Now</span>
            </Link>
          </div>
        </div>

        {/* 2. Shop by Category Section */}
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {categoryPlaceholders.map((placeholder, index) => {
            const category = categories[index]; // Get the category from your DB if it exists
            return (
              <Link href={category ? `/category/${category.id}` : '#'} key={index} className="group flex flex-col gap-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url("${placeholder.img}")` }}
                ></div>
                <p className="font-semibold text-center">{category ? category.name : placeholder.name}</p>
              </Link>
            );
          })}
        </div>

        {/* 3. Trending Now Section */}
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Trending Now
        </h2>
        <div className="flex overflow-x-auto pb-8 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-stretch p-4 gap-6">
            {trendingPlaceholders.map((placeholder, index) => {
               const product = products[index]; // Get the product from your DB if it exists
              return (
                <Link href={product ? `/products/${product.id}` : '#'} key={index} className="group flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
                  <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url("${placeholder.img}")` }}
                  ></div>
                  <div>
                    <p className="text-white text-base font-medium leading-normal">{product ? product.name : placeholder.name}</p>
                    <p className="text-[#ababab] text-sm font-normal leading-normal">{product ? product.brand_name : placeholder.brand}</p>
                    <p className="text-white text-base font-semibold leading-normal mt-1">₹{product ? parseFloat(product.price).toFixed(2) : parseFloat(placeholder.price).toFixed(2)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
}