import './styles.js';
import * as S from './styles.js';

export default function CardContent({ title, subtitle }) {
  return (
    <S.CardContainer>
      <S.CardTitle>{title}</S.CardTitle>
      <S.CardSubTitle>{subtitle}</S.CardSubTitle>
    </S.CardContainer>
  );
}
