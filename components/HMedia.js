import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';
import {FlatList, View} from 'react-native';

const ListContainer = styled.View`
  margin-bottom: 20;
`;
const Movie = styled.View`
  align-items: center;
`;
const Title = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.textColor};
`;
const HMedia = ({movies}) => {
  const renderItem = ({item}) => (
    <Movie key={item.id}>
      <Poster path={item.poster_path} />
      <Title>
        {item.original_title.slice(0, 11)}
        {item.original_title.length > 11 ? '...' : null}
      </Title>
      <Votes vote_average={item.vote_average} />
    </Movie>
  );
  return (
    <ListContainer>
      <FlatList
        data={movies}
        ItemSeparatorComponent={() => <View style={{width: 20}} />}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 30}}
      />
    </ListContainer>
  );
};
export default HMedia;
