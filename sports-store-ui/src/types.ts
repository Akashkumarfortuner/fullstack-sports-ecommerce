export type Product = {
  id: string;
  name: string;
  description: string;
  brand_name: string;
  category_name: string;
  price: string;
  image_urls?: string[];
};

export type Category = {
  id: string;
  name: string;
};