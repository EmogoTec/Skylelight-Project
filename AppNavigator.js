import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterPhoneScreen from './screens/RegisterPhoneScreen';
import VerifyOtpScreen from './screens/VerifyOtpScreen';
import RegisterDetailsScreen from './screens/RegisterDetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegisterPhone">
        <Stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} options={{ title: 'Create Account' }} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} options={{ title: 'Verify OTP' }} />
        <Stack.Screen name="RegisterDetails" component={RegisterDetailsScreen} options={{ title: 'Account Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}