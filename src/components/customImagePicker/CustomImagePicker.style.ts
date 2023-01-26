import {Platform, StyleSheet} from 'react-native';
import colors from 'src/constants/colors';
import {SCREEN_WIDTH} from 'src/constants/deviceInfo';
import {fonts} from 'src/constants/fonts';

export const CustomImagePickerStyle = StyleSheet.create({
  button: {
    height: 120,
    width: Platform.select({
      android: SCREEN_WIDTH * 0.35,
      ios: SCREEN_WIDTH * 0.4,
    }),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 22,
    backgroundColor: colors.blackOpacity2,
    padding: 10,
  },
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 22,
    backgroundColor: colors.defaultWhite,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textStyle: {
    color: colors.primaryColor,
    // opacity: 0.5,
    fontFamily: fonts.regular,
    fontSize: 16,
    marginTop: 5,
  },
});
