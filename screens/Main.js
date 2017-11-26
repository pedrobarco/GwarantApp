import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements'
import { styles } from '../config/styles';

export default class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.title}> Gwarant TEST </Text> 
        <Button
          large
          icon={{ name: 'fingerprint' }}
          title='REGISTER'
          buttonStyle={styles.button} 
          onPress={() => this.props.navigation.navigate('Scanner')} />
          
        <Button
          large
          icon={{ name: 'cast-connected' }}
          title='CONNECT'
          buttonStyle={styles.button} />
      </View>
    );
  }
}
