import {StyleSheet} from 'react-native';
import colors from 'src/constants/colors';

export const ProfileStyle = StyleSheet.create({
  header: {
    backgroundColor: colors.primaryColor,
  },
  headingHeader: {
    color: colors.defaultWhite,
  },
  container: {
    flex: 1,
    backgroundColor: colors.defaultWhite,
    padding: 20,
    paddingBottom: 100,
  },
  imageBackground: {
    backgroundColor: colors.primaryColor,
    marginBottom: 50,
  },
});
