import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';
import {en} from './translations';
import {ar} from './translations';
//empty for now
const resources = {
  // en: {
  //   translation: en,
  // },
  en,
  ar,
};

i18n.init({
  compatibilityJSON: 'v3',
});

i18n.use(initReactI18next).init({
  resources,
  //language to use if translations in user language are not available
  fallbackLng: 'en',
  // lng:"en",
  lng: I18nManager.isRTL ? 'ar' : 'en',
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export default i18n;
