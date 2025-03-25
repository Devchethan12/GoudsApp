/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return 'Good Morning';
  }
  if (hour < 18) {
    return 'Good Afternoon';
  }
  return 'Good Evening';
};

const HomeHeader: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>{getGreeting()}</Text>
      <Icon
        name="user-circle"
        size={24}
        color="#000"
        onPress={() => {
          navigation.navigate('Registration');
        }}
      />
    </View>
  );
};

export default HomeHeader;
