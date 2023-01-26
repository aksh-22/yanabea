/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {getCities} from 'src/api/otherService';
import {cities} from 'src/constants/cityList';
import colors from 'src/constants/colors';
import {SCREEN_HEIGHT} from 'src/constants/deviceInfo';
import {fonts} from 'src/constants/fonts';
import CheckBox from './CheckBox';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';

type Props = {
  isVisible?: boolean;
  onClose?: (selectedCity: cityDataItemType) => void;
  selectedCityData: cityDataItemType;
};

type FLProps = {
  item: cityDataItemType;
  index: number;
};

const CityModal = ({isVisible, onClose, selectedCityData}: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const [cityList, setCityList] = useState(cities);

  const [searchList, setSearchList] = useState(cities);

  const [searchText, setSearchText] = useState('');

  const [selectedCity, setSelectedCity] =
    useState<cityDataItemType>(selectedCityData);

  const {t} = useTranslation();

  const getCitiesData = async () => {
    setIsLoading(true);
    const res = await getCities().finally(() => {
      setIsLoading(false);
    });
    setCityList(res.data);
    setSearchList(res?.data);
  };

  const renderItem = ({item, index}: FLProps) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => setSelectedCity(item)}
        style={styles.item}>
        <Text style={styles.itemText}>{item?.name}</Text>
        <CheckBox
          onPress={() => setSelectedCity(item)}
          isChecked={item?.id === selectedCity?.id}
        />
      </TouchableOpacity>
    );
  };

  const onSearch = name => {
    setSearchText(name);
    const temp = cityList.filter(el => el.name.includes(name));
    setSearchList(temp);
  };

  useEffect(() => {
    setTimeout(() => {
      getCitiesData();
    }, 500);
  }, []);

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={() => onClose(selectedCity)}
      swipeDirection={'down'}
      onDismiss={() => onClose(selectedCity)}
      onBackdropPress={() => onClose(selectedCity)}
      onBackButtonPress={() => onClose(selectedCity)}
      deviceHeight={SCREEN_HEIGHT}
      style={styles.modal}
      propagateSwipe
      hasBackdrop>
      <View style={styles.View}>
        <Text style={styles.heading}>{t('other:selectCity')}</Text>
        <CustomInput
          containerStyle={{
            height: 40,
            margin: 10,
          }}
          // inputStyle={{backgroundColor: 'green', height: 40, marginTop: 0}}
          value={searchText}
          onChangeText={onSearch}
          placeholder={t('auth:search')}
        />
        <FlatList
          data={searchList}
          renderItem={renderItem}
          style={styles.View}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 80}}
          ListEmptyComponent={
            <View style={styles.component}>
              {isLoading ? (
                <ActivityIndicator size={50} color={colors.primaryColor} />
              ) : (
                <Text style={styles.heading}>{t('auth:noCity')}</Text>
              )}
            </View>
          }
        />
        <CustomButton
          title={t('other:select')}
          mainContentStyle={styles.button}
          onPress={() => onClose(selectedCity)}
        />
      </View>
    </Modal>
  );
};

export default CityModal;

const styles = StyleSheet.create({
  modal: {
    marginVertical: 40,
    borderRadius: 10,
    overflow: 'hidden',
  },
  View: {
    flex: 1,
    backgroundColor: colors.defaultWhite,
  },
  heading: {
    fontFamily: fonts.regular,
    textAlign: 'center',
    color: colors.defaultBlack,
    marginTop: 20,
    fontSize: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    marginHorizontal: 20,
  },
  itemText: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.defaultBlack,
  },
  component: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 20,
    alignSelf: 'center',
  },
});
