import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
const ListContainer = styled.View`
  margin-bottom: 40;
`;
const ListTitle = styled.Text`
  font-weight: 700;
  font-size: 22;
  margin-left: 30;
  margin-bottom: 20;
  color: ${props => props.theme.textColor};
`;
const Title = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.textColor};
`;
const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
  width: 80%;
  margin-bottom: 30;
`;
const HColumn = styled.View`
  margin-left: 20;
  width: 80%;
`;
const Overview = styled.Text`
  color: ${props => props.theme.textColor};
  opacity: 0.6;
  font-size: 12;
`;
const Release = styled.Text`
  color: ${props => props.theme.textColor};
  margin: 7px 0px;
  font-weight: 500;
  opacity: 0.8;
`;
const VMedia = ({title, movies}) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      {movies.map(movie => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title>
              {movie.original_title.slice(0, 30)}
              {movie.original_title.length > 30 ? '...' : null}
            </Title>
            <Release>
              📽️ {new Date(movie.release_date).toLocaleDateString('ko')}
              {/* {new Date(movie.release_date).toLocaleDateString('ko', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })} */}
            </Release>
            <Overview>
              {movie.overview !== '' && movie.overview.length < 80
                ? movie.overview
                : `${movie.overview.slice(0, 150)}...`}
            </Overview>
          </HColumn>
        </HMovie>
      ))}
    </ListContainer>
  );
};
export default VMedia;
