import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {StyleSheet, useColorScheme} from 'react-native';
import {makeImgPath} from '../utils';
import {BlurView} from '@react-native-community/blur';
import Poster from './Poster';
import Votes from './Votes';

const View = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const BgImg = styled.Image``;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 7px;
  color: ${props => props.theme.textColor};
`;
const Overview = styled.Text`
  margin-top: 7px;
  font-size: 12px;
  font-weight: 400;
  color: ${props => props.theme.textColor};
`;
const Column = styled.View`
  width: 60%;
  margin-left: 30px;
`;
const Row = styled.View`
  flex-direction: row;
`;
const Wrapper = styled.View`
  flex-direction: row;
  width: 80%;
  align-items: center;
  justify-content: center;
`;
const Slides = ({
  backdrop_path,
  poster_path,
  original_title,
  vote_average,
  overview,
}) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View>
      <BgImg
        style={[StyleSheet.absoluteFill]}
        source={{uri: makeImgPath(backdrop_path)}}
      />
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType={isDark ? 'dark' : 'light'}
        blurAmount={isDark ? 5 : 15}
        reducedTransparencyFallbackColor="white"
      />
      <Wrapper>
        <Poster path={poster_path} />
        <Column>
          <Title>{original_title}</Title>
          <Row>
            <Votes vote_average={vote_average} />
          </Row>
          <Overview>{overview.slice(0, 100)}...</Overview>
        </Column>
      </Wrapper>
    </View>
  );
};

export default Slides;
