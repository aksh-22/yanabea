/* eslint-disable react-hooks/exhaustive-deps */
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
import {cities} from 'src/constants/cityList';
import colors from 'src/constants/colors';
import {SCREEN_HEIGHT} from 'src/constants/deviceInfo';
import {fonts} from 'src/constants/fonts';
import CheckBox from './CheckBox';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';

type Props = {
  isVisible?: boolean;
  onClose?: (selectedListItem: any) => void;
  selectedListData: any;
  api: any;
  name: string;
  heading: string;
};

type FLProps = {
  item: any;
  index: number;
};

const ListModal = ({
  isVisible,
  onClose,
  selectedListData,
  api,
  name,
  heading,
}: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const [listData, setListData] = useState(null);

  const [searchList, setSearchList] = useState(null);

  const [searchText, setSearchText] = useState('');

  const [selectedListItem, setSelectedListItem] =
    useState<any>(selectedListData);

  const {t} = useTranslation();

  const getCitiesData = async () => {
    setIsLoading(true);
    const res = await api().finally(() => {
      setIsLoading(false);
    });
    setListData(res.data);
    setSearchList(res?.data);
  };

  const renderItem = ({item, index}: FLProps) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => setSelectedListItem(item)}
        style={styles.item}>
        <Text style={styles.itemText}>{item[name]}</Text>
        <CheckBox
          onPress={() => setSelectedListItem(item)}
          isChecked={item?.id === selectedListItem?.id}
        />
      </TouchableOpacity>
    );
  };

  const onSearch = nameVal => {
    setSearchText(nameVal);
    const temp = listData.filter(el => el[name].includes(nameVal));
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
      onSwipeComplete={() => onClose(selectedListItem)}
      swipeDirection={'down'}
      onDismiss={() => onClose(selectedListItem)}
      onBackdropPress={() => onClose(selectedListItem)}
      onBackButtonPress={() => onClose(selectedListItem)}
      deviceHeight={SCREEN_HEIGHT}
      style={styles.modal}
      propagateSwipe
      hasBackdrop>
      <View style={styles.View}>
        <Text style={styles.heading}>{heading}</Text>
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
          onPress={() => onClose(selectedListItem)}
        />
      </View>
    </Modal>
  );
};

export default ListModal;

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
