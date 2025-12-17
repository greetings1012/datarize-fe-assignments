import { useLayoutEffect } from 'react';

// 모달 열릴 때 body 스크롤 잠금
export const useLockBodyScroll = (lock = true) => {
  useLayoutEffect(() => {
    if (!lock) {
      return;
    }
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [lock]);
};
