import { useQuery } from '@tanstack/react-query';

import { getPurchaseFrequency } from '../../api/purchase';
import { ApiError } from '../../types/api';
import { PurchaseFrequency } from '../../types/purchase';

export const usePurchaseFrequency = (from?: string, to?: string) => {
  return useQuery<PurchaseFrequency[], ApiError>({
    queryKey: ['purchase-frequency', from, to],
    queryFn: () => getPurchaseFrequency(from, to),
  });
};
