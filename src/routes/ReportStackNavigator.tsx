import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ReportRouteName} from 'src/constants/routeName';
import Report from 'src/screens/report/Report';
import {ReportStackParamList} from './types/navigation';

type Props = {};

const ReportStack = createNativeStackNavigator<ReportStackParamList>();

const ReportStackNavigator = ({}: Props) => {
  const {Navigator, Screen} = ReportStack;
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={ReportRouteName.REPORT_LIST} component={Report} />
    </Navigator>
  );
};

export default ReportStackNavigator;
