import React, { useState } from 'react';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { 
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import LoginScreen from './src/screens/LoginScreen';
import SignupPhoneScreen from './src/screens/SignupPhoneScreen';
import SignupOtpScreen from './src/screens/SignupOtpScreen';
import SignupDetailsScreen from './src/screens/SignupDetailsScreen';
import DashboardScreen from './src/screens/DashboardScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login', 'signup_phone', 'signup_otp', 'signup_details', 'dashboard'

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#18C9E8" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      {currentScreen === 'login' && (
        <LoginScreen 
          onLoginSuccess={() => setCurrentScreen('dashboard')} 
          onNavigateSignup={() => setCurrentScreen('signup_phone')} 
        />
      )}
      {currentScreen === 'signup_phone' && (
        <SignupPhoneScreen 
          onBack={() => setCurrentScreen('login')}
          onContinue={() => setCurrentScreen('signup_otp')}
          onLoginLink={() => setCurrentScreen('login')}
        />
      )}
      {currentScreen === 'signup_otp' && (
        <SignupOtpScreen 
          onBack={() => setCurrentScreen('signup_phone')}
          onContinue={() => setCurrentScreen('signup_details')}
        />
      )}
      {currentScreen === 'signup_details' && (
        <SignupDetailsScreen 
          onBack={() => setCurrentScreen('signup_otp')}
          onSuccess={() => setCurrentScreen('dashboard')}
          onLoginLink={() => setCurrentScreen('login')}
        />
      )}
      {currentScreen === 'dashboard' && (
        <DashboardScreen onLogout={() => setCurrentScreen('login')} />
      )}
    </SafeAreaProvider>
  );
}
