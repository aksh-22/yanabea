import {StyleSheet} from 'react-native';
import colors from 'src/constants/colors';
import {fonts} from 'src/constants/fonts';

export const ModalStyle = StyleSheet.create({
  box: {
    backgroundColor: colors.defaultWhite,
    borderRadius: 15,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  box2: {
    backgroundColor: colors.defaultWhite,
    borderRadius: 15,
    paddingVertical: 20,
    width: '90%',
    // alignItems: 'center',
    // justifyContent: 'center',
    // minHeight: 200,
  },
  iconWrapper: {
    height: 75,
    width: 75,
    borderRadius: 70,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.defaultBlack,
    marginVertical: 10,
  },
  btnStyle: {
    marginVertical: 10,
    borderRadius: 15,
    paddingVertical: 8,
  },
  btnStyle2: {
    marginVertical: 10,
    borderRadius: 5,
    paddingVertical: 8,
    flex: 1,
    marginHorizontal: 20,
  },
  titleStyle: {
    fontSize: 16,
  },
  logoWrapper: {
    borderRadius: 5,
    overflow: 'hidden',
    marginEnd: 10,
  },
  modalTop: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  modalBottom: {
    flexDirection: 'row',
    marginTop: 40,
  },
});
