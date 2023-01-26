import React, {ReactNode, useState} from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Eye from 'src/assets/svg/eye.svg';
import EyeClose from 'src/assets/svg/eyeClose.svg';
import colors from 'src/constants/colors';

type Props = {
  value: string;
  onChangeText?: (val: string) => void;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  error?: boolean;
  label?: string;
  onPress?: () => void;
  editable?: boolean;
  secureTextEntry?: boolean;
  keyBoardType?: KeyboardTypeOptions;
  rightIcon?: ReactNode;
  placeholder?: string;
  autoFocus?: boolean;
};

const CustomInput = ({
  value,
  onChangeText,
  containerStyle,
  inputStyle,
  error,
  label,
  onPress,
  editable,
  secureTextEntry,
  rightIcon,
  keyBoardType = 'default',
  placeholder,
  autoFocus,
}: Props) => {
  const [secure, setSecure] = useState(secureTextEntry);

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.view,
        containerStyle,
        {
          borderBottomColor: error ? colors.red : colors.borderColor,
        },
      ]}>
      {label ? <Text style={[styles.label]}>{label}</Text> : null}
      <View style={[styles.inputWrapper]}>
        <TextInput
          placeholder={placeholder}
          editable={editable}
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, inputStyle]}
          secureTextEntry={secure}
          keyboardType={keyBoardType}
          onPressIn={onPress}
          autoFocus={autoFocus}
        />
        {/* <Icon color="red" name="eye" /> */}
        {rightIcon && rightIcon}
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => {
              setSecure(prev => !prev);
            }}>
            {!secure ? (
              <Eye fill={colors.borderColor} />
            ) : (
              <EyeClose fill={colors.borderColor} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </Pressable>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  view: {
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    padding: 5,
    paddingLeft: 0,
    fontSize: 20,
    color: colors.defaultBlack,
  },
  inputWrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  label: {
    color: colors.borderColor,
  },
});
