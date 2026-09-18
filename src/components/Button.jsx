import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../theme/theme';

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  style, 
  textStyle, 
  disabled, 
  loading,
  rightIcon,
  leftIcon,
}) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.gray;
    if (isPrimary) return theme.colors.primary;
    if (isSecondary) return theme.colors.secondary;
    if (isOutline) return theme.colors.transparent;
    return theme.colors.primary;
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.textLight;
    if (isOutline) return theme.colors.navy;
    return theme.colors.white;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        isOutline && styles.outlineStyle,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <View style={styles.contentRow}>
          {leftIcon && <View style={styles.iconWrapper}>{leftIcon}</View>}
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
            {title}
          </Text>
          {rightIcon && <View style={styles.iconWrapper}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
  },
  outlineStyle: {
    borderWidth: 1.5,
    borderColor: theme.colors.navy,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.sizes.md,
  },
});
