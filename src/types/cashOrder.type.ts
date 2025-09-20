export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface OrderResponse {
  status: string;
  data: {
    _id: string;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    shippingAddress: ShippingAddress;
    createdAt: string;
  };
}
