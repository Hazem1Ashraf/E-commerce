export interface ShippingAddress {
  details: string;
  city: string;
  phone: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Product {
  _id: string;
  title: string;
  imageCover: string;
  ratingsAverage: number;
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

export interface Order {
  _id: string;
  shippingAddress?: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  user?: User;
  cartItems: CartItem[];
}