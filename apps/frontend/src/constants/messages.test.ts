// 에러 메시지 상수 및 헬퍼 함수 테스트
import { describe, expect, it } from 'vitest';

import { API_ERROR_MESSAGES, getErrorMessage } from './messages';

describe('getErrorMessage', () => {
  it('상태 코드가 없으면 네트워크 에러 메시지를 반환해야 함', () => {
    const result = getErrorMessage();
    expect(result).toBe(API_ERROR_MESSAGES.NETWORK_ERROR);
  });

  it('400 상태 코드에 대해 올바른 메시지를 반환해야 함', () => {
    const result = getErrorMessage(400);
    expect(result).toBe(API_ERROR_MESSAGES.BAD_REQUEST);
  });

  it('401 상태 코드에 대해 올바른 메시지를 반환해야 함', () => {
    const result = getErrorMessage(401);
    expect(result).toBe(API_ERROR_MESSAGES.UNAUTHORIZED);
  });

  it('403 상태 코드에 대해 올바른 메시지를 반환해야 함', () => {
    const result = getErrorMessage(403);
    expect(result).toBe(API_ERROR_MESSAGES.FORBIDDEN);
  });

  it('404 상태 코드에 대해 올바른 메시지를 반환해야 함', () => {
    const result = getErrorMessage(404);
    expect(result).toBe(API_ERROR_MESSAGES.NOT_FOUND);
  });

  it('422 상태 코드에 대해 올바른 메시지를 반환해야 함', () => {
    const result = getErrorMessage(422);
    expect(result).toBe(API_ERROR_MESSAGES.UNPROCESSABLE);
  });

  it('429 상태 코드에 대해 올바른 메시지를 반환해야 함', () => {
    const result = getErrorMessage(429);
    expect(result).toBe(API_ERROR_MESSAGES.TOO_MANY_REQUESTS);
  });

  it('500 상태 코드에 대해 올바른 메시지를 반환해야 함', () => {
    const result = getErrorMessage(500);
    expect(result).toBe(API_ERROR_MESSAGES.SERVER_ERROR);
  });

  it('502, 503, 504 상태 코드에 대해 서버 연결 불가 메시지를 반환해야 함', () => {
    expect(getErrorMessage(502)).toBe(API_ERROR_MESSAGES.SERVER_UNREACHABLE);
    expect(getErrorMessage(503)).toBe(API_ERROR_MESSAGES.SERVER_UNREACHABLE);
    expect(getErrorMessage(504)).toBe(API_ERROR_MESSAGES.SERVER_UNREACHABLE);
  });

  it('알 수 없는 상태 코드에 대해 기본 에러 메시지를 반환해야 함', () => {
    const result = getErrorMessage(999);
    expect(result).toBe(API_ERROR_MESSAGES.UNKNOWN);
  });

  it('0 상태 코드에 대해 네트워크 에러 메시지를 반환해야 함', () => {
    const result = getErrorMessage(0);
    expect(result).toBe(API_ERROR_MESSAGES.NETWORK_ERROR);
  });

  it('음수 상태 코드에 대해 기본 에러 메시지를 반환해야 함', () => {
    const result = getErrorMessage(-1);
    expect(result).toBe(API_ERROR_MESSAGES.UNKNOWN);
  });

  it('다른 5xx 상태 코드에 대해 기본 에러 메시지를 반환해야 함', () => {
    expect(getErrorMessage(501)).toBe(API_ERROR_MESSAGES.UNKNOWN);
    expect(getErrorMessage(505)).toBe(API_ERROR_MESSAGES.UNKNOWN);
  });
});
