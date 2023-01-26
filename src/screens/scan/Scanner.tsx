/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {PermissionsAndroid, Platform, View} from 'react-native';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {getReportDataByQr} from 'src/api/report.service';
import CustomButton from 'src/components/CustomButton';
import MessageModal from 'src/components/messageModal/MessageModal';
import colors from 'src/constants/colors';
import {RootRouteName} from 'src/constants/routeName';
import NoAuthorizedView from './NoAuthorizedView';
import {ScannerStyle} from './Scanner.style';

type Props = {
  navigation?: any;
};

type MProps = {
  heading: string;
  type?: 'success' | 'error';
};

const Scanner = ({navigation}: Props) => {
  const {replace} = useNavigation<NativeStackNavigationProp<any>>();

  const [scanned, setScanned] = useState(false);

  const [scannedData, setScannedData] = useState<qrCodeScanDataType>({});

  const [showScanner, setShowScanner] = useState(false);

  const [loading, setLoading] = useState(false);

  const [markerColor, setMarkerColor] = useState('');

  const [modalData, setModalData] = useState<MProps>();

  const [showSettingPage, setShowSettingPage] = useState(false);

  const {t} = useTranslation();

  let qrRef = useRef(null);

  const onBackPress = () => {
    navigation.goBack();
  };

  const getReportDataById = async id => {
    const data = {
      qrcode_id: id,
    };
    await getReportDataByQr(data)
      .then(res => {
        if (!res?.data?.is_scanned) {
          setModalData({
            type: 'success',
            heading: t('scanner:success'),
          });
        } else {
          setModalData({
            type: 'error',
            heading: t('scanner:error'),
          });
        }
        setScannedData(res?.data);
        setScanned(true);
        setMarkerColor(colors.green);
      })
      .catch(err => {
        console.error('scanner 68', err);
        navigation.goBack();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSuccess = event => {
    console.log('event', JSON.stringify(event, null, 2));
    setLoading(true);
    // qrRef.current._handleBarCodeRead();
    getReportDataById(event?.data);

    // setTimeout(() => getReportDataById(), 1000);
  };

  useFocusEffect(
    React.useCallback(() => {
      setShowScanner(true);
      setScanned(false);
      checkPermission();
      return () => {
        setShowScanner(false);
        setScanned(false);
        setMarkerColor('');
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffect(() => {
    checkPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkPermission = async () => [
    Platform.OS === 'android' && !(await hasAndroidPermission()),
  ];

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.CAMERA;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    } else {
      setShowScanner(false);
    }

    const status = await PermissionsAndroid.request(permission);

    if (status === 'never_ask_again') {
      setShowSettingPage(true);
    }

    if (status === 'granted') {
      setShowSettingPage(false);
      setShowScanner(true);
    }

    return status === 'granted';
  }

  const onViewBtnPress = () => {
    replace(RootRouteName.QR_CODE_DETAILS, {scannedData});
  };

  return (
    <View style={ScannerStyle.view}>
      {scanned && (
        <MessageModal
          buttonTitle={t('scanner:viewDetails')}
          heading={modalData?.heading}
          type={modalData?.type}
          onPress={onViewBtnPress}
          loading={loading}
        />
      )}
      {showSettingPage && <NoAuthorizedView onBackPress={onBackPress} />}
      {showScanner && (
        <QRCodeScanner
          ref={qrRef}
          onRead={() => {
            console.log('first');
          }}
          permissionDialogTitle="test"
          notAuthorizedView={<NoAuthorizedView />}
          showMarker
          reactivate={true}
          // reactivateTimeout={1000}
          fadeIn
          markerStyle={{borderColor: markerColor}}
          cameraContainerStyle={{flex: Platform.OS === 'ios' ? 1 : undefined}}
          cameraStyle={{flex: 1}}
          containerStyle={{flex: 1}}
          topViewStyle={{flex: 1}}
          bottomContent={
            <CustomButton onPress={onBackPress} title={t('other:cancel')} />
          }
          cameraProps={{
            onBarCodeRead: event => {
              if (!scanned) {
                setScanned(true);
                onSuccess(event);
              }
            },
          }}
        />
      )}
    </View>
  );
};

export default Scanner;
