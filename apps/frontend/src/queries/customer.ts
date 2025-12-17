import { useQuery } from '@tanstack/react-query';
import { client } from '../api/base';
import { Customer, PurchaseDetail } from '../types/customer';

// 고객 목록 조회 API
const getCustomers = async (sortBy?: 'asc' | 'desc', name?: string) => {
  try {
    const { data } = await client.get<Customer[]>('/customers', {
      params: { sortBy, name },
    });
    return data;
  } catch (error: any) {
    // 404 에러는 검색 결과 없음으로 처리
    if (error.status === 404) {
      throw { ...error, message: '검색 결과가 없습니다.' };
    }
    throw error;
  }
};

// 고객 구매 내역 조회 API
const getCustomerPurchases = async (id: number) => {
  const { data } = await client.get<PurchaseDetail[]>(
    `/customers/${id}/purchases`,
  );
  return data;
};

// 고객 목록 조회 훅
export const useCustomers = (sortBy?: 'asc' | 'desc', name?: string) => {
  return useQuery({
    queryKey: ['customers', sortBy, name],
    queryFn: () => getCustomers(sortBy, name),
  });
};

// 고객 구매 내역 조회 훅
export const useCustomerPurchases = (customerId: number) => {
  return useQuery({
    queryKey: ['customer-purchases', customerId],
    queryFn: () => getCustomerPurchases(customerId),
    enabled: Boolean(customerId), // customerId가 있을 때만 실행
  });
};
