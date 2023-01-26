import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, View} from 'react-native';
import {Country} from 'react-native-country-picker-modal';
import {getCountry} from 'react-native-localize';
import {loginWarehouse} from 'src/api/authService';
import Logo from 'src/assets/svg/logo.svg';
import Container from 'src/components/Container';
import CustomButton from 'src/components/CustomButton';
import CustomCountryPicker from 'src/components/CustomCountryPicker';
import CustomInput from 'src/components/CustomInput';
import LanguageModal from 'src/components/messageModal/LanguageModal';
import {useAppDispatch} from 'src/hooks/reducer';
import {updateUser} from 'src/redux/reducer/userReducer';
import {AuthStyle} from './Auth.style';

type Props = {
  navigation: any;
};

const SIZE = 86;
// const SIZE2 = 26;

const Login = ({}: Props) => {
  const [phone, setPhone] = useState(__DEV__ ? '9423565562' : '');
  const [phoneError, setPhoneError] = useState(false);

  const [password, setPassword] = useState(__DEV__ ? '12345678' : '');
  const [passwordError, setPasswordError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [country, setCountry] = useState<Country>();

  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();

  const {t} = useTranslation();

  // const onSignUpPress = () => {
  //   navigation.navigate('signUp');
  // };

  const onLoginPress = () => {
    if (!phone) {
      setPhoneError(true);
    } else if (!password) {
      setPasswordError(true);
    } else {
      setLoading(true);
      onLogin();
    }
  };

  const onLogin = async () => {
    const data = {
      mobile_number: phone,
      password,
      country_code: `+${country.callingCode[0]}`,
    };
    await loginWarehouse(data)
      .then(response => {
        dispatch(updateUser(response.data));
      })
      .catch(err => console.log('err', err))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Container barStyle="dark-content">
        <View style={AuthStyle.contentWrapper}>
          <View style={AuthStyle.logo}>
            <Logo height={SIZE} width={SIZE} />
          </View>
          <CustomCountryPicker
            countryCode={country?.cca2 ?? getCountry()}
            onChange={countryData => {
              setCountry(countryData);
            }}
            onLoad={countryData => {
              const init: Country = {
                cca2: 'IN',
                currency: ['INR'],
                callingCode: ['91'],
                region: 'Asia',
                subregion: 'Southern Asia',
                flag: 'flag-in',
                name: 'India',
              };
              setCountry(__DEV__ ? init : countryData);
            }}
          />

          <CustomInput
            label={t('auth:phone')}
            onChangeText={txt => {
              setPhoneError(false);
              setPhone(txt);
            }}
            value={phone}
            containerStyle={AuthStyle.input}
            error={phoneError}
            keyBoardType="decimal-pad"
          />
          <CustomInput
            label={t('auth:password')}
            onChangeText={txt => {
              setPasswordError(false);
              setPassword(txt);
            }}
            value={password}
            containerStyle={AuthStyle.input}
            error={passwordError}
            secureTextEntry
          />

          <CustomButton
            mainContentStyle={AuthStyle.button}
            loading={loading}
            onPress={onLoginPress}
            mode="contained"
            title={t('auth:login')}
          />
          {/* <TouchableOpacity
            onPress={onSignUpPress}
            style={AuthStyle.bottomLogoTextWrapper}>
            <View style={AuthStyle.bottomLogo}>
              <Logo height={SIZE2} width={SIZE2} />
            </View>
            <YText>{t('auth:become')}</YText>
          </TouchableOpacity> */}
        </View>
        <Image
          source={require('src/assets/img/bg2.png')}
          style={AuthStyle.backgroundImage}
          resizeMode="contain"
        />
      </Container>
      <LanguageModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default Login;
