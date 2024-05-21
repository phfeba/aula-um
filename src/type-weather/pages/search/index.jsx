import React from 'react';
import {
  Container,
  HeaderContainer,
  HeaderImg,
  HeaderTitle,
  InputContainer,
  Paragraph,
  Purple,
  SearchInput,
  Span,
} from './styles';
import Background from '../../assets/images/Background.png';
import Cloud from '../../assets/images/Cloud.png';
import { TextInput } from 'react-native';

export default function Search() {
  return (
    <Container
      source={Background}
      resizeMode='cover'
    >
      <HeaderContainer>
        <HeaderImg source={Cloud} />
        <HeaderTitle>Type Weather</HeaderTitle>
      </HeaderContainer>
      <InputContainer>
        <Paragraph>
          Boas vindas ao <Purple>TypeWeather</Purple>
        </Paragraph>
        <Span>Escolha um local para ver a previsão do tempo</Span>
        <SearchInput
          placeholder='Buscar local'
          placeholderTextColor='#7F7F98'
        ></SearchInput>
      </InputContainer>
    </Container>
  );
}
