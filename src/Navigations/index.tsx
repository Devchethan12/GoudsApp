import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import EventSummary from '../Screens/EventSummary';
import Registration from '../Screens/Registration';
import RegistrationForm from '../Screens/Registration/RegistrationForm';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MemberSummary from '../Screens/MemberSummary';
const Stack = createNativeStackNavigator();
const {Navigator, Screen} = Stack;
const Tab = createBottomTabNavigator();
const AppStack: React.FC = () => {
  const bottomTabs: React.FC = () => {
    return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="MemberSummary" component={MemberSummary} />
      </Tab.Navigator>
    );
  };
  return (
    <Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}
      initialRouteName="Home">
      <Screen name="Home" component={bottomTabs} />
      <Screen name="EventSummary" component={EventSummary} />
      <Screen name="Registration" component={Registration} />
      <Screen name="RegistrationForm" component={RegistrationForm} />
    </Navigator>
  );
};
export default AppStack;
