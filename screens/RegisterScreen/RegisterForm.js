import React from 'react';
import PropTypes from 'prop-types';
import { SecureStore } from 'expo';
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

async function check(qrcode, password) {
  const crypto = require('crypto-js')
  const receivedhash = qrcode[1]
  const salt = qrcode[2]
  const ip = qrcode[4]
  const pubkey = await SecureStore.getItemAsync("pub.key")
  const privkey = await SecureStore.getItemAsync("priv.key")
  const calculatedhash = crypto.PBKDF2(password, salt, { hasher: crypto.algo.SHA256, keySize: 256 / 32, iterations: 10000 })
  if (receivedhash == calculatedhash) { 
    const key = crypto.PBKDF2(password, salt, { hasher: crypto.algo.SHA256, keySize: 3, iterations: 10000 }) // Not sure if keysize is correct
    const message = "ID Smartphone" + " " + "Public Key Smartphone" // TODO: put a unique id here and the Pubkey
    const cryptedMessage = crypto.AES.encrypt(message, key.toString()) // No IV { iv: iv }
    alert("Making connection with ws://" + ip + ':8080/')
    const ws = new WebSocket('ws://' + ip + ':8080/')
    ws.onopen = () => {
      ws.send(cryptedMessage.toString(crypto.enc.base64))
      ws.onmessage = e => {
        // Receive ack
        // Decipher ack with KpubPC (qrcode[3])
        // If ack is valid, add (username, KpubPC) to a database
        alert(e.data);
      };
    }
  }
}