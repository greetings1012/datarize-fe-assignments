// 차트 유틸리티 함수 테스트
import { describe, it, expect } from 'vitest';
import {
  formatPriceRangeLabel,
  transformChartData,
} from './ChartContent.utils';
import { PurchaseFrequency } from '../../../../../types/purchase';

describe('formatPriceRangeLabel', () => {
  it('2만원 이하 범위를 "~2만"으로 변환해야 함', () => {
    const result = formatPriceRangeLabel('0-20000');
    expect(result).toBe('~2만');
  });

  it('10만원 이상 범위를 "10만~"으로 변환해야 함', () => {
    const result = formatPriceRangeLabel('100000-200000');
    expect(result).toBe('10만~');
  });

  it('일반 범위를 "X~Y만" 형식으로 변환해야 함', () => {
    expect(formatPriceRangeLabel('20000-30000')).toBe('2~3만');
    expect(formatPriceRangeLabel('30000-40000')).toBe('3~4만');
    expect(formatPriceRangeLabel('50000-60000')).toBe('5~6만');
  });

  it('공백이 포함된 범위도 올바르게 처리해야 함', () => {
    const result = formatPriceRangeLabel('20000 - 30000');
    expect(result).toBe('2~3만');
  });

  it('매칭되지 않는 형식은 원본을 반환해야 함', () => {
    const invalidRange = 'invalid-range';
    const result = formatPriceRangeLabel(invalidRange);
    expect(result).toBe(invalidRange);
  });

  it('정확히 경계값을 처리해야 함', () => {
    expect(formatPriceRangeLabel('20000-30000')).toBe('2~3만');
    expect(formatPriceRangeLabel('100000-110000')).toBe('10만~');
  });

  it('빈 문자열을 처리해야 함', () => {
    const result = formatPriceRangeLabel('');
    expect(result).toBe('');
  });

  it('탭 문자 등 다른 공백을 처리해야 함', () => {
    const result = formatPriceRangeLabel('20000\t-\t30000');
    expect(result).toBe('2~3만');
  });

  it('여러 공백을 처리해야 함', () => {
    const result = formatPriceRangeLabel('20000   -   30000');
    expect(result).toBe('2~3만');
  });

  describe('transformChartData', () => {
    it('구매 빈도 데이터에 라벨을 추가해야 함', () => {
      const input: PurchaseFrequency[] = [
        { range: '0-20000', count: 10 },
        { range: '20000-30000', count: 5 },
        { range: '100000-200000', count: 2 },
      ];

      const result = transformChartData(input);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        range: '0-20000',
        count: 10,
        label: '~2만',
      });
      expect(result[1]).toEqual({
        range: '20000-30000',
        count: 5,
        label: '2~3만',
      });
      expect(result[2]).toEqual({
        range: '100000-200000',
        count: 2,
        label: '10만~',
      });
    });

    it('빈 배열을 처리해야 함', () => {
      const input: PurchaseFrequency[] = [];
      const result = transformChartData(input);
      expect(result).toEqual([]);
    });

    it('원본 데이터의 모든 속성을 유지해야 함', () => {
      const input: PurchaseFrequency[] = [{ range: '30000-40000', count: 7 }];

      const result = transformChartData(input);

      expect(result[0]).toHaveProperty('range', '30000-40000');
      expect(result[0]).toHaveProperty('count', 7);
      expect(result[0]).toHaveProperty('label', '3~4만');
    });

    it('count가 0인 데이터도 처리해야 함', () => {
      const input: PurchaseFrequency[] = [{ range: '20000-30000', count: 0 }];

      const result = transformChartData(input);

      expect(result[0]).toEqual({
        range: '20000-30000',
        count: 0,
        label: '2~3만',
      });
    });
  });
});
