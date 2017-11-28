import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { BarCodeScanner, Permissions } from 'expo';
import { styles } from '../../config/styles';


export default class ScannerScreen extends React.Component {

  state = {
    hasCameraPermission: null,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.flex}>
          <BarCodeScanner
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
          </BarCodeScanner>
        </View>
      );
    }
  }
}

ScannerScreen.propTypes = {
  navigation: PropTypes.any.isRequired
};
