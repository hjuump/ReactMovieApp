import React, {useState} from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${props => props.theme.mainBgColor};
`;
const SearchBar = styled.TextInput`
  background-color: ${props => props.theme.textInputBGColor};
  padding: 10px 15px;
  margin: 20px;
  border-radius: 30px;
`;
const Search = () => {
  const [query, setQuery] = useState('');
  const onChangeText = text => setQuery(text);
  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor={props => props.theme.textInputPHColor}
        returnKeyType="search"
        onChangeText={onChangeText}
      />
    </Container>
  );
};

export default Search;
