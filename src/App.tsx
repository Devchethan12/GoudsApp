import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppStack from './Navigations';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LogBox, StatusBar} from 'react-native';
const App: React.FC = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
    SplashScreen.hide();
  }, []);
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />
        <AppStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
export default App;
