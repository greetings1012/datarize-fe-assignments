import { getCustomerPurchases, getCustomers } from '../api/customer';
import { ApiError } from '../types/api';
import { Customer, PurchaseDetail } from '../types/customer';
import { createQuery } from '../utils/query';

export const useCustomers = (sortBy?: 'asc' | 'desc', name?: string) => {
  return createQuery<Customer[], ApiError>({
    queryKey: ['customers', sortBy, name],
    queryFn: () => getCustomers(sortBy, name),
    custom404Message: '검색 결과가 없습니다.',
  });
};

export const useCustomerPurchases = (customerId: number) => {
  return createQuery<PurchaseDetail[], ApiError>({
    queryKey: ['customer-purchases', customerId],
    queryFn: () => getCustomerPurchases(customerId),
    enabled: Boolean(customerId),
    custom404Message: '고객을 찾을 수 없습니다.',
  });
};
