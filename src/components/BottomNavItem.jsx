import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { dashStyles } from '../styles/dashStyles';
import * as LucideIcons from 'lucide-react-native';
import { theme } from '../theme/theme';

export default function BottomNavItem({ iconName, label, isActive, onPress }) {
  const IconComponent = LucideIcons[iconName];
  const iconColor = isActive ? theme.colors.primary : theme.colors.textLight;

  return (
    <TouchableOpacity style={dashStyles.bottomNavTab} onPress={onPress}>
      {IconComponent ? <IconComponent size={22} color={iconColor} /> : null}
      <Text style={[dashStyles.bottomNavText, isActive && dashStyles.bottomNavTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}