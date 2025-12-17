export const API_ERROR_MESSAGES = {
  SERVER_UNREACHABLE: '서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.',
  UNAUTHORIZED: '인증에 실패했습니다. 다시 로그인해주세요.',
  NOT_FOUND: '요청하신 리소스를 찾을 수 없습니다.',
  SERVER_ERROR: '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  NETWORK_ERROR: '네트워크 연결 상태를 확인해주세요.',
  UNKNOWN: '알 수 없는 오류가 발생했습니다.',
} as const;
