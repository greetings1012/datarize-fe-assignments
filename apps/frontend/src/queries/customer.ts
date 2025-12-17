import { useQuery } from '@tanstack/react-query';
import { client } from '../api/base';
import { Customer, PurchaseDetail } from '../types/customer';

const getCustomers = async (sortBy?: 'asc' | 'desc', name?: string) => {
  try {
    const { data } = await client.get<Customer[]>('/customers', {
      params: { sortBy, name },
    });
    return data;
  } catch (error: any) {
    if (error.status === 404) {
      throw { ...error, message: '검색 결과가 없습니다.' };
    }
    throw error;
  }
};

const getCustomerPurchases = async (id: number) => {
  const { data } = await client.get<PurchaseDetail[]>(
    `/customers/${id}/purchases`,
  );
  return data;
};

export const useCustomers = (sortBy?: 'asc' | 'desc', name?: string) => {
  return useQuery({
    queryKey: ['customers', sortBy, name],
    queryFn: () => getCustomers(sortBy, name),
  });
};

export const useCustomerPurchases = (customerId: number) => {
  return useQuery({
    queryKey: ['customer-purchases', customerId],
    queryFn: () => getCustomerPurchases(customerId),
    enabled: Boolean(customerId),
  });
};
