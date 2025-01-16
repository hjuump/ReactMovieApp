import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator, Dimensions, RefreshControl} from 'react-native';
import Swiper from 'react-native-swiper';
import Slides from '../components/Slides';
import HMedia from '../components/HMedia';
import VMedia from '../components/VMedia';

const ScrollView = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`;
const Loader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.mainBgColor};
`;
const ListTitle = styled.Text`
  font-weight: 700;
  font-size: 22;
  margin-left: 30;
  margin-bottom: 25;
  color: ${props => props.theme.textColor};
`;

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const Movies = ({navigation: {navigate}}) => {
  const [refreshing, setRefreshing] = useState(false);
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
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
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
  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />}>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={4}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{
          marginBottom: 25,
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
      <ListTitle>🔥 Trending Movies</ListTitle>
      <HMedia movies={trending} />
      <ListTitle>📅 Upcoming Movies</ListTitle>
      <VMedia movies={upcoming} />
    </ScrollView>
  );
};

export default Movies;
