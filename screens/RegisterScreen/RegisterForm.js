import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { colors, styles } from '../../config/styles';

export default class RegisterForm extends React.Component {
  render() {
    return (
      <View style={styles.registerContainer}>
        <TextInput 
        placeholder="password" 
        placeholderTextColor={colors.LIGHT_TEXT_ICONS}
        underlineColorAndroid="transparent"
        secureTextEntry
        returnKeyType="go"
        style={styles.textInput} />
        <Button
          icon={{ name: 'phonelink-lock' }}
          title='SUBMIT'
          buttonStyle={styles.registerButton} />
      </View>
    );
  }
}

RegisterForm.propTypes = {
  qrcode: PropTypes.string.isRequired
};