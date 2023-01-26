import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import CountryPicker, {Country} from 'react-native-country-picker-modal';
import {loadDataAsync} from 'react-native-country-picker-modal/lib/CountryService';
import Down from 'src/assets/svg/down.svg';
import colors from 'src/constants/colors';
import {fonts} from 'src/constants/fonts';

type Props = {
  countryCode?: any;
  onChange?: (country: Country) => void;
  onLoad?: (country: Country) => void;
  style?: ViewStyle;
  disabled?: boolean;
};

const CustomCountryPicker = ({
  countryCode,
  onChange,
  onLoad,
  style,
  disabled,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const getCode = async () => {
    const res3 = await loadDataAsync();
    return res3[countryCode];
  };

  useEffect(() => {
    getCode().then(res => {
      onLoad && onLoad(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          setIsVisible(true);
        }}
        style={[styles.view, style]}>
        {disabled && <View style={styles.cover} />}
        <CountryPicker
          withModal
          countryCode={countryCode}
          withFilter={true}
          withCallingCode
          theme={styles.phone}
          visible={isVisible}
          onSelect={onChange}
          withCallingCodeButton
          onClose={() => {
            setIsVisible(false);
          }}
          onOpen={() => {
            setIsVisible(true);
          }}
        />
        <Down style={styles.icon} />
      </TouchableOpacity>
    </>
  );
};

export default CustomCountryPicker;

const styles = StyleSheet.create({
  view: {
    borderWidth: 1,
    borderColor: colors.primaryColor,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  phone: {
    primaryColor: colors.defaultBlack,
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 18,
  },
  cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});
