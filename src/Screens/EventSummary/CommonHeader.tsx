/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface CommonHeaderProps {
  title: string;
}
const CommonHeader: React.FC<CommonHeaderProps> = ({title}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 14,
      }}>
      <Icon
        name="arrow-left"
        size={16}
        color="#000"
        onPress={() => navigation.goBack()}
      />
      <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 16}}>
        {title}
      </Text>
    </View>
  );
};

export default CommonHeader;
