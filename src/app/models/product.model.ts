export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number; // <-- Añade esta línea
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}