import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useColorScheme} from 'react-native';
import Root from './navigation/Root';
import {ThemeProvider} from 'styled-components';
import {darkTheme, lightTheme} from './styled';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();
function App() {
  const isDark = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
