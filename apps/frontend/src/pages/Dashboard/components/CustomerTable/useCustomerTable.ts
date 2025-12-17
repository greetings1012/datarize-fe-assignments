import { useState } from 'react';
import { useCustomers } from '../../../../queries/customer';
import { useDebounce } from '../../../../hooks/useDebounce';

interface SelectedCustomer {
  id: number;
  name: string;
}

export const useCustomerTable = () => {
  const [nameFilter, setNameFilter] = useState('');
  const debouncedNameFilter = useDebounce<string>(nameFilter);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(
    undefined,
  );
  const [selectedCustomer, setSelectedCustomer] =
    useState<SelectedCustomer | null>(null);

  const { data, isLoading, error } = useCustomers(
    sortOrder,
    debouncedNameFilter.trim() || undefined,
  );

  // debounce가 수행되는 동안 검색 중 상태
  const isSearching = nameFilter.trim() !== debouncedNameFilter.trim();

  const handleNameFilterChange = (value: string) => setNameFilter(value);
  const handleSortOrderChange = (value: 'asc' | 'desc' | 'id') => {
    // 'id' 선택 시 undefined로 설정하여 ID 정렬 사용
    setSortOrder(value === 'id' ? undefined : value);
  };
  const closeDetailModal = () => setSelectedCustomer(null);
  const openDetailModal = (id: number, name: string) =>
    setSelectedCustomer({ id, name });

  return {
    nameFilter,
    sortOrder,
    selectedCustomer,
    data,
    isLoading,
    error,
    isSearching,
    handleNameFilterChange,
    handleSortOrderChange,
    openDetailModal,
    closeDetailModal,
  };
};
