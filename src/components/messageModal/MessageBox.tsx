import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import Check from 'src/assets/svg/check.svg';
import Close from 'src/assets/svg/close.svg';
import colors from 'src/constants/colors';
import CustomButton from '../CustomButton';
import {ModalStyle} from './Modal.style';

type Props = {
  type?: 'success' | 'error';
  heading?: string;
  buttonTitle?: string;
  onPress?: () => void;
  loading?: boolean;
};

const typeData = {
  error: {
    color: colors.red,
    icon: <Close />,
  },
  success: {
    color: colors.green,
    icon: <Check />,
  },
};

const MessageBox = ({
  type = 'success',
  buttonTitle,
  heading,
  onPress,
  loading,
}: Props) => {
  return (
    <View style={ModalStyle.box}>
      {loading ? (
        <ActivityIndicator color={colors.primaryColor} size={50} />
      ) : (
        <>
          <View
            style={[
              ModalStyle.iconWrapper,
              {backgroundColor: typeData[type].color},
            ]}>
            {typeData[type].icon}
          </View>
          {heading ? <Text style={ModalStyle.heading}>{heading}</Text> : null}
          {onPress ? (
            <CustomButton
              mainContentStyle={ModalStyle.btnStyle}
              title={buttonTitle}
              onPress={onPress}
              titleStyle={ModalStyle.titleStyle}
            />
          ) : null}
        </>
      )}
    </View>
  );
};

export default MessageBox;
