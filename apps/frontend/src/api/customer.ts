import { Customer, PurchaseDetail } from '../types/customer';
import { client } from './base';

export const getCustomers = async (sortBy?: 'asc' | 'desc', name?: string) => {
  const { data } = await client.get<Customer[]>('/customers', {
    params: { sortBy, name },
  });
  return data;
};

export const getCustomerPurchases = async (id: number) => {
  const { data } = await client.get<PurchaseDetail[]>(`/customers/${id}/purchases`);
  return data;
};
