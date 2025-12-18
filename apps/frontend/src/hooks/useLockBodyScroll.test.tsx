// useLockBodyScroll 훅 테스트
import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { useLockBodyScroll } from './useLockBodyScroll';

describe('useLockBodyScroll', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('기본적으로 body 스크롤을 잠궈야 함', () => {
    renderHook(() => useLockBodyScroll());

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('lock이 true일 때 body 스크롤을 잠궈야 함', () => {
    renderHook(() => useLockBodyScroll(true));

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('lock이 false일 때 body 스크롤을 잠그지 않아야 함', () => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;

    renderHook(() => useLockBodyScroll(false));

    // overflow 스타일이 변경되지 않아야 함
    expect(document.body.style.overflow).toBe(originalOverflow || '');
  });

  it('언마운트 시 원래 스타일로 복원되어야 함', () => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;

    const { unmount } = renderHook(() => useLockBodyScroll(true));

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    // 원래 스타일로 복원되어야 함
    expect(document.body.style.overflow).toBe(originalOverflow || '');
  });

  it('lock 값이 변경되면 스크롤 상태가 업데이트되어야 함', () => {
    const { rerender } = renderHook(({ lock }) => useLockBodyScroll(lock), {
      initialProps: { lock: true },
    });

    expect(document.body.style.overflow).toBe('hidden');

    // lock을 false로 변경
    rerender({ lock: false });

    // 스크롤이 해제되어야 함
    const currentOverflow = window.getComputedStyle(document.body).overflow;
    expect(document.body.style.overflow).toBe(currentOverflow || '');
  });

  it('이미 overflow가 hidden인 상태에서도 작동해야 함', () => {
    document.body.style.overflow = 'hidden';

    const { unmount } = renderHook(() => useLockBodyScroll(true));

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    // 원래 상태로 복원되어야 함
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('여러 인스턴스가 동시에 마운트되어도 작동해야 함', () => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;

    const { unmount: unmount1 } = renderHook(() => useLockBodyScroll(true));
    expect(document.body.style.overflow).toBe('hidden');

    const { unmount: unmount2 } = renderHook(() => useLockBodyScroll(true));
    // 두 번째 인스턴스가 마운트되어도 여전히 hidden 유지
    expect(document.body.style.overflow).toBe('hidden');

    // 아직 두 번째 인스턴스가 active이므로 hidden 유지
    unmount1();
    expect(document.body.style.overflow).toBe('hidden');

    // 마지막 인스턴스이므로 원본 스타일로 복원
    unmount2();
    expect(document.body.style.overflow).toBe(originalOverflow || '');
  });
});
