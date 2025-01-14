import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Tv = () => (
  <View style={styles.container}>
    <Text>TV</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Tv;
