import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from 'src/constants/colors';

type Props = {
  width?: number | string;
  height?: number;
  color?: string;
  marginVertical?: number;
};

const Divider = ({
  width = '100%',
  height = 1,
  color = colors.borderColor,
  marginVertical = 10,
}: Props) => {
  return (
    <View
      style={[
        styles.line,
        {
          width,
          height,
          backgroundColor: color,
          marginVertical,
        },
      ]}
    />
  );
};

export default Divider;

const styles = StyleSheet.create({
  line: {
    alignSelf: 'center',
  },
});
