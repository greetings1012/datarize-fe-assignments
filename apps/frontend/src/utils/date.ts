import { KST_OFFSET_MS } from '../constants/date';

export const getTodayKST = (): string => {
  return new Date(new Date().getTime() + KST_OFFSET_MS)
    .toISOString()
    .split('T')[0];
};
