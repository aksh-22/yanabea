import {StyleSheet} from 'react-native';
import colors from './colors';
import {fonts} from './fonts';

export const commonStyles = StyleSheet.create({
  shadow: {
    shadowColor: colors.defaultBlack,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  fdr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  directionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: fonts.regular,
    fontSize: 22,
    color: colors.defaultBlack,
    lineHeight: 28,
  },
});
