import * as S from './DatePicker.styles';

interface DatePickerProps {
  from: string;
  to: string;
  onChange: (range: { from: string; to: string }) => void;
}

export const DatePicker = ({ from, to, onChange }: DatePickerProps) => (
  <S.Container>
    <S.Input type="date" value={from} onChange={(e) => onChange({ from: e.target.value, to })} />
    <S.Separator>~</S.Separator>
    <S.Input type="date" value={to} onChange={(e) => onChange({ from, to: e.target.value })} />
  </S.Container>
);
