import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { theme } from '../theme/theme';
import Button from '../components/Button';
import { authStyles } from '../styles/authStyles';

export default function SignupPhoneScreen({ onBack, onContinue, onLoginLink }) {
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
              <View style={[authStyles.stepDotActive]}><Text style={authStyles.stepDotTextActive}>1</Text></View>
              <View style={authStyles.stepLine} />
              <View style={[authStyles.stepDotInactive]}><Text style={authStyles.stepDotTextInactive}>2</Text></View>
              <View style={authStyles.stepLine} />
              <View style={[authStyles.stepDotInactive]}><Text style={authStyles.stepDotTextInactive}>3</Text></View>
            </View>
            <Text style={authStyles.stepLabelText}>Step 1 of 3: Phone Number</Text>

            <Text style={authStyles.title}>Create Account</Text>
            <Text style={authStyles.subtitle}>Enter your phone number to get started.</Text>

            {error ? <Text style={authStyles.errorText}>{error}</Text> : null}

            <View style={authStyles.inputContainer}>
              <View style={authStyles.phoneInputWrapper}>
                <View style={authStyles.countryCodeBox}>
                  <Text style={{ fontSize: 16 }}>🇳🇬</Text>
                  <Text style={authStyles.countryCodeText}>+234</Text>
                </View>
                <TextInput
                  style={authStyles.phoneInputField}
                  placeholder="8012345678"
                  placeholderTextColor={theme.colors.textLight}
                  keyboardType="phone-pad"
                  maxLength={11}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  editable={!loading}
                />
              </View>
            </View>

            <Text style={authStyles.infoBoxText}>We'll send you an OTP to verify your number.</Text>

            <Button 
              title="Continue" 
              onPress={handleContinue} 
              loading={loading} 
            />

            <View style={authStyles.footerContainer}>
              <Text style={authStyles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={onLoginLink}>
                <Text style={authStyles.linkTextInline}>Login</Text>
              </TouchableOpacity>
            </View>

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
