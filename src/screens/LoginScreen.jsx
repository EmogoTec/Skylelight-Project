import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Modal, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Phone, Lock, Eye, EyeOff, Check, ArrowRight, Fingerprint, UserPlus } from 'lucide-react-native';
import { theme } from '../theme/theme';
import Input from '../components/Input';
import Button from '../components/Button';
import AuthBackground from '../components/AuthBackground';
import { authStyles } from '../styles/authStyles';
import * as LocalAuthentication from 'expo-local-authentication';

let AsyncStorage = {
  setItem: async () => {},
  getItem: async () => null,
  removeItem: async () => {}
};

try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  console.log('AsyncStorage fallback enabled.');
}

export default function LoginScreen({ navigation }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleBiometricLogin = async () => {
    setError('');
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        setError('Biometrics not available or not enrolled on this device.');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Sign into SkyleLight',
        fallbackLabel: 'Use Passcode',
        disableDeviceFallback: false,
      });

      if (result.success) {
        setLoading(true);
        // Simulate a tiny network delay for realism
        await new Promise((resolve) => setTimeout(resolve, 500));
        await AsyncStorage.setItem('userToken', 'skylelight_secure_token_biometric');
        navigation.replace('Dashboard');
      } else {
        setError('Authentication cancelled or failed.');
      }
    } catch (e) {
      setError('An error occurred during biometric authentication.');
      console.log(e);
    }
  };

  const handlePasswordLogin = async () => {
    setError('');
    if (!identifier.trim() || !password) {
      setError('Please enter your credentials');
      return;
    }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await AsyncStorage.setItem('userToken', 'skylelight_token_auth');
      navigation.replace('Dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const PasswordRightIcon = () => (
    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
      {showPassword ? <Eye size={20} color={theme.colors.textLight} /> : <EyeOff size={20} color={theme.colors.textLight} />}
    </TouchableOpacity>
  );

  return (
    <View style={authStyles.outerContainer}>
      <AuthBackground />
      <KeyboardAvoidingView 
        style={authStyles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={authStyles.scrollContainer} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={authStyles.headerContainer}>
            <Image source={require('../../assets/icon.png')} style={authStyles.logo} resizeMode="contain" />
            <Text style={authStyles.brandTitleText}>SkyleLight</Text>
            <Text style={authStyles.brandTaglineText}>Lighting the way to possibilities</Text>
          </View>

          <Text style={authStyles.title}>Sign In</Text>
          <Text style={authStyles.subtitle}>Sign into your SkyleLight account and enjoy seamless vtu services.</Text>
            
          {error ? <Text style={authStyles.errorText}>{error}</Text> : null}

          <Input
            placeholder="Email or Phone Number"
            value={identifier}
            onChangeText={setIdentifier}
            editable={!loading}
            leftIcon={Phone}
          />

          <Input
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            editable={!loading}
            leftIcon={Lock}
            rightIcon={PasswordRightIcon}
          />

          <View style={authStyles.optionsRow}>
            <TouchableOpacity 
              style={authStyles.rememberContainer} 
              activeOpacity={0.8}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[authStyles.checkboxBox, rememberMe && authStyles.checkboxChecked]}>
                {rememberMe && <Check size={12} color={theme.colors.white} />}
              </View>
              <Text style={authStyles.rememberText}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <Text style={authStyles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <Button 
            title="Sign In" 
            onPress={handlePasswordLogin} 
            loading={loading}
            rightIcon={<ArrowRight size={18} color={theme.colors.white} />}
          />

          <TouchableOpacity 
            style={authStyles.biometricButton} 
            onPress={handleBiometricLogin}
            disabled={loading}
          >
            <View style={authStyles.biometricIconBadge}>
              <Fingerprint size={16} color={theme.colors.primary} />
            </View>
            <Text style={authStyles.biometricButtonText}>Continue with Biometrics</Text>
            <View style={authStyles.secureBadgeTag}>
              <Text style={authStyles.secureBadgeText}>Fast & Secure</Text>
            </View>
          </TouchableOpacity>

          <View style={authStyles.accountFooterDivider} />
          
          <View style={{ alignItems: 'center', marginBottom: 8 }}>
            <Text style={authStyles.footerText}>Don't have an account?</Text>
          </View>
          <TouchableOpacity style={authStyles.createAccountOutlineBtn} onPress={() => navigation.navigate('SignupPhone')} activeOpacity={0.8}>
            <UserPlus size={15} color={theme.colors.navy} />
            <Text style={authStyles.linkText}>Create Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

    </View>
  );
}