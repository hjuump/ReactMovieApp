import React from 'react';
import styled from 'styled-components/native';
import {makeImgPath} from '../utils';

const Image = styled.Image`
  width: 100px;
  height: 160px;
  background-color: rgba(255, 255, 255, 0.3);
`;

const Poster = ({path}) => {
  return <Image source={{uri: makeImgPath(path)}} />;
};
export default Poster;
