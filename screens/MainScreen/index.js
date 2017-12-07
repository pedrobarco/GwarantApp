import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { styles, colors } from '../../config/styles';
import { RSA } from 'react-native-rsa-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import crypto from 'crypto'


export default class MainScreen extends React.Component {
  state = {
    key: null
  };

  componentWillMount() {
    RNSecureKeyStore.get("keypub")
      .then(keypub => {
        RNSecureKeyStore.get("keypriv")
          .then(keypriv => {
            this.setState({ key: { pub: keypub, priv: keypriv } })
          }, () => { alert('Problem retrieving keys') })
      }, () => {
        const deviceId = crypto.randomBytes(8).toString('hex')
        RNSecureKeyStore.set("id", deviceId)
          .then(() => {
            RSA.generate()
              .then(keys => {
                RNSecureKeyStore.set("keypub", keys.public)
                  .then(newkeypub => {
                    RNSecureKeyStore.set("keypriv", keys.private)
                      .then(newkeypriv => {
                        this.setState({ key: { pub: newkeypub, priv: newkeypriv } })
                      }, () => { alert('Problem storing keys') })
                  }, err => { alert(err) })
              })
          }, err => alert(err))
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Gwarant</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color={colors.PRIMARY_COLOR}
            title='REGISTER'
            onPress={() => this.props.navigation.navigate('Scanner')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color={colors.PRIMARY_COLOR}
            title='CONNECT'
            onPress={() => {
              RNSecureKeyStore.get("username")
              .then(username => {
                if (username != null) {
                  this.props.navigation.navigate('Connect')
                } else {
                  alert('You must register first')
                }
              }, err => { alert('You must register first') })}
              }/>
        </View>
      </View>
    );
  }
}

MainScreen.propTypes = {
  navigation: PropTypes.any.isRequired
};
