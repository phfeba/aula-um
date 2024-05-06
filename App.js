import styled from 'styled-components/native';

const PageContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: blue;
`;

const Title = styled.Text`
  color: yellow;
  font-size: 50px;
  font-weight: bold;
`;

export default function App() {
  return (
    <PageContainer>
      <Title>hello world</Title>
    </PageContainer>
  );
}
