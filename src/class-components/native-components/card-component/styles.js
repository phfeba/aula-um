import styled from 'styled-components/native';

export const CardContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  width: 200px;
  height: 150px;
  border-radius: 40px;
  margin-bottom: 15px;
`;

export const CardTitle = styled.Text`
  color: yellow;
  font-size: 50px;
  font-weight: bold;
`;

export const CardSubTitle = styled.Text`
  color: red;
  font-size: 50px;
  font-weight: bold;
`;
