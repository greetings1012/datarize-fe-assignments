import { useQuery } from '@tanstack/react-query';

import { getCustomerPurchases, getCustomers } from '../../api/customer';
import { Customer, PurchaseDetail } from '../../types/customer';
import { ApiError } from '../../types/api';

export const useCustomers = (sortBy?: 'asc' | 'desc', name?: string) => {
  return useQuery<Customer[], ApiError>({
    queryKey: ['customers', sortBy, name],
    queryFn: () => getCustomers(sortBy, name),
  });
};

export const useCustomerPurchases = (id: number, enabled = false) => {
  return useQuery<PurchaseDetail[], ApiError>({
    queryKey: ['customer-purchases', id],
    queryFn: () => getCustomerPurchases(id),
    enabled: Boolean(id) && enabled,
  });
};
