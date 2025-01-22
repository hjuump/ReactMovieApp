import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.mainBgColor};
`;
const Detail = () => {
  return (
    <Container>
      <Text></Text>
    </Container>
  );
};
export default Detail;
