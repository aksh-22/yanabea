import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageResizeMode,
  ImageStyle,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import colors from 'src/constants/colors';

type Props = {
  source?: any;
  resizeMode?: ImageResizeMode;
  uri?: string;
  imageStyle?: ImageStyle;
  viewStyle?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
};

const ImageComponent = ({
  source = require('src/assets/img/avatar.png'),
  resizeMode = 'contain',
  uri,
  imageStyle,
  viewStyle,
  onPress,
  disabled,
}: Props) => {
  const [showLoading, setShowLoading] = useState(false);
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.view, viewStyle]}>
      {showLoading ? (
        <View style={[styles.imageLoading]}>
          <ActivityIndicator size={'large'} color={colors.primaryColor} />
        </View>
      ) : null}
      <Image
        onProgress={({nativeEvent: {loaded, total}}) => {
          if (loaded === total) {
            setShowLoading(false);
          }
        }}
        onLoadStart={() => setShowLoading(true)}
        onLoadEnd={() => setShowLoading(false)}
        source={uri ? {uri: uri} : source}
        style={[styles.image, imageStyle]}
        resizeMode={resizeMode}
      />
    </Pressable>
  );
};

export default ImageComponent;

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: 120,
    backgroundColor: colors.defaultWhite,
    borderRadius: 100,
  },
  view: {
    height: 130,
    width: 130,
    borderRadius: 100,
    backgroundColor: colors.avatarBorder,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  imageLoading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
