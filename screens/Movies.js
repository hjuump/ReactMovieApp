import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator, Dimensions, View} from 'react-native';
import Swiper from 'react-native-swiper';
import Slides from '../components/Slides';
import HMedia from '../components/HMedia';
import VMedia from '../components/VMedia';
import {API_KEY} from '@env';

const TrendingScroll = styled.FlatList`
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
  font-size: 22px;
  margin-left: 30px;
  margin-bottom: 25px;
  margin-top: 25px;
  color: ${props => props.theme.textColor};
`;
const VSeparator = styled.View`
  height: 20px;
`;
const HSeparator = styled.View`
  width: 20px;
`;
const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const Movies = ({navigation: {navigate}}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

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
  const movieKeyExtractor = item => item.id.toString();
  const renderHMedia = ({item}) => (
    <HMedia
      id={item.id}
      poster_path={item.poster_path}
      original_title={item.original_title}
      vote_average={item.vote_average}
    />
  );
  const renderVMedia = ({item}) => (
    <VMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      release_date={item.release_date}
      overview={item.overview}
    />
  );
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <TrendingScroll
      onRefresh={onRefresh}
      refreshing={refreshing}
      nestedScrollEnabled={true}
      data={upcoming}
      keyExtractor={movieKeyExtractor}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={4}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
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
          <TrendingScroll
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 30}}
            ItemSeparatorComponent={HSeparator}
            nestedScrollEnabled={true}
            data={trending}
            keyExtractor={movieKeyExtractor}
            renderItem={renderHMedia}
          />
          <ListTitle>📅 Upcoming Movies</ListTitle>
        </>
      }
      ItemSeparatorComponent={VSeparator}
      renderItem={renderVMedia}
    />
  );
};

export default Movies;
