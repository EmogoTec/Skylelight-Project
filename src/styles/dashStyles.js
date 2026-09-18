import { StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export const dashStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.cloudWhite },
  scrollContent: { flexGrow: 1, paddingTop: 6 },
  
  headerBar: { backgroundColor: theme.colors.white, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  brandContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandLogoImage: { width: 32, height: 32, borderRadius: 8 },
  brandTitle: { fontSize: 18, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.navy },
  
  headerRightActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  profileAvatarBadge: { width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center' },
  profileInitials: { color: theme.colors.white, fontFamily: theme.typography.fontFamily.bold, fontSize: 13 },
  profileInitials: { color: theme.colors.white, fontFamily: theme.typography.fontFamily.bold, fontSize: 13 },
  
  tickerContainer: { backgroundColor: theme.colors.iceBlue, paddingVertical: 8, overflow: 'hidden', borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  tickerTrack: { flexDirection: 'row', paddingLeft: 20 },
  tickerText: { fontSize: 12, color: theme.colors.navy, fontFamily: theme.typography.fontFamily.medium },
  
  greetingSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, marginTop: 14 },
  timeGreeting: { fontSize: 12, color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular },
  userNameText: { fontSize: 17, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.navy },
  
  systemStatusRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  greenStatusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.success },
  systemStatusText: { fontSize: 12, color: theme.colors.success, fontFamily: theme.typography.fontFamily.semiBold },
  
  verificationBanner: { marginHorizontal: 18, marginTop: 14, backgroundColor: '#FFFBEB', borderWidth: 1, borderColor: theme.colors.gold, borderRadius: theme.borderRadius.md, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  verificationLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  verificationTitle: { fontSize: 13, fontFamily: theme.typography.fontFamily.bold, color: '#92400E' },
  verificationSub: { fontSize: 11, color: '#B45309', marginTop: 2, fontFamily: theme.typography.fontFamily.regular },
  verifyButton: { backgroundColor: theme.colors.gold, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  verifyButtonText: { color: theme.colors.white, fontSize: 12, fontFamily: theme.typography.fontFamily.bold },
  
  walletCard: { marginHorizontal: 18, marginTop: 14, borderRadius: theme.borderRadius.xl, padding: 20, shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6 },
  walletHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  walletSectionTitle: { fontSize: 13, color: theme.colors.cloudWhite, fontFamily: theme.typography.fontFamily.medium },
  eyeToggleBtn: { padding: 4 },
  
  mainBalanceText: { fontSize: 36, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.white, marginTop: 4, marginBottom: 20 },
  
  walletBalanceCols: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  walletSubCol: { flex: 1 },
  walletSubLabel: { fontSize: 11, color: theme.colors.cloudWhite, fontFamily: theme.typography.fontFamily.medium, marginBottom: 4 },
  walletSubValue: { fontSize: 14, color: theme.colors.white, fontFamily: theme.typography.fontFamily.bold },
  walletColDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.3)', marginHorizontal: 16 },

  quickActionsContainer: { flexDirection: 'row', marginHorizontal: 18, marginTop: 16, gap: 16 },
  quickActionBtn: { flex: 1, backgroundColor: theme.colors.white, height: 48, borderRadius: theme.borderRadius.lg, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, borderWidth: 1, borderColor: theme.colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  quickActionText: { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold, fontSize: 15 },
  
  recentTxContainer: { marginHorizontal: 18, marginTop: 24 },
  recentTxHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  recentTxTitle: { fontSize: 16, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.navy },
  recentTxSeeAll: { fontSize: 12, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.primary },
  
  txItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.white, padding: 12, borderRadius: theme.borderRadius.lg, marginBottom: 12, borderWidth: 1, borderColor: theme.colors.border },
  txIconWrapper: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  txDetails: { flex: 1 },
  txTitle: { fontSize: 14, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.navy, marginBottom: 2 },
  txSubtitle: { fontSize: 11, color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular },
  txDate: { fontSize: 10, color: theme.colors.textLight, marginTop: 2, fontFamily: theme.typography.fontFamily.regular },
  txAmountContainer: { alignItems: 'flex-end' },
  txAmountNegative: { fontSize: 14, fontFamily: theme.typography.fontFamily.bold, color: '#E53E3E', marginBottom: 4 },
  txAmountPositive: { fontSize: 14, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.success, marginBottom: 4 },
  txStatusPill: { backgroundColor: '#F0FDF4', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, borderWidth: 1, borderColor: '#DCFCE7' },
  txStatusText: { fontSize: 10, color: theme.colors.success, fontFamily: theme.typography.fontFamily.medium },
  
  servicesContainer: { marginHorizontal: 18, marginTop: 14, backgroundColor: theme.colors.white, borderRadius: theme.borderRadius.lg, padding: 16, borderWidth: 1, borderColor: theme.colors.border },
  servicesHeader: { marginBottom: 16 },
  servicesMainTitle: { fontSize: 18, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.navy },
  servicesSubTitle: { fontSize: 12, color: theme.colors.textLight, marginTop: 2, fontFamily: theme.typography.fontFamily.regular },
  servicesGrid: { gap: 20 },
  servicesRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  serviceCardItem: { flex: 1, alignItems: 'center', paddingHorizontal: 2 },
  serviceIconCircle: { width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  serviceItemLabel: { fontSize: 11, fontFamily: theme.typography.fontFamily.medium, color: theme.colors.navy, textAlign: 'center', lineHeight: 14 },
  
  referralCard: { marginHorizontal: 18, marginTop: 14, backgroundColor: theme.colors.navy, borderRadius: theme.borderRadius.lg, padding: 16 },
  referralCardTitle: { fontSize: 17, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.white, marginBottom: 4 },
  referralCardSub: { fontSize: 11, color: theme.colors.cloudWhite, marginBottom: 12, lineHeight: 16, fontFamily: theme.typography.fontFamily.regular },
  referralInputBox: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 14, paddingRight: 8, paddingVertical: 8 },
  referralCodeText: { fontSize: 14, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.primary, letterSpacing: 1 },
  copyButton: { backgroundColor: theme.colors.primary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 6 },
  copyButtonText: { color: theme.colors.navy, fontSize: 12, fontFamily: theme.typography.fontFamily.bold },
  
  logoutSectionCard: { marginHorizontal: 18, marginTop: 14, backgroundColor: '#FFF5F5', borderWidth: 1, borderColor: '#FED7D7', borderRadius: theme.borderRadius.lg, padding: 16 },
  logoutCardTitle: { fontSize: 16, fontFamily: theme.typography.fontFamily.bold, color: '#C53030', marginBottom: 4 },
  logoutCardSub: { fontSize: 11, color: '#718096', marginBottom: 14, lineHeight: 16, fontFamily: theme.typography.fontFamily.regular },
  fullLogoutButton: { backgroundColor: '#E53E3E', height: 46, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  fullLogoutButtonText: { color: theme.colors.white, fontSize: 14, fontFamily: theme.typography.fontFamily.bold },
  
  bottomNavBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: theme.colors.white, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: theme.colors.border, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.08, shadowRadius: 8 },
  
  bottomNavTab: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bottomNavText: { fontSize: 10, color: theme.colors.textLight, marginTop: 4, fontFamily: theme.typography.fontFamily.medium },
  bottomNavTextActive: { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold },
  
  centerTabButton: { width: 56, height: 56, borderRadius: 28, backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center', marginTop: -24, shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 6 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '85%', maxWidth: 340, backgroundColor: theme.colors.white, borderRadius: theme.borderRadius.xl, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 8 },
  modalIconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFEBEE', justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  modalTitle: { fontSize: 18, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.navy, marginBottom: 6 },
  modalSubtitle: { fontSize: 13, color: theme.colors.textLight, textAlign: 'center', marginBottom: 24, lineHeight: 18, fontFamily: theme.typography.fontFamily.regular },
  modalActionsRow: { flexDirection: 'row', gap: 12, width: '100%' },
  modalCancelBtn: { flex: 1, height: 44, borderRadius: 10, backgroundColor: theme.colors.iceBlue, justifyContent: 'center', alignItems: 'center' },
  modalCancelText: { fontSize: 14, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.navy },
  modalConfirmBtn: { flex: 1, height: 44, borderRadius: 10, backgroundColor: '#E53E3E', justifyContent: 'center', alignItems: 'center' },
  modalConfirmText: { fontSize: 14, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.white }
});