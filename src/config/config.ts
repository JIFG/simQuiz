// src/config.ts
import { Platform } from 'react-native';

const isDev = __DEV__;  // true en desarrollo, false en producción

export const API_URL = isDev
  ? Platform.OS === 'android'
    ? 'http://192.168.1.14:5000'   // Android emulator
    : 'http://localhost:5000'  // iOS simulator y web
  : 'https://tu-backend-produccion.com';
