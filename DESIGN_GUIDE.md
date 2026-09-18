# SKYLELIGHT UI & BRAND DESIGN CONCEPT NOTE

> Comprehensive implementation guide for the SkyleLight mobile application UI/UX system.

---

## 1. Brand Identity

### Logo
- **Primary Logo**: SkyleLight "S" icon mark with lightning bolt motif
- **Tagline**: *"Lighting the way to possibilities"*
- **Usage**: Always displayed at the top of authentication screens with the tagline beneath

### Brand Colors

| Token               | Hex       | Usage                                      |
|---------------------|-----------|---------------------------------------------|
| Primary Cyan        | `#00C6EB` | Primary buttons, active states, highlights  |
| Light Cyan          | `#E6FAFF` | Backgrounds, ice-blue tints, subtle fills   |
| Deep Blue           | `#062B67` | Brand navy, headings, dark text             |
| Sky Blue            | `#0A7BD9` | Links, secondary accents                    |
| Accent Gold         | `#F5A623` | Warnings, verification banners, gold badges |
| Success Green       | `#22C55E` | Success states, positive indicators         |
| Warning Orange      | `#F59E0B` | Caution states, pending actions             |
| Error Red           | `#EF4444` | Error messages, destructive actions         |

### Neutral Colors

| Token            | Hex       | Usage                          |
|------------------|-----------|--------------------------------|
| Text Primary     | `#14213D` | Body text, headings            |
| Text Secondary   | `#5F7898` | Subtitles, placeholder text    |
| Border           | `#C8EAF3` | Input borders, card outlines   |
| Background       | `#F5FCFF` | Page backgrounds               |

---

## 2. Typography

**Font Family**: Poppins (Google Fonts)

| Style       | Weight    | Size/Line-Height |
|-------------|-----------|-------------------|
| Heading 1   | Bold 700  | 32/40             |
| Heading 2   | SemiBold 600 | 24/32          |
| Heading 3   | SemiBold 600 | 20/28          |
| Body Text   | Regular 400 | 16/24           |
| Caption     | Regular 400 | 14/20           |
| Small Text  | Regular 400 | 12/16           |

---

## 3. Spacing & Layout

### Spacing Scale (8pt Grid)
- `4px` — xs (tight internal padding)
- `8px` — sm (between related elements)
- `12px` — md-sm
- `16px` — md (standard section gap)
- `24px` — lg (between content sections)
- `32px` — xl (major section dividers)

### Border Radius
- `4px` — Small chips, badges
- `8px` — Input fields, small cards
- `12px` — Medium cards
- `16px` — Large cards, modals
- `16px` — Buttons (pill-style)

---

## 4. Components

### Buttons

#### Primary Button
- Background: Primary Cyan (`#00C6EB`)
- Text: White, Poppins SemiBold 16px
- Height: 56px
- Border Radius: 16px (pill)
- Icon: Right-aligned arrow (`→`)
- Gradient on press: subtle darken

#### Secondary / Outline Button
- Background: White
- Border: 1.5px solid Deep Blue
- Text: Deep Blue, Poppins Bold 14px
- Height: 52px

#### Text Button
- No background or border
- Text: Primary Cyan or Deep Blue

#### Danger Button
- Background: Error Red (`#EF4444`)
- Text: White

### Input Fields

#### Default State
- Background: `#F7FCFE` (Cloud White)
- Border: 1px solid `#C8EAF3`
- Border Radius: 12px
- Height: 52px
- Left icon: Lucide icon (muted color)
- Placeholder: Text Secondary color

#### Active/Focused State
- Border: 1.5px solid Primary Cyan
- Background: Light Cyan tint
- Left icon: Primary Cyan

#### Phone Number Input
- Composite row: Country flag + code (`🇳🇬 +234 ▾`) | Input field
- Left section has subtle background tint

### Icons
- **Library**: Lucide React Native
- **Sizes**: 14px (inline), 18px (buttons), 20px (nav), 24px (service cards)
- **Style**: Stroke-based, consistent weight
- **No emojis** — all icons must be Lucide vector icons

---

## 5. Screen Layouts

### Authentication Screens (Login, Signup Phone, Signup OTP, Signup Details)

#### Structure
```
┌──────────────────────────┐
│  ← Back Arrow            │
│                          │
│     [Logo]               │
│   SkyleLight             │
│   Lighting the way...    │
│                          │
│  Page Title              │
│  Subtitle description    │
│                          │
│  ① ─── ② ─── ③          │  ← Step indicator (signup only)
│  Phone  OTP  Details     │
│                          │
│  [Hero Illustration]     │  ← stock.png
│                          │
│  Form Fields             │
│  ...                     │
│                          │
│  [Primary Button →]      │
│                          │
│  Already have account?   │
│  Login (underlined)      │
│                          │
│ ░░░░░░░░░░░░░░░░░░░░░░░ │  ← Bottom cyan gradient
└──────────────────────────┘
```

#### Key Design Rules
1. **No boxed/card layout** — the form content flows directly on the full screen
2. **Bottom gradient** — Light cyan (`#E6FAFF`) fading from transparent at ~120px from the bottom
3. **Step indicator** — Numbers in circles with labels underneath (Phone Number, OTP, Your Details)
4. **Hero image** — `stock.png` centered between the step indicator and form fields
5. **Buttons** — Full-width with right arrow icon (`→`)
6. **Footer links** — "Already have an account? **Login**" with Login underlined and bold

### Login Screen
- Email/Phone input with `Phone` icon
- Password input with `Lock` icon and toggle eye
- Remember me checkbox (filled cyan when active)
- "Forgot Password?" link
- Sign In button with arrow
- Fingerprint biometric button
- Divider line
- "Create Account" outline button

### Dashboard Screen

#### Structure
```
┌──────────────────────────┐
│ [Logo] SkyleLight  🌙🔔🚪│  ← Header bar with Lucide icons
├──────────────────────────┤
│ 📢 Scrolling ticker...   │
├──────────────────────────┤
│ Good morning             │
│ Welcome back, Name  🟢   │
│                          │
│ ⚠ Complete verification  │
│                          │
│ ╔══════════════════════╗ │
│ ║  Total Balance   👁  ║ │  ← Gradient card (cyan → blue)
│ ║  ₦247,650.30        ║ │
│ ║                      ║ │
│ ║ [Top Up] [Withdraw]  ║ │
│ ║                      ║ │
│ ║  Recent Transaction  ║ │
│ ║  ↙ Payment +₦6,300  ║ │
│ ║                      ║ │
│ ║ Income    │ Expenses  ║ │
│ ╚══════════════════════╝ │
│                          │
│ SkyleLight Services      │
│ ┌────┐ ┌────┐ ┌────┐    │
│ │ 📱 │ │ 📶 │ │ ⚡ │    │  ← Service grid (Lucide icons)
│ └────┘ └────┘ └────┘    │
│                          │
│ Invite Friends & Earn    │  ← Dark navy card
│ [SKY-CODE]  [📋 Copy]   │
│                          │
│ Session & Security       │  ← Red-tinted logout card
│ [Log Out of Account]     │
│                          │
├──────────────────────────┤
│ 🏠  ⏱  🏪  🎧  ⚙      │  ← Bottom nav (Lucide icons)
└──────────────────────────┘
```

#### Wallet Card
- **Background**: `LinearGradient` from `#18C9E8` → `#159BD7`
- **Balance**: Large bold white text (32px)
- **Eye toggle**: Show/hide balance
- **Action buttons**: "Top Up" and "Withdraw" with `PlusCircle` and `MinusCircle` icons
- **Recent transaction**: Semi-transparent white row with `ArrowDownLeft` icon
- **Metrics row**: Income vs Expenses at bottom

#### Services Grid
- 4 columns, 2 rows
- Each card: Lucide icon on pastel-tinted circle + label below
- Services: Airtime, Data, Pay Bills, Pay Salary, Investments, Loans, Games, E-pin

#### Bottom Navigation
- 5 tabs: Home, History, Merchant, Support, Settings
- Active tab: Primary Cyan icon + bold label
- Inactive: Text Secondary color

---

## 6. Navigation Architecture

**Library**: React Navigation (`@react-navigation/native-stack`)

```
NavigationContainer
└─ Stack.Navigator (headerShown: false)
   ├─ Login
   ├─ SignupPhone
   ├─ SignupOtp
   ├─ SignupDetails
   └─ Dashboard (gestureEnabled: false)
```

- Auth → Dashboard: Use `navigation.replace('Dashboard')` (prevents back gesture)
- Logout: Use `navigation.replace('Login')`
- Between signup steps: Use `navigation.navigate()` + `navigation.goBack()`

---

## 7. File Structure

```
Skylelight-Project/
├── App.jsx                          # Root: Font loading + NavigationContainer
├── index.js                         # Entry point
├── assets/
│   ├── icon.png                     # App logo
│   ├── stock.png                    # Hero illustration
│   ├── splash-icon.png
│   └── android-icon-*.png
├── src/
│   ├── theme/
│   │   └── theme.js                 # Design tokens (colors, typography, spacing, radii)
│   ├── components/
│   │   ├── Button.jsx               # Shared button (primary, outline, danger)
│   │   ├── Input.jsx                # Shared text input with icons
│   │   ├── ServiceCard.jsx          # Dashboard service grid item (Lucide icon)
│   │   └── BottomNavItem.jsx        # Dashboard bottom nav tab (Lucide icon)
│   ├── screens/
│   │   ├── LoginScreen.jsx
│   │   ├── SignupPhoneScreen.jsx
│   │   ├── SignupOtpScreen.jsx
│   │   ├── SignupDetailsScreen.jsx
│   │   └── DashboardScreen.jsx
│   └── styles/
│       ├── authStyles.js            # Styles for all auth screens
│       └── dashStyles.js            # Styles for the dashboard
```

---

## 8. Dependencies

| Package                          | Purpose                     |
|----------------------------------|-----------------------------|
| `expo`                           | Framework                   |
| `@react-navigation/native`      | Navigation container        |
| `@react-navigation/native-stack` | Stack navigator             |
| `react-native-screens`          | Native screen optimizations  |
| `react-native-safe-area-context` | Safe area insets            |
| `expo-linear-gradient`          | Gradient backgrounds         |
| `lucide-react-native`           | Vector icon library          |
| `react-native-svg`              | SVG rendering (Lucide dep)   |
| `@expo-google-fonts/poppins`    | Brand typography             |
| `expo-font`                     | Font loading                 |

---

## 9. Design Principles

1. **Mobile-first**: No boxed/card containers on auth screens — content fills the viewport
2. **Consistency**: All colors, fonts, and spacing come from `theme.js` tokens
3. **No emojis**: Every icon is a Lucide React Native vector component
4. **Smooth gradients**: Bottom-of-screen cyan fade on auth screens; wallet card gradient on dashboard
5. **Premium feel**: Poppins typography, soft shadows, rounded corners, micro-animations
6. **Accessibility**: Sufficient color contrast, touch targets ≥ 44px, clear labels
