import { StyleSheet } from 'react-native';
import { STATUS_BAR_HEIGHT } from '../constants';

export const colors = {
  PRIMARY_COLOR: '#cd201f',
  DARK_PRIMARY_COLOR: '#b90007',
  LIGHT_PRIMARY_COLOR: 'rgba(255, 255, 255, 0.2)',
  TEXT_ICONS: '#ffffff',
  LIGHT_TEXT_ICONS: 'rgba(255, 255, 255, 0.7)'
};

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.PRIMARY_COLOR,
    margin: 20
  },
  registerButton: {
    backgroundColor: colors.LIGHT_PRIMARY_COLOR,
    width: 200
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.PRIMARY_COLOR,
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    marginBottom: 50,
    justifyContent: 'center'
  },
  titleContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    position: 'absolute',
    top: 10
  },
  registerContainer: {
    padding: 20
  },
  buttonContainer: {
    margin: 20,
    padding: 10
  },
  flex: {
    flex: 1
  },
  header: {
    backgroundColor: colors.PRIMARY_COLOR,
    borderBottomWidth: 0,
    elevation: 0,
    height: 56 + STATUS_BAR_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT
  },
  logo: {
    height: 100,
    width: 100
  },
  text: {
    color: colors.TEXT_ICONS
  },
  textInput: {
    height: 40,
    backgroundColor: colors.LIGHT_PRIMARY_COLOR,
    marginBottom: 20,
    color: colors.TEXT_ICONS,
    paddingHorizontal: 10
  },
  mainTitle: {
    color: colors.TEXT_ICONS,
    fontSize: 45
  },
  registerTitle: {
    color: colors.TEXT_ICONS,
    textAlign: 'center'
  },
  registerText: {
    color: colors.TEXT_ICONS,
    marginTop: 10,
    width: 160,
    textAlign: 'center',
    opacity: 0.9
  }
});

export const navigationConfig = {
  navigationOptions: {
    headerTintColor: colors.TEXT_ICONS,
    headerStyle: styles.header
  }
};
