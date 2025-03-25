/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode, useState} from 'react';
import {View, TextInput, Pressable, Text} from 'react-native';
import {styles} from './styles';
import {AnyObject, AnySchema} from 'yup';
import {Field, FieldProps, getIn, useFormikContext} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface FormikInputProps {
  name: string;
  label: string;
  placeholder?: string;
  validationSchema: AnySchema<AnyObject>;
  isPassword?: boolean;
  maxLength?: number;
  keyboardType?: 'email' | 'number';
  rightIcon?: ReactNode;
  disabled?: boolean;
  testId?: string;
  textTransform?: 'lowercase' | 'uppercase';
  onBlur?: () => void;
}

const isRequiredField = (
  validationSchema: AnySchema<AnyObject>,
  name: string,
) => {
  return !!getIn(
    (validationSchema?.describe() as AnyObject)?.fields,
    name,
  )?.tests?.find((obj: {name: string}) => obj.name === 'required');
};

const FormikInputField: React.FC<FormikInputProps> = ({
  name,
  label,
  placeholder,
  validationSchema,
  isPassword,
  maxLength,
  keyboardType,
  rightIcon,
  disabled,
  testId,
  textTransform,
  onBlur,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {setFieldValue, errors, setFieldTouched} =
    useFormikContext<AnyObject>();

  const handleTextChange = (text: string) => {
    let transformedText = text;
    if (textTransform === 'lowercase') {
      transformedText = text.toLowerCase();
    } else if (textTransform === 'uppercase') {
      transformedText = text.toUpperCase();
    }
    setFieldValue(name, transformedText);
  };

  const handleBlur = () => {
    setFieldTouched(name, true);
    if (onBlur) {
      onBlur();
    }
  };

  const error = getIn(errors, name);
  return (
    <Field name={name}>
      {({field}: FieldProps) => (
        <View style={styles.container}>
          <Text style={styles.label}>
            {label} {isRequiredField(validationSchema, name) && '*'}
          </Text>
          <TextInput
            style={[
              styles.textBoxContainer,
              {
                color: !disabled ? '#000000' : '#B7B7B7',
              },
            ]}
            placeholder={placeholder || `Enter ${label}`}
            placeholderTextColor={'#B7B7B7'}
            value={field.value}
            onChangeText={handleTextChange}
            editable={!disabled}
            secureTextEntry={isPassword && !showPassword}
            maxLength={maxLength}
            keyboardType={
              keyboardType === 'email'
                ? 'email-address'
                : keyboardType === 'number'
                ? 'number-pad'
                : 'default'
            }
            testID={testId}
            onBlur={handleBlur}
          />
          {isPassword ? (
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              testID="showPassword"
              style={styles.password}>
              {showPassword ? (
                <Icon name="eye" size={20} />
              ) : (
                <Icon name="eye-slash" size={20} />
              )}
            </Pressable>
          ) : (
            rightIcon && <Pressable testID="eye-icon">{rightIcon}</Pressable>
          )}
          {error && <Text style={styles.errors}>{error as string}</Text>}
        </View>
      )}
    </Field>
  );
};

export default FormikInputField;
