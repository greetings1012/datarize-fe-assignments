import { ReactNode } from 'react';
import * as S from './SectionCard.styles';

interface SectionCardProps {
  children: ReactNode;
}

export const SectionCard = ({ children }: SectionCardProps) => {
  return <S.Container>{children}</S.Container>;
};

SectionCard.Header = ({ children }: { children: ReactNode }) => <S.Header>{children}</S.Header>;
SectionCard.Title = ({ children }: { children: ReactNode }) => <S.Title>{children}</S.Title>;
SectionCard.Controls = ({ children }: { children: ReactNode }) => <S.Controls>{children}</S.Controls>;
SectionCard.Content = ({ children }: { children: ReactNode }) => <S.Content>{children}</S.Content>;
