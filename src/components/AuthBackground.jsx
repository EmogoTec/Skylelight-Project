import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';
import { authStyles } from '../styles/authStyles';

export default function AuthBackground() {
  return (
    <>
      {/* ── 1. Top sky wash ──
          Deepest along the top edge, gone by ~36% down. Anchors are pulled
          inward so the fade drifts diagonally instead of straight down. */}
      <LinearGradient
        colors={[theme.colors.skyWashDeep, theme.colors.skyWashMid, theme.colors.white]}
        locations={[0, 0.45, 1]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={authStyles.bgTopWash}
        pointerEvents="none"
      />

      {/* ── 2. Top-right bloom ──
          Sits behind the wordmark. Two passes give a softer falloff than
          one, since React Native has no radial gradient. */}
      <LinearGradient
        colors={[theme.colors.primary + '70', theme.colors.primary + '00']}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={authStyles.bgBloomOuter}
        pointerEvents="none"
      />
      <LinearGradient
        colors={[theme.colors.primary + '55', theme.colors.iceBlue + '00']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={authStyles.bgBloomInner}
        pointerEvents="none"
      />

      {/* ── 3. Bottom wave ──
          A faint arch behind, the main arch in front. Only the top ~34% of
          each dome's box is on screen, so the stops are packed into that
          band: pale at the crest, deepening toward the bottom-left. */}
      <View style={authStyles.bgBottomWrap} pointerEvents="none">
        <LinearGradient
          colors={[theme.colors.waveLight + '00', theme.colors.waveLight]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.4 }}
          style={authStyles.bgWaveFar}
        />
        <LinearGradient
          colors={[theme.colors.waveLight, theme.colors.waveDeep]}
          start={{ x: 0.85, y: 0 }}
          end={{ x: 0.15, y: 0.45 }}
          style={authStyles.bgWaveNear}
        />
      </View>
    </>
  );
}
