import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from 'lucide-react-native';
import { theme } from '../theme/theme';
import Button from '../components/Button';
import AuthBackground from '../components/AuthBackground';
import { authStyles } from '../styles/authStyles';
import { authAPI } from '../services/api';

export default function SignupOtpScreen({ navigation, route }) {
  const { phoneNumber, email, channel = 'sms' } = route.params || {};
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(300);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputsRef = useRef([]);

  const isEmailChannel = channel === 'email';
  const displayIdentifier = isEmailChannel ? email : phoneNumber;
  const identifierLabel = isEmailChannel ? 'email' : 'phone number';

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (sec) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleOtpChange = (val, index) => {
    const newOtp = [...otpValues];
    newOtp[index] = val;
    setOtpValues(newOtp);
    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setError('');
    const otpCode = otpValues.join('');
    if (otpCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }
    setLoading(true);
    try {
      // Use identifier (phone or email) and channel for verification
      const identifier = isEmailChannel ? email : phoneNumber;
      const response = await authAPI.verifyOTP(identifier, otpCode, channel);
      
      if (response.status === 'success') {
        navigation.navigate('SignupDetails', { phoneNumber, email, channel });
      } else {
        setError(response.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      console.error('Verify OTP error:', err);
      setError(err.response?.data?.message || 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    // Prevent resend if timer is still counting
    if (countdown > 0) return;
    
    setError('');
    setLoading(true);
    try {
      if (isEmailChannel) {
        // Resend via email
        const response = await authAPI.sendOTPEmail(email, phoneNumber, '');
        if (response.status === 'success') {
          setCountdown(300);
        } else {
          setError(response.message || 'Failed to resend OTP.');
        }
      } else {
        // Resend via SMS (with email fallback)
        const response = await authAPI.sendOTP(phoneNumber, { email, name: '', preferredChannel: 'auto' });
        if (response.status === 'success') {
          setCountdown(300);
        } else {
          setError(response.message || 'Failed to resend OTP.');
        }
      }
    } catch (err) {
      console.error('Resend OTP error:', err);
      setError(err.response?.data?.message || 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToEmail = async () => {
    setError('');
    if (!email) {
      setError('Email not available. Please go back and enter your email.');
      return;
    }
    setLoading(true);
    try {
      const response = await authAPI.sendOTPEmail(email, phoneNumber, '');
      if (response.status === 'success') {
        navigation.navigate('SignupOtp', { phoneNumber, email, channel: 'email' });
      } else {
        setError(response.message || 'Failed to send OTP via email.');
      }
    } catch (err) {
      console.error('Switch to email error:', err);
      setError(err.response?.data?.message || 'Network error.');
    } finally {
      setLoading(false);
    }
  };

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

          <Text style={authStyles.title}>Verify Your {isEmailChannel ? 'Email' : 'Number'}</Text>
          <Text style={authStyles.subtitle}>We've sent a 6-digit code to your {identifierLabel}: {isEmailChannel ? email : phoneNumber || '801 234 5678'}</Text>

          {/* Step Indicator */}
          <View style={authStyles.stepIndicatorRow}>
            <View style={authStyles.stepColumn}>
              <View style={authStyles.stepDotCompleted}><Check size={14} color={theme.colors.white} /></View>
              <Text style={authStyles.stepLabelInactive}>Phone Number</Text>
            </View>
            <View style={authStyles.stepLineActive} />
            <View style={authStyles.stepColumn}>
              <View style={authStyles.stepDotActive}><Text style={authStyles.stepDotTextActive}>2</Text></View>
              <Text style={authStyles.stepLabelActive}>OTP</Text>
            </View>
            <View style={authStyles.stepLine} />
            <View style={authStyles.stepColumn}>
              <View style={authStyles.stepDotInactive}><Text style={authStyles.stepDotTextInactive}>3</Text></View>
              <Text style={authStyles.stepLabelInactive}>Your Details</Text>
            </View>
          </View>

          {/* Hero Image */}
          <View style={authStyles.heroImageContainer}>
            <Image source={require('../../assets/stock.png')} style={authStyles.heroImage} />
          </View>

          {error ? <Text style={authStyles.errorText}>{error}</Text> : null}

          {/* OTP Inputs */}
          <View style={authStyles.otpContainerRow}>
            {otpValues.map((digit, idx) => (
              <TextInput
                key={idx}
                ref={(el) => (inputsRef.current[idx] = el)}
                style={[authStyles.otpBox, digit ? authStyles.otpBoxActive : null]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(val) => handleOtpChange(val, idx)}
              />
            ))}
          </View>

          <View style={authStyles.resendRow}>
            <Text style={authStyles.resendTextPrompt}>Didn't receive OTP?</Text>
            {countdown > 0 ? (
              <Text style={authStyles.countdownText}>{formatCountdown(countdown)}</Text>
            ) : (
              <TouchableOpacity onPress={handleResend} disabled={loading} activeOpacity={0.7}>
                <Text style={authStyles.resendActionLink}>Resend via {isEmailChannel ? 'Email' : 'SMS'}</Text>
              </TouchableOpacity>
            )}
          </View>

          {!isEmailChannel && email && (
            <TouchableOpacity style={authStyles.alternativeBtn} onPress={handleSwitchToEmail} disabled={loading} activeOpacity={0.7}>
              <Mail size={14} color={theme.colors.primary} />
              <Text style={authStyles.alternativeBtnText}>Switch to Email OTP Instead</Text>
            </TouchableOpacity>
          )}

          <View style={authStyles.securityNoticeBox}>
            <ShieldCheck size={16} color={theme.colors.navy} />
            <Text style={authStyles.securityNoticeText}>For your security, this code will expire in 5 minutes.</Text>
          </View>

          <Button 
            title="Continue" 
            onPress={handleVerify} 
            loading={loading}
            rightIcon={<ArrowRight size={18} color={theme.colors.white} />}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
