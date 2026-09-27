import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Fingerprint } from 'lucide-react-native';
import * as LocalAuthentication from 'expo-local-authentication';

import { theme } from '../theme/theme';
import Button from '../components/Button';
import AuthBackground from '../components/AuthBackground';
import { authStyles } from '../styles/authStyles';

export default function BiometricScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEnable = async () => {
    setError('');
    setLoading(true);

    let enabled = false;

    try {
      const [hasHardware, isEnrolled] = await Promise.all([
        LocalAuthentication.hasHardwareAsync(),
        LocalAuthentication.isEnrolledAsync(),
      ]);

      if (!hasHardware || !isEnrolled) {
        setError(
          'Biometrics are not set up on this device yet. You can turn them on later in Settings.'
        );
      } else {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Enable biometric login for SkyleLight',
          fallbackLabel: 'Use Passcode',
          disableDeviceFallback: false,
        });

        if (result.success) {
          enabled = true;
        } else {
          setError('Biometric setup was cancelled.');
        }
      }
    } catch (e) {
      setError('Something went wrong enabling biometrics. Please try again.');
      console.log(e);
    }

    setLoading(false);

    // Persisting the preference needs @react-native-async-storage/async-storage,
    // which this project doesn't install yet.
    if (enabled) {
      navigation.replace('Dashboard');
    }
  };

  return (
    <View style={authStyles.outerContainer}>
      <AuthBackground />

      <View style={authStyles.biometricContainer}>
        <View style={authStyles.biometricHero}>
          <View style={authStyles.biometricHeroGlow} pointerEvents="none" />
          <View style={authStyles.biometricHeroRing} pointerEvents="none" />

          <View style={authStyles.lockWrap}>
            <View style={authStyles.lockShackle} />
            <LinearGradient
              colors={[theme.colors.primaryGradientStart, theme.colors.primaryGradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={authStyles.lockBody}
            >
              <Fingerprint size={76} color={theme.colors.white} strokeWidth={1.6} />
            </LinearGradient>
            <View style={authStyles.pinPill}>
              {[0, 1, 2, 3].map((i) => (
                <View key={i} style={authStyles.pinDot} />
              ))}
            </View>
          </View>
        </View>

        <View style={authStyles.biometricCopyBlock}>
          <Text style={authStyles.biometricTitle}>Login with biometrics</Text>
          <Text style={authStyles.biometricBody}>
            You can use your face or fingerprint instead of your password for
            quick access and extra security.
          </Text>
        </View>

        <View style={authStyles.biometricActions}>
          {error ? <Text style={authStyles.errorText}>{error}</Text> : null}

          <Button title="Enable" onPress={handleEnable} loading={loading} />

          <TouchableOpacity
            style={authStyles.biometricSkipBtn}
            onPress={() => navigation.replace('Dashboard')}
            disabled={loading}
          >
            <Text style={authStyles.biometricSkipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
