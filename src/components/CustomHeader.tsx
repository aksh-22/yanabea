import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Back from 'src/assets/svg/back.svg';
import colors from 'src/constants/colors';
import {fonts} from 'src/constants/fonts';

type Props = {
  leftIcon?: 'menu' | 'back';
  iconColor?: string;
  heading?: string;
  containerStyle?: ViewStyle;
  headingStyle?: TextStyle;
};

const CustomHeader = ({
  leftIcon = 'back',
  iconColor = colors.defaultBlack,
  heading,
  containerStyle,
  headingStyle,
}: Props) => {
  const {goBack} = useNavigation<NativeStackNavigationProp<any>>();

  const data = {
    menu: {
      icon: <></>,
      onPress: () => null,
    },
    back: {
      icon: <Back />,
      onPress: () => goBack(),
    },
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <TouchableOpacity
        onPress={data[leftIcon].onPress}
        style={[styles.iconStyle]}>
        {React.cloneElement(data[leftIcon].icon, {
          fill: iconColor,
        })}
      </TouchableOpacity>
      {heading ? (
        <Text style={[styles.headerTextStyle, headingStyle]}>{heading}</Text>
      ) : null}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    // marginVertical: 10,
    backgroundColor: colors.defaultWhite,
    paddingHorizontal: 20,
  },
  iconStyle: {
    position: 'absolute',
    left: 0,
    padding: 20,
  },
  headerTextStyle: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.defaultBlack,
  },
});
