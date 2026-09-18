import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Easing, StatusBar, Image, Modal, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, LogOut, Megaphone, AlertTriangle, Eye, EyeOff, MapPin, Smartphone, CreditCard, Box, ChevronRight, PlusCircle, MinusCircle, Grid } from 'lucide-react-native';

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

export default function DashboardScreen({ navigation }) {
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const insets = useSafeAreaInsets();

  const [user, setUser] = useState({
    name: 'Omale Emmanuel',
    initials: 'OE',
    balance: '247,650.30',
    bonus: '0.00'
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

  return (
    <View style={dashStyles.container}>
      <View style={[dashStyles.headerBar, { paddingTop: Math.max(insets.top, 10), height: 56 + Math.max(insets.top, 10) } ]}>
        <View style={dashStyles.brandContainer}>
          <Image source={require('../../assets/icon.png')} style={dashStyles.brandLogoImage} resizeMode="contain" />
          <Text style={dashStyles.brandTitle}>SkyleLight</Text>
        </View>
        <View style={dashStyles.headerRightActions}>
          <TouchableOpacity style={dashStyles.headerIconBtn}>
            <Bell size={18} color={theme.colors.navy} />
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
            <AlertTriangle size={20} color="#00C6EB" />
            <View style={{ flex: 1 }}>
              <Text style={[dashStyles.verificationTitle, { color: theme.colors.navy }]}>Complete your account verification</Text>
              <Text style={[dashStyles.verificationSub, { color: theme.colors.textLight }]}>Verify your identity to unlock all features and increase your transaction limits.</Text>
            </View>
          </View>
          <ChevronRight size={18} color={theme.colors.primary} />
        </View>

        <LinearGradient
          colors={[theme.colors.primaryGradientStart, theme.colors.primaryGradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={dashStyles.walletCard}
        >
          <View style={dashStyles.walletHeaderRow}>
            <Text style={dashStyles.walletSectionTitle}>Total Balance</Text>
            <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)} style={dashStyles.eyeToggleBtn}>
              {balanceVisible ? <Eye size={18} color={theme.colors.white} /> : <EyeOff size={18} color={theme.colors.white} />}
            </TouchableOpacity>
          </View>

          <Text style={dashStyles.mainBalanceText}>{balanceVisible ? `₦${user.balance}` : "••••••••"}</Text>

          <View style={dashStyles.walletBalanceCols}>
            <View style={dashStyles.walletSubCol}>
              <Text style={dashStyles.walletSubLabel}>Wallet Balance</Text>
              <Text style={dashStyles.walletSubValue}>₦{user.balance}</Text>
            </View>
            <View style={dashStyles.walletColDivider} />
            <View style={dashStyles.walletSubCol}>
              <Text style={dashStyles.walletSubLabel}>Bonus Balance</Text>
              <Text style={dashStyles.walletSubValue}>₦{user.bonus}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={dashStyles.quickActionsContainer}>
          <TouchableOpacity style={dashStyles.quickActionBtn}>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center' }}>
              <PlusCircle size={16} color={theme.colors.white} />
            </View>
            <Text style={dashStyles.quickActionText}>Top Up</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={dashStyles.quickActionBtn}>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center' }}>
              <CreditCard size={16} color={theme.colors.white} />
            </View>
            <Text style={dashStyles.quickActionText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions Section */}
        <View style={dashStyles.recentTxContainer}>
          <View style={dashStyles.recentTxHeader}>
            <Text style={dashStyles.recentTxTitle}>Recent Transaction</Text>
            <TouchableOpacity><Text style={dashStyles.recentTxSeeAll}>See All</Text></TouchableOpacity>
          </View>

          <View style={dashStyles.txItem}>
            <View style={[dashStyles.txIconWrapper, { backgroundColor: '#E0F7FA' }]}>
              <MapPin size={20} color="#00838F" />
            </View>
            <View style={dashStyles.txDetails}>
              <Text style={dashStyles.txTitle}>Electricity Bill</Text>
              <Text style={dashStyles.txSubtitle}>Aba Power</Text>
              <Text style={dashStyles.txDate}>Sep 08, 2026 • 10:24 AM</Text>
            </View>
            <View style={dashStyles.txAmountContainer}>
              <Text style={dashStyles.txAmountNegative}>-₦6,300</Text>
              <View style={dashStyles.txStatusPill}><Text style={dashStyles.txStatusText}>Success</Text></View>
            </View>
          </View>

          <View style={dashStyles.txItem}>
            <View style={[dashStyles.txIconWrapper, { backgroundColor: '#E3F2FD' }]}>
              <Smartphone size={20} color="#1565C0" />
            </View>
            <View style={dashStyles.txDetails}>
              <Text style={dashStyles.txTitle}>Airtime Purchase</Text>
              <Text style={dashStyles.txSubtitle}>MTN 0803 456 7890</Text>
              <Text style={dashStyles.txDate}>Sep 07, 2026 • 03:15 PM</Text>
            </View>
            <View style={dashStyles.txAmountContainer}>
              <Text style={dashStyles.txAmountNegative}>-₦1,000</Text>
              <View style={dashStyles.txStatusPill}><Text style={dashStyles.txStatusText}>Success</Text></View>
            </View>
          </View>

          <View style={dashStyles.txItem}>
            <View style={[dashStyles.txIconWrapper, { backgroundColor: '#E8F5E9' }]}>
              <PlusCircle size={20} color="#2E7D32" />
            </View>
            <View style={dashStyles.txDetails}>
              <Text style={dashStyles.txTitle}>Wallet Top Up</Text>
              <Text style={dashStyles.txSubtitle}>Paystack</Text>
              <Text style={dashStyles.txDate}>Sep 07, 2026 • 11:20 AM</Text>
            </View>
            <View style={dashStyles.txAmountContainer}>
              <Text style={dashStyles.txAmountPositive}>+₦10,000</Text>
              <View style={dashStyles.txStatusPill}><Text style={dashStyles.txStatusText}>Success</Text></View>
            </View>
          </View>

          <View style={dashStyles.txItem}>
            <View style={[dashStyles.txIconWrapper, { backgroundColor: '#F3E5F5' }]}>
              <Box size={20} color="#7B1FA2" />
            </View>
            <View style={dashStyles.txDetails}>
              <Text style={dashStyles.txTitle}>Data Purchase</Text>
              <Text style={dashStyles.txSubtitle}>MTN 2GB</Text>
              <Text style={dashStyles.txDate}>Sep 06, 2026 • 07:42 PM</Text>
            </View>
            <View style={dashStyles.txAmountContainer}>
              <Text style={dashStyles.txAmountNegative}>-₦2,000</Text>
              <View style={dashStyles.txStatusPill}><Text style={dashStyles.txStatusText}>Success</Text></View>
            </View>
          </View>
        </View>

        <View style={dashStyles.servicesContainer}>
          <View style={dashStyles.servicesHeader}>
            <Text style={dashStyles.servicesMainTitle}>SkyleLight Services</Text>
          </View>

          <View style={dashStyles.servicesGrid}>
            <View style={dashStyles.servicesRow}>
              <ServiceCard iconName="Smartphone" label="Airtime" bgColor="#E0F7FA" iconColor="#00BCD4" />
              <ServiceCard iconName="Wifi" label="Data" bgColor="#E3F2FD" iconColor="#1E88E5" />
              <ServiceCard iconName="FileText" label="Bills" bgColor="#FCE4EC" iconColor="#D81B60" />
              <ServiceCard iconName="Monitor" label="TV" bgColor="#E8F5E9" iconColor="#43A047" />
            </View>
            <View style={dashStyles.servicesRow}>
              <ServiceCard iconName="CheckCircle" label="Investments" bgColor="#E8F5E9" iconColor="#4CAF50" />
              <ServiceCard iconName="Briefcase" label="Loans" bgColor="#E1F5FE" iconColor="#039BE5" />
              <ServiceCard iconName="Gamepad2" label="Gaming" bgColor="#F3E5F5" iconColor="#8E24AA" />
              <ServiceCard iconName="MoreHorizontal" label="More" bgColor="#F5F5F5" iconColor="#757575" />
            </View>
          </View>
        </View>

      </ScrollView>

      <View style={[dashStyles.bottomNavBar, { paddingBottom: Math.max(insets.bottom, 8), height: 64 + Math.max(insets.bottom, 8) }]}>
        <BottomNavItem iconName="Home" label="Home" isActive={activeTab === 'Home'} onPress={() => setActiveTab('Home')} />
        <BottomNavItem iconName="Clock" label="History" isActive={activeTab === 'History'} onPress={() => setActiveTab('History')} />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity style={dashStyles.centerTabButton} onPress={() => setActiveTab('Scan')}>
            <Grid size={24} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
        <BottomNavItem iconName="Headphones" label="Support" isActive={activeTab === 'Support'} onPress={() => setActiveTab('Support')} />
        <BottomNavItem iconName="Settings" label="Settings" isActive={activeTab === 'Settings'} onPress={() => { setActiveTab('Settings'); navigation.navigate('Settings'); }} />
      </View>
    </View>
  );
}
