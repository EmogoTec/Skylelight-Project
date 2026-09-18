import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react-native';
import { theme } from '../theme/theme';
import Button from '../components/Button';
import { authStyles } from '../styles/authStyles';

export default function SignupOtpScreen({ onBack, onContinue }) {
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
    if (onContinue) onContinue();
  };

  return (
    <View style={authStyles.outerContainer}>
      <View style={authStyles.headerGraphicContainer} pointerEvents="none">
        <View style={authStyles.abstractBlobOne} />
        <View style={authStyles.abstractBlobTwo} />
      </View>

      <KeyboardAvoidingView style={authStyles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={authStyles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={authStyles.topNavBarRow}>
            <TouchableOpacity onPress={onBack} style={authStyles.backArrowButton}>
              <ArrowLeft size={20} color={theme.colors.navy} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onBack}>
              <Text style={authStyles.backTextLink}>Back to phone number</Text>
            </TouchableOpacity>
          </View>

          <View style={authStyles.headerContainer}>
            <Image source={require('../../assets/icon.png')} style={authStyles.logo} resizeMode="contain" />
            <View>
              <Text style={authStyles.brandTitleText}>SkyleLight</Text>
              <Text style={authStyles.brandTaglineText}>Data • Airtime • Payments • Investments</Text>
            </View>
          </View>

          <View style={authStyles.contentBox}>
            <View style={authStyles.stepIndicatorRow}>
              <View style={[authStyles.stepDotCompleted]}><Check size={14} color={theme.colors.white} /></View>
              <View style={authStyles.stepLineActive} />
              <View style={[authStyles.stepDotActive]}><Text style={authStyles.stepDotTextActive}>2</Text></View>
              <View style={authStyles.stepLine} />
              <View style={[authStyles.stepDotInactive]}><Text style={authStyles.stepDotTextInactive}>3</Text></View>
            </View>
            <Text style={authStyles.stepLabelText}>Step 2 of 3: OTP Verification</Text>

            <Text style={authStyles.title}>Verify Your Number</Text>
            <Text style={authStyles.subtitle}>We've sent a 6-digit code to +234 801 234 5678</Text>

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
            />

            <View style={authStyles.brandFooterBlock}>
              <Text style={authStyles.companyFooterText}>SkyleLight Technologies Ltd</Text>
              <Text style={authStyles.sloganFooterText}>Lighting the way to possibilities</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
