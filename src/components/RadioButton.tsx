import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from 'src/constants/colors';
import {fonts} from 'src/constants/fonts';

type Props = {
  isChecked: boolean;
  onPress: () => void;
  title?: string;
};

const RadioButton = ({isChecked, onPress, title}: Props) => {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={[
          styles.circle,
          {
            backgroundColor: isChecked
              ? colors.primaryColor
              : colors.transparent,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  circle: {
    height: 15,
    width: 15,
    borderRadius: 50,
    borderColor: colors.primaryColor,
    borderWidth: 3,
  },
  title: {
    fontFamily: fonts.semiBold,
    color: colors.defaultBlack,
    fontSize: 18,
  },
});
