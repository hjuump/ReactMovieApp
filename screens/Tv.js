import React from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {useQuery, useQueryClient} from 'react-query';
import styled from 'styled-components/native';
import {tvAPI} from '../api';
import Loader from '../components/Loader';
import HList from '../components/HList';

const PageContainer = styled.View`
  background-color: ${props => props.theme.mainBgColor};
`;
const Tv = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
  } = useQuery(['tv', 'today'], tvAPI.airingToday);
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
  } = useQuery(['tv', 'top'], tvAPI.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery(['tv', 'trending'], tvAPI.trending);
  const onRefresh = () => {
    queryClient.refetchQueries(['tv']);
  };
  const loading = topLoading || todayLoading || trendingLoading;
  const refreshing = todayRefetching || topRefetching || trendingRefetching;

  return loading ? (
    <Loader />
  ) : (
    <PageContainer>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <HList title="🔥 Trending TV" data={trendingData.results} />
        <HList title="🗓️ Airing Today" data={todayData.results} />
        <HList title="⭐️ Top Rated TV" data={topData.results} />
      </ScrollView>
    </PageContainer>
  );
};

export default Tv;
