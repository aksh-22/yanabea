import React, {ReactNode} from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import colors from 'src/constants/colors';
import {fonts} from 'src/constants/fonts';

type Props = {
  style?: TextStyle;
  children: ReactNode;
};

const YText = ({style, children}: Props) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default YText;

const styles = StyleSheet.create({
  text: {
    color: colors.defaultBlack,
    fontFamily: fonts.regular,
  },
});
