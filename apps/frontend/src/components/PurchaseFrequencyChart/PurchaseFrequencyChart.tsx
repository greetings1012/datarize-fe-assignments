import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { usePurchaseFrequency } from '../../hooks/queries';
import { SectionCard } from '../SectionCard/SectionCard';
import { DatePicker } from '../DatePicker/DatePicker';
import * as S from './PurchaseFrequencyChart.styles';
import { useTheme } from '@emotion/react';
import { useState } from 'react';

export const PurchaseFrequencyChart = () => {
  const [dateRange, setDateRange] = useState({
    from: '2024-07-01',
    to: '2024-07-31',
  });
  const { data, isLoading, isError, error } = usePurchaseFrequency(dateRange);

  const theme = useTheme();

  const renderContent = () => {
    if (isLoading) return <S.StatusMessage>데이터를 불러오는 중입니다...</S.StatusMessage>;
    if (isError)
      return (
        <S.StatusMessage isError>
          <S.MessageTitle>데이터 오류</S.MessageTitle>
          <S.MessageDesc>{error.message}</S.MessageDesc>
        </S.StatusMessage>
      );
    console.log(data);
    if (!data || data.every((item) => item.count === 0))
      return (
        <S.StatusMessage>
          <S.MessageTitle>표시할 데이터가 없습니다</S.MessageTitle>
          <S.MessageDesc>선택하신 기간에는 구매 내역이 존재하지 않습니다.</S.MessageDesc>
        </S.StatusMessage>
      );

    return (
      <S.ChartContainer>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.colors.border} />
            <XAxis
              label={{ value: '(단위: 만원)', position: 'bottom', offset: -10, style: { fontSize: 11 } }}
              height={40}
              axisLine={false}
              tickLine={false}
              dataKey="range"
              tickFormatter={(value) => {
                const [start, end] = value.split(' - ').map(Number);
                const s = Math.floor(start / 10000);
                const e = Math.floor(end / 10000);
                return start === 0 ? `~ ${e}` : `${s} ~ ${e}`;
              }}
            ></XAxis>
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme.colors.textSecondary }} />
            <Bar dataKey="count" fill={theme.colors.primary} radius={[6, 6, 0, 0]} barSize={45}>
              <LabelList dataKey="count" position="top" format="개" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </S.ChartContainer>
    );
  };

  return (
    <SectionCard>
      <SectionCard.Header>
        <SectionCard.Title>가격대별 구매 빈도</SectionCard.Title>
        <SectionCard.Controls>
          <DatePicker from={dateRange.from} to={dateRange.to} onChange={setDateRange} />
        </SectionCard.Controls>
      </SectionCard.Header>
      <SectionCard.Content>{renderContent()}</SectionCard.Content>
    </SectionCard>
  );
};
