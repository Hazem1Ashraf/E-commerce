export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface CashOrderResponse {
  status: string;
  data: {
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    user: string;
    cartItems: {
      count: number;
      _id: string;
      product: string;
      price: number;
    }[];
    shippingAddress: ShippingAddress;
    createdAt: string;
    updatedAt: string;
    id: number;
    __v: number;
  };
}
