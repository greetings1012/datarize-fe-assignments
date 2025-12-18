import { useEffect, useState } from 'react';

// 사용자 입력에 debounce 적용
export const useDebounce = <T>(value: T, delay = 500): T => {
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
