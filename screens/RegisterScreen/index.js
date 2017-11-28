import React from 'react';
import PropTypes from 'prop-types';
import { View, KeyboardAvoidingView, Text, Image } from 'react-native';
import RegisterForm from './RegisterForm';
import { STATUS_BAR_HEIGHT } from '../../constants';
import { styles } from '../../config/styles';
import icon from '../../assets/icons/app-icon.png';

export default class RegisterScreen extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={STATUS_BAR_HEIGHT} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={icon} style={styles.logo} />
          <Text style={styles.registerTitle}>Gwarant needs you to verify your account</Text>
          <RegisterForm qrcode={this.props.navigation.state.params.barcode.data}/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

RegisterScreen.propTypes = {
  navigation: PropTypes.any.isRequired
};
