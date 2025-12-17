import { useQuery } from '@tanstack/react-query';
import { getCustomers, getCustomerPurchases } from '../api/customer';
import { getPurchaseFrequency } from '../api';

interface DateRange {
  from: string;
  to: string;
}

export const useCustomers = (sortBy?: 'asc' | 'desc', name?: string, dateRange?: DateRange) => {
  return useQuery({
    queryKey: ['customers', sortBy, name, dateRange?.from, dateRange?.to],
    queryFn: () => getCustomers(sortBy, name),
  });
};

export const usePurchaseFrequency = (dateRange?: DateRange) => {
  return useQuery({
    queryKey: ['purchase-frequency', dateRange?.from, dateRange?.to],
    queryFn: () => getPurchaseFrequency(dateRange?.from, dateRange?.to),
  });
};

export const useCustomerPurchases = (customerId: number) => {
  return useQuery({
    queryKey: ['customer-purchases', customerId],
    queryFn: () => getCustomerPurchases(customerId),
    enabled: !!customerId,
  });
};
