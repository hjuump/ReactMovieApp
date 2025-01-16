import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import Slides from '../components/Slides';
import Poster from '../components/Poster';

const ScrollView = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`;
const TrendingScrollView = styled.ScrollView`
  margin-top: 20;
`;
const Loader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.mainBgColor};
`;
const ListTitle = styled.Text`
  font-weight: 600;
  font-size: 18;
  margin-left: 30;
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
const Votes = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
const Rate = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.theme.textColor};
`;
const TotalRate = styled(Rate)`
  margin-bottom: 1px;
  font-size: 10px;
  font-weight: 500;
  opacity: 0.5;
`;
const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const Movies = ({navigation: {navigate}}) => {
  const [loading, setLoading] = useState(true);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const API_KEY = 'dd0ead60b3700a1ece2ea4a6b3cc74ee';
  const getTrending = async () => {
    const {results} = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
      )
    ).json();
    setTrending(results);
  };
  const getUpComing = async () => {
    const {results} = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`,
      )
    ).json();
    setUpcoming(results);
  };
  const getNowPlaying = async () => {
    const {results} = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`,
      )
    ).json();
    setNowPlaying(results);
  };
  const getData = async () => {
    await Promise.all([getTrending(), getUpComing(), getNowPlaying()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <ScrollView>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={4}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{
          marginBottom: 30,
          width: '100%',
          height: SCREEN_HEIGHT / 4,
        }}>
        {nowPlaying.map(movie => (
          <Slides
            key={movie.id}
            backdrop_path={movie.backdrop_path}
            poster_path={movie.poster_path}
            original_title={movie.original_title}
            vote_average={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListTitle>Trending Movies</ListTitle>
      <TrendingScrollView
        contentContainerStyle={{paddingLeft: 30}}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {trending.map(movie => (
          <Movie key={movie.id}>
            <Poster path={movie.poster_path} />
            <Title>
              {movie.original_title.slice(0, 11)}
              {movie.original_title.length > 11 ? '...' : null}
            </Title>
            <Votes>
              <Rate>⭐️ {movie.vote_average}</Rate>
              <TotalRate> /10</TotalRate>
            </Votes>
          </Movie>
        ))}
      </TrendingScrollView>
    </ScrollView>
  );
};

export default Movies;
