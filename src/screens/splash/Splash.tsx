import React from 'react';
import {StyleSheet} from 'react-native';
import Logo from 'src/assets/svg/logo.svg';
import ContainerWithoutScroll from 'src/components/ContainerWithoutScroll';
import colors from 'src/constants/colors';

type Props = {};

const Splash = ({}: Props) => {
  return (
    <ContainerWithoutScroll
      style={styles.view}
      statusBarColor={colors.primaryColor}>
      <Logo />
    </ContainerWithoutScroll>
  );
};

export default Splash;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
  },
});
