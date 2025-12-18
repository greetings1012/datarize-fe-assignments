// 날짜 유틸리티 함수 테스트
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getTodayKST } from './date';

describe('getTodayKST', () => {
  beforeEach(() => {
    // 시간대를 고정하기 위해 Date를 모킹
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('한국 시간 기준 오늘 날짜를 YYYY-MM-DD 형식으로 반환해야 함', () => {
    // 2024년 1월 15일 오전 10시 (KST)로 고정
    const mockDate = new Date('2024-01-15T10:00:00+09:00');
    vi.setSystemTime(mockDate);

    const result = getTodayKST();

    expect(result).toBe('2024-01-15');
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/); // YYYY-MM-DD 형식 검증
  });

  it('날짜 형식이 올바른지 검증', () => {
    const mockDate = new Date('2024-12-31T23:59:59+09:00');
    vi.setSystemTime(mockDate);

    const result = getTodayKST();

    expect(result).toBe('2024-12-31');
  });

  it('자정 경계를 올바르게 처리해야 함', () => {
    // 2024년 1월 1일 자정 직전 (23:59:59)
    const beforeMidnight = new Date('2024-01-01T23:59:59+09:00');
    vi.setSystemTime(beforeMidnight);
    expect(getTodayKST()).toBe('2024-01-01');

    // 2024년 1월 2일 자정 직후 (00:00:00)
    const afterMidnight = new Date('2024-01-02T00:00:00+09:00');
    vi.setSystemTime(afterMidnight);
    expect(getTodayKST()).toBe('2024-01-02');
  });

  it('연도 경계를 올바르게 처리해야 함', () => {
    // 2023년 12월 31일
    const lastDayOfYear = new Date('2023-12-31T23:59:59+09:00');
    vi.setSystemTime(lastDayOfYear);
    expect(getTodayKST()).toBe('2023-12-31');

    // 2024년 1월 1일
    const firstDayOfYear = new Date('2024-01-01T00:00:00+09:00');
    vi.setSystemTime(firstDayOfYear);
    expect(getTodayKST()).toBe('2024-01-01');
  });
});
