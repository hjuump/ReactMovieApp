import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-top: 6;
`;
const Rate = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.textColor};
`;
const TotalRate = styled(Rate)`
  margin-bottom: 1px;
  font-size: 10px;
  font-weight: 500;
  opacity: 0.5;
`;

const Votes = ({vote_average}) => {
  return (
    <Container>
      <Rate>{vote_average > 0 ? `⭐️ ${vote_average}` : `Coming Soon`}</Rate>
      <TotalRate> /10</TotalRate>
    </Container>
  );
};
export default Votes;
