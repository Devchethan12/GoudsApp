/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {Field, FieldProps, useFormikContext} from 'formik';
import {View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {styles} from './styles';
import {AnyObject, AnySchema} from 'yup';
import CustomInputField from '../InputField/CustomInputField';

export interface Option {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  name: string;
  label: string;
  placeholder?: string;
  data: {label: string; value: string}[];
  validationSchema: AnySchema<AnyObject> | undefined;
  inputId?: string;
  testId?: string;
  renderLeftIcon?: any;
  search?: boolean;
  searchText?: (text: string) => void;
  disabled?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  name,
  label,
  placeholder,
  data,
  validationSchema,
  inputId,
  testId,
  renderLeftIcon,
  search,
  searchText,
  disabled,
}) => {
  const {setFieldValue} = useFormikContext();

  const onChange = (option: Option) => {
    setFieldValue(name, option.value); // Update Formik state
  };

  const handleSearchTextChange = useCallback(
    (text: string) => {
      if (text) {
        searchText?.(text);
      }
    },
    [searchText],
  );

  return (
    <Field name={name}>
      {({field, form}: FieldProps) => (
        <CustomInputField
          field={field}
          label={label}
          error={form.errors[name]}
          inputId={inputId}
          validationSchema={validationSchema}>
          <View style={[styles.container, {marginVertical: 6, top: 6}]}>
            <Dropdown
              testID={testId}
              placeholderStyle={[
                styles.placeholderStyle,
                {left: renderLeftIcon ? 30 : 4},
              ]}
              style={[styles.textBoxContainer, {left: 0}]}
              data={data}
              labelField="label"
              valueField="value"
              onChange={onChange}
              placeholder={placeholder ? placeholder : `Select ${label}`}
              value={field.value}
              activeColor={'#f7f7f7'}
              selectedTextStyle={[
                styles.selectedText,
                {
                  left: renderLeftIcon ? 30 : 0,
                  color: disabled ? '#9AA6B2' : '#000000',
                },
              ]}
              disable={disabled}
              search={search}
              onChangeText={handleSearchTextChange}
              inputSearchStyle={{color: '#000000'}}
              itemTextStyle={{color: '#000000', fontSize: 14}}
              renderLeftIcon={renderLeftIcon ? renderLeftIcon : null}
              containerStyle={styles.dropdownContainer}
              itemContainerStyle={styles.dropdownSeperator}
              iconStyle={styles.rightIcon}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </CustomInputField>
      )}
    </Field>
  );
};

export default CustomDropdown;
