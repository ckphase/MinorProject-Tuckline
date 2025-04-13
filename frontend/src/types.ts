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

export type MeResponse = { user: User };

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

export type OrderLine = {
  id: number;
  orderId: number;
  name: string;
  productVariantId: number;
  quantity: number;
  lineTotal: string;
  productVariant: {
    image?: string | null;
  };
};

export type Order = {
  id: number;
  customerId: number;
  shopId: number;
  totalAmount: string;
  status: string;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  lines: OrderLine[];
};

export type OrderWithShop = Order & {
  shop: {
    id: number;
    name: string;
    description: string;
    ownerId: number;
    location: string;
    createdAt: string;
  };
};

export type OrderWithShopAndCustomer = OrderWithShop & {
  customer: {
    id: number;
    email: string;
    name?: string;
  };
};

export type OrderResponse = {
  message: string;
  orders: Order[];
};

export type OrderHistoryResponse = {
  orders: OrderWithShop[];
};

export type AdminOrderHistoryResponse = {
  orders: OrderWithShopAndCustomer[];
};
