export interface Customer {
  id: number;
  name: string;
  count: number;
  totalAmount: number;
}

export interface PurchaseDetail {
  date: string;
  quantity: number;
  product: string;
  price: number;
  imgSrc: string;
}
