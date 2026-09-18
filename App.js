import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Animated,
  Easing,
  StatusBar,
  Image,
  Modal,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

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

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login', 'signup_phone', 'signup_otp', 'signup_details', 'dashboard'

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

function LoginScreen({ onLoginSuccess, onNavigateSignup }) {
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
          {/* Logo and Company Name perfectly side by side */}
          <View style={authStyles.headerContainer}>
            <Image source={require('./assets/skylelight-512.png')} style={authStyles.logo} resizeMode="contain" />
            <View>
              <Text style={authStyles.brandTitleText}>SkyleLight</Text>
              <Text style={authStyles.brandTaglineText}>Data • Airtime • Payments • Investments</Text>
            </View>
          </View>

          <View style={authStyles.contentBox}>
            <Text style={authStyles.title}>Sign In</Text>
            <Text style={authStyles.subtitle}>Sign into your SkyleLight account and enjoy seamless vtu services.</Text>
            
            {error ? <Text style={authStyles.errorText}>{error}</Text> : null}

            <View style={authStyles.inputContainer}>
              <View style={authStyles.inputWithIconRow}>
                <Text style={authStyles.inputIconPrefix}>📱</Text>
                <TextInput
                  style={authStyles.input}
                  placeholder="Email or Phone Number"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="none"
                  value={identifier}
                  onChangeText={setIdentifier}
                  editable={!loading}
                />
              </View>
            </View>

            <View style={authStyles.inputContainer}>
              <View style={authStyles.passwordRow}>
                <Text style={authStyles.inputIconPrefix}>🔒</Text>
                <TextInput
                  style={[authStyles.input, authStyles.passwordInput]}
                  placeholder="Password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  editable={!loading}
                />
                <TouchableOpacity 
                  style={authStyles.eyeButton} 
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={authStyles.eyeIcon}>{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={authStyles.optionsRow}>
              <TouchableOpacity 
                style={authStyles.rememberContainer} 
                activeOpacity={0.8}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View style={[authStyles.checkboxBox, rememberMe && authStyles.checkboxChecked]}>
                  {rememberMe && <Text style={{ color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>✓</Text>}
                </View>
                <Text style={authStyles.rememberText}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}}>
                <Text style={authStyles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={[authStyles.primaryButton, loading && authStyles.buttonDisabled]} 
              onPress={handlePasswordLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6}}>
                  <Text style={authStyles.primaryButtonText}>Sign In</Text>
                  <Text style={{color: '#0F172A', fontSize: 16, fontWeight: 'bold'}}>→</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Real fingerprint button sample */}
            <TouchableOpacity 
              style={authStyles.biometricButton} 
              onPress={handleOpenBiometricPrompt}
              disabled={loading}
            >
              <View style={authStyles.biometricIconBadge}>
                <Text style={{ fontSize: 16 }}>🌐</Text>
              </View>
              <Text style={authStyles.biometricButtonText}>Sign in with Fingerprint</Text>
              <View style={authStyles.secureBadgeTag}>
                <Text style={authStyles.secureBadgeText}>Fast & Secure</Text>
              </View>
            </TouchableOpacity>

            {/* Well organized Account sign up row */}
            <View style={authStyles.accountFooterDivider} />
            
            <View style={authStyles.footerContainer}>
              <Text style={authStyles.footerText}>Don't have an account?</Text>
              <TouchableOpacity style={authStyles.createAccountOutlineBtn} onPress={onNavigateSignup} activeOpacity={0.8}>
                <Text style={{ fontSize: 15 }}>👤+</Text>
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
                  <ActivityIndicator size="large" color="#3DB0D2" />
                ) : (
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 42 }}>🌐</Text>
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

function SignupPhoneScreen({ onBack, onContinue, onLoginLink }) {
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
              <Text style={{ fontSize: 18 }}>←</Text>
            </TouchableOpacity>
          </View>

          <View style={authStyles.headerContainer}>
            <Image source={require('./assets/skylelight-512.png')} style={authStyles.logo} resizeMode="contain" />
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
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  maxLength={11}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  editable={!loading}
                />
              </View>
            </View>

            <Text style={authStyles.infoBoxText}>We'll send you an OTP to verify your number.</Text>

            <TouchableOpacity 
              style={[authStyles.primaryButton, loading && authStyles.buttonDisabled]} 
              onPress={handleContinue}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6}}>
                  <Text style={authStyles.primaryButtonText}>Continue</Text>
                  <Text style={{color: '#0F172A', fontSize: 16, fontWeight: 'bold'}}>→</Text>
                </View>
              )}
            </TouchableOpacity>

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

function SignupOtpScreen({ onBack, onContinue }) {
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
              <Text style={{ fontSize: 18 }}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onBack}>
              <Text style={authStyles.backTextLink}>Back to phone number</Text>
            </TouchableOpacity>
          </View>

          <View style={authStyles.headerContainer}>
            <Image source={require('./assets/skylelight-512.png')} style={authStyles.logo} resizeMode="contain" />
            <View>
              <Text style={authStyles.brandTitleText}>SkyleLight</Text>
              <Text style={authStyles.brandTaglineText}>Data • Airtime • Payments • Investments</Text>
            </View>
          </View>

          <View style={authStyles.contentBox}>
            <View style={authStyles.stepIndicatorRow}>
              <View style={[authStyles.stepDotCompleted]}><Text style={authStyles.stepDotTextCompleted}>✓</Text></View>
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
              <Text style={{ fontSize: 14 }}>🛡️</Text>
              <Text style={authStyles.securityNoticeText}>For your security, this code will expire in 5 minutes.</Text>
            </View>

            <TouchableOpacity 
              style={[authStyles.primaryButton, loading && authStyles.buttonDisabled]} 
              onPress={handleVerify}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6}}>
                  <Text style={authStyles.primaryButtonText}>Continue</Text>
                  <Text style={{color: '#0F172A', fontSize: 16, fontWeight: 'bold'}}>→</Text>
                </View>
              )}
            </TouchableOpacity>

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

function SignupDetailsScreen({ onBack, onSuccess, onLoginLink }) {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateAccount = async () => {
    setError('');
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields marked with *');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    if (onSuccess) onSuccess();
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
              <Text style={{ fontSize: 18 }}>←</Text>
            </TouchableOpacity>
          </View>

          <View style={authStyles.headerContainer}>
            <Image source={require('./assets/skylelight-512.png')} style={authStyles.logo} resizeMode="contain" />
            <View>
              <Text style={authStyles.brandTitleText}>SkyleLight</Text>
              <Text style={authStyles.brandTaglineText}>Data • Airtime • Payments • Investments</Text>
            </View>
          </View>

          <View style={authStyles.contentBox}>
            <View style={authStyles.stepIndicatorRow}>
              <View style={[authStyles.stepDotCompleted]}><Text style={authStyles.stepDotTextCompleted}>✓</Text></View>
              <View style={authStyles.stepLineActive} />
              <View style={[authStyles.stepDotCompleted]}><Text style={authStyles.stepDotTextCompleted}>✓</Text></View>
              <View style={authStyles.stepLineActive} />
              <View style={[authStyles.stepDotActive]}><Text style={authStyles.stepDotTextActive}>3</Text></View>
            </View>
            <Text style={authStyles.stepLabelText}>Step 3 of 3: Your Details</Text>

            <Text style={authStyles.title}>Complete Your Details</Text>
            <Text style={authStyles.subtitle}>Fill in your information to create your account.</Text>

            {error ? <Text style={authStyles.errorText}>{error}</Text> : null}

            <View style={authStyles.inputContainer}>
              <Text style={authStyles.inputLabelText}>First Name*</Text>
              <TextInput
                style={authStyles.standardInput}
                placeholder="Omale"
                placeholderTextColor="#94A3B8"
                value={firstName}
                onChangeText={setFirstName}
                editable={!loading}
              />
            </View>

            <View style={authStyles.inputContainer}>
              <Text style={authStyles.inputLabelText}>Middle Name</Text>
              <TextInput
                style={authStyles.standardInput}
                placeholder="Emmanuel (Optional)"
                placeholderTextColor="#94A3B8"
                value={middleName}
                onChangeText={setMiddleName}
                editable={!loading}
              />
            </View>

            <View style={authStyles.inputContainer}>
              <Text style={authStyles.inputLabelText}>Last Name*</Text>
              <TextInput
                style={authStyles.standardInput}
                placeholder="Eneojo"
                placeholderTextColor="#94A3B8"
                value={lastName}
                onChangeText={setLastName}
                editable={!loading}
              />
            </View>

            <View style={authStyles.inputContainer}>
              <Text style={authStyles.inputLabelText}>Email Address*</Text>
              <TextInput
                style={authStyles.standardInput}
                placeholder="omale@skylelight.com.ng"
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                editable={!loading}
              />
            </View>

            <View style={authStyles.inputContainer}>
              <Text style={authStyles.inputLabelText}>Password*</Text>
              <View style={authStyles.passwordRow}>
                <TextInput
                  style={[authStyles.input, authStyles.passwordInput]}
                  placeholder="Create secure password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  editable={!loading}
                />
                <TouchableOpacity style={authStyles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
                  <Text style={authStyles.eyeIcon}>{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
                </TouchableOpacity>
              </View>
              <Text style={authStyles.passwordHintText}>Password must be at least 8 characters including a number, lower & upper case letters and a special character.</Text>
            </View>

            <View style={authStyles.inputContainer}>
              <Text style={authStyles.inputLabelText}>Confirm Password*</Text>
              <View style={authStyles.passwordRow}>
                <TextInput
                  style={[authStyles.input, authStyles.passwordInput]}
                  placeholder="Confirm password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  editable={!loading}
                />
                <TouchableOpacity style={authStyles.eyeButton} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Text style={authStyles.eyeIcon}>{showConfirmPassword ? "👁️" : "👁️‍🗨️"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={[authStyles.primaryButton, loading && authStyles.buttonDisabled]} 
              onPress={handleCreateAccount}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6}}>
                  <Text style={authStyles.primaryButtonText}>Create Account</Text>
                  <Text style={{color: '#0F172A', fontSize: 16, fontWeight: 'bold'}}>→</Text>
                </View>
              )}
            </TouchableOpacity>

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

function DashboardScreen({ onLogout }) {
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const insets = useSafeAreaInsets();

  const [user, setUser] = useState({
    name: 'Omale Emmanuel',
    initials: 'OE',
    referralCode: 'SKY-OMALEEMMANUEL',
    balance: '75,000.00',
    income: '75,000.00',
    expenses: '28,900.00'
  });

  const scrollAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollAnim, {
        toValue: -350,
        duration: 9000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [scrollAnim]);

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    if (onLogout) onLogout();
  };

  return (
    <View style={dashStyles.container}>
      <View style={[dashStyles.headerBar, { paddingTop: Math.max(insets.top, 10), height: 56 + Math.max(insets.top, 10) } ]}>
        <View style={dashStyles.brandContainer}>
          <Image source={require('./assets/skylelight-512.png')} style={dashStyles.brandLogoImage} resizeMode="contain" />
          <Text style={dashStyles.brandTitle}>SkyleLight</Text>
        </View>
        <View style={dashStyles.headerRightActions}>
          <TouchableOpacity style={dashStyles.headerIconBtn}><Text style={{ fontSize: 15 }}>🌙</Text></TouchableOpacity>
          <TouchableOpacity style={dashStyles.headerIconBtn}><Text style={{ fontSize: 15 }}>🔔</Text></TouchableOpacity>
          <TouchableOpacity style={dashStyles.headerLogoutBtn} onPress={() => setShowLogoutModal(true)} activeOpacity={0.8}>
            <Text style={{ fontSize: 14 }}>🚪</Text>
          </TouchableOpacity>
          <View style={dashStyles.profileAvatarBadge}><Text style={dashStyles.profileInitials}>{user.initials}</Text></View>
        </View>
      </View>

      <ScrollView contentContainerStyle={[dashStyles.scrollContent, { paddingBottom: Math.max(insets.bottom, 20) + 90 }]} showsVerticalScrollIndicator={false}>
        <View style={dashStyles.tickerContainer}>
          <Animated.View style={[dashStyles.tickerTrack, { transform: [{ translateX: scrollAnim }] }]}>
            <Text style={dashStyles.tickerText}>
              📢 Welcome to SkyleLight Technologies Ltd — your No. 1 trusted partner for airtime, data, bills and more.
            </Text>
          </Animated.View>
        </View>

        <View style={dashStyles.greetingSection}>
          <View>
            <Text style={dashStyles.timeGreeting}>Good morning</Text>
            <Text style={dashStyles.userNameText}>Welcome back, {user.name}</Text>
          </View>
          <View style={dashStyles.systemStatusRow}>
            <View style={dashStyles.greenStatusDot} />
            <Text style={dashStyles.systemStatusText}>All systems running</Text>
          </View>
        </View>

        <View style={dashStyles.verificationBanner}>
          <View style={dashStyles.verificationLeft}>
            <Text style={{ fontSize: 16 }}>⚠️</Text>
            <View style={{ flex: 1 }}>
              <Text style={dashStyles.verificationTitle}>Complete account verification</Text>
              <Text style={dashStyles.verificationSub}>Unlock higher limits and more features</Text>
            </View>
          </View>
          <TouchableOpacity style={dashStyles.verifyButton}><Text style={dashStyles.verifyButtonText}>Verify</Text></TouchableOpacity>
        </View>

        <View style={dashStyles.walletCard}>
          <View style={dashStyles.walletHeaderRow}>
            <Text style={dashStyles.walletSectionTitle}>Main wallet balance</Text>
            <TouchableOpacity><Text style={dashStyles.viewHistoryLink}>View history &gt;</Text></TouchableOpacity>
          </View>

          <View style={dashStyles.balanceDisplayRow}>
            <Text style={dashStyles.mainBalanceText}>{balanceVisible ? `₦${user.balance}` : "•••••"}</Text>
            <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)} style={dashStyles.eyeToggleBtn}>
              <Text style={{ fontSize: 18 }}>{balanceVisible ? "👁️" : "👁️‍🗨️"}</Text>
            </TouchableOpacity>
          </View>

          <View style={dashStyles.miniTxBox}>
            <View style={dashStyles.miniTxIconBox}><Text style={{ fontSize: 14 }}>💸</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={dashStyles.miniTxTitle}>Payment received from Omale Emmanuel</Text>
              <Text style={dashStyles.miniTxDate}>Yesterday, 9:50 PM</Text>
            </View>
            <Text style={dashStyles.miniTxAmount}>+₦6,300.00</Text>
          </View>

          <View style={dashStyles.metricsRow}>
            <View style={dashStyles.metricItem}>
              <Text style={dashStyles.metricLabel}>Income / month</Text>
              <Text style={dashStyles.metricIncomeVal}>₦{user.income}</Text>
            </View>
            <View style={dashStyles.metricDivider} />
            <View style={dashStyles.metricItem}>
              <Text style={dashStyles.metricLabel}>Expenses / month</Text>
              <Text style={dashStyles.metricExpenseVal}>₦{user.expenses}</Text>
            </View>
          </View>
        </View>

        <View style={dashStyles.servicesContainer}>
          <View style={dashStyles.servicesHeader}>
            <Text style={dashStyles.servicesMainTitle}>SkyleLight services</Text>
            <Text style={dashStyles.servicesSubTitle}>What would you like to do today?</Text>
          </View>

          <View style={dashStyles.servicesGrid}>
            <ServiceCard icon="📱" label="Buy airtime" bgColor="#FFF3E0" />
            <ServiceCard icon="📶" label="Buy data" bgColor="#E3F2FD" />
            <ServiceCard icon="⚡" label="Pay bills" bgColor="#FCE4EC" />
            <ServiceCard icon="💼" label="Pay salary" bgColor="#FFFDE7" />
            <ServiceCard icon="📈" label="Investments" bgColor="#E8F5E9" />
            <ServiceCard icon="🏦" label="Loans" bgColor="#E0F7FA" />
            <ServiceCard icon="🎮" label="Games" bgColor="#F3E5F5" />
            <ServiceCard icon="🎓" label="WAEC/NECO e-pin" bgColor="#FBE9E7" />
          </View>
        </View>

        <View style={dashStyles.referralCard}>
          <Text style={dashStyles.referralCardTitle}>Invite friends, earn rewards</Text>
          <Text style={dashStyles.referralCardSub}>Share your referral code and earn when someone joins and funds their wallet.</Text>
          
          <View style={dashStyles.referralInputBox}>
            <Text style={dashStyles.referralCodeText}>{user.referralCode}</Text>
            <TouchableOpacity style={dashStyles.copyButton}><Text style={dashStyles.copyButtonText}>📋 Copy code</Text></TouchableOpacity>
          </View>
        </View>

        <View style={dashStyles.logoutSectionCard}>
          <Text style={dashStyles.logoutCardTitle}>Session & Security</Text>
          <Text style={dashStyles.logoutCardSub}>You are currently logged in as {user.name}. Click below to securely sign out.</Text>
          <TouchableOpacity style={dashStyles.fullLogoutButton} onPress={() => setShowLogoutModal(true)} activeOpacity={0.8}>
            <Text style={{ fontSize: 16 }}>🚪</Text>
            <Text style={dashStyles.fullLogoutButtonText}>Log Out of Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={showLogoutModal} transparent={true} animationType="fade">
        <View style={dashStyles.modalOverlay}>
          <View style={dashStyles.modalContent}>
            <View style={dashStyles.modalIconCircle}><Text style={{ fontSize: 28 }}>🚪</Text></View>
            <Text style={dashStyles.modalTitle}>Sign Out</Text>
            <Text style={dashStyles.modalSubtitle}>Are you sure you want to log out from SkyleLight?</Text>
            <View style={dashStyles.modalActionsRow}>
              <TouchableOpacity style={dashStyles.modalCancelBtn} onPress={() => setShowLogoutModal(false)}>
                <Text style={dashStyles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={dashStyles.modalConfirmBtn} onPress={handleLogoutConfirm}>
                <Text style={dashStyles.modalConfirmText}>Yes, Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={[dashStyles.bottomNavBar, { paddingBottom: Math.max(insets.bottom, 8), height: 64 + Math.max(insets.bottom, 8) }]}>
        <BottomNavItem icon="🏠" label="Home" isActive={activeTab === 'Home'} onPress={() => setActiveTab('Home')} />
        <BottomNavItem icon="⏱️" label="History" isActive={activeTab === 'History'} onPress={() => setActiveTab('History')} />
        <BottomNavItem icon="🤝" label="Merchant" isActive={activeTab === 'Merchant'} onPress={() => setActiveTab('Merchant')} />
        <BottomNavItem icon="🎧" label="Support" isActive={activeTab === 'Support'} onPress={() => setActiveTab('Support')} />
        <BottomNavItem icon="⚙️" label="Settings" isActive={activeTab === 'Settings'} onPress={() => setActiveTab('Settings')} />
        <BottomNavItem icon="👤" label="Profile" isActive={activeTab === 'Profile'} onPress={() => { setActiveTab('Profile'); setShowLogoutModal(true); }} />
      </View>
    </View>
  );
}

function ServiceCard({ icon, label, bgColor }) {
  return (
    <TouchableOpacity style={dashStyles.serviceCardItem}>
      <View style={[dashStyles.serviceIconCircle, { backgroundColor: bgColor }]}>
        <Text style={{ fontSize: 24 }}>{icon}</Text>
      </View>
      <Text style={dashStyles.serviceItemLabel} numberOfLines={2}>{label}</Text>
    </TouchableOpacity>
  );
}

function BottomNavItem({ icon, label, isActive, onPress }) {
  return (
    <TouchableOpacity style={dashStyles.bottomNavTab} onPress={onPress}>
      <Text style={{ fontSize: 19 }}>{icon}</Text>
      <Text style={[dashStyles.bottomNavText, isActive && dashStyles.bottomNavTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const authStyles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: '#E6F9FF' },
  headerGraphicContainer: { position: 'absolute', top: 0, left: 0, right: 0, height: 280, overflow: 'hidden' },
  abstractBlobOne: { position: 'absolute', top: -40, right: -20, width: 280, height: 220, backgroundColor: '#BCE9F7', borderRadius: 140, opacity: 0.6 },
  abstractBlobTwo: { position: 'absolute', top: 20, right: 80, width: 180, height: 150, backgroundColor: '#3DB0D2', borderRadius: 90, opacity: 0.15 },
  container: { flex: 1, backgroundColor: 'transparent' },
  scrollContainer: { flexGrow: 1, padding: 20, paddingTop: 40, paddingBottom: 50 },
  topNavBarRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  backArrowButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#BCE9F7' },
  backTextLink: { fontSize: 13, color: '#3DB0D2', fontWeight: 'bold' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 24 },
  logo: { width: 48, height: 48, borderRadius: 12 },
  brandTitleText: { fontSize: 22, fontWeight: 'bold', color: '#1E293B', letterSpacing: -0.5, lineHeight: 26 },
  brandTaglineText: { fontSize: 10, color: '#64748B', fontWeight: '500' },
  contentBox: { width: '100%', maxWidth: 420, alignSelf: 'center', backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#BCE9F7', shadowColor: '#3DB0D2', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 },
  stepIndicatorRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  stepDotActive: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#3DB0D2', justifyContent: 'center', alignItems: 'center' },
  stepDotTextActive: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  stepDotInactive: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#CBD5E1' },
  stepDotTextInactive: { color: '#64748B', fontSize: 12, fontWeight: 'bold' },
  stepDotCompleted: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#22C55E', justifyContent: 'center', alignItems: 'center' },
  stepDotTextCompleted: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  stepLine: { width: 35, height: 2, backgroundColor: '#CBD5E1', marginHorizontal: 4 },
  stepLineActive: { width: 35, height: 2, backgroundColor: '#3DB0D2', marginHorizontal: 4 },
  stepLabelText: { fontSize: 11, color: '#64748B', textAlign: 'center', marginBottom: 18, fontWeight: '600' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 6, color: '#1E293B' },
  subtitle: { fontSize: 13, color: '#64748B', marginBottom: 20, lineHeight: 18 },
  errorText: { color: '#E53E3E', marginBottom: 15, textAlign: 'center', fontSize: 13, fontWeight: '600' },
  inputContainer: { width: '100%', marginBottom: 16 },
  inputLabelText: { fontSize: 12, fontWeight: 'bold', color: '#1E293B', marginBottom: 6 },
  inputWithIconRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 12, height: 52 },
  inputIconPrefix: { fontSize: 16, marginRight: 10 },
  input: { paddingVertical: 8, fontSize: 14, color: '#1E293B', flex: 1, height: '100%' },
  standardInput: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 14, height: 50, fontSize: 14, color: '#1E293B' },
  passwordRow: { flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 12, height: 52 },
  passwordInput: { borderBottomWidth: 0, borderColor: 'transparent' },
  eyeButton: { padding: 6, justifyContent: 'center', alignItems: 'center' },
  eyeIcon: { fontSize: 16 },
  passwordHintText: { fontSize: 11, color: '#64748B', marginTop: 6, lineHeight: 15 },
  phoneInputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, height: 52, overflow: 'hidden' },
  countryCodeBox: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, backgroundColor: '#E6F9FF', height: '100%', borderRightWidth: 1, borderRightColor: '#CBD5E1', gap: 6 },
  countryCodeText: { fontSize: 14, fontWeight: 'bold', color: '#1E293B' },
  phoneInputField: { flex: 1, paddingHorizontal: 12, fontSize: 14, color: '#1E293B', height: '100%' },
  infoBoxText: { fontSize: 12, color: '#64748B', marginBottom: 20, fontStyle: 'italic' },
  otpContainerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  otpBox: { width: 45, height: 52, borderRadius: 10, borderWidth: 1.5, borderColor: '#CBD5E1', backgroundColor: '#F8FAFC', textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
  otpBoxActive: { borderColor: '#3DB0D2', backgroundColor: '#E6F9FF' },
  resendRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 20 },
  resendTextPrompt: { fontSize: 12, color: '#64748B' },
  resendActionLink: { fontSize: 12, color: '#3DB0D2', fontWeight: 'bold' },
  countdownText: { fontSize: 11, color: '#94A3B8' },
  securityNoticeBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E6F9FF', borderWidth: 1, borderColor: '#BCE9F7', borderRadius: 10, padding: 10, gap: 8, marginBottom: 20 },
  securityNoticeText: { fontSize: 11, color: '#006064', flex: 1, fontWeight: '500' },
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, marginTop: 2 },
  rememberContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkboxBox: { width: 18, height: 18, borderRadius: 4, borderWidth: 1.5, borderColor: '#3DB0D2', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  checkboxChecked: { backgroundColor: '#3DB0D2' },
  rememberText: { fontSize: 13, color: '#334155', fontWeight: '500' },
  forgotText: { fontSize: 13, color: '#3DB0D2', fontWeight: '600' },
  primaryButton: { backgroundColor: '#3DB0D2', height: 52, borderRadius: 12, justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 14, shadowColor: '#3DB0D2', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 2 },
  buttonDisabled: { backgroundColor: '#CBD5E1' },
  primaryButtonText: { color: '#0F172A', fontSize: 16, fontWeight: 'bold' },
  biometricButton: { width: '100%', height: 50, borderRadius: 12, borderWidth: 1, borderColor: '#BCE9F7', backgroundColor: '#E6F9FF', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 18 },
  biometricIconBadge: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#BCE9F7' },
  biometricButtonText: { color: '#1E293B', fontSize: 13, fontWeight: '600', flex: 1 },
  secureBadgeTag: { backgroundColor: '#FFFFFF', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginRight: 4, borderWidth: 1, borderColor: '#BCE9F7' },
  secureBadgeText: { fontSize: 10, color: '#3DB0D2', fontWeight: 'bold' },
  accountFooterDivider: { height: 1, backgroundColor: '#F1F5F9', width: '100%', marginBottom: 16 },
  footerContainer: { alignItems: 'center', width: '100%', marginBottom: 16, justifyContent: 'center' },
  footerText: { fontSize: 12, color: '#64748B', marginBottom: 10 },
  linkTextInline: { fontSize: 13, color: '#3DB0D2', fontWeight: 'bold' },
  createAccountOutlineBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', height: 48, borderRadius: 12, borderWidth: 1.5, borderColor: '#3DB0D2', backgroundColor: '#FFFFFF', gap: 8 },
  linkText: { fontSize: 14, color: '#3DB0D2', fontWeight: 'bold' },
  brandFooterBlock: { alignItems: 'center', marginTop: 6, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 14 },
  companyFooterText: { fontSize: 11, color: '#64748B', textAlign: 'center', fontWeight: 'bold' },
  sloganFooterText: { fontSize: 10, color: '#3DB0D2', textAlign: 'center', fontWeight: '600', marginTop: 2 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '85%', maxWidth: 340, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 8 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 8, textAlign: 'center' },
  modalSubtitle: { fontSize: 13, color: '#64748B', textAlign: 'center', marginBottom: 25, lineHeight: 18 },
  fingerprintIconCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#E6F9FF', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#3DB0D2', marginBottom: 15, position: 'relative' },
  fingerprintRingPulse: { position: 'absolute', width: 104, height: 104, borderRadius: 52, borderWidth: 1, borderColor: '#3DB0D2', opacity: 0.4 },
  tapInstructionText: { fontSize: 12, color: '#64748B', marginBottom: 20, fontStyle: 'italic' },
  modalCancelButton: { paddingVertical: 10, paddingHorizontal: 20 },
  modalCancelText: { color: '#E53E3E', fontSize: 14, fontWeight: 'bold' }
});

const dashStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { flexGrow: 1, paddingTop: 6 },
  headerBar: { backgroundColor: '#FFFFFF', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  brandContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandLogoImage: { width: 32, height: 32, borderRadius: 8 },
  brandTitle: { fontSize: 18, fontWeight: 'bold', color: '#0F172A' },
  headerRightActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerIconBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  headerLogoutBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFEBEE', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FFCDD2' },
  profileAvatarBadge: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#3DB0D2', justifyContent: 'center', alignItems: 'center' },
  profileInitials: { color: '#0F172A', fontWeight: 'bold', fontSize: 12 },
  tickerContainer: { backgroundColor: '#E6F9FF', paddingVertical: 8, overflow: 'hidden', borderBottomWidth: 1, borderBottomColor: '#BCE9F7' },
  tickerTrack: { flexDirection: 'row', paddingLeft: 20 },
  tickerText: { fontSize: 12, color: '#006064', fontWeight: '500' },
  greetingSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, marginTop: 14 },
  timeGreeting: { fontSize: 12, color: '#64748B' },
  userNameText: { fontSize: 17, fontWeight: 'bold', color: '#0F172A' },
  systemStatusRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  greenStatusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' },
  systemStatusText: { fontSize: 12, color: '#22C55E', fontWeight: '600' },
  verificationBanner: { marginHorizontal: 18, marginTop: 14, backgroundColor: '#FFFBEB', borderWidth: 1, borderColor: '#FEF3C7', borderRadius: 12, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  verificationLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  verificationTitle: { fontSize: 13, fontWeight: 'bold', color: '#92400E' },
  verificationSub: { fontSize: 11, color: '#B45309', marginTop: 2 },
  verifyButton: { backgroundColor: '#D97706', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  verifyButtonText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  walletCard: { marginHorizontal: 18, marginTop: 14, backgroundColor: '#3DB0D2', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 4 },
  walletHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  walletSectionTitle: { fontSize: 13, color: '#E6F9FF', fontWeight: '600' },
  viewHistoryLink: { fontSize: 12, color: '#E6F9FF', fontWeight: 'bold' },
  balanceDisplayRow: { marginTop: 10, marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 12 },
  mainBalanceText: { fontSize: 30, fontWeight: 'bold', color: '#0F172A' },
  eyeToggleBtn: { padding: 4 },
  miniTxBox: { backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: 10, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  miniTxIconBox: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  miniTxTitle: { fontSize: 12, fontWeight: 'bold', color: '#0F172A' },
  miniTxDate: { fontSize: 10, color: '#E6F9FF', marginTop: 2 },
  miniTxAmount: { fontSize: 12, fontWeight: 'bold', color: '#064E3B' },
  metricsRow: { flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, justifyContent: 'space-between', alignItems: 'center' },
  metricItem: { flex: 1, alignItems: 'center' },
  metricLabel: { fontSize: 10, color: '#E6F9FF', marginBottom: 3 },
  metricIncomeVal: { fontSize: 13, fontWeight: 'bold', color: '#0F172A' },
  metricExpenseVal: { fontSize: 13, fontWeight: 'bold', color: '#7F1D1D' },
  metricDivider: { width: 1, height: '80%', backgroundColor: 'rgba(255,255,255,0.3)' },
  servicesContainer: { marginHorizontal: 18, marginTop: 14, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  servicesHeader: { marginBottom: 12 },
  servicesMainTitle: { fontSize: 17, fontWeight: 'bold', color: '#0F172A' },
  servicesSubTitle: { fontSize: 11, color: '#64748B', marginTop: 2 },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 14 },
  serviceCardItem: { width: '22%', alignItems: 'center' },
  serviceIconCircle: { width: 52, height: 52, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  serviceItemLabel: { fontSize: 11, color: '#334155', textAlign: 'center', fontWeight: '500' },
  referralCard: { marginHorizontal: 18, marginTop: 14, backgroundColor: '#0F172A', borderRadius: 16, padding: 16 },
  referralCardTitle: { fontSize: 17, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  referralCardSub: { fontSize: 11, color: '#94A3B8', marginBottom: 12, lineHeight: 16 },
  referralInputBox: { backgroundColor: '#1E293B', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 14, paddingRight: 8, paddingVertical: 8 },
  referralCodeText: { fontSize: 13, fontWeight: 'bold', color: '#3DB0D2', letterSpacing: 1 },
  copyButton: { backgroundColor: '#3DB0D2', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  copyButtonText: { color: '#0F172A', fontSize: 11, fontWeight: 'bold' },
  logoutSectionCard: { marginHorizontal: 18, marginTop: 14, backgroundColor: '#FFF5F5', borderWidth: 1, borderColor: '#FED7D7', borderRadius: 16, padding: 16 },
  logoutCardTitle: { fontSize: 16, fontWeight: 'bold', color: '#C53030', marginBottom: 4 },
  logoutCardSub: { fontSize: 11, color: '#718096', marginBottom: 14, lineHeight: 16 },
  fullLogoutButton: { backgroundColor: '#E53E3E', height: 46, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  fullLogoutButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  bottomNavBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#E2E8F0', elevation: 10 },
  bottomNavTab: { alignItems: 'center', justifyContent: 'center', flex: 1, height: '100%' },
  bottomNavText: { fontSize: 11, color: '#64748B', marginTop: 3 },
  bottomNavTextActive: { color: '#3DB0D2', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '85%', maxWidth: 340, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 8 },
  modalIconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFEBEE', justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 6 },
  modalSubtitle: { fontSize: 13, color: '#64748B', textAlign: 'center', marginBottom: 24, lineHeight: 18 },
  modalActionsRow: { flexDirection: 'row', gap: 12, width: '100%' },
  modalCancelBtn: { flex: 1, height: 44, borderRadius: 10, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  modalCancelText: { fontSize: 14, fontWeight: 'bold', color: '#475569' },
  modalConfirmBtn: { flex: 1, height: 44, borderRadius: 10, backgroundColor: '#E53E3E', justifyContent: 'center', alignItems: 'center' },
  modalConfirmText: { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' }
});