import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, TouchableOpacity, View} from 'react-native';
import Detail from '../screens/Detail';
import {useColorScheme} from 'react-native';

import {BG_COLOR_DM, BG_COLOR_LM} from '../colors';

const NativeStack = createNativeStackNavigator();
const Stack = () => {
  const isDark = useColorScheme() === 'dark';
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? BG_COLOR_DM : BG_COLOR_LM,
        },
        headerTitleStyle: {
          color: isDark ? 'white' : 'black',
        },
      }}>
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};
export default Stack;
