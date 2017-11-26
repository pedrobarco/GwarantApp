import { StyleSheet } from 'react-native';

export const colors = {
  ACCENT_COLOR: '#FF5252',
  PRIMARY_COLOR: '#F44336',
  DARK_PRIMARY_COLOR: '#D32F2F',
  LIGHT_PRIMARY_COLOR: '#FFCDD2',
  DIVIDER_COLOR: '#BDBDBD',
  TEXT_ICONS: '#FFFFFF',
  PRIMARY_TEXT: '#212121',
  SECONDARY_TEXT: '#757575'
}

export const styles = StyleSheet.create({
  button: {
    margin: 20,
    backgroundColor: colors.PRIMARY_COLOR
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.PRIMARY_COLOR
  },
  header: {
    backgroundColor: colors.PRIMARY_COLOR,
    elevation: 0,
    borderBottomWidth: 0
  },
  flex: {
    flex: 1
  },
  title: {
    color: colors.TEXT_ICONS,
    fontSize: 45,
    marginBottom: 70
  },
  // TODO: I'm not a designer
  text: {
      color: colors.PRIMARY_TEXT,
      fontSize: 15
  }
});