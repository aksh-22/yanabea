import {Platform, StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from 'src/constants/deviceInfo';

export const AuthStyle = StyleSheet.create({
  container: {
    // flex: 1,
  },
  input: {
    marginVertical: 10,
  },
  phoneInput: {
    marginVertical: 10,
    flex: 1,
  },
  button: {
    marginTop: 40,
  },
  textButton: {
    marginTop: 20,
  },
  logo: {
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    marginVertical: 30,
  },
  bottomLogo: {
    borderRadius: 5,
    overflow: 'hidden',
    alignSelf: 'center',
    marginEnd: 10,
  },
  backgroundImage: {
    width: SCREEN_WIDTH,
    height: Platform.select({android: 200, ios: 220}),
    marginTop: 30,
  },
  bottomLogoTextWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  phoneWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  countryPicker: {
    borderWidth: 0,
    paddingStart: 0,
    marginRight: 10,
  },
});
