import React, {ReactNode} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import colors from 'src/constants/colors';
import {fonts} from 'src/constants/fonts';

type Props = {
  children?: ReactNode;
  onPress: () => void;
  contentStyle?: ViewStyle;
  mainContentStyle?: ViewStyle;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  mode?: 'text' | 'outlined' | 'contained';
  title?: string;
  titleStyle?: TextStyle;
};

const CustomButton = ({
  children,
  onPress,
  disabled,
  loading,
  mainContentStyle,
  title,
  titleStyle,
  mode = 'contained',
}: Props) => {
  const styleType = {
    text: styles.textMode,
    contained: styles.containedMode,
    outlined: styles.outlinedMode,
  };

  const textStyleType = {
    text: styles.outlinedTitleStyle,
    contained: styles.titleStyle,
    outlined: styles.outlinedTitleStyle,
  };
  return (
    <Pressable
      style={[styleType[mode], mainContentStyle]}
      onPress={onPress}
      disabled={disabled || loading}>
      {loading && (
        <ActivityIndicator
          color={colors.defaultWhite}
          style={styles.activityIndicator}
          size={20}
        />
      )}
      {children ? (
        children
      ) : (
        <Text style={[textStyleType[mode], titleStyle]}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containedMode: {
    backgroundColor: colors.green,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textMode: {
    backgroundColor: colors.transparent,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  outlinedMode: {
    backgroundColor: colors.transparent,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: colors.primaryColor,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
  },
  titleStyle: {
    color: colors.defaultWhite,
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    fontFamily: fonts.regular,
  },
  outlinedTitleStyle: {
    color: colors.primaryColor,
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    fontFamily: fonts.regular,
  },
  activityIndicator: {
    marginRight: 10,
  },
});

export default CustomButton;
