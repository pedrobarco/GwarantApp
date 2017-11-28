import { StackNavigator } from 'react-navigation';

import { navigationConfig } from './styles';

import MainScreen from '../screens/MainScreen';
import ScannerScreen from '../screens/ScannerScreen';
import RegisterScreen from '../screens/RegisterScreen';

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
