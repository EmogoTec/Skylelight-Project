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
  headerIconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.iceBlue, justifyContent: 'center', alignItems: 'center' },
  headerLogoutBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFEBEE', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FFCDD2' },
  profileAvatarBadge: { width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center' },
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
  walletHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  walletSectionTitle: { fontSize: 13, color: theme.colors.cloudWhite, fontFamily: theme.typography.fontFamily.medium },
  viewHistoryLink: { fontSize: 12, color: theme.colors.white, fontFamily: theme.typography.fontFamily.bold, flexDirection: 'row', alignItems: 'center' },
  
  balanceDisplayRow: { marginTop: 10, marginBottom: 20, flexDirection: 'row', alignItems: 'center', gap: 12 },
  mainBalanceText: { fontSize: 32, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.white },
  eyeToggleBtn: { padding: 4 },
  
  walletActionsRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  walletActionButton: { flex: 1, backgroundColor: 'rgba(255,255,255,0.2)', height: 44, borderRadius: theme.borderRadius.md, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  walletActionText: { color: theme.colors.white, fontFamily: theme.typography.fontFamily.semiBold, fontSize: 14 },
  
  miniTxBox: { backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  miniTxIconBox: { width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.white, justifyContent: 'center', alignItems: 'center' },
  miniTxTitle: { fontSize: 12, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.white },
  miniTxDate: { fontSize: 10, color: 'rgba(255,255,255,0.8)', marginTop: 2, fontFamily: theme.typography.fontFamily.regular },
  miniTxAmount: { fontSize: 12, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.success },
  
  metricsRow: { flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 12, justifyContent: 'space-between', alignItems: 'center' },
  metricItem: { flex: 1, alignItems: 'center' },
  metricLabel: { fontSize: 10, color: 'rgba(255,255,255,0.8)', marginBottom: 4, fontFamily: theme.typography.fontFamily.medium },
  metricIncomeVal: { fontSize: 14, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.white },
  metricExpenseVal: { fontSize: 14, fontFamily: theme.typography.fontFamily.bold, color: '#FFCDD2' }, // Soft red on blue bg
  metricDivider: { width: 1, height: '80%', backgroundColor: 'rgba(255,255,255,0.2)' },
  
  servicesContainer: { marginHorizontal: 18, marginTop: 14, backgroundColor: theme.colors.white, borderRadius: theme.borderRadius.lg, padding: 16, borderWidth: 1, borderColor: theme.colors.border },
  servicesHeader: { marginBottom: 16 },
  servicesMainTitle: { fontSize: 18, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.navy },
  servicesSubTitle: { fontSize: 12, color: theme.colors.textLight, marginTop: 2, fontFamily: theme.typography.fontFamily.regular },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 16 },
  
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
  
  bottomNavBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: theme.colors.white, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: theme.colors.border, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 4 },
  
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