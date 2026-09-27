import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff } from 'lucide-react-native';
import { theme } from '../theme/theme';
import Input from '../components/Input';
import Button from '../components/Button';
import AuthBackground from '../components/AuthBackground';
import { authStyles } from '../styles/authStyles';
import { authAPI, storage } from '../services/api';

export default function SignupDetailsScreen({ navigation, route }) {
  const { phoneNumber, email: routeEmail = '', channel = 'sms' } = route.params || {};
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(routeEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateAccount = async () => {
    setError('');
    const fullName = `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`.trim();
    
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields marked with *');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    try {
      const response = await authAPI.completeRegistration(
        phoneNumber,
        fullName,
        password,
        email,
        '', // transaction_pin - optional
        channel // pass the verification channel
      );
      
      if (response.status === 'success') {
        // Save token and user data
        await storage.saveToken(response.data.access_token);
        await storage.saveUserData(response.data.user);
        
        // Account created — offer biometric login before the dashboard.
        navigation.replace('Biometric');
      } else {
        setError(response.message || 'Account creation failed. Please try again.');
      }
    } catch (err) {
      console.error('Complete registration error:', err);
      setError(err.response?.data?.message || 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const PasswordRightIcon = () => (
    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
      {showPassword ? <Eye size={20} color={theme.colors.textLight} /> : <EyeOff size={20} color={theme.colors.textLight} />}
    </TouchableOpacity>
  );

  const ConfirmPasswordRightIcon = () => (
    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
      {showConfirmPassword ? <Eye size={20} color={theme.colors.textLight} /> : <EyeOff size={20} color={theme.colors.textLight} />}
    </TouchableOpacity>
  );

  return (
    <View style={authStyles.outerContainer}>
      <AuthBackground />
      <KeyboardAvoidingView style={authStyles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={authStyles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={authStyles.topNavBarRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={authStyles.backArrowButton}>
              <ArrowLeft size={20} color={theme.colors.navy} />
            </TouchableOpacity>
          </View>

          <View style={authStyles.headerContainer}>
            <Image source={require('../../assets/icon.png')} style={authStyles.logo} resizeMode="contain" />
            <Text style={authStyles.brandTitleText}>SkyleLight</Text>
            <Text style={authStyles.brandTaglineText}>Lighting the way to possibilities</Text>
          </View>

          <Text style={authStyles.title}>Complete Your Details</Text>
          <Text style={authStyles.subtitle}>Fill in your information to create your account.</Text>

          {/* Step Indicator */}
          <View style={authStyles.stepIndicatorRow}>
            <View style={authStyles.stepColumn}>
              <View style={authStyles.stepDotCompleted}><Check size={14} color={theme.colors.white} /></View>
              <Text style={authStyles.stepLabelInactive}>Phone Number</Text>
            </View>
            <View style={authStyles.stepLineActive} />
            <View style={authStyles.stepColumn}>
              <View style={authStyles.stepDotCompleted}><Check size={14} color={theme.colors.white} /></View>
              <Text style={authStyles.stepLabelInactive}>OTP</Text>
            </View>
            <View style={authStyles.stepLineActive} />
            <View style={authStyles.stepColumn}>
              <View style={authStyles.stepDotActive}><Text style={authStyles.stepDotTextActive}>3</Text></View>
              <Text style={authStyles.stepLabelActive}>Your Details</Text>
            </View>
          </View>

          {error ? <Text style={authStyles.errorText}>{error}</Text> : null}

          <Input
            label="First Name*"
            placeholder="John"
            value={firstName}
            onChangeText={setFirstName}
            editable={!loading}
          />

          <Input
            label="Middle Name"
            placeholder="Lucas (Optional)"
            value={middleName}
            onChangeText={setMiddleName}
            editable={!loading}
          />

          <Input
            label="Last Name*"
            placeholder="Eneojo"
            value={lastName}
            onChangeText={setLastName}
            editable={!loading}
          />

          <Input
            label="Email Address*"
            placeholder="example@skylelight.com.ng"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />

          <Input
            label="Password*"
            placeholder="Create secure password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            editable={!loading}
            rightIcon={PasswordRightIcon}
          />
          <Text style={authStyles.passwordHintText}>Password must be at least 8 characters including a number, lower & upper case letters and a special character.</Text>

          <View style={{ height: 16 }} />

          <Input
            label="Confirm Password*"
            placeholder="Confirm password"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!loading}
            rightIcon={ConfirmPasswordRightIcon}
          />

          <Button 
            title="Create Account" 
            onPress={handleCreateAccount} 
            loading={loading}
            rightIcon={<ArrowRight size={18} color={theme.colors.white} />}
          />

          <View style={authStyles.footerContainer}>
            <Text style={authStyles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={authStyles.linkTextInline}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
