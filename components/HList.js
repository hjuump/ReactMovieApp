import React from 'react';
import styled from 'styled-components/native';
import HMedia from './HMedia';

const ListContainer = styled.View`
  margin-bottom: 15px;
`;
const ListTitle = styled.Text`
  font-weight: 700;
  font-size: 22px;
  margin-left: 30px;
  margin-bottom: 20px;
  margin-top: 25px;
  color: ${props => props.theme.textColor};
`;
const TrendingScroll = styled.FlatList``;
const movieKeyExtractor = item => item.id.toString();
export const HListSeparator = styled.View`
  width: 20px;
`;

const HList = ({title, data}) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <TrendingScroll
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 30}}
        ItemSeparatorComponent={HListSeparator}
        keyExtractor={movieKeyExtractor}
        data={data}
        renderItem={({item}) => (
          <HMedia
            id={item.id}
            poster_path={item.poster_path}
            original_title={item.original_title ?? item.original_name}
            vote_average={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
};
export default HList;
