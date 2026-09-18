import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Easing, StatusBar, Image, Modal, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Phone, Lock, Eye, EyeOff, Check, ArrowRight, Fingerprint, UserPlus } from 'lucide-react-native';
import { theme } from '../theme/theme';
import Input from '../components/Input';
import Button from '../components/Button';

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

import { authStyles } from '../styles/authStyles';

export default function LoginScreen({ onLoginSuccess, onNavigateSignup }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [biometricLoading, setBiometricLoading] = useState(false);

  const handleOpenBiometricPrompt = () => {
    setError('');
    setShowBiometricModal(true);
  };

  const handleConfirmBiometricScan = async () => {
    try {
      setBiometricLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await AsyncStorage.setItem('userToken', 'skylelight_secure_token_biometric');
      setShowBiometricModal(false);
      setBiometricLoading(false);
      if (onLoginSuccess) onLoginSuccess();
    } catch (e) {
      setBiometricLoading(false);
      setShowBiometricModal(false);
      setError('Biometric authentication failed.');
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
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Wrapper component for Eye icon to handle press
  const PasswordRightIcon = () => (
    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
      {showPassword ? <Eye size={20} color={theme.colors.textLight} /> : <EyeOff size={20} color={theme.colors.textLight} />}
    </TouchableOpacity>
  );

  return (
    <View style={authStyles.outerContainer}>
      <View style={authStyles.headerGraphicContainer} pointerEvents="none">
        <View style={authStyles.abstractBlobOne} />
        <View style={authStyles.abstractBlobTwo} />
      </View>

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
            <View>
              <Text style={authStyles.brandTitleText}>SkyleLight</Text>
              <Text style={authStyles.brandTaglineText}>Data • Airtime • Payments • Investments</Text>
            </View>
          </View>

          <View style={authStyles.contentBox}>
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
            />

            <TouchableOpacity 
              style={authStyles.biometricButton} 
              onPress={handleOpenBiometricPrompt}
              disabled={loading}
            >
              <View style={authStyles.biometricIconBadge}>
                <Fingerprint size={16} color={theme.colors.primary} />
              </View>
              <Text style={authStyles.biometricButtonText}>Sign in with Fingerprint</Text>
              <View style={authStyles.secureBadgeTag}>
                <Text style={authStyles.secureBadgeText}>Fast & Secure</Text>
              </View>
            </TouchableOpacity>

            <View style={authStyles.accountFooterDivider} />
            
            <View style={authStyles.footerContainer}>
              <Text style={authStyles.footerText}>Don't have an account?</Text>
              <TouchableOpacity style={authStyles.createAccountOutlineBtn} onPress={onNavigateSignup} activeOpacity={0.8}>
                <UserPlus size={15} color={theme.colors.primary} />
                <Text style={authStyles.linkText}>Create Account</Text>
              </TouchableOpacity>
            </View>

            <View style={authStyles.brandFooterBlock}>
              <Text style={authStyles.companyFooterText}>SkyleLight Technologies Ltd</Text>
              <Text style={authStyles.sloganFooterText}>Lighting the way to possibilities</Text>
            </View>
          </View>
        </ScrollView>

        <Modal
          visible={showBiometricModal}
          transparent={true}
          animationType="fade"
        >
          <View style={authStyles.modalOverlay}>
            <View style={authStyles.modalContent}>
              <Text style={authStyles.modalTitle}>Biometric Authentication</Text>
              <Text style={authStyles.modalSubtitle}>Touch the fingerprint sensor on your device to sign in securely.</Text>

              <TouchableOpacity 
                style={authStyles.fingerprintIconCircle} 
                onPress={handleConfirmBiometricScan}
                disabled={biometricLoading}
                activeOpacity={0.8}
              >
                {biometricLoading ? (
                  <ActivityIndicator size="large" color={theme.colors.primary} />
                ) : (
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Fingerprint size={42} color={theme.colors.primary} />
                    <View style={authStyles.fingerprintRingPulse} />
                  </View>
                )}
              </TouchableOpacity>

              <Text style={authStyles.tapInstructionText}>
                {biometricLoading ? "Verifying fingerprint..." : "Tap fingerprint icon to simulate scan"}
              </Text>

              <TouchableOpacity 
                style={authStyles.modalCancelButton}
                onPress={() => setShowBiometricModal(false)}
                disabled={biometricLoading}
              >
                <Text style={authStyles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
}