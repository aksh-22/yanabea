/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Linking,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from 'src/constants/colors';
import {commonStyles} from 'src/constants/common.style';
import ConfirmationModal from '../ConfirmationModal';
import {showMessage} from '../InfoModal';
import {CustomImagePickerStyle} from './CustomImagePicker.style';

export type ImagePicker_Type = Array<{
  height: number;
  mime: string;
  modificationDate: number;
  path: string;
  size: number;
  width: number;
}>;

type IProps = {
  // value?: Date;
  isVisible?: boolean;
  onChange: (value: ImageOrVideo | ImagePicker_Type) => void;
  onClose: () => void;
  pickerOption?: {
    multiple?: boolean;
    maxFiles?: number;
    cropping?: boolean;
    mediaType?: 'any' | 'photo' | 'video';
    compressImageQuality?: number;
    compressImageMaxWidth?: number;
    compressImageMaxHeight?: number;
    height?: number;
    width?: number;
  };
  supportType?: 'image' | 'video' | 'default';
};

const CustomImagePicker = ({
  isVisible,
  onClose,
  pickerOption,
  onChange,
  supportType,
}: IProps) => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [permissionType, setPermissionType] = useState('');
  //   const [isModalOpen, setIsModalOpen] = useState(false);

  const {t} = useTranslation();

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);

    if (status === 'never_ask_again') {
      setOpenConfirmationModal(true);
      onClose();
    }

    return status === 'granted';
  }

  const galleryOpen = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    ImagePicker.openPicker({
      multiple: pickerOption?.multiple,
      maxFiles: pickerOption?.maxFiles,
      cropping: pickerOption?.cropping,
      mediaType: pickerOption?.mediaType ?? 'any',
      compressImageQuality: pickerOption?.compressImageQuality ?? 1,

      compressImageMaxHeight: pickerOption?.compressImageMaxHeight,
      compressImageMaxWidth: pickerOption?.compressImageMaxWidth,
      height: pickerOption?.height ?? 1000,
      width: pickerOption?.width ?? 1000,
    })
      .then(res => {
        onGetFile(res);
      })
      .catch(err => {
        console.error('error on Open Image Picker', err);
        if (err.code === 'E_NO_LIBRARY_PERMISSION') {
          setPermissionType('gallery');
          setOpenConfirmationModal(true);
        }
      });
  };

  const cameraOpen = () => {
    ImagePicker.openCamera({
      height: pickerOption?.height ?? 1000,
      width: pickerOption?.width ?? 1000,
      cropping: pickerOption?.cropping,
      multiple: pickerOption?.multiple,
      mediaType: pickerOption?.mediaType ?? 'any',
      compressImageQuality: pickerOption?.compressImageQuality ?? 1,
      compressImageMaxHeight: pickerOption?.compressImageMaxHeight,
      compressImageMaxWidth: pickerOption?.compressImageMaxWidth,
    })
      .then(res => onGetFile(res))
      .catch(async err => {
        console.error('Image Picker Cancelled', err);
        if (err.code === 'E_NO_CAMERA_PERMISSION') {
          setPermissionType('camera');
          setOpenConfirmationModal(true);
          onClose();
        }
      });
  };

  const onGetFile = (res: any) => {
    let isArray = Array.isArray(res);
    if (!supportType) {
      if (isArray) {
        onChange(res);
        onClose();
        return;
      } else {
        onChange([res]);
        onClose();
        return;
      }
    }
    if (isArray) {
      let error = res?.find(
        (item: ImageOrVideo) => !item?.mime.includes(supportType),
      );
      if (error) {
        return showMessage({
          isVisible: true,
          message: `Please select only ${supportType} file.`,
        });
      }
    } else {
      if (!res?.mime.includes(supportType)) {
        return showMessage({
          isVisible: true,
          message: `Please select only ${supportType} file.`,
        });
      }
    }

    if (isArray) {
      onChange(res);
    } else {
      onChange([res]);
    }
    onClose();
  };
  return (
    <>
      <Modal
        isVisible={isVisible}
        onSwipeComplete={onClose}
        swipeDirection={'down'}
        onDismiss={onClose}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        hasBackdrop>
        <View
          style={{
            minHeight: 180,
            justifyContent: 'center',
            backgroundColor: colors.defaultWhite,
            borderRadius: 10,
          }}>
          <View style={[commonStyles.directionRow, {alignSelf: 'center'}]}>
            <TouchableOpacity
              style={CustomImagePickerStyle.button}
              onPress={cameraOpen}>
              <View style={CustomImagePickerStyle.iconContainer}>
                <Icon name="ios-camera" size={28} color={colors.primaryColor} />
              </View>
              <Text style={CustomImagePickerStyle.textStyle}>
                {t('drawer:profile.openCamera')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={CustomImagePickerStyle.button}
              onPress={galleryOpen}>
              <View style={CustomImagePickerStyle.iconContainer}>
                <Icon name="ios-images" size={28} color={colors.primaryColor} />
              </View>
              <Text style={CustomImagePickerStyle.textStyle}>
                {t('drawer:profile.openGallery')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ConfirmationModal
        isOpen={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        heading="Permission Required!"
        title={`Secret potion would like to access your ${permissionType}`}
        submitButtonText="Settings"
        onPress={() =>
          Linking.openSettings().then(() => setOpenConfirmationModal(false))
        }
      />
    </>
  );
};

export default CustomImagePicker;
