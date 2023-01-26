/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useState} from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import colors from 'src/constants/colors';
import {SCREEN_HEIGHT} from 'src/constants/deviceInfo';
import CustomButton from '../CustomButton';
import {ReportStyle} from './ReportFilter.style';

type Props = {
  value?: any;
  mode?: 'date' | 'time' | 'datetime';
  show?: boolean;
  is24Hour?: boolean;
  onClose: (value: any) => void;
  onCancel: () => void;
  minDate?: any;
};

const Date = ({
  minDate,
  show,
  onClose,
  mode,
  is24Hour,
  onCancel,
  value,
}: Props) => {
  const [date, setDate] = useState<any>({
    date: value?.date ?? moment().toDate(),
  });

  const onCloseModal = () => {
    onClose(date);
  };

  return (
    <Modal
      isVisible={show}
      swipeDirection={['down']}
      propagateSwipe
      statusBarTranslucent
      deviceHeight={SCREEN_HEIGHT}
      style={{flexDirection: 'row'}}>
      <View style={ReportStyle.modalStyle}>
        <DatePicker
          minimumDate={minDate}
          maximumDate={moment().toDate()}
          androidVariant="iosClone"
          mode={mode ?? 'date'}
          is24hourSource="locale"
          locale={is24Hour ? 'en-GB' : 'en'}
          textColor={colors.defaultBlack}
          date={date?.date}
          onCancel={onCloseModal}
          onDateChange={d => {
            setDate({date: d});
          }}
        />
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

export default Date;
