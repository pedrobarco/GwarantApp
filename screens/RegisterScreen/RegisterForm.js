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
          style={styles.textInput}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button
          icon={{ name: 'phonelink-lock' }}
          title='SUBMIT'
          buttonStyle={styles.registerButton}
          onPress={() => check(this.props.qrcode, this.state.password)}
        />
      </View>
    );
  }
}

RegisterForm.propTypes = {
  qrcode: PropTypes.array.isRequired
};

function check(qrcode, password) {
  const crypto = require('crypto-js')
  const hash = qrcode[1]
  const salt = qrcode[2]
  const key = crypto.PBKDF2(password, salt, {hasher: crypto.algo.SHA256,  keySize: 256 / 32, iterations: 10000})
  alert(hash == key)
}