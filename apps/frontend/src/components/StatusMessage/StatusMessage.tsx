import * as S from './StatusMessage.styles';

interface StatusMessageProps {
  title: string;
  description?: string;
  isError?: boolean;
}

export const StatusMessage = ({
  title,
  description,
  isError,
}: StatusMessageProps) => (
  <S.StatusMessage isError={isError}>
    <S.MessageTitle>{title}</S.MessageTitle>
    {description && <S.MessageDescription>{description}</S.MessageDescription>}
  </S.StatusMessage>
);
