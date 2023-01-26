import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {stockCountData} from 'src/api/home.service';
import LanguageIcon from 'src/assets/svg/language.svg';
import Container from 'src/components/Container';
import CustomButton from 'src/components/CustomButton';
import LanguageModal from 'src/components/messageModal/LanguageModal';
import colors from 'src/constants/colors';
import {RootRouteName} from 'src/constants/routeName';
import {useAppSelector} from 'src/hooks/reducer';
import {dateFormatForClient} from 'src/utils/dateFormatter';
import {loginDataType} from 'typings/login-data-type';
import {stockDataType} from 'typings/stock-data-type';
import {HomeStyles} from './Home.style';
type Props = {
  navigation?: any;
};

const Home = ({navigation}: Props) => {
  const [showModal, setShowModal] = useState(false);

  const [stockData, setStockData] = useState<stockDataType>({});

  const [loading, setLoading] = useState(false);

  const [refreshLoading, setRefreshLoading] = useState(false);

  const userData: loginDataType = useAppSelector(
    state => state?.userReducer?.user,
  );

  const {t} = useTranslation();

  const navigateTOScanner = () => {
    navigation.navigate(RootRouteName.SCANNER);
  };

  useEffect(() => {
    setLoading(true);
    getStockData();
  }, []);

  const onRefresh = () => {
    setRefreshLoading(true);
    getStockData();
  };

  const getStockData = async () => {
    stockCountData()
      .then(res => {
        setStockData(res.data);
      })
      .finally(() => {
        setLoading(false);
        setRefreshLoading(false);
      });
  };

  return (
    <>
      <Container
        onRefresh={onRefresh}
        refreshLoading={refreshLoading}
        barStyle="dark-content"
        statusBarColor={colors.defaultWhite}>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={HomeStyles.language}>
          <LanguageIcon height={30} width={30} />
        </TouchableOpacity>
        <Text style={HomeStyles.headingStyle}>{userData?.name}</Text>
        <View style={HomeStyles.upperWrapper}>
          <View style={HomeStyles.circleUpperText}>
            <LinearGradient
              style={HomeStyles.linearGradient}
              start={{x: 0.3, y: 0.95}}
              end={{x: 0.9, y: 1.2}}
              locations={[0, 0.5, 0.6]}
              colors={[colors.defaultWhite, colors.green, colors.green]}>
              <View style={HomeStyles.circleText}>
                {loading ? (
                  <ActivityIndicator color={colors.defaultWhite} size="large" />
                ) : (
                  <>
                    <Text style={HomeStyles.stockText}>
                      {Number(stockData?.carton_avail) +
                        Number(stockData?.chiller_avail)}
                    </Text>
                    <Text style={HomeStyles.stockText2}>
                      {t('home:currentStock')}
                    </Text>
                  </>
                )}
              </View>
            </LinearGradient>
          </View>
          <View style={HomeStyles.textArea}>
            {loading ? (
              <ActivityIndicator color={colors.green} size="large" />
            ) : (
              <>
                <Text style={HomeStyles.updateText}>
                  {t('home:cartonLastUpdate')}
                </Text>
                <Text style={HomeStyles.updateText}>
                  {!stockData?.carton_last_scan ? (
                    <Text style={{color: colors.red}}>
                      {t('home:notScannerYet')}
                    </Text>
                  ) : (
                    dateFormatForClient(stockData?.carton_last_scan)
                  )}
                </Text>
                <Text style={[HomeStyles.updateText, {marginTop: 10}]}>
                  {t('home:chillerLastUpdate')}
                </Text>
                <Text style={HomeStyles.updateText}>
                  {!stockData?.chiller_last_scan ? (
                    <Text style={{color: colors.red}}>
                      {t('home:notScannerYet')}
                    </Text>
                  ) : (
                    dateFormatForClient(stockData?.chiller_last_scan)
                  )}
                </Text>
              </>
            )}
          </View>
        </View>

        <Image
          style={HomeStyles.image}
          source={require('src/assets/img/home.png')}
        />
        <View style={HomeStyles.content}>
          <CustomButton
            mainContentStyle={HomeStyles.scanButton}
            onPress={navigateTOScanner}
            mode="contained"
            title={t('home:scan')}
          />
        </View>
      </Container>
      <LanguageModal
        isVisible={showModal}
        onClose={() => {
          setShowModal(false);
          Platform.OS === 'android' &&
            StatusBar.setBackgroundColor(colors.defaultWhite);
        }}
      />
    </>
  );
};

export default Home;
