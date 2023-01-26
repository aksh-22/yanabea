import React from 'react';
import {useTranslation} from 'react-i18next';
import {Linking, Platform, Text, View} from 'react-native';
import CustomButton from 'src/components/CustomButton';
import {ScannerStyle} from './Scanner.style';

type Props = {
  onBackPress?: () => void;
};

const NoAuthorizedView = ({onBackPress}: Props) => {
  const {t} = useTranslation();

  return (
    <View style={ScannerStyle.noAuthorizeView}>
      <Text style={ScannerStyle.message}>{t('scanner:permissionMessage')}</Text>
      <CustomButton
        onPress={() => {
          onBackPress();
          Linking.openSettings();
        }}
        title={t('scanner:settings')}
        mainContentStyle={ScannerStyle.button}
      />
      {Platform.OS === 'android' && (
        <CustomButton
          mainContentStyle={{marginTop: 20}}
          onPress={onBackPress}
          title={t('other:cancel')}
        />
      )}
    </View>
  );
};

export default NoAuthorizedView;
