export type Category = string;
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
