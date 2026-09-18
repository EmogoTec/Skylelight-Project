import { StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export const authStyles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: theme.colors.cloudWhite },
  headerGraphicContainer: { position: 'absolute', top: 0, left: 0, right: 0, height: 280, overflow: 'hidden' },
  abstractBlobOne: { position: 'absolute', top: -40, right: -20, width: 280, height: 220, backgroundColor: theme.colors.iceBlue, borderRadius: 140, opacity: 0.6 },
  abstractBlobTwo: { position: 'absolute', top: 20, right: 80, width: 180, height: 150, backgroundColor: theme.colors.primary, borderRadius: 90, opacity: 0.15 },
  container: { flex: 1, backgroundColor: 'transparent' },
  scrollContainer: { flexGrow: 1, padding: theme.spacing.lg, paddingTop: theme.spacing.xxl, paddingBottom: 50 },
  
  topNavBarRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.md },
  backArrowButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.colors.white, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border },
  backTextLink: { fontSize: theme.typography.sizes.sm, color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold },
  
  headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: theme.spacing.xl },
  logo: { width: 48, height: 48, borderRadius: theme.borderRadius.sm },
  brandTitleText: { fontSize: 22, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.navy, letterSpacing: -0.5, lineHeight: 26 },
  brandTaglineText: { fontSize: 10, color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.medium },
  
  contentBox: { width: '100%', maxWidth: 420, alignSelf: 'center', backgroundColor: theme.colors.white, borderRadius: theme.borderRadius.xl, padding: theme.spacing.lg, borderWidth: 1, borderColor: theme.colors.border, shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 },
  
  stepIndicatorRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: theme.spacing.sm },
  stepDotActive: { width: 26, height: 26, borderRadius: 13, backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center' },
  stepDotTextActive: { color: theme.colors.navy, fontSize: 12, fontFamily: theme.typography.fontFamily.bold }, // Using navy for text on cyan
  stepDotInactive: { width: 26, height: 26, borderRadius: 13, backgroundColor: theme.colors.cloudWhite, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.gray },
  stepDotTextInactive: { color: theme.colors.textLight, fontSize: 12, fontFamily: theme.typography.fontFamily.bold },
  stepDotCompleted: { width: 26, height: 26, borderRadius: 13, backgroundColor: theme.colors.success, justifyContent: 'center', alignItems: 'center' },
  stepDotTextCompleted: { color: theme.colors.white, fontSize: 12, fontFamily: theme.typography.fontFamily.bold },
  stepLine: { width: 35, height: 2, backgroundColor: theme.colors.gray, marginHorizontal: 4 },
  stepLineActive: { width: 35, height: 2, backgroundColor: theme.colors.primary, marginHorizontal: 4 },
  stepLabelText: { fontSize: 11, color: theme.colors.textLight, textAlign: 'center', marginBottom: 18, fontFamily: theme.typography.fontFamily.semiBold },
  
  title: { fontSize: theme.typography.sizes.xl, fontFamily: theme.typography.fontFamily.bold, marginBottom: 6, color: theme.colors.navy },
  subtitle: { fontSize: theme.typography.sizes.sm, color: theme.colors.textLight, marginBottom: 20, lineHeight: 18, fontFamily: theme.typography.fontFamily.regular },
  errorText: { color: theme.colors.gold, marginBottom: 15, textAlign: 'center', fontSize: 13, fontFamily: theme.typography.fontFamily.semiBold },
  
  // Note: Input styles below can be largely ignored if we switch to the new shared Input component, but we keep them just in case.
  inputContainer: { width: '100%', marginBottom: 16 },
  inputLabelText: { fontSize: 12, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.navy, marginBottom: 6 },
  inputWithIconRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.cloudWhite, borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.md, paddingHorizontal: 12, height: 56 },
  inputIconPrefix: { fontSize: 16, marginRight: 10 },
  input: { paddingVertical: 8, fontSize: 14, color: theme.colors.navy, flex: 1, height: '100%', fontFamily: theme.typography.fontFamily.regular },
  standardInput: { backgroundColor: theme.colors.cloudWhite, borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.md, paddingHorizontal: 14, height: 56, fontSize: 14, color: theme.colors.navy, fontFamily: theme.typography.fontFamily.regular },
  
  passwordRow: { flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: theme.colors.cloudWhite, borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.md, paddingHorizontal: 12, height: 56 },
  passwordInput: { borderBottomWidth: 0, borderColor: 'transparent' },
  eyeButton: { padding: 6, justifyContent: 'center', alignItems: 'center' },
  eyeIcon: { fontSize: 16 },
  passwordHintText: { fontSize: 11, color: theme.colors.textLight, marginTop: 6, lineHeight: 15, fontFamily: theme.typography.fontFamily.regular },
  
  phoneInputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.cloudWhite, borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.md, height: 56, overflow: 'hidden' },
  countryCodeBox: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, backgroundColor: theme.colors.iceBlue, height: '100%', borderRightWidth: 1, borderRightColor: theme.colors.border, gap: 6 },
  countryCodeText: { fontSize: 14, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.navy },
  phoneInputField: { flex: 1, paddingHorizontal: 12, fontSize: 14, color: theme.colors.navy, height: '100%', fontFamily: theme.typography.fontFamily.regular },
  
  infoBoxText: { fontSize: 12, color: theme.colors.textLight, marginBottom: 20, fontStyle: 'italic', fontFamily: theme.typography.fontFamily.regular },
  
  otpContainerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  otpBox: { width: 45, height: 56, borderRadius: theme.borderRadius.md, borderWidth: 1.5, borderColor: theme.colors.gray, backgroundColor: theme.colors.cloudWhite, textAlign: 'center', fontSize: 20, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.navy },
  otpBoxActive: { borderColor: theme.colors.primary, backgroundColor: theme.colors.iceBlue },
  
  resendRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 20 },
  resendTextPrompt: { fontSize: 12, color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular },
  resendActionLink: { fontSize: 12, color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold },
  countdownText: { fontSize: 11, color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular },
  
  securityNoticeBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.iceBlue, borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.md, padding: 10, gap: 8, marginBottom: 20 },
  securityNoticeText: { fontSize: 11, color: theme.colors.navy, flex: 1, fontFamily: theme.typography.fontFamily.medium },
  
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, marginTop: 2 },
  rememberContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkboxBox: { width: 18, height: 18, borderRadius: 4, borderWidth: 1.5, borderColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.white },
  checkboxChecked: { backgroundColor: theme.colors.primary },
  rememberText: { fontSize: 13, color: theme.colors.navy, fontFamily: theme.typography.fontFamily.medium },
  forgotText: { fontSize: 13, color: theme.colors.primary, fontFamily: theme.typography.fontFamily.semiBold },
  
  // Note: Buttons might be replaced, but leaving styles for now.
  primaryButton: { backgroundColor: theme.colors.primary, height: 56, borderRadius: theme.borderRadius.md, justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 14 },
  buttonDisabled: { backgroundColor: theme.colors.gray },
  primaryButtonText: { color: theme.colors.navy, fontSize: 16, fontFamily: theme.typography.fontFamily.bold },
  
  biometricButton: { width: '100%', height: 56, borderRadius: theme.borderRadius.md, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.iceBlue, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 18 },
  biometricIconBadge: { width: 30, height: 30, borderRadius: 15, backgroundColor: theme.colors.white, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border },
  biometricButtonText: { color: theme.colors.navy, fontSize: 13, fontFamily: theme.typography.fontFamily.semiBold, flex: 1 },
  secureBadgeTag: { backgroundColor: theme.colors.white, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginRight: 4, borderWidth: 1, borderColor: theme.colors.border },
  secureBadgeText: { fontSize: 10, color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold },
  
  accountFooterDivider: { height: 1, backgroundColor: theme.colors.gray, width: '100%', marginBottom: 16 },
  footerContainer: { alignItems: 'center', width: '100%', marginBottom: 16, justifyContent: 'center' },
  footerText: { fontSize: 12, color: theme.colors.textLight, marginBottom: 10, fontFamily: theme.typography.fontFamily.regular },
  linkTextInline: { fontSize: 13, color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold },
  createAccountOutlineBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', height: 48, borderRadius: theme.borderRadius.md, borderWidth: 1.5, borderColor: theme.colors.primary, backgroundColor: theme.colors.white, gap: 8 },
  linkText: { fontSize: 14, color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold },
  
  brandFooterBlock: { alignItems: 'center', marginTop: 6, borderTopWidth: 1, borderTopColor: theme.colors.gray, paddingTop: 14 },
  companyFooterText: { fontSize: 11, color: theme.colors.textLight, textAlign: 'center', fontFamily: theme.typography.fontFamily.bold },
  sloganFooterText: { fontSize: 10, color: theme.colors.primary, textAlign: 'center', fontFamily: theme.typography.fontFamily.semiBold, marginTop: 2 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '85%', maxWidth: 340, backgroundColor: theme.colors.white, borderRadius: theme.borderRadius.lg, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 8 },
  modalTitle: { fontSize: 18, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.navy, marginBottom: 8, textAlign: 'center' },
  modalSubtitle: { fontSize: 13, color: theme.colors.textLight, textAlign: 'center', marginBottom: 25, lineHeight: 18, fontFamily: theme.typography.fontFamily.regular },
  fingerprintIconCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: theme.colors.iceBlue, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: theme.colors.primary, marginBottom: 15, position: 'relative' },
  fingerprintRingPulse: { position: 'absolute', width: 104, height: 104, borderRadius: 52, borderWidth: 1, borderColor: theme.colors.primary, opacity: 0.4 },
  tapInstructionText: { fontSize: 12, color: theme.colors.textLight, marginBottom: 20, fontStyle: 'italic', fontFamily: theme.typography.fontFamily.regular },
  modalCancelButton: { paddingVertical: 10, paddingHorizontal: 20 },
  modalCancelText: { color: theme.colors.gold, fontSize: 14, fontFamily: theme.typography.fontFamily.bold } // Assuming gold instead of red for cancel/warning
});