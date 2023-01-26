import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Platform, View} from 'react-native';
import {Country} from 'react-native-country-picker-modal';
import {getCountry} from 'react-native-localize';
import {registerWarehouse} from 'src/api/authService';
import {getSupplierId} from 'src/api/otherService';
import Down from 'src/assets/svg/down.svg';
import CityModal from 'src/components/CityModal';
import Container from 'src/components/Container';
import CustomButton from 'src/components/CustomButton';
import CustomCountryPicker from 'src/components/CustomCountryPicker';
import CustomHeader from 'src/components/CustomHeader';
import CustomInput from 'src/components/CustomInput';
import {showMessage} from 'src/components/InfoModal';
import ListModal from 'src/components/ListModal';
import {AuthRouteName} from 'src/constants/routeName';
import {AuthStackParamList} from 'src/routes/types/navigation';
import {supplierDataType} from 'typings/supplier-data-type';
import {AuthStyle} from './Auth.style';

const SignUp = ({navigation}: NativeStackScreenProps<AuthStackParamList>) => {
  const [name, setName] = useState(__DEV__ ? 'Aksh pvt ltd' : '');
  const [nameError, setNameError] = useState(false);

  const [email, setEmail] = useState(__DEV__ ? 'aksh@yanabea.ocm' : '');
  const [emailError, setEmailError] = useState(false);

  const [supplierId, setSupplierId] = useState<supplierDataType>(
    __DEV__
      ? {
          id: 2,
          company_name: 'Yanabea',
          country: 2,
          city: 23,
          email: 'test@yanabea.com',
          contact_no: '5534242344',
          capacity: '1000',
          price_delivery_mosque: 56,
          price_erwaa_warehouse: 67,
          price_storage: 98111,
          created_at: '2019-11-29 13:14:30',
          updated_at: '2020-02-18 06:22:56',
        }
      : null,
  );
  const [supplierIdError, setSupplierIdError] = useState(false);

  const [phone, setPhone] = useState(__DEV__ ? '7976076770' : '');
  const [phoneError, setPhoneError] = useState(false);

  const [nationality, setNationality] = useState(__DEV__ ? 'Indian' : '');
  const [nationalityError, setNationalityError] = useState(false);

  const [city, setCity] = useState<cityDataItemType>(
    __DEV__
      ? {
          id: 64,
          name: 'Al Rayyan',
          country_id: 5,
          latitude: '25.2862',
          longitude: '51.4204',
        }
      : null,
  );
  const [cityError, setCityError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [country, setCountry] = useState<Country>();

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleList, setIsVisibleList] = useState(false);

  const {t} = useTranslation();

  const onLoginPress = () => {
    if (!name) {
      setNameError(true);
    } else if (!email) {
      setEmailError(true);
    } else if (!phone) {
      setPhoneError(true);
    } else if (!supplierId) {
      setSupplierIdError(true);
    } else if (!city) {
      setCityError(true);
    } else if (!nationality) {
      setNationalityError(true);
    } else {
      onRegister();
    }
  };

  const onRegister = async () => {
    setLoading(true);

    const data = {
      name,
      country_code: `+${country?.callingCode[0]}`,
      mobile_number: phone,
      city_id: city?.id,
      country_id: city?.country_id,
      nationality,
      device_type: Platform.OS,
      password: '',
      image: '',
      fcm_token: '',
      symbol: country?.cca2 ?? getCountry(),
      email,
      supplier_id: supplierId.id,
    };
    await registerWarehouse(data)
      .then(() => {
        navigation.navigate(AuthRouteName.LOGIN);
        showMessage({
          isVisible: true,
          message: t('auth:registered'),
          modalType: 'Success',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Container barStyle="dark-content">
        <CustomHeader heading={t('auth:become')} />
        <View style={AuthStyle.contentWrapper}>
          <CustomInput
            label={t('auth:fullName')}
            onChangeText={txt => {
              setNameError(false);
              setName(txt);
            }}
            value={name}
            containerStyle={AuthStyle.input}
            error={nameError}
          />
          <CustomInput
            label={t('auth:email')}
            onChangeText={txt => {
              setEmailError(false);
              setEmail(txt);
            }}
            value={email}
            containerStyle={AuthStyle.input}
            error={emailError}
          />
          <View style={AuthStyle.phoneWrapper}>
            <CustomCountryPicker
              style={AuthStyle.countryPicker}
              countryCode={country?.cca2 ?? getCountry()}
              onChange={countryData => {
                setCountry(countryData);
              }}
              onLoad={countryData => {
                setCountry(countryData);
              }}
            />
            <CustomInput
              label={t('auth:phone')}
              onChangeText={txt => {
                setPhoneError(false);
                setPhone(txt);
              }}
              value={phone}
              containerStyle={AuthStyle.phoneInput}
              error={phoneError}
              keyBoardType="decimal-pad"
            />
          </View>
          <CustomInput
            label={t('auth:supplierId')}
            value={supplierId?.company_name}
            containerStyle={AuthStyle.input}
            error={supplierIdError}
            rightIcon={<Down />}
            editable={false}
            onPress={() => setIsVisibleList(true)}
          />
          <CustomInput
            label={t('auth:city')}
            value={city?.name}
            containerStyle={AuthStyle.input}
            error={cityError}
            rightIcon={<Down />}
            editable={false}
            onPress={() => setIsVisible(true)}
          />
          <CustomInput
            label={t('auth:nationality')}
            onChangeText={txt => {
              setNationalityError(false);
              setNationality(txt);
            }}
            value={nationality}
            containerStyle={AuthStyle.input}
            error={nationalityError}
          />
          <CustomButton
            mainContentStyle={AuthStyle.button}
            loading={loading}
            onPress={onLoginPress}
            mode="contained"
            title={t('auth:submit')}
          />
        </View>
        <Image
          source={require('src/assets/img/bg2.png')}
          style={AuthStyle.backgroundImage}
          resizeMode="contain"
        />
      </Container>
      {isVisible && (
        <CityModal
          isVisible={isVisible}
          onClose={cityData => {
            setCityError(false);
            setCity(cityData);
            setIsVisible(false);
          }}
          selectedCityData={city}
        />
      )}
      {isVisibleList && (
        <ListModal
          heading={t('other:selectSupplier')}
          api={getSupplierId}
          name="company_name"
          isVisible={isVisibleList}
          onClose={listData => {
            setSupplierIdError(false);
            setSupplierId(listData);
            setIsVisibleList(false);
          }}
          selectedListData={supplierId}
        />
      )}
    </>
  );
};

export default SignUp;
