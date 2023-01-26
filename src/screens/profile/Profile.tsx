import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, View} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {logout, profileEdit, profileGet} from 'src/api/authService';
import CityModal from 'src/components/CityModal';
import Container from 'src/components/Container';
import CustomButton from 'src/components/CustomButton';
import CustomCountryPicker from 'src/components/CustomCountryPicker';
import CustomHeader from 'src/components/CustomHeader';
import CustomImagePicker from 'src/components/customImagePicker/CustomImagePicker';
import CustomInput from 'src/components/CustomInput';
import ImageComponent from 'src/components/ImageComponent';
import {showMessage} from 'src/components/InfoModal';
import ConfirmationModal from 'src/components/messageModal/ConfirmationModal';
import colors from 'src/constants/colors';
import {useAppDispatch, useAppSelector} from 'src/hooks/reducer';
import {updateUser} from 'src/redux/reducer/userReducer';
import {loginDataType} from 'typings/login-data-type';
import {AuthStyle} from '../auth/Auth.style';
import {ProfileStyle} from './Profile.style';

type Props = {};

const Profile = ({}: Props) => {
  const {t} = useTranslation();

  const userData: loginDataType = useAppSelector(
    state => state?.userReducer?.user,
  );

  const [user, setUser] = useState(userData);

  const [name, setName] = useState(user?.name ?? '');
  const [nameError, setNameError] = useState(false);

  const [phone, setPhone] = useState(user?.mobile_number ?? '');
  const [phoneError, setPhoneError] = useState(false);

  const [nationality, setNationality] = useState(user?.nationality ?? '');
  const [nationalityError, setNationalityError] = useState(false);

  const [city, setCity] = useState<cityDataItemType>({name: user?.city_name});
  const [cityError, setCityError] = useState(false);

  const [refreshLoading, setRefreshLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logOutLoading, setLogoutLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [showMediaModal, setShowMediaModal] = useState(false);
  const [attachments, setAttachments] = useState(null);

  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useAppDispatch();

  const [isEdit, setIsEdit] = useState(false);

  const onLogOutPress = () => {
    setShowModal(true);
  };

  const onBtnPress = () => {
    if (isEdit) {
      onSavePress();
    } else {
      setIsEdit(true);
    }
  };

  const rightBtnPress = async () => {
    setLogoutLoading(true);
    await logout().finally(() => {
      setLogoutLoading(false);
      setShowModal(false);
      dispatch(updateUser({}));
    });
  };
  const leftBtnPress = () => {
    setShowModal(false);
  };

  const onSavePress = () => {
    if (!name) {
      setNameError(true);
    } else if (!phone) {
      setPhoneError(true);
    } else if (!city) {
      setCityError(true);
    } else if (!nationality) {
      setNationalityError(true);
    } else {
      onSave();
    }
  };

  const onSave = async () => {
    setLoading(true);

    const fd = new FormData();

    fd.append('name', name);
    fd.append('nationality', nationality);

    if (attachments?.mime) {
      attachments?.mime &&
        fd.append('profile_image', {
          name: 'image',
          type: attachments?.mime,
          uri:
            Platform.OS === 'android'
              ? attachments?.path
              : attachments?.path.replace('file://', ''),
        });
    }

    await profileEdit(fd)
      .then(res => {
        dispatch(updateUser({...userData, ...res.data}));
        showMessage({
          isVisible: true,
          message: t('drawer:profile.profileUpdate'),
          modalType: 'Success',
        });
      })
      .then(() => {
        setIsEdit(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onRefresh = () => {
    setRefreshLoading(true);
    getProfile();
  };

  const getProfile = async () => {
    await profileGet()
      .then(res => {
        dispatch(updateUser({...userData, ...res.data}));
        setUser(res?.data);
      })
      .finally(() => {
        setRefreshLoading(false);
      });
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {showModal && (
        <ConfirmationModal
          heading={t('drawer:profile.logout')}
          leftBtn={t('drawer:profile.no')}
          rightBtn={t('drawer:profile.yes')}
          leftBtnPress={leftBtnPress}
          rightBtnPress={rightBtnPress}
          loading={logOutLoading}
        />
      )}
      <Container
        onRefresh={onRefresh}
        refreshLoading={refreshLoading}
        statusBarColor={colors.primaryColor}>
        <CustomHeader
          iconColor={colors.defaultWhite}
          heading={t('drawer:profile.profile')}
          containerStyle={ProfileStyle.header}
          headingStyle={ProfileStyle.headingHeader}
        />
        <View style={ProfileStyle.container}>
          <ImageComponent
            disabled={!isEdit}
            onPress={() => setShowMediaModal(true)}
            viewStyle={ProfileStyle.imageBackground}
            uri={attachments?.mime ? attachments?.path : user?.image}
          />
          <CustomCountryPicker disabled={true} countryCode={user?.symbol} />
          <CustomInput
            editable={isEdit}
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
            label={t('auth:phone')}
            editable={false}
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
            editable={false}
            label={t('auth:nationality')}
            onChangeText={txt => {
              setNationalityError(false);
              setNationality(txt);
            }}
            value={nationality}
            containerStyle={AuthStyle.input}
            error={nationalityError}
          />
          <CustomInput
            editable={false}
            label={t('auth:city')}
            value={city?.name}
            containerStyle={AuthStyle.input}
            error={cityError}
            // rightIcon={<Down />}
            // onPress={() => setIsVisible(true)}
          />
          <CustomButton
            mainContentStyle={AuthStyle.button}
            loading={loading}
            onPress={onBtnPress}
            mode="contained"
            title={isEdit ? t('drawer:profile.done') : t('drawer:profile.edit')}
          />

          <CustomButton
            mainContentStyle={AuthStyle.textButton}
            onPress={onLogOutPress}
            mode="text"
            title={t('drawer:profile.signOut')}
          />
        </View>
      </Container>
      <CustomImagePicker
        isVisible={showMediaModal}
        onClose={() => setShowMediaModal(false)}
        onChange={(res: ImageOrVideo | any) => {
          const a = {...res[0]};
          setAttachments({...a});
        }}
      />
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
    </>
  );
};

export default Profile;
