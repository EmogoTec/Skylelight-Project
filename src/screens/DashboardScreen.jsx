import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Easing, StatusBar, Image, Modal, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Moon, Bell, LogOut, Megaphone, AlertTriangle, Eye, EyeOff, ArrowDownLeft, Copy, ChevronRight, PlusCircle, MinusCircle } from 'lucide-react-native';

import { theme } from '../theme/theme';
import { dashStyles } from '../styles/dashStyles';
import ServiceCard from '../components/ServiceCard';
import BottomNavItem from '../components/BottomNavItem';

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

export default function DashboardScreen({ onLogout }) {
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
          <Image source={require('../../assets/icon.png')} style={dashStyles.brandLogoImage} resizeMode="contain" />
          <Text style={dashStyles.brandTitle}>SkyleLight</Text>
        </View>
        <View style={dashStyles.headerRightActions}>
          <TouchableOpacity style={dashStyles.headerIconBtn}>
            <Moon size={18} color={theme.colors.navy} />
          </TouchableOpacity>
          <TouchableOpacity style={dashStyles.headerIconBtn}>
            <Bell size={18} color={theme.colors.navy} />
          </TouchableOpacity>
          <TouchableOpacity style={dashStyles.headerLogoutBtn} onPress={() => setShowLogoutModal(true)} activeOpacity={0.8}>
            <LogOut size={16} color="#E53E3E" />
          </TouchableOpacity>
          <View style={dashStyles.profileAvatarBadge}>
            <Text style={dashStyles.profileInitials}>{user.initials}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={[dashStyles.scrollContent, { paddingBottom: Math.max(insets.bottom, 20) + 90 }]} showsVerticalScrollIndicator={false}>
        <View style={dashStyles.tickerContainer}>
          <Animated.View style={[dashStyles.tickerTrack, { transform: [{ translateX: scrollAnim }] }]}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
              <Megaphone size={14} color={theme.colors.primary} />
              <Text style={dashStyles.tickerText}>
                Welcome to SkyleLight Technologies Ltd — your No. 1 trusted partner for airtime, data, bills and more.
              </Text>
            </View>
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
            <AlertTriangle size={20} color="#D97706" />
            <View style={{ flex: 1 }}>
              <Text style={dashStyles.verificationTitle}>Complete account verification</Text>
              <Text style={dashStyles.verificationSub}>Unlock higher limits and more features</Text>
            </View>
          </View>
          <TouchableOpacity style={dashStyles.verifyButton}><Text style={dashStyles.verifyButtonText}>Verify</Text></TouchableOpacity>
        </View>

        <LinearGradient
          colors={[theme.colors.primaryGradientStart, theme.colors.primaryGradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={dashStyles.walletCard}
        >
          <View style={dashStyles.walletHeaderRow}>
            <Text style={dashStyles.walletSectionTitle}>Main wallet balance</Text>
            <TouchableOpacity style={dashStyles.viewHistoryLink}>
              <Text style={{ fontSize: 12, color: theme.colors.white, fontFamily: theme.typography.fontFamily.bold, marginRight: 2 }}>View history</Text>
              <ChevronRight size={14} color={theme.colors.white} />
            </TouchableOpacity>
          </View>

          <View style={dashStyles.balanceDisplayRow}>
            <Text style={dashStyles.mainBalanceText}>{balanceVisible ? `₦${user.balance}` : "••••••••"}</Text>
            <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)} style={dashStyles.eyeToggleBtn}>
              {balanceVisible ? <Eye size={20} color={theme.colors.white} /> : <EyeOff size={20} color={theme.colors.white} />}
            </TouchableOpacity>
          </View>

          <View style={dashStyles.walletActionsRow}>
            <TouchableOpacity style={dashStyles.walletActionButton}>
              <PlusCircle size={18} color={theme.colors.white} />
              <Text style={dashStyles.walletActionText}>Top Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={dashStyles.walletActionButton}>
              <MinusCircle size={18} color={theme.colors.white} />
              <Text style={dashStyles.walletActionText}>Withdraw</Text>
            </TouchableOpacity>
          </View>

          <View style={dashStyles.miniTxBox}>
            <View style={dashStyles.miniTxIconBox}>
              <ArrowDownLeft size={18} color={theme.colors.success} />
            </View>
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
        </LinearGradient>

        <View style={dashStyles.servicesContainer}>
          <View style={dashStyles.servicesHeader}>
            <Text style={dashStyles.servicesMainTitle}>SkyleLight services</Text>
            <Text style={dashStyles.servicesSubTitle}>What would you like to do today?</Text>
          </View>

          <View style={dashStyles.servicesGrid}>
            <ServiceCard iconName="Phone" label="Airtime" bgColor="#FFF3E0" iconColor="#E65100" />
            <ServiceCard iconName="Wifi" label="Data" bgColor="#E3F2FD" iconColor="#0277BD" />
            <ServiceCard iconName="Zap" label="Pay bills" bgColor="#FCE4EC" iconColor="#AD1457" />
            <ServiceCard iconName="Briefcase" label="Pay salary" bgColor="#FFFDE7" iconColor="#F57F17" />
            <ServiceCard iconName="TrendingUp" label="Investments" bgColor="#E8F5E9" iconColor="#2E7D32" />
            <ServiceCard iconName="Landmark" label="Loans" bgColor="#E0F7FA" iconColor="#006064" />
            <ServiceCard iconName="Gamepad2" label="Games" bgColor="#F3E5F5" iconColor="#6A1B9A" />
            <ServiceCard iconName="GraduationCap" label="E-pin" bgColor="#FBE9E7" iconColor="#D84315" />
          </View>
        </View>

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

        <View style={dashStyles.logoutSectionCard}>
          <Text style={dashStyles.logoutCardTitle}>Session & Security</Text>
          <Text style={dashStyles.logoutCardSub}>You are currently logged in as {user.name}. Click below to securely sign out.</Text>
          <TouchableOpacity style={dashStyles.fullLogoutButton} onPress={() => setShowLogoutModal(true)} activeOpacity={0.8}>
            <LogOut size={18} color={theme.colors.white} />
            <Text style={dashStyles.fullLogoutButtonText}>Log Out of Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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

      <View style={[dashStyles.bottomNavBar, { paddingBottom: Math.max(insets.bottom, 8), height: 64 + Math.max(insets.bottom, 8) }]}>
        <BottomNavItem iconName="Home" label="Home" isActive={activeTab === 'Home'} onPress={() => setActiveTab('Home')} />
        <BottomNavItem iconName="Clock" label="History" isActive={activeTab === 'History'} onPress={() => setActiveTab('History')} />
        <BottomNavItem iconName="Store" label="Merchant" isActive={activeTab === 'Merchant'} onPress={() => setActiveTab('Merchant')} />
        <BottomNavItem iconName="Headphones" label="Support" isActive={activeTab === 'Support'} onPress={() => setActiveTab('Support')} />
        <BottomNavItem iconName="Settings" label="Settings" isActive={activeTab === 'Settings'} onPress={() => setActiveTab('Settings')} />
      </View>
    </View>
  );
}
