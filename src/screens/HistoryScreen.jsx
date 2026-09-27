import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Platform, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Smartphone, PlusCircle, Box, ChevronRight, Filter } from 'lucide-react-native';

import { theme } from '../theme/theme';
import { dashStyles } from '../styles/dashStyles';
import { walletAPI } from '../services/api';

export default function HistoryScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('September 2026');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const showFilterModal = useRef(false);

  const filters = ['All', 'Income', 'Expenses', 'Transfers', 'Bills'];
  const months = ['September 2026', 'August 2026', 'July 2026', 'June 2026'];

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await walletAPI.fetchDetails(50);
      if (response.status === 'success') {
        const walletTransactions = response.data.transactions || [];
        
        const formattedTransactions = walletTransactions.map((tx, index) => {
          const isCredit = tx.type === 'credit';
          let type = 'Expenses';
          if (isCredit) type = 'Income';
          else if (tx.description.toLowerCase().includes('bill')) type = 'Bills';
          else if (tx.description.toLowerCase().includes('transfer')) type = 'Transfers';
          
          const iconMap = {
            'Data Purchase': { icon: Box, bg: '#F3E5F5', color: '#7B1FA2' },
            'Airtime Purchase': { icon: Smartphone, bg: '#E3F2FD', color: '#1565C0' },
            'Wallet Top Up': { icon: PlusCircle, bg: '#E8F5E9', color: '#2E7D32' },
            'Payment received': { icon: PlusCircle, bg: '#E8F5E9', color: '#2E7D32' },
            'Electricity Bill': { icon: MapPin, bg: '#E0F7FA', color: '#00838F' },
            'Internet Bill': { icon: MapPin, bg: '#E0F7FA', color: '#00838F' },
            'New User Rewards': { icon: PlusCircle, bg: '#E8F5E9', color: '#2E7D32' },
            'SkyleLight Games': { icon: Box, bg: '#F3E5F5', color: '#7B1FA2' },
            'Account Topup': { icon: PlusCircle, bg: '#E8F5E9', color: '#2E7D32' },
          };
          const iconInfo = iconMap[tx.description] || { icon: Box, bg: '#F5F5F5', color: '#757575' };
          
          return {
            id: String(index + 1),
            icon: iconInfo.icon,
            iconBg: iconInfo.bg,
            iconColor: iconInfo.color,
            title: tx.description,
            subtitle: '',
            date: tx.date,
            amount: `${isCredit ? '+' : '-'}₦${Number(tx.amount).toLocaleString()}`,
            amountColor: isCredit ? '#1AAE72' : '#E53E3E',
            status: 'Success',
            type
          };
        });
        
        setTransactions(formattedTransactions);
      }
    } catch (err) {
      console.error('Fetch transactions error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fallback mock data
  const mockTransactions = [
    {
      id: '1',
      icon: MapPin,
      iconBg: '#E0F7FA',
      iconColor: '#00838F',
      title: 'Electricity Bill',
      subtitle: 'Aba Power',
      date: 'Sep 08, 2026 • 10:24 AM',
      amount: '-₦6,300',
      amountColor: '#E53E3E',
      status: 'Success',
      type: 'Bills'
    },
    {
      id: '2',
      icon: Smartphone,
      iconBg: '#E3F2FD',
      iconColor: '#1565C0',
      title: 'Airtime Purchase',
      subtitle: 'MTN 0803 456 7890',
      date: 'Sep 07, 2026 • 03:15 PM',
      amount: '-₦1,000',
      amountColor: '#E53E3E',
      status: 'Success',
      type: 'Expenses'
    },
    {
      id: '3',
      icon: PlusCircle,
      iconBg: '#E8F5E9',
      iconColor: '#2E7D32',
      title: 'Wallet Top Up',
      subtitle: 'Paystack',
      date: 'Sep 07, 2026 • 11:20 AM',
      amount: '+₦10,000',
      amountColor: '#1AAE72',
      status: 'Success',
      type: 'Income'
    },
    {
      id: '4',
      icon: Box,
      iconBg: '#F3E5F5',
      iconColor: '#7B1FA2',
      title: 'Data Purchase',
      subtitle: 'MTN 2GB',
      date: 'Sep 06, 2026 • 07:42 PM',
      amount: '-₦2,000',
      amountColor: '#E53E3E',
      status: 'Success',
      type: 'Expenses'
    },
    {
      id: '5',
      icon: Smartphone,
      iconBg: '#E3F2FD',
      iconColor: '#1565C0',
      title: 'Airtime Purchase',
      subtitle: 'Airtel 0802 123 4567',
      date: 'Sep 05, 2026 • 09:30 AM',
      amount: '-₦2,500',
      amountColor: '#E53E3E',
      status: 'Success',
      type: 'Expenses'
    },
    {
      id: '6',
      icon: PlusCircle,
      iconBg: '#E8F5E9',
      iconColor: '#2E7D32',
      title: 'Wallet Top Up',
      subtitle: 'Bank Transfer',
      date: 'Sep 04, 2026 • 02:15 PM',
      amount: '+₦25,000',
      amountColor: '#1AAE72',
      status: 'Success',
      type: 'Income'
    },
    {
      id: '7',
      icon: MapPin,
      iconBg: '#E0F7FA',
      iconColor: '#00838F',
      title: 'Internet Bill',
      subtitle: 'Spectranet',
      date: 'Sep 03, 2026 • 11:00 AM',
      amount: '-₦15,000',
      amountColor: '#E53E3E',
      status: 'Success',
      type: 'Bills'
    },
    {
      id: '8',
      icon: Box,
      iconBg: '#F3E5F5',
      iconColor: '#7B1FA2',
      title: 'Data Purchase',
      subtitle: 'Glo 5GB',
      date: 'Sep 02, 2026 • 06:45 PM',
      amount: '-₦3,500',
      amountColor: '#E53E3E',
      status: 'Success',
      type: 'Expenses'
    },
    {
      id: '9',
      icon: PlusCircle,
      iconBg: '#E8F5E9',
      iconColor: '#2E7D32',
      title: 'Referral Bonus',
      subtitle: 'From SKY-OMALEEMMANUEL',
      date: 'Sep 01, 2026 • 10:00 AM',
      amount: '+₦500',
      amountColor: '#1AAE72',
      status: 'Success',
      type: 'Income'
    },
    {
      id: '10',
      icon: Smartphone,
      iconBg: '#E3F2FD',
      iconColor: '#1565C0',
      title: 'Airtime Purchase',
      subtitle: '9mobile 0809 876 5432',
      date: 'Aug 31, 2026 • 04:20 PM',
      amount: '-₦1,000',
      amountColor: '#E53E3E',
      status: 'Success',
      type: 'Expenses'
    }
  ];

  const displayTransactions = loading ? mockTransactions : (transactions.length > 0 ? transactions : mockTransactions);

  const filteredTransactions = displayTransactions.filter(tx => {
    if (activeFilter === 'All') return true;
    return tx.type === activeFilter;
  });

  return (
    <SafeAreaView style={dashStyles.container}>
      {/* Header */}
      <View style={[dashStyles.headerBar, { paddingTop: Math.max(insets.top, 10), height: 56 + Math.max(insets.top, 10) }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 4 }}>
            <ArrowLeft size={24} color={theme.colors.navy} />
          </TouchableOpacity>
          <Text style={dashStyles.brandTitle}>Transaction History</Text>
        </View>
        <TouchableOpacity style={dashStyles.headerIconBtn} onPress={() => { showFilterModal.current = true; }}>
          <Filter size={18} color={theme.colors.navy} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 20) + 20 }} showsVerticalScrollIndicator={false}>
        {/* Month Selector */}
        <View style={dashStyles.monthSelectorContainer}>
          <TouchableOpacity style={dashStyles.monthSelectorBtn} onPress={() => { showFilterModal.current = true; }}>
            <Text style={dashStyles.monthSelectorText}>{selectedMonth}</Text>
            <ChevronRight size={16} color={theme.colors.textLight} />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <View style={dashStyles.filterChipsContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                dashStyles.filterChip,
                activeFilter === filter && dashStyles.filterChipActive
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[
                dashStyles.filterChipText,
                activeFilter === filter && dashStyles.filterChipTextActive
              ]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transaction List */}
        {filteredTransactions.length === 0 ? (
          <View style={dashStyles.emptyState}>
            <Text style={dashStyles.emptyStateText}>No transactions found</Text>
            <Text style={dashStyles.emptyStateSub}>Try adjusting your filters or check back later</Text>
          </View>
        ) : (
          filteredTransactions.map((tx) => (
            <View key={tx.id} style={dashStyles.txItem}>
              <View style={[dashStyles.txIconWrapper, { backgroundColor: tx.iconBg }]}>
                <tx.icon size={20} color={tx.iconColor} />
              </View>
              <View style={dashStyles.txDetails}>
                <Text style={dashStyles.txTitle}>{tx.title}</Text>
                <Text style={dashStyles.txSubtitle}>{tx.subtitle}</Text>
                <Text style={dashStyles.txDate}>{tx.date}</Text>
              </View>
              <View style={dashStyles.txAmountContainer}>
                <Text style={[dashStyles.txAmountNegative, { color: tx.amountColor }]}>{tx.amount}</Text>
                <View style={dashStyles.txStatusPill}><Text style={dashStyles.txStatusText}>{tx.status}</Text></View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal.current}
        transparent={true}
        animationType="fade"
        onRequestClose={() => { showFilterModal.current = false; }}
      >
        <TouchableOpacity style={dashStyles.modalOverlay} onPress={() => { showFilterModal.current = false; }} activeOpacity={1}>
          <View style={dashStyles.filterModalContent}>
            <View style={dashStyles.filterModalHeader}>
              <Text style={dashStyles.filterModalTitle}>Filter Transactions</Text>
              <TouchableOpacity onPress={() => { showFilterModal.current = false; }}>
                <Text style={dashStyles.filterModalClose}>Done</Text>
              </TouchableOpacity>
            </View>
            
            <View style={dashStyles.filterSection}>
              <Text style={dashStyles.filterSectionTitle}>Category</Text>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    dashStyles.filterOption,
                    activeFilter === filter && dashStyles.filterOptionActive
                  ]}
                  onPress={() => { setActiveFilter(filter); showFilterModal.current = false; }}
                >
                  <Text style={[
                    dashStyles.filterOptionText,
                    activeFilter === filter && dashStyles.filterOptionTextActive
                  ]}>{filter}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={dashStyles.filterSection}>
              <Text style={dashStyles.filterSectionTitle}>Month</Text>
              {months.map((month) => (
                <TouchableOpacity
                  key={month}
                  style={[
                    dashStyles.filterOption,
                    selectedMonth === month && dashStyles.filterOptionActive
                  ]}
                  onPress={() => { setSelectedMonth(month); showFilterModal.current = false; }}
                >
                  <Text style={[
                    dashStyles.filterOptionText,
                    selectedMonth === month && dashStyles.filterOptionTextActive
                  ]}>{month}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}