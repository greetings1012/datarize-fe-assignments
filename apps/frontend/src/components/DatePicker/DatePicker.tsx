import * as S from './DatePicker.styles';

interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
}

export const DatePicker = ({ label, value, onChange, min, max }: DatePickerProps) => {
  return (
    <S.Container>
      {label && <S.Label>{label}</S.Label>}
      <S.Input
        type="date"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
      />
    </S.Container>
  );
};
