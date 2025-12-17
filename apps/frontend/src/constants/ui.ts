export const UI_MESSAGES = {
  LOADING: {
    CUSTOMER_TABLE: '데이터 로딩 중...',
    PURCHASE_FREQUENCY: '데이터 분석 중...',
    PURCHASE_DETAIL: '로딩 중...',
  },
  ERROR: {
    CUSTOMER_TABLE: '데이터를 불러오지 못했습니다.',
    PURCHASE_FREQUENCY: '데이터 오류',
    NO_DATA: '표시할 데이터가 없습니다',
    NO_PURCHASE_HISTORY: '구매 내역이 없습니다.',
  },
  EMPTY: {
    PURCHASE_FREQUENCY_DESCRIPTION: '선택하신 기간에는 구매 내역이 없습니다.',
  },
} as const;
