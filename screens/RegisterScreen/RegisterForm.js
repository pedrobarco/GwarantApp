import React from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { View, TextInput, Button, Platform } from 'react-native';
import { colors, styles } from '../../config/styles';
import '../../shim.js'
import RNSecureKeyStore from 'react-native-secure-key-store';
import crypto from 'crypto'

export default class RegisterForm extends React.Component {
  state = {
    id: null,
    key: null
  }
  componentWillMount() {
    RNSecureKeyStore.get("keypub")
      .then(keypub => {
        RNSecureKeyStore.get("keypriv")
          .then(keypriv => {
            RNSecureKeyStore.get("id")
            .then(id => {
            this.setState({ id:id, key: { pub: keypub, priv: keypriv } })
            }, () => {alert ('Problem retrieving id')})
          }, () => { alert('Problem retrieving keys') })
      }, () => {
        alert('Error')
      });
  }
  render() {
    return (
      <View style={styles.registerContainer}>
      <View>
        <TextInput
          placeholder="password"
          placeholderTextColor={colors.LIGHT_TEXT_ICONS}
          underlineColorAndroid="transparent"
          secureTextEntry
          returnKeyType="go"
          style={styles.textInput}
          onChangeText={(password) => this.setState({ password })}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color={colors.PRIMARY_COLOR}
          title='SUBMIT'
          buttonStyle={styles.registerButton}
          onPress={() => this._check(this.props.qrcode, this.state.password)}
        />
      </View>
      </View>
    );
  }

  _check = (qrcode, password) => {
    const net = require('net')
    const delimiter = "::"
    const username = qrcode[0]
    const receivedhash = qrcode[1]
    const salt = qrcode[2]
    const kPubPC = qrcode[3]
    const ip = qrcode[4]
    const iv = qrcode[5]
    const nonce1 = qrcode[6]
    if (password == null) {
      alert('Password cant be empty.')
      return
    }
    const calculatedhash = crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha256').toString('hex')
    if (receivedhash == calculatedhash) {
      const key = crypto.pbkdf2Sync(password, salt, 10000, 24, 'sha256').toString('hex')
      const cipher = crypto.createCipher('aes192', key, iv)
      const nonce2 = crypto.randomBytes(8).toString('hex')
      const message = "REGISTER" + delimiter + Platform.OS + Platform.Version +  delimiter + this.state.id + delimiter + this.state.key.pub.toString('hex') + delimiter + nonce1 + delimiter + nonce2
      try {
        let cipheredMessage = cipher.update(message, 'utf8', 'hex')
        cipheredMessage += cipher.final('hex')
        const client = net.createConnection(1918, ip, () => {
          client.write(cipheredMessage)
        });
        client.on('error', error => {
          //alert(error)
        })
        client.on('data', data => {
          const message = crypto.privateDecrypt(this.state.key.priv, data).toString('utf8').split(delimiter)
          const command = message[0]
          const ackNonce = message[1]
          const expectNonce = nonce2
          if (command == 'ACK' && ackNonce == expectNonce) {
            RNSecureKeyStore.set("username", username)
            .then(() => {
              RNSecureKeyStore.set("keyPC", kPubPC)
              .then( () => {
                RNSecureKeyStore.set("keyFile", key)
                .then( () => {
                  alert('Registered')
                  this.props.navigation.dispatch(NavigationActions.back())
                }, () => {alert('Error')})
              }, () => {alert('Error')})
            }, () => {alert('Error')})
          }
        })
      } catch (err) {
        alert(err)
      }
    } else {
      alert('Passwords do not match.')
    }
  }
}

RegisterForm.propTypes = {
  navigation: PropTypes.any.isRequired,
  qrcode: PropTypes.array.isRequired
};
