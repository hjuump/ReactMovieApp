import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components/native';
import Poster from '../components/Poster';
import {makeImgPath} from '../utils';
import LinearGradient from 'react-native-linear-gradient';
import {BG_SCREEN_COLOR_DM} from '../colors';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.mainBgColor};
`;
const Background = styled.Image``;
const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4};
  justify-content: flex-end;
  padding: 0px 20px;
`;
const Main = styled.View`
  padding: 0px 20px;
  margin-top: 30px;
`;
const Column = styled.View`
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  //background-color: white;
`;
const Title = styled.Text`
  color: ${props => props.theme.textColor};
  font-size: 28px;
  font-weight: 700;
  width: 66%;
  margin-left: 20px;
  //background-color: red;
`;
const Overview = styled.Text`
  color: ${props => props.theme.textColor};
`;

const Detail = ({navigation: {setOptions}, route: {params}}) => {
  useEffect(() => {
    setOptions({
      title: 'original_title' in params ? 'Movie' : 'TV Show',
    });
  }, []);
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{uri: makeImgPath(params.backdrop_path || '')}}
        />
        <LinearGradient
          colors={['transparent', BG_SCREEN_COLOR_DM]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path} />
          <Title>
            {params.original_title
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Main>
        <Overview>{params.overview}</Overview>
      </Main>
    </Container>
  );
};
export default Detail;
