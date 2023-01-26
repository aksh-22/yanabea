import React from 'react';
import {Text, View} from 'react-native';
import Logo from 'src/assets/svg/logo.svg';
import CustomButton from '../CustomButton';
import {ModalStyle} from './Modal.style';

type Props = {
  heading?: string;
  loading?: boolean;
  rightBtn?: string;
  rightBtnPress?: () => void;
  leftBtn?: string;
  leftBtnPress?: () => void;
};

const ConfirmBox = ({
  heading,
  loading,
  leftBtn,
  leftBtnPress,
  rightBtn,
  rightBtnPress,
}: Props) => {
  return (
    <View style={ModalStyle.box2}>
      <View style={ModalStyle.modalTop}>
        <View style={ModalStyle.logoWrapper}>
          <Logo height={40} width={40} />
        </View>
        <Text style={ModalStyle.heading}>{heading}</Text>
      </View>
      <View style={ModalStyle.modalBottom}>
        <CustomButton
          mainContentStyle={ModalStyle.btnStyle2}
          title={leftBtn}
          onPress={leftBtnPress}
          titleStyle={ModalStyle.titleStyle}
          mode="outlined"
        />
        <CustomButton
          loading={loading}
          mainContentStyle={ModalStyle.btnStyle2}
          title={rightBtn}
          onPress={rightBtnPress}
          titleStyle={ModalStyle.titleStyle}
        />
      </View>
    </View>
  );
};

export default ConfirmBox;
