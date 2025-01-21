import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import {useQuery} from 'react-query';
import styled from 'styled-components';
import {tvAPI} from '../api';
import Loader from '../components/Loader';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
import HList from '../components/HList';
const PageContainer = styled.View`
  background-color: ${props => props.theme.mainBgColor};
`;
const HSeparator = styled.View`
  width: 20px;
`;
const TrendingScroll = styled.FlatList``;
const Tv = () => {
  const {isLoading: todayLoading, data: todayData} = useQuery(
    ['tv', 'today'],
    tvAPI.airingToday,
  );
  const {isLoading: topLoading, data: topData} = useQuery(
    ['tv', 'top'],
    tvAPI.topRated,
  );
  const {isLoading: trendingLoading, data: trendingData} = useQuery(
    ['tv', 'trending'],
    tvAPI.trending,
  );
  const loading = topLoading || todayLoading || trendingLoading;
  console.log(todayData);
  return loading ? (
    <Loader />
  ) : (
    <PageContainer>
      <ScrollView>
        <HList
          title="🔥 Trending TV"
          children={
            <TrendingScroll
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 30}}
              ItemSeparatorComponent={HSeparator}
              data={trendingData.results}
              renderItem={({item}) => (
                <HMedia
                  id={item.id}
                  poster_path={item.poster_path}
                  original_title={item.original_name}
                  vote_average={item.vote_average}
                />
              )}
            />
          }
        />
        <HList
          title="🗓️ Airing Today"
          children={
            <TrendingScroll
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 30}}
              ItemSeparatorComponent={HSeparator}
              data={todayData.results}
              renderItem={({item}) => (
                <HMedia
                  id={item.id}
                  poster_path={item.poster_path}
                  original_title={item.original_name}
                  vote_average={item.vote_average}
                />
              )}
            />
          }
        />
        <HList
          title="⭐️ Top Rated TV"
          children={
            <TrendingScroll
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 30}}
              ItemSeparatorComponent={HSeparator}
              data={topData.results}
              renderItem={({item}) => (
                <HMedia
                  id={item.id}
                  poster_path={item.poster_path}
                  original_title={item.original_name}
                  vote_average={item.vote_average}
                />
              )}
            />
          }
        />
      </ScrollView>
    </PageContainer>
  );
};

export default Tv;
