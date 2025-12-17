import { useTheme } from '@emotion/react';
import { SectionCard } from '../../../../components/SectionCard/SectionCard';
import { DatePicker } from '../../../../components/DatePicker/DatePicker';
import { StatusMessage } from '../../../../components/StatusMessage/StatusMessage';
import { usePurchaseFrequencyChart } from '../../hooks/usePurchaseFrequencyChart';
import { ChartContent } from './ChartContent/ChartContent';
import { UI_MESSAGES } from '../../../../constants/ui';

export const PurchaseFrequencyChart = () => {
  const {
    today,
    dateRange,
    handleFromChange,
    handleToChange,
    data,
    isLoading,
    isError,
    error,
    isDataEmpty,
  } = usePurchaseFrequencyChart();
  const theme = useTheme();

  const renderContent = () => {
    if (isLoading) {
      return <StatusMessage title={UI_MESSAGES.LOADING.PURCHASE_FREQUENCY} />;
    }

    if (isError) {
      return (
        <StatusMessage
          title={UI_MESSAGES.ERROR.PURCHASE_FREQUENCY}
          description={error?.message}
          isError
        />
      );
    }

    if (isDataEmpty) {
      return (
        <StatusMessage
          title={UI_MESSAGES.ERROR.NO_DATA}
          description={UI_MESSAGES.EMPTY.PURCHASE_FREQUENCY_DESCRIPTION}
        />
      );
    }

    if (data) {
      return <ChartContent data={data} theme={theme} />;
    }

    return null;
  };

  return (
    <SectionCard>
      <SectionCard.Header>
        <SectionCard.Title>가격대별 구매 빈도</SectionCard.Title>
        <SectionCard.Controls>
          <DatePicker
            label="시작"
            value={dateRange.from}
            onChange={handleFromChange}
            max={dateRange.to || today}
          />
          <DatePicker
            label="종료"
            value={dateRange.to}
            onChange={handleToChange}
            min={dateRange.from}
            max={today}
          />
        </SectionCard.Controls>
      </SectionCard.Header>

      <SectionCard.Content>{renderContent()}</SectionCard.Content>
    </SectionCard>
  );
};
