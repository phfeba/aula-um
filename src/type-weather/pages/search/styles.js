import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
  flex: 1;
  display: flex;
`;

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: auto;
  gap: 10px;
  margin-top: 48px;
`;

export const InputContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: -150px;
`;

export const HeaderImg = styled.Image``;

export const HeaderTitle = styled.Text`
  font-size: 20;
  color: white;
  font-weight: bold;
`;

export const Paragraph = styled.Text`
  color: white;
  font-size: 20;
`;

export const Span = styled.Text`
  font-size: 14;
  color: #bfbfd4;
`;

export const Purple = styled.Text`
  color: #8fb2f5;
`;

export const SearchInput = styled.TextInput`
  color: white;
  width: 311px;
  height: 56px;
  background-color: #1e1e29;
  border-radius: 8px;
  padding: 17px 20px;
  margin-top: 40px;
`;
