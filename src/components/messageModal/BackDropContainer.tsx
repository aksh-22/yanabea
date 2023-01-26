import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from 'src/constants/colors';

type Props = {
  children?: ReactNode;
};

const BackDropContainer = ({children}: Props) => {
  return <View style={styles.container}>{children}</View>;
};

export default BackDropContainer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.blackOpacity,
    zIndex: 1,
  },
});
