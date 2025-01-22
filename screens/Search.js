import React, {useState} from 'react';
import {useQuery} from 'react-query';
import styled from 'styled-components/native';
import {moviesAPI, tvAPI} from '../api';
import Loader from '../components/Loader';
import HList from '../components/HList';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.mainBgColor};
`;
const SearchBar = styled.TextInput`
  background-color: ${props => props.theme.textInputBGColor};
  padding: 10px 15px;
  margin: 20px;
  border-radius: 30px;
  color: ${props => props.theme.textColor};
  font-weight: 500;
`;
const Search = () => {
  const [query, setQuery] = useState('');
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(['searchMovies', query], moviesAPI.search, {
    enabled: false,
  });
  const {
    isLoading: tvsLoading,
    data: tvsData,
    refetch: searchTVs,
  } = useQuery(['searchTVs', query], tvAPI.search, {
    enabled: false,
  });
  const onChangeText = text => setQuery(text);
  const onSubmit = () => {
    if (query === '') {
      return;
    }
    searchMovies();
    searchTVs();
  };
  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor={props => props.theme.textInputPHColor}
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvsLoading ? <Loader /> : null}
      {moviesData ? (
        <HList title="Movies Result" data={moviesData.results} />
      ) : null}
      {tvsData ? <HList title="TVs Result" data={tvsData.results} /> : null}
    </Container>
  );
};

export default Search;
