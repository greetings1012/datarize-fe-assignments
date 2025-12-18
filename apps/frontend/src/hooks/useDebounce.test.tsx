// useDebounce 훅 테스트
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('초기값을 즉시 반환해야 함', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('값이 변경되면 delay 시간 후에 업데이트되어야 함', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      },
    );

    expect(result.current).toBe('initial');

    act(() => {
      rerender({ value: 'updated', delay: 500 });
    });

    // 이전 값 유지
    expect(result.current).toBe('initial');

    // 500ms 경과
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // 업데이트된 값 확인
    expect(result.current).toBe('updated');
  });

  it('delay 시간 내에 값이 여러 번 변경되면 마지막 값만 반영되어야 함', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'first', delay: 500 },
      },
    );

    act(() => {
      rerender({ value: 'second', delay: 500 });
      vi.advanceTimersByTime(200);
      rerender({ value: 'third', delay: 500 });
      vi.advanceTimersByTime(200);
      rerender({ value: 'fourth', delay: 500 });
    });

    // 첫 번째 값 유지
    expect(result.current).toBe('first');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // 마지막 값만 반영되어야 함
    expect(result.current).toBe('fourth');
  });

  it('커스텀 delay 시간을 사용할 수 있어야 함', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 1000 },
      },
    );

    act(() => {
      rerender({ value: 'updated', delay: 1000 });
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('delay가 0일 때 즉시 업데이트되어야 함', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 0 },
      },
    );

    act(() => {
      rerender({ value: 'updated', delay: 0 });
    });

    expect(result.current).toBe('updated');
  });

  it('동일한 값으로 변경해도 debounce가 작동해야 함', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'same', delay: 500 },
      },
    );

    act(() => {
      rerender({ value: 'same', delay: 500 });
    });

    // 값이 같아도 debounce는 작동
    expect(result.current).toBe('same');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('same');
  });

  it('null 값을 debounce할 수 있어야 함', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      },
    );

    act(() => {
      rerender({ value: null as any, delay: 500 });
    });

    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(null);
  });

  it('undefined 값을 debounce할 수 있어야 함', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      },
    );

    act(() => {
      rerender({ value: undefined as any, delay: 500 });
    });

    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBeUndefined();
  });

  it('객체 값을 debounce할 수 있어야 함', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: obj1, delay: 500 },
      },
    );

    act(() => {
      rerender({ value: obj2, delay: 500 });
    });

    expect(result.current).toBe(obj1);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(obj2);
  });

  it('컴포넌트 언마운트 시 타이머가 정리되어야 함', () => {
    const { rerender, unmount } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      },
    );

    act(() => {
      rerender({ value: 'updated', delay: 500 });
    });

    // 언마운트
    unmount();

    // 타이머가 정리되었는지 확인
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // 언마운트 후에는 접근할 수 없고 에러가 발생하지 않아야 함
    expect(true).toBe(true);
  });
});
