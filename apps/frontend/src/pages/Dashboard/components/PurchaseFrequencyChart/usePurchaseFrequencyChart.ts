import { useState } from 'react';
import { getTodayKST } from '../../../../utils/date';
import { DateRange } from '../../../../types/date';
import { DEFAULT_DATE_RANGE } from '../../../../constants/date';
import { usePurchaseFrequency } from '../../../../queries/purchase';

export const usePurchaseFrequencyChart = () => {
  const today = getTodayKST();

  const [dateRange, setDateRange] = useState<DateRange>(DEFAULT_DATE_RANGE);

  const queryResults = usePurchaseFrequency(dateRange.from, dateRange.to);

  const handleFromChange = (newFrom: string) => {
    setDateRange((prev) => {
      // to가 없거나 from이 to보다 크면 to도 같은 값으로 설정
      const newTo = !prev.to || newFrom > prev.to ? newFrom : prev.to;
      return { from: newFrom, to: newTo };
    });
  };

  const handleToChange = (newTo: string) => {
    setDateRange((prev) => ({ ...prev, to: newTo }));
  };

  const isDataEmpty =
    !queryResults.isLoading &&
    !queryResults.error &&
    (!queryResults.data?.length ||
      queryResults.data.every((item) => item.count === 0));

  return {
    today,
    dateRange,
    handleFromChange,
    handleToChange,
    isDataEmpty,
    ...queryResults,
  };
};
