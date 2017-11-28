import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from '../../config/styles';

export default class MainScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Gwarant</Text>
        </View>
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

MainScreen.propTypes = {
  navigation: PropTypes.any.isRequired
};
