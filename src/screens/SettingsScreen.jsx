import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Modal } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, LogOut, Copy, Moon, User, Bell } from 'lucide-react-native';

import { theme } from '../theme/theme';
import { dashStyles } from '../styles/dashStyles';

export default function SettingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Mocked toggle

  const user = {
    name: 'Omale Emmanuel',
    initials: 'OE',
    referralCode: 'SKY-OMALEEMMANUEL'
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    navigation.replace('Login');
  };

  return (
    <View style={dashStyles.container}>
      {/* Header */}
      <View style={[dashStyles.headerBar, { paddingTop: Math.max(insets.top, 10), height: 56 + Math.max(insets.top, 10) }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 4 }}>
            <ArrowLeft size={24} color={theme.colors.navy} />
          </TouchableOpacity>
          <Text style={dashStyles.brandTitle}>Settings</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={dashStyles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Card */}
        <View style={{ marginHorizontal: 18, marginTop: 14, backgroundColor: theme.colors.white, borderRadius: theme.borderRadius.lg, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16, borderWidth: 1, borderColor: theme.colors.border }}>
          <View style={[dashStyles.profileAvatarBadge, { width: 60, height: 60, borderRadius: 30 }]}>
            <Text style={[dashStyles.profileInitials, { fontSize: 22 }]}>{user.initials}</Text>
          </View>
          <View>
            <Text style={[dashStyles.userNameText, { fontSize: 18 }]}>{user.name}</Text>
            <Text style={{ fontSize: 13, color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular }}>Personal Account</Text>
          </View>
        </View>

        {/* Preferences */}
        <View style={{ marginHorizontal: 18, marginTop: 14 }}>
          <Text style={{ fontSize: 14, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.textLight, marginBottom: 8, marginLeft: 4 }}>PREFERENCES</Text>
          
          <View style={{ backgroundColor: theme.colors.white, borderRadius: theme.borderRadius.lg, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={[dashStyles.headerIconBtn, { backgroundColor: theme.colors.iceBlue }]}>
                  <Moon size={18} color={theme.colors.navy} />
                </View>
                <Text style={{ fontSize: 15, fontFamily: theme.typography.fontFamily.semiBold, color: theme.colors.navy }}>Dark Mode</Text>
              </View>
              <Switch 
                value={isDarkMode} 
                onValueChange={setIsDarkMode} 
                trackColor={{ false: theme.colors.gray, true: theme.colors.primary }}
                thumbColor={theme.colors.white}
              />
            </View>

            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={[dashStyles.headerIconBtn, { backgroundColor: theme.colors.iceBlue }]}>
                  <Bell size={18} color={theme.colors.navy} />
                </View>
                <Text style={{ fontSize: 15, fontFamily: theme.typography.fontFamily.semiBold, color: theme.colors.navy }}>Notifications</Text>
              </View>
              <Text style={{ fontSize: 14, color: theme.colors.textLight }}>Enabled</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Referral Card from Dashboard */}
        <View style={dashStyles.referralCard}>
          <Text style={dashStyles.referralCardTitle}>Invite friends, earn rewards</Text>
          <Text style={dashStyles.referralCardSub}>Share your referral code and earn when someone joins and funds their wallet.</Text>
          
          <View style={dashStyles.referralInputBox}>
            <Text style={dashStyles.referralCodeText}>{user.referralCode}</Text>
            <TouchableOpacity style={dashStyles.copyButton}>
              <Copy size={14} color={theme.colors.navy} />
              <Text style={dashStyles.copyButtonText}>Copy code</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Security / Logout */}
        <View style={dashStyles.logoutSectionCard}>
          <Text style={dashStyles.logoutCardTitle}>Session & Security</Text>
          <Text style={dashStyles.logoutCardSub}>You are currently logged in as {user.name}. Click below to securely sign out.</Text>
          <TouchableOpacity style={dashStyles.fullLogoutButton} onPress={() => setShowLogoutModal(true)} activeOpacity={0.8}>
            <LogOut size={18} color={theme.colors.white} />
            <Text style={dashStyles.fullLogoutButtonText}>Log Out of Account</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Logout Modal */}
      <Modal visible={showLogoutModal} transparent={true} animationType="fade">
        <View style={dashStyles.modalOverlay}>
          <View style={dashStyles.modalContent}>
            <View style={dashStyles.modalIconCircle}>
              <LogOut size={28} color="#E53E3E" />
            </View>
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
    </View>
  );
}
