import { useQuery } from '@tanstack/react-query';
import { client } from '../api/base';
import { PurchaseFrequency } from '../types/purchase';

const getPurchaseFrequency = async (from?: string, to?: string) => {
  const { data } = await client.get<PurchaseFrequency[]>(
    '/purchase-frequency',
    {
      params: { from, to },
    },
  );
  return data;
};

export const usePurchaseFrequency = (from?: string, to?: string) => {
  const toDate = to || from;

  return useQuery({
    queryKey: ['purchase-frequency', from, toDate],
    queryFn: () => getPurchaseFrequency(from, toDate),
    enabled: Boolean(from) && Boolean(toDate),
  });
};
