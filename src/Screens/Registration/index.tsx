/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import CommonHeader from '../EventSummary/CommonHeader';
import {FormikProvider, useFormik} from 'formik';
import * as Yup from 'yup';
import CustomDropdown from '../../Components/DropDown';
import FormikInputField from '../../Components/InputField';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormikUploadInputField from '../../Components/FileUpload';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Button from '../../Components/Button';

const Registration: React.FC = () => {
  const [districts, setDistricts] = useState<{District: string}[]>([]);

  const navigation = useNavigation();
  useEffect(() => {
    axios
      .get('http://api.apgewa.org/Api/GetDropDownData')
      .then(res => setDistricts(res.data));
  }, []);

  const defaultValues = {
    memberType: '',
    community: '',
    name: '',
    empId: '',
    designation: '',
    office: '',
    officeLandMark: '',
    department: '',
    workplace: '',
    district: '',
    constituency: '',
    address: '',
  };

  const alternativeValues = {
    memberType: '',
    community: '',
    fullName: '',
    designation: '',
    city: '',
    district: '',
    mandal: '',
    constituency: '',
  };

  const validationSchema = Yup.object().shape({
    memberType: Yup.string().required('Member type is required'),
    community: Yup.string().required('Community is required'),
    name: Yup.string().when('memberType', {
      is: (val: string) => val !== 'Others' && val !== 'Self Employee',
      then: schema => schema.required('Name of the employee is required'),
      otherwise: schema => schema.notRequired(),
    }),
    fullName: Yup.string().when('memberType', {
      is: (val: string) => val === 'Others' || val === 'Self Employee',
      then: schema => schema.required('Full Name is required'),
      otherwise: schema => schema.notRequired(),
    }),
    designation: Yup.string().required('Designation is required'),
    office: Yup.string().when('memberType', {
      is: (val: string) => val !== 'Others' && val !== 'Self Employee',
      then: schema => schema.required('Office is required'),
      otherwise: schema => schema.notRequired(),
    }),
    department: Yup.string().when('memberType', {
      is: (val: string) => val !== 'Others' && val !== 'Self Employee',
      then: schema => schema.required('Department is required'),
      otherwise: schema => schema.notRequired(),
    }),
    workplace: Yup.string().when('memberType', {
      is: (val: string) => val !== 'Others' && val !== 'Self Employee',
      then: schema => schema.required('WorkPlace is required'),
      otherwise: schema => schema.notRequired(),
    }),
    city: Yup.string().when('memberType', {
      is: (val: string) => val === 'Others' || val === 'Self Employee',
      then: schema => schema.required('City is required'),
      otherwise: schema => schema.notRequired(),
    }),
    mandal: Yup.string().when('memberType', {
      is: (val: string) => val === 'Others' || val === 'Self Employee',
      then: schema => schema.required('Mandal is required'),
      otherwise: schema => schema.notRequired(),
    }),
    district: Yup.string().required('District is required'),
    constituency: Yup.string().required('Constituency is required'),
  });

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: () => {
      navigation.navigate('RegistrationForm', {data: formik.values});
    },
  });

  useEffect(() => {
    if (
      formik.values.memberType === 'Others' ||
      formik.values.memberType === 'Self Employee'
    ) {
      formik.setValues({
        ...alternativeValues,
        memberType: formik.values.memberType,
      });
    } else {
      formik.setValues({
        ...defaultValues,
        memberType: formik.values.memberType,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.memberType]);

  const memberTypeOptions = [
    {label: 'Central GOVT', value: 'Central Govt'},
    {label: 'State Govt', value: 'State Govt'},
    {label: 'Retired Employee', value: 'Retired Employee'},
    {label: 'Self Employee', value: 'Self Employee'},
    {label: 'Private Employee', value: 'Private Employee'},
    {label: 'Others', value: 'Others'},
  ];

  const communityOptions = [
    {label: 'Gowda', value: 'Gowda'},
    {label: 'Ediga', value: 'Ediga'},
    {label: 'SettiBalija', value: 'SettiBalija'},
    {label: 'SriSaina', value: 'SriSaina'},
    {label: 'Yatha', value: 'Yatha'},
  ];

  return (
    <KeyboardAwareScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <CommonHeader title="Registration" />
      <FormikProvider value={formik}>
        <View style={{alignItems: 'center'}}>
          <CustomDropdown
            name="memberType"
            label="Member Type"
            data={memberTypeOptions}
            validationSchema={validationSchema}
          />
          <CustomDropdown
            name="community"
            label="Community"
            validationSchema={validationSchema}
            data={communityOptions}
          />

          {formik.values.memberType === 'Others' ||
          formik.values.memberType === 'Self Employee' ? (
            <>
              <FormikInputField
                name="fullName"
                label="Full Name"
                validationSchema={validationSchema}
              />
              <FormikInputField
                name="designation"
                label="Designation"
                validationSchema={validationSchema}
              />
              <FormikInputField
                name="city"
                label="City"
                validationSchema={validationSchema}
              />
              <FormikInputField
                name="mandal"
                label="Mandal"
                validationSchema={validationSchema}
              />
            </>
          ) : (
            <>
              <FormikInputField
                name="name"
                label="Name of the Employee"
                validationSchema={validationSchema}
              />
              <FormikInputField
                name="empId"
                label="Employee ID / Unique ID"
                validationSchema={validationSchema}
              />
              <FormikInputField
                name="designation"
                label="Designation"
                validationSchema={validationSchema}
              />
              <FormikInputField
                name="office"
                label="Office"
                validationSchema={validationSchema}
              />
              <FormikInputField
                name="officeLandMark"
                label="Office Land Mark"
                validationSchema={validationSchema}
              />
              <FormikInputField
                name="department"
                label="Department"
                validationSchema={validationSchema}
              />
              <FormikInputField
                name="workplace"
                label="Work Place"
                validationSchema={validationSchema}
              />
            </>
          )}

          <CustomDropdown
            name="district"
            label="District"
            data={districts.map(item => ({
              label: item.District,
              value: item.District,
            }))}
            validationSchema={validationSchema}
          />
          <FormikInputField
            name="constituency"
            label="Constituency"
            validationSchema={validationSchema}
            testId={''}
          />
          <FormikUploadInputField
            name="thumbnailImage"
            label="Thumbnail Image"
            testId={''}
            validationSchema={validationSchema}
          />
          <FormikUploadInputField
            name="casteCertificate"
            label="Caste Certificate"
            testId={''}
            validationSchema={validationSchema}
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

export default Registration;
