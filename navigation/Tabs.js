import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import {useColorScheme} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  BG_COLOR_DM,
  BG_COLOR_LM,
  POINT_COLOR,
  SUB_TEXT_COLOR_DM,
  SUB_TEXT_COLOR_LM,
} from '../colors';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === 'dark';
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? BG_COLOR_LM : BG_COLOR_DM,
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? BG_COLOR_LM : BG_COLOR_DM,
        },
        tabBarActiveTintColor: POINT_COLOR,
        tabBarInactiveTintColor: isDark ? SUB_TEXT_COLOR_DM : SUB_TEXT_COLOR_LM,
        headerStyle: {
          backgroundColor: isDark ? BG_COLOR_LM : BG_COLOR_DM,
        },
        headerTitleStyle: {
          color: isDark ? 'black' : 'white',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 600,
        },
      }}>
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Ionicons name="film" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Ionicons name="tv" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Ionicons name="search" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
