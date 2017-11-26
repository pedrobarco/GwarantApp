import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../config/styles';

export default class RegisterScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.title}> Found QR </Text> 
      <Text style={styles.text}> {this.props.navigation.state.params.barcode.data} </Text>
      </View>
    );
  }
}
