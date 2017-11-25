import { StackNavigator } from 'react-navigation';

import { styles } from './styles';

import Main from '../screens/Main';

export const Stack = StackNavigator({
  Home: {
    screen: Main,
    navigationOptions: {
      headerStyle: styles.header
    }
  }
});