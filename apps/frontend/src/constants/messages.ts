// 사용자에게 보여줄 친절한 에러 메시지 정의
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

// HTTP 상태 코드와 에러 메시지 매핑
const STATUS_MESSAGE_MAP: Record<number, string> = {
  400: API_ERROR_MESSAGES.BAD_REQUEST,
  401: API_ERROR_MESSAGES.UNAUTHORIZED,
  403: API_ERROR_MESSAGES.FORBIDDEN,
  404: API_ERROR_MESSAGES.NOT_FOUND,
  422: API_ERROR_MESSAGES.UNPROCESSABLE,
  429: API_ERROR_MESSAGES.TOO_MANY_REQUESTS,
  500: API_ERROR_MESSAGES.SERVER_ERROR,
  502: API_ERROR_MESSAGES.SERVER_UNREACHABLE,
  503: API_ERROR_MESSAGES.SERVER_UNREACHABLE,
  504: API_ERROR_MESSAGES.SERVER_UNREACHABLE,
};

// 상태 코드를 받아 적절한 메시지를 반환하는 헬퍼 함수
export const getErrorMessage = (status?: number): string => {
  if (!status) return API_ERROR_MESSAGES.NETWORK_ERROR;
  return STATUS_MESSAGE_MAP[status] ?? API_ERROR_MESSAGES.UNKNOWN;
};