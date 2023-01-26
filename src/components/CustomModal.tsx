import i18next from 'i18next';
import React from 'react';
import {I18nManager, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import colors from 'src/constants/colors';
import CustomButton from './CustomButton';
import RNRestart from 'react-native-restart';

type Props = {
  isVisible?: boolean;
  onClose?: () => void;
};

const CustomModal = ({isVisible, onClose}: Props) => {
  const onSetEnglish = () => {
    i18next.changeLanguage('en');
    I18nManager.forceRTL(false);
    RNRestart.Restart();
  };
  const onSetArabic = () => {
    i18next.changeLanguage('ar');
    I18nManager.forceRTL(true);
    RNRestart.Restart();
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      swipeDirection={'down'}
      onDismiss={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      hasBackdrop>
      <View style={styles.View}>
        <CustomButton title="English" onPress={onSetEnglish} />
        <CustomButton title="arabic" onPress={onSetArabic} />
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  View: {
    flex: 1,
    margin: 40,
    backgroundColor: colors.defaultWhite,
  },
});
