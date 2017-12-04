import React from 'react';
import PropTypes from 'prop-types';
import { SecureStore, Constants } from 'expo';
import { View, TextInput, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { colors, styles } from '../../config/styles';

export default class RegisterForm extends React.Component {
  state = {
    isChecking: true
  }

  render() {
    if (!this.state.isChecking) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            color={colors.TEXT_ICONS}
            size="large"
          />
        </View>
      );
    }
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
          onPress={() => this._check(this.props.qrcode, this.state.password)}
        />
      </View>
    );
  }

  _check = async (qrcode, password) => {
    const crypto = require('crypto-js')
    const username = qrcode[0]
    const receivedhash = qrcode[1]
    const salt = qrcode[2]
    const kPubPC = qrcode[3]
    const ip = qrcode[4]
    const nonce = qrcode[5]
    if (password == null) {
      this.setState({ isChecking: true })
      alert('Password cant be empty.')
      return
    }
    this.setState({ isChecking: false })
    const kPubApp = await SecureStore.getItemAsync("pub.key")
    const kPrivApp = await SecureStore.getItemAsync("priv.key")
    const calculatedhash = crypto.PBKDF2(password, salt, { hasher: crypto.algo.SHA256, keySize: 256 / 32, iterations: 10000 })
    if (receivedhash == calculatedhash) {
      const key = crypto.PBKDF2(password, salt, { hasher: crypto.algo.SHA256, keySize: 3, iterations: 10000 })
      const message = "REGISTER " + Constants.deviceName + " " + Constants.deviceId + " " + kPubApp + " " + nonce
      const cryptedMessage = crypto.AES.encrypt(message, key.toString())
      const ws = new WebSocket('ws://' + ip + ':1918/')
      ws.onopen = () => {
        ws.send(cryptedMessage.toString(crypto.enc.base64))
        ws.onmessage = e => {
          alert(e.data)
          // Receive ack
          // Decipher ack with KpubPC (qrcode[3])
          // If ack is valid, add (username, KpubPC) to a database
          // alert(ack[0]);
        };
      }
    } else {
      this.setState({ isChecking: true })
      alert('Passwords do not match.')
    }
  }
}

RegisterForm.propTypes = {
  qrcode: PropTypes.array.isRequired
};
