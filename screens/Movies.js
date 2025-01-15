import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator, Dimensions} from 'react-native';
import Swiper from 'react-native-web-swiper';

const ScrollView = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`;
const Container = styled.View`
  flex: 1;
`;
const Loader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.mainBgColor};
`;
const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const Movies = ({navigation: {navigate}}) => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const getNowPlaying = async () => {
    const {results} = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`,
      )
    ).json();
    setLoading(false);
  };
  useEffect(() => {
    getNowPlaying();
  }, []);
  return loading ? (
    <Loader>
      {' '}
      <ActivityIndicator />
    </Loader>
  ) : (
    <ScrollView>
      <Swiper
        loop
        timeout={2}
        controlsEnabled={false}
        containerStyle={{width: '100%', height: SCREEN_HEIGHT / 3}}>
        <Container style={{backgroundColor: 'red'}}></Container>
        <Container style={{backgroundColor: 'blue'}}></Container>
        <Container style={{backgroundColor: 'orange'}}></Container>
        <Container style={{backgroundColor: 'purple'}}></Container>
        <Container style={{backgroundColor: 'yellow'}}></Container>
      </Swiper>
    </ScrollView>
  );
};

export default Movies;
