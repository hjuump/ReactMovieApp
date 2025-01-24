import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Movie = styled.View`
  align-items: center;
`;
const Title = styled.Text`
  font-size: 14px;
  font-weight: 700;
  margin-top: 7px;
  margin-bottom: 5px;
  color: ${props => props.theme.textColor};
`;
const HMedia = ({id, poster_path, original_title, vote_average}) => {
  const title = original_title || 'No Title';
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: {original_title},
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail} activeOpacity={0.8}>
      <Movie key={id}>
        <Poster path={poster_path} />
        <Title>
          {title.slice(0, 11)}
          {title.length > 11 ? '...' : null}
        </Title>
        <Votes vote_average={vote_average} />
      </Movie>
    </TouchableOpacity>
  );
};
export default HMedia;
