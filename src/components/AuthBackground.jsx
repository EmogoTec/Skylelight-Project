import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';
import { authStyles } from '../styles/authStyles';

export default function AuthBackground() {
  return (
    <>
      {/* Top-right cyan gradient blob */}
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.iceBlue]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={authStyles.topRightBlob}
        pointerEvents="none"
      />
      <LinearGradient
        colors={[theme.colors.primary, 'transparent']}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={authStyles.topRightBlobInner}
        pointerEvents="none"
      />

      {/* Bottom wavy cyan pattern */}
      <View style={authStyles.bottomWaveContainer} pointerEvents="none">
        <LinearGradient
          colors={[theme.colors.iceBlue, theme.colors.primary + '30']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={authStyles.bottomWaveCurve}
        />
      </View>
    </>
  );
}
