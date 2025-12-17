import { Customer, PurchaseDetail } from '../types/customer';
import { client } from './base';

export const getCustomers = async (sortBy?: 'asc' | 'desc', name?: string) => {
  const response = await client.get<Customer[]>('/customers', {
    params: { sortBy, name },
  });
  return response.data;
};

export const getCustomerPurchases = async (id: number) => {
  const response = await client.get<PurchaseDetail[]>(
    `/customers/${id}/purchases`,
  );
  return response.data;
};
