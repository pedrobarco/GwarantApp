import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Camera from 'react-native-camera';
import { styles } from '../../config/styles';


export default class ScannerScreen extends React.Component {

  state = {
    hasCameraPermission: null,
  };

  render() {
    return (
      <View style={styles.flex}>
        <Camera
          style={styles.flex}
          onBarCodeRead={(barcode) => {
            const resetAction = NavigationActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({ routeName: 'Register', params: { barcode: barcode } })
              ],
              key: null
            })
            this.props.navigation.dispatch(resetAction)
          }}>
        </Camera>
      </View>
    );
  }
}

ScannerScreen.propTypes = {
  navigation: PropTypes.any.isRequired
};
