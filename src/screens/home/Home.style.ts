import {StyleSheet} from 'react-native';
import colors from 'src/constants/colors';
import {SCREEN_WIDTH} from 'src/constants/deviceInfo';
import {fonts} from 'src/constants/fonts';

const diameter = 115;

export const HomeStyles = StyleSheet.create({
  scanButton: {
    marginVertical: 20,
    marginTop: 70,
  },
  image: {
    height: 250,
    width: SCREEN_WIDTH,
  },
  content: {
    marginHorizontal: 20,
  },
  language: {
    height: 50,
    width: 50,
    backgroundColor: colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    alignSelf: 'flex-end',
    marginEnd: 20,
    marginTop: 10,
  },
  headingStyle: {
    fontFamily: fonts.bold,
    fontSize: 30,
    color: colors.defaultBlack,
    textAlign: 'center',
  },
  circleText: {
    height: 100,
    width: 100,
    backgroundColor: colors.green,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleUpperText: {
    backgroundColor: colors.green,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  upperWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginVertical: 20,
    backgroundColor: colors.defaultWhite,
  },
  stockText: {
    fontFamily: fonts.regular,
    fontSize: 25,
    color: colors.defaultWhite,
  },
  stockText2: {
    fontFamily: fonts.medium,
    fontSize: 10,
    color: colors.defaultWhite,
    textAlign: 'center',
    marginHorizontal: 15,
    textTransform: 'uppercase',
  },
  textArea: {
    marginLeft: 30,
  },
  updateText: {
    fontFamily: fonts.regular,
    color: colors.grayText,
    fontSize: 15,
  },
  linearGradient: {
    borderRadius: diameter / 2,
    width: diameter,
    height: diameter,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
