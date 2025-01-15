import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {makeImgPath} from '../utils';
import {BlurView} from '@react-native-community/blur';

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
const BgImg = styled.Image``;
const Title = styled.Text`
  font-size: 40px;
  font-weight: 800;
  color: ${props => props.theme.textColor};
`;
const API_KEY = 'dd0ead60b3700a1ece2ea4a6b3cc74ee';
const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const Movies = ({navigation: {navigate}}) => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const isDark = useColorScheme() === 'dark';

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
      <ActivityIndicator />
    </Loader>
  ) : (
    <ScrollView>
      <Swiper
        horizontal
        loop
        autoplayTimeout={2}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{width: '100%', height: SCREEN_HEIGHT / 3}}>
        {nowPlaying.map(movie => (
          <View key={movie.id}>
            <BgImg
              style={StyleSheet.absoluteFill}
              source={{uri: makeImgPath(movie.backdrop_path)}}
            />
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType={isDark ? 'dark' : 'light'}
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            />
            <Title>{movie.original_title}</Title>
          </View>
        ))}
      </Swiper>
    </ScrollView>
  );
};

export default Movies;
