import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator, Dimensions} from 'react-native';
import Swiper from 'react-native-web-swiper';
import {makeImgPath} from '../utils';

const ScrollView = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`;
const View = styled.View`
  flex: 1;
`;
const Loader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.mainBgColor};
`;
const BgImg = styled.Image`
  flex: 1;
`;
const API_KEY = 'dd0ead60b3700a1ece2ea4a6b3cc74ee';
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
    setNowPlaying(results);
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
        {nowPlaying.map(movie => (
          <View key={movie.id}>
            <BgImg source={{uri: makeImgPath(movie.backdrop_path)}} />
          </View>
        ))}
      </Swiper>
    </ScrollView>
  );
};

export default Movies;
