import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, ArrowRight, Info, ChevronDown } from 'lucide-react-native';
import { theme } from '../theme/theme';
import Button from '../components/Button';
import AuthBackground from '../components/AuthBackground';
import { authStyles } from '../styles/authStyles';

export default function SignupPhoneScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setError('');
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid Nigerian phone number');
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    navigation.navigate('SignupOtp', { phoneNumber });
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

          <Text style={authStyles.title}>Create Account</Text>
          <Text style={authStyles.subtitle}>Enter your phone number to get started.</Text>

          {/* Step Indicator with Labels */}
          <View style={authStyles.stepIndicatorRow}>
            <View style={authStyles.stepColumn}>
              <View style={authStyles.stepDotActive}><Text style={authStyles.stepDotTextActive}>1</Text></View>
              <Text style={authStyles.stepLabelActive}>Phone Number</Text>
            </View>
            <View style={authStyles.stepLine} />
            <View style={authStyles.stepColumn}>
              <View style={authStyles.stepDotInactive}><Text style={authStyles.stepDotTextInactive}>2</Text></View>
              <Text style={authStyles.stepLabelInactive}>OTP</Text>
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

          {/* Phone Number Input */}
          <Text style={authStyles.inputLabelText}>Phone Number</Text>
          <View style={authStyles.inputContainer}>
            <View style={authStyles.phoneInputWrapper}>
              <View style={authStyles.countryCodeBox}>
                <Text style={{ fontSize: 18 }}>🇳🇬</Text>
                <Text style={authStyles.countryCodeText}>+234</Text>
                <ChevronDown size={14} color={theme.colors.textLight} />
              </View>
              <TextInput
                style={authStyles.phoneInputField}
                placeholder="Enter phone number"
                placeholderTextColor={theme.colors.textLight}
                keyboardType="phone-pad"
                maxLength={11}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                editable={!loading}
              />
            </View>
          </View>

          {/* Info text */}
          <View style={authStyles.infoRow}>
            <Info size={14} color={theme.colors.primary} />
            <Text style={authStyles.infoBoxText}>We'll send you an OTP to verify your number.</Text>
          </View>

          {/* Continue Button */}
          <Button
            title="Continue"
            onPress={handleContinue}
            loading={loading}
            rightIcon={<ArrowRight size={18} color={theme.colors.white} />}
          />

          {/* Footer */}
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
