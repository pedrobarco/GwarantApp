import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { styles } from '../config/styles';

export default class RegisterScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.title}> Gwarant TEST </Text>
          <Text style={styles.mainButton}> {this.props.navigation.state.params.barcode.data} </Text>
      </View>
    );
  }
}

RegisterScreen.propTypes = {
  navigation: PropTypes.any.isRequired
};
