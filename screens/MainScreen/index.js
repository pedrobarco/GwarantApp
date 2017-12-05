import React from 'react';
import PropTypes from 'prop-types';
//import { AppLoading, SecureStore } from 'expo';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { styles, colors } from '../../config/styles';


export default class MainScreen extends React.Component {
  state = {
    isReady: false,
    key: null,
  };

  render() {
    /* if (!this.state.isReady) {
      return (
        <View style={styles.container}>
           <AppLoading
            startAsync={this._manageKeysAsync}
            onFinish={this._handleFinishLoadingAsync}
          />
          <ActivityIndicator
            color={colors.TEXT_ICONS}
            size="large"
          />
        </View>
      );
    } */
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Gwarant</Text>
        </View>
        <Button
          title='REGISTER'
          buttonStyle={styles.button}
          onPress={() => this.props.navigation.navigate('Scanner')}
        />
        <Button
          title='CONNECT'
          buttonStyle={styles.button}
          onPress={() => alert(this.state.key.pub)}
        />
      </View>
    );
  }

  /* _manageKeysAsync = async () => {
    let key = {
      pub: await SecureStore.getItemAsync("key.pub"),
      priv: await SecureStore.getItemAsync("key.priv")
    }
    if (key.pub == null || key.priv == null) {
      const rsa = genKeys()
      key = {
        pub: rsa.getPublicString(),
        priv: rsa.getPrivateString()
      }
      await SecureStore.setItemAsync("key.pub", key.pub)
      await SecureStore.setItemAsync("key.priv", key.priv)
    }
  }

  _handleFinishLoadingAsync = async () => {
    this.setState({
      isReady: true,
      key: {
        pub: await SecureStore.getItemAsync("key.pub"),
        priv: await SecureStore.getItemAsync("key.priv")
      }
    })
  } */
}

MainScreen.propTypes = {
  navigation: PropTypes.any.isRequired
};

/* function genKeys() {
  const RSAKey = require('react-native-rsa')
  const bits = 512
  const exponent = '10001' // must be a string. This is hex string. decimal = 65537
  let rsa = new RSAKey()
  rsa.generate(bits, exponent)
  return rsa
} */
