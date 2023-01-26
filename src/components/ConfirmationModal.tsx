/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import colors from 'src/constants/colors';
import {commonStyles} from 'src/constants/common.style';
import {fonts} from 'src/constants/fonts';
import CustomButton from './CustomButton';

type TConfirmationModal = {
  isOpen: boolean;
  onClose?: () => void;
  heading: string;
  title: string;
  submitButtonText: string;
  onPress?: () => void;
  isLoading?: boolean;
};

const ConfirmationModal = ({
  isOpen,
  onClose,
  heading,
  title,
  submitButtonText,
  onPress,
  isLoading,
}: TConfirmationModal) => {
  return (
    <Modal
      hasBackdrop
      isVisible={isOpen}
      swipeDirection={['down']}
      onSwipeComplete={onClose}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      // useNativeDriver={true}
      useNativeDriverForBackdrop
      backdropColor={colors.primaryColor}
      style={{zIndex: 1000}}>
      <View
        style={{
          marginHorizontal: 10,
          minHeight: 170,
          maxHeight: 400,
          padding: 20,
          backgroundColor: colors.defaultWhite,
          borderRadius: 13,
        }}>
        {heading ? (
          <View style={[commonStyles.center]}>
            <Text style={[commonStyles.heading]}>{heading}</Text>
          </View>
        ) : null}
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: 17,
            paddingTop: 15,
            textAlign: 'center',
            color: colors.defaultBlack,
          }}>
          {title}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <CustomButton
            onPress={onClose}
            title="Cancel"
            // style={{ height: 50, marginTop: 20, width: 130 }}
          />
          <CustomButton
            mode="contained"
            onPress={() => {
              onPress ? onPress() : console.debug('onPress undefined');
            }}
            loading={isLoading}
            title={submitButtonText}
            // style={{ height: 50, marginTop: 20, width: 130 }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
