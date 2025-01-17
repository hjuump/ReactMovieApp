import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
const ListContainer = styled.View``;
const Title = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.textColor};
`;
const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
  width: 80%;
`;
const HColumn = styled.View`
  margin-left: 20px;
  width: 80%;
`;
const Overview = styled.Text`
  color: ${props => props.theme.textColor};
  opacity: 0.6;
  font-size: 12px;
`;
const Release = styled.Text`
  color: ${props => props.theme.textColor};
  margin: 7px 0px;
  font-weight: 500;
  opacity: 0.8;
`;
const VMedia = ({poster_path, original_title, release_date, overview}) => {
  return (
    <ListContainer>
      <HMovie>
        <Poster path={poster_path} />
        <HColumn>
          <Title>
            {original_title.slice(0, 30)}
            {original_title.length > 30 ? '...' : null}
          </Title>
          <Release>
            📽️ {new Date(release_date).toLocaleDateString('ko')}
            {/* {new Date(item.release_date).toLocaleDateString('ko', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })} */}
          </Release>
          <Overview>
            {overview !== '' && overview.length < 80
              ? overview
              : `${overview.slice(0, 150)}...`}
          </Overview>
        </HColumn>
      </HMovie>
    </ListContainer>
  );
};
export default VMedia;
