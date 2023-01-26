import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {fonts} from 'src/constants/fonts';
import colors from 'src/constants/colors';

type Props = {};

const ListEmptyComponent = ({}: Props) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('other:noData')}</Text>
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 35,
    color: colors.defaultBlack,
  },
});
