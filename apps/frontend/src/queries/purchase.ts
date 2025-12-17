import { getPurchaseFrequency } from '../api/purchase';
import { ApiError } from '../types/api';
import { PurchaseFrequency } from '../types/purchase';
import { createQuery } from '../utils/query';

export const usePurchaseFrequency = (from?: string, to?: string) => {
  const toDate = to || from;

  return createQuery<PurchaseFrequency[], ApiError>({
    queryKey: ['purchase-frequency', from, toDate],
    queryFn: () => getPurchaseFrequency(from, toDate),
    enabled: Boolean(from) && Boolean(toDate),
    custom404Message: '표시할 데이터가 없습니다',
  });
};
