import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {StyleSheet, useColorScheme} from 'react-native';
import {makeImgPath} from '../utils';
import {BlurView} from '@react-native-community/blur';

const View = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const BgImg = styled.Image``;
const Poster = styled.Image`
  width: 100px;
  height: 160px;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.theme.textColor};
`;
const Overview = styled.Text`
  margin-top: 10px;
  font-size: 12px;
  font-weight: 400;
  color: ${props => props.theme.textColor};
`;
const Rate = styled.Text`
  margin-top: 10px;
  font-size: 15px;
  font-weight: 700;
  color: ${props => props.theme.textColor};
`;
const TotalRate = styled(Rate)`
  margin-bottom: 1px;
  font-size: 12px;
  font-weight: 500;
  opacity: 0.5;
`;
const Column = styled.View`
  width: 60%;
  margin-left: 30px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: flex-end;
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
        <Poster source={{uri: makeImgPath(poster_path)}} />
        <Column>
          <Title>{original_title}</Title>
          <Row>
            <Rate>⭐️ {vote_average}</Rate>
            <TotalRate> /10</TotalRate>
          </Row>
          <Overview>{overview.slice(0, 100)}...</Overview>
        </Column>
      </Wrapper>
    </View>
  );
};

export default Slides;
