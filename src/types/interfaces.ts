import {PaymentMethod, DeliveryMethod} from './enums';

export interface CheckoutForm {
  street: string;
  street_number: number;
  city: string;
  payment_method: PaymentMethod;
  pay_amount?: number;
  card_due_date?: string;
  card_number?: number;
  card_owner: string;
  cvc_number: number;
  delivery_method: DeliveryMethod;
  custom_delivery_date?: Date;
  custom_delivery_time?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  img_url: string;
  quantity: number;
}

export interface ProductDetailProps {
  product: Product;
  cartItems: any;
  setCartItems: any;
}

export interface CheckoutFormProps {
  cart: any;
}