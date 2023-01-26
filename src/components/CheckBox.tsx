import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Right from 'src/assets/svg/right.svg';
import colors from 'src/constants/colors';

type Props = {
  size?: number;
  isChecked?: boolean;
  onPress: () => void;
};

const CheckBox = ({size = 25, isChecked = true, onPress}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.wrapper,
        {
          height: size,
          width: size,
          backgroundColor: isChecked ? colors.green : colors.defaultWhite,
          borderColor: isChecked ? colors.green : colors.borderColor,
        },
      ]}>
      <Right />
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
