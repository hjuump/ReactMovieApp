import React from 'react';
import styled from 'styled-components/native';

const ListContainer = styled.View`
  margin-bottom: 40px;
`;
const ListTitle = styled.Text`
  font-weight: 700;
  font-size: 22px;
  margin-left: 30px;
  margin-bottom: 20px;
  color: ${props => props.theme.textColor};
`;

const HList = ({title, children}) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    {children}
  </ListContainer>
);
export default HList;
