import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {RootRouteName} from 'src/constants/routeName';
import {useAppSelector} from 'src/hooks/reducer';
import QrCodeDataDetails from 'src/screens/report/QrCodeDataDetails';
import ReportDetails from 'src/screens/report/ReportDetails';
import Scanner from 'src/screens/scan/Scanner';
import Splash from 'src/screens/splash/Splash';
import {loginDataType} from 'typings/login-data-type';
import AuthStackNavigator from './AuthStackNavigator';
import DrawerStackNavigator from './TabStackNavigator';
import {RootStackParamList} from './types/navigation';

type Props = {};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = ({}: Props) => {
  const {Navigator, Screen} = RootStack;

  const user: loginDataType = useAppSelector(state => state?.userReducer?.user);

  const [init, setInit] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setInit(false);
    }, 1000);
  }, []);

  return (
    <Navigator screenOptions={{headerShown: false}}>
      {init ? <Screen name={RootRouteName.SPLASH} component={Splash} /> : null}
      {!user?.token ? (
        <Screen
          name={RootRouteName.AUTH_STACK}
          component={AuthStackNavigator}
        />
      ) : (
        <>
          <Screen
            name={RootRouteName.DRAWER_STACK}
            component={DrawerStackNavigator}
          />
          <Screen
            name={RootRouteName.REPORT_DETAILS}
            component={ReportDetails}
          />
          <Screen name={RootRouteName.SCANNER} component={Scanner} />
          <Screen
            name={RootRouteName.QR_CODE_DETAILS}
            component={QrCodeDataDetails}
          />
        </>
      )}
    </Navigator>
  );
};

export default RootStackNavigator;
