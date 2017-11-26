import { StackNavigator } from 'react-navigation';

import { navigationConfig } from './styles';

import MainScreen from '../screens/Main';
import ScannerScreen from '../screens/Scanner';
import RegisterScreen from '../screens/Register';

export const Stack = StackNavigator({
  Home: {
    screen: MainScreen,
  },
  Scanner: {
    screen: ScannerScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
},  navigationConfig);
