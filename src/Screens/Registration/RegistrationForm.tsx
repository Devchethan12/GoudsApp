/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import CommonHeader from '../EventSummary/CommonHeader';
import * as Yup from 'yup';
import {FormikProvider, useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormikInputField from '../../Components/InputField';
import Button from '../../Components/Button';
const RegistrationForm: React.FC = ({route}) => {
  const {data} = route.params;
  console.log(data, 'xxxxxxxxxxxxxx');

  const initialValues = {
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNum: '',
  };
  const validationSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character',
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Confirm Password is required'),
    mobileNum: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile number is required'),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      console.log(values, 'formik values');
    },
  });

  return (
    <KeyboardAwareScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <CommonHeader title={'Registration'} />
      <FormikProvider value={formik}>
        <View style={{alignItems: 'center'}}>
          <FormikInputField
            name={'address'}
            label={'Address'}
            validationSchema={validationSchema}
          />
          <FormikInputField
            name={'email'}
            label={'Email'}
            validationSchema={validationSchema}
          />
          <FormikInputField
            name={'password'}
            label={'Password'}
            validationSchema={validationSchema}
          />
          <FormikInputField
            name={'confirmPassword'}
            label={'Confirm Password'}
            validationSchema={validationSchema}
          />
          <FormikInputField
            name={'mobileNum'}
            label={'Mobile Number'}
            validationSchema={validationSchema}
            keyboardType="number"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginBottom: 10,
          }}>
          <Button
            label={'Cancel'}
            type={'outlined'}
            testId={''}
            width={160}
            onPress={() => {
              formik.resetForm();
            }}
          />
          <Button
            label={'Submit'}
            type={'solid'}
            testId={''}
            width={160}
            onPress={() => formik.handleSubmit()}
          />
        </View>
      </FormikProvider>
    </KeyboardAwareScrollView>
  );
};
export default RegistrationForm;
