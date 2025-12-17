import { useQuery } from '@tanstack/react-query';

import { client } from '../api/base';
import { PurchaseFrequency } from '../types/purchase';

// 구매 빈도 조회 API
const getPurchaseFrequency = async (from?: string, to?: string) => {
  const { data } = await client.get<PurchaseFrequency[]>(
    '/purchase-frequency',
    {
      params: { from, to },
    },
  );
  return data;
};

// 구매 빈도 조회 훅
export const usePurchaseFrequency = (from?: string, to?: string) => {
  const toDate = to || from; // to가 없으면 from 사용

  return useQuery({
    queryKey: ['purchase-frequency', from, toDate],
    queryFn: () => getPurchaseFrequency(from, toDate),
    enabled: Boolean(from) && Boolean(toDate), // 날짜가 있을 때만 실행
  });
};
