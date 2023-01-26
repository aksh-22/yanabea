/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
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

const Range = ({
  minDate,
  show,
  onClose,
  mode,
  is24Hour,
  onCancel,
  value,
}: Props) => {
  const [date, setDate] = useState<any>({
    startDate: value?.startDate ?? moment().subtract(1, 'd').toDate(),
    endDate: value?.endDate ?? moment().toDate(),
  });

  const {t} = useTranslation();

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
        <Text style={ReportStyle.calHeader}>
          {t('drawer:report.startDate')} :-
        </Text>
        <DatePicker
          minimumDate={minDate}
          maximumDate={moment(date?.endDate).subtract(1, 'd').toDate()}
          androidVariant="iosClone"
          mode={mode ?? 'date'}
          is24hourSource="locale"
          locale={is24Hour ? 'en-GB' : 'en'}
          textColor={colors.defaultBlack}
          date={date?.startDate}
          onCancel={onCloseModal}
          onDateChange={d => {
            setDate(prev => {
              return {
                ...prev,
                startDate: d,
              };
            });
          }}
        />
        <Text style={ReportStyle.calHeader}>
          {t('drawer:report.endDate')} :-
        </Text>
        <DatePicker
          minimumDate={moment(date?.startDate).add(1, 'd').toDate()}
          maximumDate={moment().toDate()}
          androidVariant="iosClone"
          mode={mode ?? 'date'}
          is24hourSource="locale"
          locale={is24Hour ? 'en-GB' : 'en'}
          textColor={colors.defaultBlack}
          date={date?.endDate ?? moment().toDate()}
          onCancel={onCloseModal}
          onDateChange={d => {
            setDate(prev => {
              return {
                ...prev,
                endDate: d,
              };
            });
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

export default Range;
