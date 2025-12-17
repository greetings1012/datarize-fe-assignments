import { useQuery } from '@tanstack/react-query';

import { getCustomerPurchases, getCustomers } from '../api/customer';
import { ApiError } from '../types/api';
import { Customer, PurchaseDetail } from '../types/customer';
import { shouldRetry } from '../utils/query';

export const useCustomers = (sortBy?: 'asc' | 'desc', name?: string) => {
  return useQuery<Customer[], ApiError>({
    queryKey: ['customers', sortBy, name],
    queryFn: () => getCustomers(sortBy, name),
    retry: shouldRetry,
  });
};

export const useCustomerPurchases = (customerId: number) => {
  return useQuery<PurchaseDetail[], ApiError>({
    queryKey: ['customer-purchases', customerId],
    queryFn: () => getCustomerPurchases(customerId),
    enabled: Boolean(customerId),
    retry: shouldRetry,
  });
};
