import { useQuery } from '@tanstack/react-query';

import { getPurchaseFrequency } from '../api/purchase';
import { ApiError } from '../types/api';
import { PurchaseFrequency } from '../types/purchase';
import { shouldRetry } from '../utils/query';

export const usePurchaseFrequency = (from?: string, to?: string) => {
  const fromDate = from;
  const toDate = to || from;

  return useQuery<PurchaseFrequency[], ApiError>({
    queryKey: ['purchase-frequency', fromDate, toDate],
    queryFn: () => getPurchaseFrequency(fromDate, toDate),
    enabled: Boolean(fromDate) && Boolean(toDate),
    retry: shouldRetry,
  });
};
