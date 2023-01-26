import {NavigatorScreenParams} from '@react-navigation/native';
import {
  AuthRouteName,
  TabRouteName,
  ReportRouteName,
  RootRouteName,
} from 'src/constants/routeName';

export type RootStackParamList = {
  [RootRouteName.AUTH_STACK]: NavigatorScreenParams<AuthStackParamList>;
  [RootRouteName.DRAWER_STACK]: NavigatorScreenParams<DrawerStackParamList>;
  [RootRouteName.REPORT_DETAILS]: undefined;
  [RootRouteName.SPLASH]: undefined;
  [RootRouteName.DETAILS]: undefined;
  [RootRouteName.SCANNER]: undefined;
  [RootRouteName.QR_CODE_DETAILS]: undefined;
};

export type AuthStackParamList = {
  [AuthRouteName.LOGIN]: undefined;
  [AuthRouteName.SIGN_UP]: undefined;
};

export type DrawerStackParamList = {
  [TabRouteName.HOME]: undefined;
  [TabRouteName.PROFILE]: undefined;
  [TabRouteName.REPORT]: NavigatorScreenParams<ReportStackParamList>;
};

export type ReportStackParamList = {
  [ReportRouteName.REPORT_LIST]: undefined;
};
