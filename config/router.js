import { StackNavigator } from 'react-navigation';

import { styles } from './styles';

import Main from '../screens/Main';
import ScannerScreen from '../screens/Scanner';
import RegisterScreen from '../screens/Register';

export const Stack = StackNavigator({
  Home: {
    screen: Main,
    navigationOptions: {
      headerStyle: styles.header
    }
  },
  Scanner: {
    screen: ScannerScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
});