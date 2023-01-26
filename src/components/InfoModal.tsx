/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AnimatedLottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import colors from 'src/constants/colors';
import {commonStyles} from 'src/constants/common.style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from 'src/constants/deviceInfo';
import {fonts} from 'src/constants/fonts';

interface props {
  isVisible: boolean;
  message: string;
  message2?: string;
  modalType?: 'Error' | 'Success' | 'Info';
  image?: string;
}
export let showMessage = ({
  isVisible = false,
  message = '',
  modalType = 'Error',
  image = '',
  message2 = '',
}: props) => null;

export let showLoadingSpinner = ({isVisible = false, text = ''}) => null;

const InfoModal = ({children}: {children: any}) => {
  const [show, setShow] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageText2, setMessageText2] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  useEffect(() => {
    showMessage = ({
      isVisible = false,
      message = '',
      modalType = 'Error',
      image = '',
      message2 = '',
    }: props) => {
      setShow(isVisible);
      setMessageText(message);
      setType(modalType);
      setMessageText2(message2);
    };

    // showLoadingSpinner = ({ isVisible = false, text = '' }) => {
    //   setLoading(isVisible);
    //   setLoadingText(text);
    // };
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      {children}
      {show === true ? (
        <TouchableWithoutFeedback onPress={() => setShow(false)}>
          <View
            style={{
              height: SCREEN_HEIGHT,
              backgroundColor: colors.blackOpacity,
              width: SCREEN_WIDTH,
              position: 'absolute',
              justifyContent: 'center',
            }}>
            <View
              style={{
                padding: 20,
                alignSelf: 'center',

                maxHeight: 900,
                backgroundColor: colors.defaultWhite,
                width: SCREEN_WIDTH - 120,

                borderRadius: 13,
                ...commonStyles.shadow,
              }}>
              <View
                style={{
                  height: 70,
                  width: 70,

                  alignSelf: 'center',

                  marginTop: -15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {type === 'Error' ? (
                  <AnimatedLottieView
                    source={require('src/assets/lottie/errorExclamation.json')}
                    autoPlay
                    loop={true}
                    style={{
                      height: 50,
                      width: 50,
                      alignSelf: 'center',
                    }}
                  />
                ) : type === 'Success' ? (
                  <AnimatedLottieView
                    source={require('src/assets/lottie/success.json')}
                    autoPlay
                    loop={true}
                    style={{
                      height: 100,
                      width: 100,
                      alignSelf: 'center',
                    }}
                  />
                ) : (
                  <AnimatedLottieView
                    source={require('src/assets/lottie/infoLottie.json')}
                    autoPlay
                    loop={true}
                    style={{
                      height: 50,
                      width: 50,
                      alignSelf: 'center',
                    }}
                  />
                )}
              </View>

              <Text
                numberOfLines={15}
                style={{
                  fontSize: 16,
                  lineHeight: 20,
                  color: colors.defaultBlack,
                  textAlign: 'center',
                  paddingBottom: 10,
                  fontFamily: fonts.regular,
                }}>
                {messageText}
              </Text>

              {messageText2 ? (
                <Text
                  numberOfLines={15}
                  style={{
                    fontSize: 16,
                    lineHeight: 20,
                    color: colors.lightBlack,
                    textAlign: 'center',
                    paddingBottom: 10,
                    fontFamily: fonts.regular,
                  }}>
                  {messageText2}
                </Text>
              ) : null}
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  alignItems: 'center',
                  paddingTop: 7,
                  width: '100%',
                  borderTopWidth: StyleSheet.hairlineWidth,
                  borderColor: colors.linkWater,
                  marginBottom: -9,
                }}
                onPress={() => setShow(false)}>
                <Text
                  style={{
                    color:
                      type === 'Error'
                        ? colors.red
                        : type === 'Success'
                        ? colors.green
                        : colors?.Candlelight,
                    fontSize: 20,
                    fontFamily: fonts.regular,
                  }}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : null}

      {loading ? (
        <View
          style={{
            height: SCREEN_HEIGHT,
            backgroundColor: colors.lightBlack,
            width: SCREEN_WIDTH,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 70,
              flexDirection: 'row',
              borderRadius: 13,
              backgroundColor: colors.defaultWhite,
              width: '90%',
              // justifyContent: 'center',
              alignItems: 'center',
              ...commonStyles.shadow,
              shadowColor: colors.defaultBlack,
              paddingHorizontal: 20,
            }}>
            <ActivityIndicator size={'small'} color={colors.defaultBlack} />
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.regular,
                paddingStart: 10,
                color: colors.defaultBlack,
              }}>
              {loadingText ? loadingText : 'Loading'}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default InfoModal;

const styles = StyleSheet.create({});
