import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {SCREEN_HEIGHT} from 'src/constants/deviceInfo';
import RadioButton from '../RadioButton';
import {ReportStyle} from './ReportFilter.style';

type Props = {
  isVisible?: boolean;
  onClose?: () => void;
  onChange?: (selected?: number) => void;
  selectedTab?: number;
};

const ReportFilterModal = ({
  isVisible,
  onClose,
  selectedTab,
  onChange,
}: Props) => {
  const {t} = useTranslation();

  return (
    <Modal
      isVisible={isVisible}
      propagateSwipe
      onSwipeComplete={onClose}
      swipeDirection={'down'}
      onDismiss={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      hasBackdrop
      scrollOffset={0}
      deviceHeight={SCREEN_HEIGHT}>
      <View style={ReportStyle.container}>
        <View onStartShouldSetResponder={() => true}>
          <RadioButton
            isChecked={selectedTab === 1}
            onPress={() => onChange(1)}
            title={t('drawer:report.perDate')}
          />
          <RadioButton
            isChecked={selectedTab === 2}
            onPress={() => onChange(2)}
            title={t('drawer:report.perMonth')}
          />
          <RadioButton
            isChecked={selectedTab === 3}
            onPress={() => onChange(3)}
            title={t('drawer:report.range')}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ReportFilterModal;
