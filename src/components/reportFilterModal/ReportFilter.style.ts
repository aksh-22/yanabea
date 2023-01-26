import {StyleSheet} from 'react-native';
import colors from 'src/constants/colors';
import {fonts} from 'src/constants/fonts';

export const ReportStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.defaultWhite,
    padding: 20,
    borderRadius: 10,
  },
  modalStyle: {
    backgroundColor: colors.defaultWhite,
    borderRadius: 10,
    paddingVertical: 20,
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  buttonStyle: {
    flex: 1,
    marginHorizontal: 10,
  },
  monthPickerStyle: {
    width: '50%',
    backgroundColor: colors.defaultWhite,
  },
  monthPickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calHeader: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.defaultBlack,
    alignSelf: 'flex-start',
    marginStart: 20,
  },
  text: {
    fontFamily: fonts.regular,
    color: colors.defaultBlack,
    fontSize: 20,
  },
});
