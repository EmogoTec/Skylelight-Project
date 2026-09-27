import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../theme/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Radius of the bottom-wave arches. Deliberately much larger than the screen
// so only the shallow crown of each arc is visible.
const WAVE_RADIUS = SCREEN_WIDTH * 1.45;

export const authStyles = StyleSheet.create({
  // ─── Full-screen container ───
  outerContainer: { flex: 1, backgroundColor: theme.colors.white },
  container: { flex: 1, backgroundColor: 'transparent' },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 50, paddingBottom: 140 },

  // ─── Atmospheric background layers ───
  // Top sky wash: deepest along the top edge, dissolving to white by ~33%.
  bgTopWash: { position: 'absolute', top: 0, left: 0, right: 0, height: '33%' },
  // Top-right bloom, bleeding off both edges so no hard boundary shows.
  bgBloomOuter: { position: 'absolute', top: -120, right: -100, width: 320, height: 320, borderRadius: 160, opacity: 0.5 },
  bgBloomInner: { position: 'absolute', top: -70, right: -55, width: 210, height: 210, borderRadius: 105, opacity: 0.45 },

  // ─── Bottom wave decoration ───
  // Each dome is a semicircular arch whose radius is half its width. At this
  // radius the arch is far wider than the screen, so the clip shows only its
  // broad shallow crown — which is what makes the curve read as a wave rather
  // than a hill. Apex position is controlled by the `left` offset.
  bgBottomWrap: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '23%', overflow: 'hidden' },
  bgWaveFar: {
    position: 'absolute',
    top: 6,
    left: SCREEN_WIDTH * 0.46 - WAVE_RADIUS,
    width: WAVE_RADIUS * 2,
    height: WAVE_RADIUS,
    borderTopLeftRadius: WAVE_RADIUS,
    borderTopRightRadius: WAVE_RADIUS,
  },
  bgWaveNear: {
    position: 'absolute',
    top: 30,
    left: SCREEN_WIDTH * 0.40 - WAVE_RADIUS,
    width: WAVE_RADIUS * 2,
    height: WAVE_RADIUS,
    borderTopLeftRadius: WAVE_RADIUS,
    borderTopRightRadius: WAVE_RADIUS,
  },

  // ─── Top-right decorative gradient blob ───
  topRightBlob: { position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: 110, opacity: 0.5 },
  topRightBlobInner: { position: 'absolute', top: -20, right: -20, width: 160, height: 160, borderRadius: 80, opacity: 0.3 },

  // ─── Top navigation ───
  topNavBarRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  backArrowButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.colors.cloudWhite, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border },

  // ─── Brand header ───
  headerContainer: { alignItems: 'center', marginBottom: 20 },
  logo: { width: 48, height: 48, borderRadius: theme.borderRadius.sm, marginBottom: 4 },
  brandTitleText: { fontSize: 22, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.navy, letterSpacing: -0.5, textAlign: 'center' },
  brandTaglineText: { fontSize: 10, color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.medium, textAlign: 'center' },

  // ─── Page titles ───
  title: { fontSize: 24, fontFamily: theme.typography.fontFamily.bold, marginBottom: 6, color: theme.colors.navy },
  subtitle: { fontSize: 14, color: theme.colors.textLight, marginBottom: 20, lineHeight: 20, fontFamily: theme.typography.fontFamily.regular },
  errorText: { color: '#E53E3E', marginBottom: 15, textAlign: 'center', fontSize: 13, fontFamily: theme.typography.fontFamily.semiBold, backgroundColor: '#FFF5F5', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },

  // ─── Step indicator (with labels) ───
  stepIndicatorRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', marginBottom: 20, gap: 0 },
  stepColumn: { alignItems: 'center', width: 80 },
  stepDotActive: { width: 30, height: 30, borderRadius: 15, backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center' },
  stepDotTextActive: { color: theme.colors.white, fontSize: 13, fontFamily: theme.typography.fontFamily.bold },
  stepDotInactive: { width: 30, height: 30, borderRadius: 15, backgroundColor: theme.colors.cloudWhite, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: theme.colors.gray },
  stepDotTextInactive: { color: theme.colors.textLight, fontSize: 13, fontFamily: theme.typography.fontFamily.bold },
  stepDotCompleted: { width: 30, height: 30, borderRadius: 15, backgroundColor: theme.colors.success, justifyContent: 'center', alignItems: 'center' },
  stepLabelActive: { fontSize: 10, color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold, marginTop: 4, textAlign: 'center' },
  stepLabelInactive: { fontSize: 10, color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular, marginTop: 4, textAlign: 'center' },
  stepLine: { width: 40, height: 2, backgroundColor: theme.colors.gray, marginTop: 14 },
  stepLineActive: { width: 40, height: 2, backgroundColor: theme.colors.primary, marginTop: 14 },

  // ─── Hero illustration ───
  heroImageContainer: { alignItems: 'center', marginBottom: 20 },
  heroImage: { width: 180, height: 160, resizeMode: 'contain' },

  // ─── Input fields ───
  inputContainer: { width: '100%', marginBottom: 16 },
  inputLabelText: { fontSize: 13, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.navy, marginBottom: 6 },
  inputWithIconRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.cloudWhite, borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.md, paddingHorizontal: 12, height: 52 },
  input: { paddingVertical: 8, fontSize: 14, color: theme.colors.navy, flex: 1, height: '100%', fontFamily: theme.typography.fontFamily.regular },
  standardInput: { backgroundColor: theme.colors.cloudWhite, borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.md, paddingHorizontal: 14, height: 52, fontSize: 14, color: theme.colors.navy, fontFamily: theme.typography.fontFamily.regular },

  // ─── Phone input ───
  phoneInputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.cloudWhite, borderWidth: 1.5, borderColor: theme.colors.border, borderRadius: theme.borderRadius.lg, height: 52, overflow: 'hidden' },
  countryCodeBox: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, height: '100%', gap: 6 },
  flagImage: { width: 24, height: 16, borderRadius: 2 },
  countryCodeText: { fontSize: 14, fontFamily: theme.typography.fontFamily.semiBold, color: theme.colors.navy },
  countryCodeChevron: { marginLeft: 2 },
  phoneInputField: { flex: 1, paddingHorizontal: 12, fontSize: 14, color: theme.colors.navy, height: '100%', fontFamily: theme.typography.fontFamily.regular },

  // ─── Password fields ───
  passwordRow: { flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: theme.colors.cloudWhite, borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.md, paddingHorizontal: 12, height: 52 },
  passwordInput: { borderBottomWidth: 0, borderColor: 'transparent' },
  eyeButton: { padding: 6, justifyContent: 'center', alignItems: 'center' },
  passwordHintText: { fontSize: 11, color: theme.colors.textLight, marginTop: 6, lineHeight: 15, fontFamily: theme.typography.fontFamily.regular },

  // ─── Info text with icon ───
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 24 },
  infoIcon: { marginRight: 4 },
  infoBoxText: { fontSize: 12, color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular },

  // ─── OTP ───
  otpContainerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  otpBox: { width: 45, height: 56, borderRadius: theme.borderRadius.md, borderWidth: 1.5, borderColor: theme.colors.gray, backgroundColor: theme.colors.cloudWhite, textAlign: 'center', fontSize: 20, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.navy },
  otpBoxActive: { borderColor: theme.colors.primary, backgroundColor: theme.colors.iceBlue },

  resendRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 20 },
  resendTextPrompt: { fontSize: 12, color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular },
  resendActionLink: { fontSize: 12, color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold },
  resendActionLinkDisabled: { fontSize: 12, color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular },
  countdownText: { fontSize: 11, color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular },

  securityNoticeBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.iceBlue, borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.md, padding: 10, gap: 8, marginBottom: 20 },
  securityNoticeText: { fontSize: 11, color: theme.colors.navy, flex: 1, fontFamily: theme.typography.fontFamily.medium },

  // ─── Login screen options ───
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, marginTop: 2 },
  rememberContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkboxBox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1.5, borderColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.white },
  checkboxChecked: { backgroundColor: theme.colors.primary },
  rememberText: { fontSize: 13, color: theme.colors.navy, fontFamily: theme.typography.fontFamily.medium },
  forgotText: { fontSize: 13, color: theme.colors.primary, fontFamily: theme.typography.fontFamily.semiBold },

  // ─── Primary button ───
  primaryButton: { backgroundColor: theme.colors.primary, height: 56, borderRadius: theme.borderRadius.lg, justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 14, flexDirection: 'row', gap: 8 },
  buttonDisabled: { backgroundColor: theme.colors.gray },
  primaryButtonText: { color: theme.colors.white, fontSize: 16, fontFamily: theme.typography.fontFamily.bold },

  // ─── Biometric screen ───
  biometricContainer: { flex: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 36 },
  biometricHero: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  // Soft halo plus a hairline ring — reads as deliberate rather than just a
  // big shape on a white screen.
  biometricHeroGlow: { position: 'absolute', width: 300, height: 300, borderRadius: 150, backgroundColor: theme.colors.iceBlue, opacity: 0.7 },
  biometricHeroRing: { position: 'absolute', width: 336, height: 336, borderRadius: 168, borderWidth: 1, borderColor: theme.colors.border, opacity: 0.55 },
  // Padlock built from Views so it stays on-brand: shackle behind, body in
  // the brand gradient, PIN pill overlapping the base.
  lockWrap: {
    alignItems: 'center',
    shadowColor: theme.colors.primaryGradientEnd,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.22,
    shadowRadius: 20,
    elevation: 10,
  },
  lockShackle: { width: 124, height: 74, borderWidth: 20, borderBottomWidth: 0, borderColor: theme.colors.primaryGradientStart, borderTopLeftRadius: 62, borderTopRightRadius: 62, marginBottom: -12 },
  lockBody: { width: 194, height: 156, borderRadius: 30, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  pinPill: { marginTop: -19, flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: theme.colors.white, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 17, paddingHorizontal: 19, paddingVertical: 10, shadowColor: theme.colors.navy, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  pinDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.primary },
  biometricCopyBlock: { marginBottom: 44 },
  biometricTitle: { fontSize: 26, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.navy, textAlign: 'center', letterSpacing: -0.4, marginBottom: 12 },
  biometricBody: { fontSize: 15, lineHeight: 22, fontFamily: theme.typography.fontFamily.regular, color: theme.colors.textLight, textAlign: 'center' },
  biometricActions: { alignItems: 'stretch' },
  biometricSkipBtn: { alignSelf: 'center', paddingVertical: 12, paddingHorizontal: 20, marginTop: 4 },
  biometricSkipText: { fontSize: 15, fontFamily: theme.typography.fontFamily.semiBold, color: theme.colors.primary },

  // ─── Divider ───
  accountFooterDivider: { height: 1, backgroundColor: theme.colors.gray, width: '100%', marginBottom: 16 },

  // ─── Footer links ───
  footerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 16, gap: 4 },
  footerText: { fontSize: 13, color: theme.colors.textLight, fontFamily: theme.typography.fontFamily.regular },
  linkTextInline: { fontSize: 13, color: theme.colors.navy, fontFamily: theme.typography.fontFamily.bold, textDecorationLine: 'underline' },
  createAccountOutlineBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', height: 52, borderRadius: theme.borderRadius.lg, borderWidth: 1.5, borderColor: theme.colors.navy, backgroundColor: theme.colors.white, gap: 8 },
  linkText: { fontSize: 14, color: theme.colors.navy, fontFamily: theme.typography.fontFamily.bold },


  // ─── Modal (biometric, etc.) ───
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '85%', maxWidth: 340, backgroundColor: theme.colors.white, borderRadius: theme.borderRadius.lg, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 8 },
  modalTitle: { fontSize: 18, fontFamily: theme.typography.fontFamily.bold, color: theme.colors.navy, marginBottom: 8, textAlign: 'center' },
  modalSubtitle: { fontSize: 13, color: theme.colors.textLight, textAlign: 'center', marginBottom: 25, lineHeight: 18, fontFamily: theme.typography.fontFamily.regular },
  fingerprintIconCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: theme.colors.iceBlue, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: theme.colors.primary, marginBottom: 15, position: 'relative' },
  fingerprintRingPulse: { position: 'absolute', width: 104, height: 104, borderRadius: 52, borderWidth: 1, borderColor: theme.colors.primary, opacity: 0.4 },
  tapInstructionText: { fontSize: 12, color: theme.colors.textLight, marginBottom: 20, fontStyle: 'italic', fontFamily: theme.typography.fontFamily.regular },
  modalCancelButton: { paddingVertical: 10, paddingHorizontal: 20 },
  modalCancelText: { color: theme.colors.gold, fontSize: 14, fontFamily: theme.typography.fontFamily.bold },
});