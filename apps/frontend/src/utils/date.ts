// 한국 시간 기준 오늘 날짜 반환 (YYYY-MM-DD 형식)
export const getTodayKST = () =>
  new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' });
