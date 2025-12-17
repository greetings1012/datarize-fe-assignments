import { useLayoutEffect } from 'react';

export const useLockBodyScroll = (lock: boolean = true) => {
  useLayoutEffect(() => {
    if (!lock) return;

    // 1. 현재 스크롤 바 너비를 계산 (화면 밀림 방지)
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPaddingRight = window.getComputedStyle(document.body).paddingRight;

    // 2. 스크롤 잠금 및 패딩 보정
    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      // 3. 언마운트 시 원래 스타일로 복구
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [lock]);
};
