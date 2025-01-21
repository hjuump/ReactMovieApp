import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.mainBgColor};
`;

const Loader = () => {
  <Wrapper>
    <ActivityIndicator />
  </Wrapper>;
};
export default Loader;
