import { CustomerTable } from './components/CustomerTable/CustomerTable';
import { PurchaseFrequencyChart } from './components/PurchaseFrequencyChart/PurchaseFrequencyChart';
import * as S from './index.styles';

export const Dashboard = () => {
  return (
    <S.PageWrapper>
      <S.ContentContainer>
        <S.Header>
          <S.Title>쇼핑몰 구매 데이터 대시보드</S.Title>
          <S.Description>고객 구매 패턴 및 매출 분석</S.Description>
        </S.Header>

        <PurchaseFrequencyChart />
        <CustomerTable />
      </S.ContentContainer>
    </S.PageWrapper>
  );
};
