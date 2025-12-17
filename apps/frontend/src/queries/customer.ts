import { useQuery } from '@tanstack/react-query';
import { getCustomers, getCustomerPurchases } from '../api/customer';
import { ApiError } from '../types/api';
import { Customer, PurchaseDetail } from '../types/customer';

export const useCustomers = (sortBy?: 'asc' | 'desc', name?: string) => {
  return useQuery<Customer[], ApiError>({
    queryKey: ['customers', sortBy, name],
    queryFn: () => getCustomers(sortBy, name),
  });
};

export const useCustomerPurchases = (customerId: number) => {
  return useQuery<PurchaseDetail[], ApiError>({
    queryKey: ['customer-purchases', customerId],
    queryFn: () => getCustomerPurchases(customerId),
    enabled: !!customerId,
  });
};
