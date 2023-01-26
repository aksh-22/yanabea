import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AuthRouteName} from 'src/constants/routeName';
import Login from 'src/screens/auth/Login';
import SignUp from 'src/screens/auth/SignUp';
import {AuthStackParamList} from './types/navigation';

type Props = {};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = ({}: Props) => {
  const {Navigator, Screen} = AuthStack;
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={AuthRouteName.LOGIN} component={Login} />
      <Screen name={AuthRouteName.SIGN_UP} component={SignUp} />
    </Navigator>
  );
};

export default AuthStackNavigator;
