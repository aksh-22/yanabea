import React, {useEffect} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabRouteName} from 'src/constants/routeName';
import Home from 'src/screens/home/Home';
import Profile from 'src/screens/profile/Profile';
import ReportStackNavigator from './ReportStackNavigator';
import colors from 'src/constants/colors';
import HomeIcon from 'src/assets/svg/home.svg';
import ProfileIcon from 'src/assets/svg/profile.svg';
import ReportIcon from 'src/assets/svg/reportIcon.svg';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import {fonts} from 'src/constants/fonts';

// const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
type Props = {};

const tabBarIcon = (key, color) => {
  switch (key) {
    case 'home':
      return <HomeIcon fill={color} />;

    case 'profile':
      return <ProfileIcon fill={color} />;

    case 'report':
      return <ReportIcon fill={color} />;

    default:
      break;
  }
};

const TabStackNavigator = ({}: Props) => {
  useEffect(() => {
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(colors.defaultWhite);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.Candlelight,
        tabBarInactiveTintColor: colors.defaultWhite,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      }}>
      <Tab.Screen
        options={{tabBarIcon: ({color}) => tabBarIcon('home', color)}}
        name={TabRouteName.HOME}
        component={Home}
      />
      <Tab.Screen
        options={{tabBarIcon: ({color}) => tabBarIcon('profile', color)}}
        name={TabRouteName.PROFILE}
        component={Profile}
      />
      <Tab.Screen
        options={{tabBarIcon: ({color}) => tabBarIcon('report', color)}}
        name={TabRouteName.REPORT}
        component={ReportStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default TabStackNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.primaryColor,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 20,
    height: Platform.select({
      ios: 100,
      android: 70,
    }),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarLabelStyle: {
    fontFamily: fonts.medium,
    fontSize: 18,
    marginTop: 15,
  },
});
