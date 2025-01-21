import React from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import Slides from '../components/Slides';
import HMedia from '../components/HMedia';
import VMedia from '../components/VMedia';
import {useQuery, useQueryClient} from 'react-query';
import {moviesAPI} from '../api';
import Loader from '../components/Loader';
import HList from '../components/HList';

const TrendingScroll = styled.FlatList`
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
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    refetch: refetchNowPlaying,
    isRefetching: isRefetchNowPlaying,
  } = useQuery(['movies', 'nowPlaying'], moviesAPI.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    refetch: refetchUpcoming,
    isRefetching: isRefetchUpcoming,
  } = useQuery(['movies', 'upcoming'], moviesAPI.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    refetch: refetchTrending,
    isRefetching: isRefetchTrending,
  } = useQuery(['movies', 'trending'], moviesAPI.trending);

  const onRefresh = async () => {
    queryClient.refetchQueries(['movies']);
  };

  const movieKeyExtractor = item => item.id.toString();
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchNowPlaying || isRefetchUpcoming || isRefetchTrending;
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
    <Loader />
  ) : (
    <TrendingScroll
      onRefresh={onRefresh}
      refreshing={refreshing}
      nestedScrollEnabled={true}
      data={upcomingData.results}
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
            {nowPlayingData.results.map(movie => (
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
          <HList title="🔥 Trending Movies" data={trendingData.results} />
          <ListTitle>📅 Upcoming Movies</ListTitle>
        </>
      }
      ItemSeparatorComponent={VSeparator}
      renderItem={renderVMedia}
    />
  );
};

export default Movies;
