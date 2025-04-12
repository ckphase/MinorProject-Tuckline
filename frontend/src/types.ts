export type Category = {
  id: string;
  name: string;
};
export type Categories = { categories: Category[] };

export type User = {
  id: number;
  email: string;
  name?: string;
  role: string;
};

export type RegisterResponse = {
  message: string;
  user: User;
};

export type LoginResponse = {
  message: string;
  user: User;
};

export type MeResponse = User;

export type Shop = {
  id: number;
  name: string;
};

export type PriceEntry = {
  shop: Shop;
  price: string;
};

export type ProductVariant = {
  id: number;
  productId: number;
  product: {
    category: {
      name: string;
    };
    description: string;
  };
  name: string;
  createdAt: string;
  image: string | null;
  prices: PriceEntry[];
};

export type ProductListResponse = {
  products: ProductVariant[];
};
