import * as S from './styles.js';

function CardContent({ title, subtitle }) {
  return (
    <S.CardContainer>
      <S.CardTitle>{title}</S.CardTitle>
      <S.CardSubTitle>{subtitle}</S.CardSubTitle>
    </S.CardContainer>
  );
}

export default function CreativeComponent() {
  return (
    <S.Conteiner>
      <CardContent
        title='foda'
        subtitle='lek'
      />
      <CardContent
        title='kkk'
        subtitle='jj'
      />
      <CardContent
        title='emily'
        subtitle='abacaxi'
      />
    </S.Conteiner>
  );
}
