import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  useDrawerStatus,
} from '@react-navigation/drawer';
import React, {ReactNode, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LanguageIcon from 'src/assets/svg/language.svg';
import ProfileIcon from 'src/assets/svg/profile.svg';
import ReportIcon from 'src/assets/svg/report.svg';
import ImageComponent from 'src/components/ImageComponent';
import colors from 'src/constants/colors';
import {fonts} from 'src/constants/fonts';
import {TabRouteName} from 'src/constants/routeName';
import {useAppSelector} from 'src/hooks/reducer';
import {loginDataType} from 'typings/login-data-type';
import LanguageModal from './messageModal/LanguageModal';

const list = [
  {
    id: 1,
    name: 'drawer:profile.profile',
    icon: <ProfileIcon />,
    navigateTo: TabRouteName.PROFILE,
  },
  {
    id: 2,
    name: 'drawer:report.report',
    icon: <ReportIcon />,
    navigateTo: TabRouteName.REPORT,
  },
  {id: 3, name: 'drawer:language.language', icon: <LanguageIcon />},
];

type LProps = {
  id: number;
  name: any;
  icon?: ReactNode;
  navigateTo?: string;
};

const DrawerContent = (props: DrawerContentComponentProps) => {
  const {t} = useTranslation();

  const userData: loginDataType = useAppSelector(
    state => state?.userReducer?.user,
  );

  const [showModal, setShowModal] = useState(false);

  const isDrawerOpen = useDrawerStatus() === 'open';

  const onClosePress = () => {
    props.navigation.closeDrawer();
  };

  const onPress = () => {
    props.navigation.closeDrawer();
    setShowModal(true);
  };

  useEffect(() => {
    // if (props?.navigation.)

    if (Platform.OS === 'android') {
      if (isDrawerOpen) {
        StatusBar.setBackgroundColor(colors.primaryColor);
        StatusBar.setBarStyle('light-content');
      } else {
        StatusBar.setBackgroundColor(colors.defaultWhite);
        StatusBar.setBarStyle('dark-content');
      }
    }
  }, [isDrawerOpen]);

  return (
    <>
      <DrawerContentScrollView style={styles.container} {...props}>
        <TouchableOpacity
          onPress={onClosePress}
          style={styles.closeIconWrapper}>
          <Icon name="close" color={colors.defaultWhite} size={20} />
        </TouchableOpacity>
        <ImageComponent uri={userData?.image} />
        <Text numberOfLines={2} style={styles.name}>
          {userData?.name}
        </Text>
        <View style={styles.list}>
          {list.map((el: LProps, index: number) => (
            <DrawerItem
              onPress={() => {
                el?.navigateTo
                  ? props.navigation.navigate(el?.navigateTo)
                  : onPress();
              }}
              key={el.id}
              label={t(el.name)}
              style={[
                styles.drawerItem,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  borderBottomWidth: index === list.length - 1 ? 0 : 1,
                },
              ]}
              labelStyle={styles.labelStyle}
              icon={() => <View style={styles.iconWrapper}>{el?.icon}</View>}
            />
          ))}
        </View>
      </DrawerContentScrollView>
      <LanguageModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  name: {
    color: colors.defaultWhite,
    fontSize: 21,
    textAlign: 'center',
    lineHeight: 32,
    fontFamily: fonts.semiBold,
    marginTop: 10,
  },
  drawerItem: {
    borderColor: colors.defaultWhite,
    paddingBottom: 10,
  },
  iconWrapper: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.defaultWhite,
    padding: 10,
  },
  labelStyle: {
    color: colors.defaultWhite,
    fontFamily: fonts.semiBold,
    fontSize: 18,
    lineHeight: 23,
  },
  list: {
    marginTop: 20,
  },
  closeIconWrapper: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.defaultWhite,
    alignSelf: 'flex-end',
    padding: 2,
    marginEnd: 10,
    marginBottom: 20,
  },
});
