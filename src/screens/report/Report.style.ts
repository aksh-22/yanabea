import {Platform, StyleSheet} from 'react-native';
import colors from 'src/constants/colors';
import {commonStyles} from 'src/constants/common.style';
import {fonts} from 'src/constants/fonts';

export const ReportStyles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.primaryColor,
  },
  headerHeadingStyle: {
    color: colors.defaultWhite,
  },
  containerStyle: {
    flex: 1,
    backgroundColor: colors.background,
    // paddingBottom: 100,
    // paddingHorizontal: 20,
  },
  cardStyle: {
    paddingVertical: 10,
    marginTop: 30,
    paddingHorizontal: 20,
  },
  cardHeading: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: colors.borderColor,
  },
  cardValue: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.defaultBlack,
    marginTop: 5,
  },
  name: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.defaultBlack,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  filterBox: {
    position: 'absolute',
    top: Platform.select({android: 60, ios: 110}),
    zIndex: 1,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterInnerBox: {
    flexDirection: 'row',
    // alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  dateWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 50,
  },
  iconWrapper: {
    marginStart: 20,
  },
  flatListStyle: {
    marginTop: 80,
    flexGrow: 1,
  },
  flatListStyle2: {
    flex: 1,
    // marginTop: 20,
  },
  listElWrapper: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  listEl: {
    ...commonStyles.shadow,
    borderRadius: 5,
    marginVertical: 15,
    marginHorizontal: 20,
    // overflow: 'hidden',
  },
  listEl2: {
    ...commonStyles.shadow,
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 30,
    // overflow: 'hidden',
  },
  listElTop: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listElTopText: {
    color: colors.defaultWhite,
    fontFamily: fonts.semiBold,
    fontSize: 15,
  },
  listElBottom: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: colors.defaultWhite,
  },
  listElBottomText: {
    color: colors.borderColor,
    fontFamily: fonts.semiBold,
    fontSize: 15,
  },
  listView: {
    marginTop: 30,
    backgroundColor: colors.defaultWhite,
    borderRadius: 5,
  },
  reportCard: {
    marginTop: 20,
    padding: 15,
  },
  qrReportCard: {
    marginTop: 20,
    padding: 15,
    marginHorizontal: 20,
  },
  reportListView: {
    marginTop: 10,
  },
  reportListRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  reportListColumn: {
    flex: 0.5,
  },
  fl: {
    flex: 0.8,
  },
  reportListColumnHeading: {
    flex: 1,
  },
  reportListRowItem: {
    color: colors.primaryColor,
    marginTop: 5,
    flex: 1,
  },
  reportListRowItemRight: {
    color: colors.primaryColor,
    marginTop: 5,
    // flex: 1,
  },
  dateText: {
    fontFamily: fonts.regular,
    fontSize: Platform.select({android: 12, ios: 12}),
    color: colors.defaultBlack,
    marginEnd: 10,
  },
  dateIcon: {
    marginHorizontal: Platform.select({android: 7, ios: 10}),
  },
  dateBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dateBoxWrapper: {
    backgroundColor: colors.defaultWhite,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: Platform.select({android: 3, ios: 5}),
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  qrListEl: {
    // flex: 1,
    color: colors.primaryColor,
    fontFamily: fonts.regular,
    fontSize: 14,
    alignSelf: 'flex-start',
  },
});
