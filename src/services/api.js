import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://kp.webdevhub.com.ng';

// Opt in to simulated OTP delivery with EXPO_PUBLIC_DEV_MODE=true. This must be
// an explicit choice: the X-Dev-Mode header makes the API skip Twilio entirely
// and accept the static code 123456, so tying it to __DEV__ silently disabled
// real SMS in every development build.
const DEV_MODE = process.env.EXPO_PUBLIC_DEV_MODE === 'true';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'X-Client': 'mobile',
    'X-Dev-Mode': DEV_MODE ? 'true' : 'false',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage
      await AsyncStorage.multiRemove(['access_token', 'user_data']);
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  // Send OTP to phone (with optional email fallback)
  sendOTP: async (phone, options = {}) => {
    const { email = '', name = '', preferredChannel = 'auto' } = options;
    const response = await api.post('/api/register', {
      action: 'send_otp',
      data: { phone, email, name, preferred_channel: preferredChannel },
    });
    return response.data;
  },

  // Verify OTP (supports both SMS and Email)
  verifyOTP: async (identifier, otpCode, channel = null) => {
    const response = await api.post('/api/register', {
      action: 'verify_otp',
      data: { identifier, otp_code: otpCode, channel },
    });
    return response.data;
  },

  // Complete registration
  completeRegistration: async (phone, name, password, email = '', transactionPin = '', channel = 'sms') => {
    const response = await api.post('/api/register', {
      action: 'complete_registration',
      data: { phone, name, password, email, transaction_pin: transactionPin, channel },
    });
    return response.data;
  },

  // Login
  login: async (identifier, password) => {
    const response = await api.post('/api/login', {
      action: 'login',
      data: { identifier, password },
    });
    return response.data;
  },

  // Get profile
  getProfile: async () => {
    const response = await api.post('/api/profile', {
      action: 'get_profile',
    });
    return response.data;
  },

  // Get about content
  getAbout: async () => {
    const response = await api.post('/api/profile', {
      action: 'get_about',
    });
    return response.data;
  },

  // Get transaction limits
  getTransactionLimits: async () => {
    const response = await api.post('/api/profile', {
      action: 'get_transaction_limits',
    });
    return response.data;
  },

  // Update transaction limits
  updateTransactionLimits: async (maxTransactionLimit) => {
    const response = await api.post('/api/profile', {
      action: 'update_transaction_limits',
      data: { max_transaction_limit: maxTransactionLimit },
    });
    return response.data;
  },

  // Toggle account lock
  toggleAccountLock: async (accountStatus) => {
    const response = await api.post('/api/profile', {
      action: 'toggle_account_lock',
      data: { account_status: accountStatus },
    });
    return response.data;
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.post('/api/profile', {
      action: 'change_password',
      data: { current_password: currentPassword, new_password: newPassword },
    });
    return response.data;
  },

  // Change transaction PIN
  changeTransactionPin: async (currentPin, newPin) => {
    const response = await api.post('/api/profile', {
      action: 'change_transaction_pin',
      data: { current_pin: currentPin, new_pin: newPin },
    });
    return response.data;
  },

  // Set biometric preference
  setBiometricPreference: async (enabled) => {
    const response = await api.post('/api/profile', {
      action: 'set_biometric_preference',
      data: { enabled },
    });
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post('/api/profile', {
      action: 'logout',
    });
    return response.data;
  },
};

export const walletAPI = {
  // Fetch wallet details and transactions
  fetchDetails: async (recentTranxLimit = 10) => {
    const response = await api.post('/api/user/account', {
      action: 'fetch_details',
      data: { 'recent-tranx-limit': recentTranxLimit },
    });
    return response.data;
  },
};

export const storage = {
  saveToken: async (token) => {
    await AsyncStorage.setItem('access_token', token);
  },
  getToken: async () => {
    return await AsyncStorage.getItem('access_token');
  },
  saveUserData: async (userData) => {
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));
  },
  getUserData: async () => {
    const data = await AsyncStorage.getItem('user_data');
    return data ? JSON.parse(data) : null;
  },
  clearAuth: async () => {
    await AsyncStorage.multiRemove(['access_token', 'user_data']);
  },
};

export default api;