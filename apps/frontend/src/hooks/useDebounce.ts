import { useEffect, useState } from 'react';

// 기본 지연 시간
const DEBOUNCE_DELAY = 500;

// 사용자 입력에 debounce 적용
export const useDebounce = <T>(value: T, delay = DEBOUNCE_DELAY): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // delay가 없거나 0이면 즉시 업데이트하고 setTimeout 실행 안 함
    if (!delay || delay === 0) {
      setDebouncedValue(value);
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
