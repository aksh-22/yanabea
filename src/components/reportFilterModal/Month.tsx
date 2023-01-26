/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useState} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {SCREEN_HEIGHT} from 'src/constants/deviceInfo';
import CustomButton from '../CustomButton';
import {ReportStyle} from './ReportFilter.style';

// import {Picker} from 'react-native-wheel-pick';
import Picker from 'react-native-animated-wheel-picker';
import colors from 'src/constants/colors';

type Props = {
  value?: any;
  mode?: 'date' | 'time' | 'datetime';
  show?: boolean;
  is24Hour?: boolean;
  onClose: (value: any) => void;
  onCancel: () => void;
  minDate?: any;
};

const year = Array.from(Array(new Date().getFullYear() - 1949), (_, i) =>
  (i + 1950).toString(),
).map(el => ({title: el, value: el}));

const months = moment.months().map(el => ({title: el, value: el}));

const itemHeight = 40;

const visible = 5;

const Month = ({show, onClose, onCancel, value}: Props) => {
  const [date, setDate] = useState<any>({
    month: value?.month ?? moment().format('MMMM'),
    year: value?.year ?? moment().format('YYYY'),
  });

  const index1 = months.findIndex(el => el.value === date.month);
  const index2 = year.findIndex(el => el.value === date.year);

  const onCloseModal = () => {
    onClose(date);
  };

  const onValueChange = (m, y) => {
    if (m) {
      setDate(prev => {
        return {...prev, month: m};
      });
    }
    if (y) {
      setDate(prev => {
        return {...prev, year: y};
      });
    }
  };

  const MaskedView = () => {
    return (
      <>
        <View
          style={{
            height: itemHeight * Math.trunc(visible / 2),
            backgroundColor: colors.lightBlack,
          }}
        />
        <View
          style={{
            height: itemHeight,
            backgroundColor: colors.defaultBlack,
            borderWidth: 1,
            borderColor: colors.defaultBlack,
          }}
        />
        <View
          style={{
            height: itemHeight * Math.trunc(visible / 2),
            backgroundColor: colors.lightBlack,
          }}
        />
      </>
    );
  };

  return (
    <Modal
      isVisible={show}
      // swipeDirection={['down']}
      propagateSwipe
      statusBarTranslucent
      deviceHeight={SCREEN_HEIGHT}
      style={{flexDirection: 'row'}}>
      <View style={ReportStyle.modalStyle}>
        <View style={ReportStyle.monthPickerWrapper}>
          <Picker
            pickerData={months}
            onSelected={value1 => {
              onValueChange(value1.value, null);
            }}
            visible={5}
            textStyle={ReportStyle.text}
            itemHeight={itemHeight}
            maskedComponents={<MaskedView />}
            initialIndex={index1}
          />
          <Picker
            itemHeight={itemHeight}
            textStyle={ReportStyle.text}
            initialIndex={index2}
            pickerData={year}
            onSelected={value1 => {
              onValueChange(null, value1.value);
            }}
            maskedComponents={<MaskedView />}
          />
        </View>

        <View style={ReportStyle.buttonContainer}>
          <CustomButton
            onPress={onCancel}
            mainContentStyle={ReportStyle.buttonStyle}
            title="Cancel"
            mode="outlined"
          />
          <CustomButton
            onPress={onCloseModal}
            mainContentStyle={ReportStyle.buttonStyle}
            title="Select"
          />
        </View>
      </View>
    </Modal>
  );
};

export default Month;
