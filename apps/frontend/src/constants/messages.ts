export const API_ERROR_MESSAGES = {
  SERVER_UNREACHABLE: '서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.',
  UNAUTHORIZED: '인증이 필요합니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '찾을 수 없습니다.',
  BAD_REQUEST: '잘못된 요청입니다.',
  UNPROCESSABLE: '처리할 수 없는 요청입니다.',
  TOO_MANY_REQUESTS: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
  SERVER_ERROR: '서버 오류가 발생했습니다.',
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  UNKNOWN: '데이터를 불러오지 못했습니다.',
} as const;
