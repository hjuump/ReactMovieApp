import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Tabs from './navigation/Tabs';
import {useColorScheme} from 'react-native';
import Stack from './navigation/Stack';
import Root from './navigation/Root';
import {ThemeProvider} from 'styled-components';
import {darkTheme, lightTheme} from './styled';

function App() {
  const isDark = useColorScheme() === 'dark';

  return (
    <ThemeProvider theme={isDark ? lightTheme : darkTheme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
