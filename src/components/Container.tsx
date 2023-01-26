import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Platform,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from 'src/constants/colors';

type Props = {
  children: ReactNode;
  SafeAreaViewStyle?: ViewStyle;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  statusBarColor?: string;
  barStyle?: StatusBarStyle;
  onRefresh?: () => void;
  refreshLoading?: boolean;
};

const Container = ({
  children,
  SafeAreaViewStyle,
  style,
  contentContainerStyle,
  statusBarColor = colors.defaultWhite,
  barStyle = 'default',
  onRefresh,
  refreshLoading,
}: Props) => {
  const {addListener} = useNavigation<NativeStackNavigationProp<any>>();

  const {t} = useTranslation();

  React.useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(statusBarColor);
      }
      StatusBar.setBarStyle(barStyle);
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addListener]);

  return (
    <SafeAreaView
      style={[
        styles.SafeAreaView,
        SafeAreaViewStyle,
        {
          backgroundColor: statusBarColor,
        },
      ]}>
      <StatusBar backgroundColor={statusBarColor} barStyle={barStyle} />
      <KeyboardAwareScrollView
        bounces={!!onRefresh}
        refreshControl={
          onRefresh && (
            <RefreshControl
              refreshing={refreshLoading}
              onRefresh={onRefresh}
              tintColor={colors.defaultWhite}
              // colors={[colors.green, colors.Candlelight]}
              title={t('other:pullToRefresh')}
              titleColor={colors.defaultWhite}
            />
          )
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainerStyle,
          contentContainerStyle,
        ]}
        style={[styles.view, style]}>
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  SafeAreaView: {
    flex: 1,
  },
});
