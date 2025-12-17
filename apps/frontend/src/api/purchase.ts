import { PurchaseFrequency } from '../types/purchase';
import { client } from './base';

export const getPurchaseFrequency = async (from?: string, to?: string) => {
  const { data } = await client.get<PurchaseFrequency[]>('/purchase-frequency', {
    params: { from, to },
  });
  return data;
};
