import { useEffect, useState } from 'react';

// 기본 지연 시간
const DEBOUNCE_DELAY = 500;

// 사용자 입력에 debounce 적용
export const useDebounce = <T>(value: T, delay = DEBOUNCE_DELAY): T => {
  if (delay === 0) return value;
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
