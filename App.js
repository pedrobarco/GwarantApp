import React from 'react';
import { View, StatusBar } from 'react-native';
import { styles } from './config/styles';
import { Stack } from './config/router';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.flex}>
        <StatusBar barStyle="light-content" />
        <Stack />
      </View>
    );
  }
}
