import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Label,
  LabelList,
} from 'recharts';
import { Theme } from '../../../../../styles/theme';
import { PurchaseFrequency } from '../../../../../types/purchase';
import * as S from './ChartContent.styles';
import { transformChartData } from './ChartContent.utils';

interface ChartContentProps {
  data: PurchaseFrequency[];
  theme: Theme;
}

export const ChartContent = ({ data, theme }: ChartContentProps) => {
  const chartData = transformChartData(data);

  return (
    <S.ChartContainer>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={theme.colors.hover}
          />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: theme.colors.textMain }}
            interval={0}
            height={50}
          >
            <Label
              value="단위: 원"
              fontSize={12}
              fill={theme.colors.textSecondary}
              offset={10}
              position="insideBottom"
            />
          </XAxis>
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: theme.colors.textSecondary }}
            width={40}
          />
          <Bar
            dataKey="count"
            fill={theme.colors.primary}
            radius={[6, 6, 0, 0]}
            barSize={45}
          >
            <LabelList
              dataKey="count"
              position="top"
              fontSize={12}
              fill={theme.colors.textMain}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </S.ChartContainer>
  );
};
