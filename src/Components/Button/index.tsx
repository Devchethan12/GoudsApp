/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, Text} from 'react-native';
import {styles} from './styles';

interface buttonProps {
  label: string;
  onPress?: () => void;
  width?: number;
  type: 'solid' | 'outlined' | 'success' | 'reject';
  testId: string;
  disabled?: boolean;
}

const Button: React.FC<buttonProps> = ({
  label,
  onPress,
  width,
  type,
  testId,
  disabled = false,
}) => {
  return (
    <Pressable
      testID={testId}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        {
          width: width ? width : '100%',
          backgroundColor:
            type === 'outlined'
              ? 'transparent'
              : type === 'reject'
              ? '#FF4545'
              : type === 'success'
              ? '#00DFA2'
              : '#000000',
          borderColor: type === 'outlined' ? '#000000' : 'transparent',
          opacity: disabled ? 0.5 : 1,
        },
      ]}>
      {type === 'success' || type === 'reject' ? (
        <Text style={{fontSize: 14, color: 'white', fontWeight: '700'}}>
          {label}
        </Text>
      ) : (
        <Text
          style={{
            fontSize: 14,
            color: type === 'outlined' ? '#000000' : '#ffffff',
            fontWeight: '700',
          }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};
export default Button;
