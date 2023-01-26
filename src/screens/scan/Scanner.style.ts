import {StyleSheet} from 'react-native';
import colors from 'src/constants/colors';
import {fonts} from 'src/constants/fonts';

export const ScannerStyle = StyleSheet.create({
  view: {
    flex: 1,
  },
  noAuthorizeView: {
    flex: 1,
    backgroundColor: colors.defaultWhite,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontFamily: fonts.semiBold,
    color: colors.defaultBlack,
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
});
