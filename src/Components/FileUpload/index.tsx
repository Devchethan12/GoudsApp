/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Pressable, Text} from 'react-native';
import {Field, getIn, useFormikContext} from 'formik';
import {DocumentPickerResponse, pick} from '@react-native-documents/picker';
import {styles} from './styles';
import {AnyObject, AnySchema} from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
type FormValues = Record<string, DocumentPickerResponse | string | null>;

interface FormikUploadInputProps {
  name: keyof FormValues;
  label: string;
  placeholder?: string;
  editable?: boolean;
  testId: string;
  validationSchema: AnySchema<AnyObject>;
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

const FormikUploadInputField: React.FC<FormikUploadInputProps> = ({
  name,
  label,
  placeholder = 'Upload File',
  editable = true,
  testId,
  validationSchema,
}) => {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const {setFieldValue, errors} = useFormikContext<FormValues>();

  const handleFileSelect = async () => {
    console.log('here');

    try {
      const [result] = await pick();

      console.log(result, 'xxxxxxxxxx');
      if (result.name) {
        setFieldValue(result?.name, result);
        setSelectedFileName(result.name);
      }
      // setSelectedFileName(file.name);
      // setFieldValue(name, file);
      //   }
    } catch (err) {}
  };

  return (
    <Field name={name}>
      {() => (
        <View style={styles.container}>
          <Text style={styles.label}>
            {label} {isRequiredField(validationSchema, name) && '*'}
          </Text>

          <Pressable
            style={[
              styles.uploadBoxContainer,
              {backgroundColor: editable ? '#ffffff' : ''},
            ]}
            onPress={handleFileSelect}
            disabled={!editable}
            testID={testId}>
            <View style={styles.placeholderContainer}>
              <Text style={styles.uploadText}>
                {selectedFileName || placeholder}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="upload" size={20} color={'#ffffff'} />
            </View>
          </Pressable>

          {errors[name as keyof FormValues] ? (
            <View style={styles.errorcontainer}>
              <Text style={styles.errors}>
                {errors[name as keyof FormValues] as string}
              </Text>
            </View>
          ) : (
            <View style={styles.height16} />
          )}
        </View>
      )}
    </Field>
  );
};

export default FormikUploadInputField;
