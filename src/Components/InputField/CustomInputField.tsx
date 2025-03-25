/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {getIn} from 'formik';
import {Text, View} from 'react-native';
import {AnyObject, AnySchema} from 'yup';
import {styles} from './styles';
interface customInputFieldProps {
  validationSchema: AnySchema<AnyObject> | undefined;
  label?: string;
  field: {
    name: string;
    value: Date | string | string[] | number | undefined;
    onChange: (text: string) => void;
  };
  error: string | undefined | Date | any;
  children: ReactNode;
  inputId?: string;
  testId?: string;
}

const isRequiredField = (validationSchema: any, name: string) => {
  return !!getIn(validationSchema?.describe().fields, name)?.tests?.find(
    (obj: {name: string}) => obj.name === 'required',
  );
};
const CustomInputField: React.FC<customInputFieldProps> = ({
  validationSchema,
  label,
  field,
  error,
  children,
  inputId,
  testId,
}) => {
  return (
    <View id={inputId} testID={testId}>
      {label ? (
        <Text style={[styles.label, {marginLeft: 16}]}>
          {label || ''} {isRequiredField(validationSchema, field.name) && '*'}
        </Text>
      ) : null}
      <View>{children}</View>
      {error && (
        <Text style={[styles.errors, {marginLeft: 18}]}>
          {error?.toString()}
        </Text>
      )}
    </View>
  );
};
export default CustomInputField;
