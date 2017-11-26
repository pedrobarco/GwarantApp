import { StyleSheet } from 'react-native';
import { STATUS_BAR_HEIGHT } from '../constants';

export const colors = {
  PRIMARY_COLOR: '#f44336',
  DARK_PRIMARY_COLOR: '#ff795d',
  LIGHT_PRIMARY_COLOR: '#b90007',
  TEXT_ICONS: '#ffffff'
};

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.PRIMARY_COLOR,
    margin: 10
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.PRIMARY_COLOR,
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    backgroundColor: colors.PRIMARY_COLOR,
    borderBottomWidth: 0,
    elevation: 0,
    height: 56 + STATUS_BAR_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT
  },
  flex: {
    flex: 1
  },
  text: {
    color: colors.TEXT_ICONS
  },
  title: {
    color: colors.TEXT_ICONS,
    fontSize: 45,
    marginBottom: 50
  },
});

export const navigationConfig = {
  navigationOptions: {
    headerTintColor: colors.TEXT_ICONS,
    headerStyle: styles.header
  }
};
