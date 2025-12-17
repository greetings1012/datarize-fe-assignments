import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { SectionCard } from '../../../../components/SectionCard/SectionCard';
import { DatePicker } from '../../../../components/DatePicker/DatePicker';
import { StatusMessage } from '../../../../components/StatusMessage/StatusMessage';
import { ChartContent } from './ChartContent/ChartContent';
import { UI_MESSAGES } from '../../../../constants/ui';
import { usePurchaseFrequency } from '../../../../queries/purchase';
import { getTodayKST } from '../../../../utils/date';
import { DEFAULT_DATE_RANGE } from '../../../../constants/date';

export const PurchaseFrequencyChart = () => {
  const theme = useTheme();
  const today = getTodayKST();
  const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE);

  const { data, isLoading, error } = usePurchaseFrequency(
    dateRange.from,
    dateRange.to,
  );

  // 데이터가 비어있는지 확인 (모든 count가 0인 경우 포함)
  const isDataEmpty =
    !isLoading && !error && (!data?.length || data.every((d) => d.count === 0));

  // 시작 날짜(from)를 변경할 때 종료 날짜(to)가 시작일보다 앞서지 않도록 자동으로 보정
  const handleDateChange = (type: 'from' | 'to', value: string) => {
    setDateRange((prev) => {
      if (type === 'from')
        return {
          from: value,
          to: !prev.to || value > prev.to ? value : prev.to,
        };
      return { ...prev, to: value };
    });
  };

  const renderContent = () => {
    if (isLoading)
      return <StatusMessage title={UI_MESSAGES.LOADING.PURCHASE_FREQUENCY} />;
    if (error) return <StatusMessage title={error.message} isError />;
    if (isDataEmpty || !data)
      return (
        <StatusMessage
          title={UI_MESSAGES.EMPTY.PURCHASE_FREQUENCY_DESCRIPTION}
        />
      );
    return <ChartContent data={data} theme={theme} />;
  };

  return (
    <SectionCard>
      <SectionCard.Header>
        <SectionCard.Title>가격대별 구매 빈도</SectionCard.Title>
        <SectionCard.Controls>
          <DatePicker
            label="시작"
            value={dateRange.from}
            onChange={(v) => handleDateChange('from', v)}
            max={dateRange.to || today}
          />
          <DatePicker
            label="종료"
            value={dateRange.to}
            onChange={(v) => handleDateChange('to', v)}
            min={dateRange.from}
            max={today}
          />
        </SectionCard.Controls>
      </SectionCard.Header>
      <SectionCard.Content>{renderContent()}</SectionCard.Content>
    </SectionCard>
  );
};
