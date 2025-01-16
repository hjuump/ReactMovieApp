import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';

const TrendingScrollView = styled.ScrollView``;
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
const Movie = styled.View`
  margin-right: 20;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.textColor};
`;

const HMedia = ({title, movies}) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <TrendingScrollView
        contentContainerStyle={{paddingLeft: 30}}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {movies.map(movie => (
          <Movie key={movie.id}>
            <Poster path={movie.poster_path} />
            <Title>
              {movie.original_title.slice(0, 11)}
              {movie.original_title.length > 11 ? '...' : null}
            </Title>
            <Votes vote_average={movie.vote_average} />
          </Movie>
        ))}
      </TrendingScrollView>
    </ListContainer>
  );
};
export default HMedia;
