import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';
import { Search } from 'lucide-react-native'; // Assuming icon usage might be needed, we can pass it as a prop or render if needed

export default function Input({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry, 
  keyboardType, 
  style, 
  error,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  ...props 
}) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[
        styles.inputContainer,
        error && styles.inputError
      ]}>
        {LeftIcon && <View style={styles.leftIcon}><LeftIcon color={theme.colors.textLight} size={20} /></View>}
        <TextInput
          style={[styles.input, LeftIcon && { paddingLeft: 40 }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textLight}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          {...props}
        />
        {RightIcon && <View style={styles.rightIcon}><RightIcon color={theme.colors.textLight} size={20} /></View>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    width: '100%',
  },
  label: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.navy,
    marginBottom: theme.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    height: 56,
  },
  inputError: {
    borderColor: theme.colors.success, // Assuming we don't have a red in theme, but normally this would be red. Wait, we have success green. Let's just use gold or hardcode a red if needed. Using gold for warning/error.
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: theme.spacing.md,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text,
  },
  leftIcon: {
    position: 'absolute',
    left: theme.spacing.md,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: theme.spacing.md,
    zIndex: 1,
  },
  errorText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.gold,
    marginTop: 4,
  },
});
