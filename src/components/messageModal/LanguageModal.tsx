/* eslint-disable react-native/no-inline-styles */
import i18next from 'i18next';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  I18nManager,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import RNRestart from 'react-native-restart';
import colors from 'src/constants/colors';
import {fonts} from 'src/constants/fonts';
import Card from '../Card';
import CheckBox from '../CheckBox';
import CustomButton from '../CustomButton';
import Divider from '../Divider';
import {ModalStyle} from './Modal.style';

type Props = {
  isVisible?: boolean;
  onClose?: () => void;
};

const LanguageModal = ({isVisible, onClose}: Props) => {
  const selectedLang = i18next.language;
  const [selected, setSelected] = useState(selectedLang === 'en' ? 2 : 1);

  const {t} = useTranslation();

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

  const onSelected = () => {
    selected === 2 ? onSetEnglish() : onSetArabic();
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      swipeDirection={'down'}
      onDismiss={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      hasBackdrop
      onModalShow={() => {
        Platform.OS === 'android' &&
          StatusBar.setBackgroundColor(colors.blackOpacity2);
      }}
      style={styles.View}>
      <Card viewStyle={styles.cardStyle}>
        <Text style={styles.heading}>{t('other:selectedLanguage')}</Text>
        <Divider width={100} color={colors.primaryColor} height={2} />
        <View>
          <TouchableOpacity
            onPress={() => setSelected(1)}
            style={styles.languageItem}>
            <Text style={styles.text}>{t('other:arabic')}</Text>
            <CheckBox
              onPress={() => setSelected(1)}
              isChecked={selected === 1}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelected(2)}
            style={styles.languageItem}>
            <Text style={styles.text}>{t('other:english')}</Text>
            <CheckBox
              onPress={() => setSelected(2)}
              isChecked={selected === 2}
            />
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <CustomButton
              mainContentStyle={ModalStyle.btnStyle2}
              title={t('other:cancel')}
              onPress={onClose}
              titleStyle={ModalStyle.titleStyle}
              mode="outlined"
            />
            <CustomButton
              mainContentStyle={ModalStyle.btnStyle2}
              title={t('other:select')}
              onPress={onSelected}
              titleStyle={ModalStyle.titleStyle}
            />
          </View>
        </View>
      </Card>
    </Modal>
  );
};

export default LanguageModal;

const styles = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStyle: {
    width: '100%',
    paddingVertical: 20,
  },
  heading: {
    color: colors.defaultBlack,
    fontFamily: fonts.regular,
    fontSize: 17,
    textAlign: 'center',
    marginTop: 10,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.defaultBlack,
  },
});
