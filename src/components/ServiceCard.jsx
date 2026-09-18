import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { dashStyles } from '../styles/dashStyles';
import * as LucideIcons from 'lucide-react-native';

export default function ServiceCard({ iconName, label, bgColor, iconColor }) {
  const IconComponent = LucideIcons[iconName];
  
  return (
    <TouchableOpacity style={dashStyles.serviceCardItem}>
      <View style={[dashStyles.serviceIconCircle, { backgroundColor: bgColor }]}>
        {IconComponent ? <IconComponent size={24} color={iconColor || '#000'} /> : null}
      </View>
      <Text style={dashStyles.serviceItemLabel} numberOfLines={2}>{label}</Text>
    </TouchableOpacity>
  );
}