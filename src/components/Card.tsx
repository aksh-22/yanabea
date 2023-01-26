import React, {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import colors from 'src/constants/colors';
import {commonStyles} from 'src/constants/common.style';

type Props = {
  children: ReactNode;
  viewStyle?: ViewStyle;
};

const Card = ({children, viewStyle}: Props) => {
  return <View style={[styles.card, viewStyle]}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    ...commonStyles.shadow,
    backgroundColor: colors.defaultWhite,
    minHeight: 70,
    borderRadius: 10,
  },
});
