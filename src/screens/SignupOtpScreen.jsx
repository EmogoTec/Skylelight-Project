import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from 'lucide-react-native';
import { theme } from '../theme/theme';
import Button from '../components/Button';
import AuthBackground from '../components/AuthBackground';
import { authStyles } from '../styles/authStyles';

export default function SignupOtpScreen({ navigation, route }) {
  const { phoneNumber } = route.params || {};
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(300);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

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
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    navigation.navigate('SignupDetails');
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

          <Text style={authStyles.title}>Verify Your Number</Text>
          <Text style={authStyles.subtitle}>We've sent a 6-digit code to +234 {phoneNumber || '801 234 5678'}</Text>

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
            <TouchableOpacity onPress={() => setCountdown(300)}>
              <Text style={authStyles.resendActionLink}>Resend</Text>
            </TouchableOpacity>
            <Text style={authStyles.countdownText}>({formatCountdown(countdown)})</Text>
          </View>

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
