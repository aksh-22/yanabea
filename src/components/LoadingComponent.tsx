import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts} from 'src/constants/fonts';
import colors from 'src/constants/colors';
import {useTranslation} from 'react-i18next';

type Props = {
  showText?: boolean;
};

const LoadingComponent = ({showText = true}: Props) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primaryColor} size="large" />
      {showText ? (
        <Text style={styles.text}>{t('other:pleaseWait')}</Text>
      ) : null}
    </View>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 35,
    color: colors.defaultBlack,
    marginTop: 20,
  },
});
