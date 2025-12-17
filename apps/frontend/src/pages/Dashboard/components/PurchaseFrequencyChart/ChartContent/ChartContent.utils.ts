import { PRICE_RANGES } from '../../../../../constants/price';
import { PurchaseFrequency } from '../../../../../types/purchase';

// 가격 범위를 간단한 라벨로 변환 ("0-20000" -> "~2만")
export const formatPriceRangeLabel = (range: string): string => {
  const match = range.match(/(\d+)\s*-\s*(\d+)/);
  if (!match) {
    return range;
  }

  const min = parseInt(match[1], 10);
  const max = parseInt(match[2], 10);

  if (min === PRICE_RANGES.MIN && max === PRICE_RANGES.MAX_20K) {
    return '~2만';
  }

  const minMan = Math.floor(min / PRICE_RANGES.UNIT);
  const maxMan = Math.floor(max / PRICE_RANGES.UNIT);

  if (min >= PRICE_RANGES.MAX_100K) {
    return '10만~';
  }

  return `${minMan}~${maxMan}만`;
};

// 차트 데이터에 라벨 추가
export const transformChartData = (data: PurchaseFrequency[]) => {
  return data.map((item) => ({
    ...item,
    label: formatPriceRangeLabel(item.range),
  }));
};
