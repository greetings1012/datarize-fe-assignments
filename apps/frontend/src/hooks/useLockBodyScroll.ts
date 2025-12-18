import { useLayoutEffect, useRef } from 'react';

// 전역 카운터
let lockCount = 0;
let originalOverflow: string | null = null;

// 모달 열릴 때 body 스크롤 잠금
export const useLockBodyScroll = (lock = true) => {
  const isLockedRef = useRef(false);

  useLayoutEffect(() => {
    if (!lock) {
      return;
    }

    // 첫 번째 인스턴스가 마운트될 때만 원본 스타일 저장
    if (lockCount === 0) {
      originalOverflow = window.getComputedStyle(document.body).overflow;
    }

    lockCount++;
    isLockedRef.current = true;
    document.body.style.overflow = 'hidden';

    return () => {
      if (isLockedRef.current) {
        lockCount--;
        isLockedRef.current = false;

        // 마지막 인스턴스가 언마운트될 때만 원본 스타일로 복원
        if (lockCount === 0 && originalOverflow !== null) {
          document.body.style.overflow = originalOverflow;
          originalOverflow = null;
        }
      }
    };
  }, [lock]);
};
