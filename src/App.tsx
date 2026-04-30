import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import * as d3 from 'd3';

// ===== THEME SYSTEM =====
type ThemeType = 'original' | 'dark' | 'realistic' | 'apple' | 'material';

interface ThemeColors {
  // Background colors
  pageBg: string;
  cardBg: string;
  cardBorder: string;
  headerBg: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  
  // Button colors
  btnPrimary: string;
  btnPrimaryHover: string;
  btnPrimaryText: string;
  btnSecondary: string;
  btnSecondaryHover: string;
  btnSecondaryText: string;
  btnSecondaryBorder: string;
  
  // Input colors
  inputBg: string;
  inputBorder: string;
  inputText: string;
  inputPlaceholder: string;
  inputFocus: string;
  
  // Map colors
  mapBg: string;
  mapBorder: string;
  regionDefault: string;
  regionStroke: string;
  regionHoverStroke: string;
  
  // Table colors
  tableBg: string;
  tableHeaderBg: string;
  tableRowHover: string;
  tableBorder: string;
  
  // Tooltip
  tooltipBg: string;
  tooltipText: string;
  
  // Badge
  badgeBg: string;
  badgeText: string;
  
  // Dropdown
  dropdownBg: string;
  dropdownBorder: string;
  dropdownItemHover: string;
  
  // Shadows
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
}

const themes: Record<ThemeType, ThemeColors> = {
  original: {
    pageBg: '#f8fafc',
    cardBg: '#ffffff',
    cardBorder: '#e2e8f0',
    headerBg: '#ffffff',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#94a3b8',
    btnPrimary: '#1e293b',
    btnPrimaryHover: '#0f172a',
    btnPrimaryText: '#ffffff',
    btnSecondary: '#ffffff',
    btnSecondaryHover: '#f8fafc',
    btnSecondaryText: '#475569',
    btnSecondaryBorder: '#e2e8f0',
    inputBg: '#f8fafc',
    inputBorder: '#e2e8f0',
    inputText: '#0f172a',
    inputPlaceholder: '#cbd5e1',
    inputFocus: '#94a3b8',
    mapBg: '#f8fafc',
    mapBorder: '#e2e8f0',
    regionDefault: '#e0e0e0',
    regionStroke: '#ffffff',
    regionHoverStroke: '#333333',
    tableBg: '#ffffff',
    tableHeaderBg: '#f8fafc',
    tableRowHover: 'rgba(248, 250, 252, 0.5)',
    tableBorder: '#f1f5f9',
    tooltipBg: '#0f172a',
    tooltipText: '#ffffff',
    badgeBg: '#f1f5f9',
    badgeText: '#64748b',
    dropdownBg: '#ffffff',
    dropdownBorder: '#f1f5f9',
    dropdownItemHover: '#f8fafc',
    shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    shadowLg: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  dark: {
    pageBg: '#0f172a',
    cardBg: '#1e293b',
    cardBorder: '#334155',
    headerBg: '#1e293b',
    textPrimary: '#f8fafc',
    textSecondary: '#cbd5e1',
    textMuted: '#64748b',
    btnPrimary: '#3b82f6',
    btnPrimaryHover: '#2563eb',
    btnPrimaryText: '#ffffff',
    btnSecondary: '#334155',
    btnSecondaryHover: '#475569',
    btnSecondaryText: '#e2e8f0',
    btnSecondaryBorder: '#475569',
    inputBg: '#0f172a',
    inputBorder: '#334155',
    inputText: '#f8fafc',
    inputPlaceholder: '#475569',
    inputFocus: '#3b82f6',
    mapBg: '#0f172a',
    mapBorder: '#334155',
    regionDefault: '#334155',
    regionStroke: '#1e293b',
    regionHoverStroke: '#60a5fa',
    tableBg: '#1e293b',
    tableHeaderBg: '#0f172a',
    tableRowHover: 'rgba(51, 65, 85, 0.5)',
    tableBorder: '#334155',
    tooltipBg: '#f8fafc',
    tooltipText: '#0f172a',
    badgeBg: '#334155',
    badgeText: '#94a3b8',
    dropdownBg: '#1e293b',
    dropdownBorder: '#334155',
    dropdownItemHover: '#334155',
    shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.4)',
    shadowLg: '0 25px 50px -12px rgb(0 0 0 / 0.6)',
  },
  realistic: {
    pageBg: 'linear-gradient(180deg, #87CEEB 0%, #5BA3C0 40%, #4A90A4 100%)',
    cardBg: 'linear-gradient(160deg, #e8d4b8 0%, #d4bc96 20%, #c4a06a 60%, #a08050 100%)',
    cardBorder: '#5d4037',
    headerBg: 'linear-gradient(145deg, #deb887 0%, #c4a06a 100%)',
    textPrimary: '#2d1810',
    textSecondary: '#4a3728',
    textMuted: '#7a6a5a',
    btnPrimary: 'linear-gradient(160deg, #6d4c2a 0%, #4a3320 50%, #3d2914 100%)',
    btnPrimaryHover: 'linear-gradient(160deg, #7d5c3a 0%, #5a4330 50%, #4d3924 100%)',
    btnPrimaryText: '#ffecd2',
    btnSecondary: 'linear-gradient(160deg, #e0c8a8 0%, #c8b090 50%, #b09878 100%)',
    btnSecondaryHover: 'linear-gradient(160deg, #f0d8b8 0%, #d8c0a0 50%, #c0a888 100%)',
    btnSecondaryText: '#2d1810',
    btnSecondaryBorder: '#8b7355',
    inputBg: 'linear-gradient(180deg, #fff8f0 0%, #f5e8d8 100%)',
    inputBorder: '#b09878',
    inputText: '#2d1810',
    inputPlaceholder: '#a09080',
    inputFocus: '#6d4c2a',
    mapBg: 'linear-gradient(180deg, #1e90ff 0%, #1a7acc 30%, #0066b3 60%, #004d99 100%)',
    mapBorder: '#5d4037',
    regionDefault: '#dcd0c0',
    regionStroke: '#8b7355',
    regionHoverStroke: '#2d1810',
    tableBg: 'linear-gradient(180deg, #e0c8a8 0%, #d0b898 50%, #c0a888 100%)',
    tableHeaderBg: 'linear-gradient(180deg, #c8b090 0%, #a89070 100%)',
    tableRowHover: 'rgba(109, 76, 42, 0.12)',
    tableBorder: '#b09878',
    tooltipBg: '#2d1810',
    tooltipText: '#ffecd2',
    badgeBg: 'linear-gradient(145deg, #d4bc96 0%, #b8a078 100%)',
    badgeText: '#2d1810',
    dropdownBg: 'linear-gradient(180deg, #f0e0c8 0%, #e0d0b0 50%, #d0c0a0 100%)',
    dropdownBorder: '#8b7355',
    dropdownItemHover: 'rgba(109, 76, 42, 0.15)',
    shadowSm: '2px 2px 4px rgba(45,24,16,0.3), inset 1px 1px 2px rgba(255,255,255,0.4), inset -1px -1px 2px rgba(45,24,16,0.15)',
    shadowMd: '4px 4px 12px rgba(45,24,16,0.35), inset 2px 2px 4px rgba(255,255,255,0.3), inset -1px -1px 3px rgba(45,24,16,0.1)',
    shadowLg: '8px 8px 24px rgba(45,24,16,0.4), inset 3px 3px 6px rgba(255,255,255,0.25), inset -2px -2px 4px rgba(45,24,16,0.15)',
  },
  apple: {
    // Dark background with vibrant gradient for true Liquid Glass effect
    pageBg: 'linear-gradient(160deg, #0a0a12 0%, #1a1a2e 30%, #16213e 60%, #0f0f1a 100%)',
    cardBg: 'rgba(255, 255, 255, 0.08)',
    cardBorder: 'rgba(255, 255, 255, 0.12)',
    headerBg: 'rgba(255, 255, 255, 0.06)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    textMuted: 'rgba(255, 255, 255, 0.5)',
    btnPrimary: 'rgba(255, 255, 255, 0.12)',
    btnPrimaryHover: 'rgba(255, 255, 255, 0.18)',
    btnPrimaryText: '#ffffff',
    btnSecondary: 'rgba(255, 255, 255, 0.06)',
    btnSecondaryHover: 'rgba(255, 255, 255, 0.12)',
    btnSecondaryText: 'rgba(255, 255, 255, 0.9)',
    btnSecondaryBorder: 'rgba(255, 255, 255, 0.15)',
    inputBg: 'rgba(255, 255, 255, 0.08)',
    inputBorder: 'rgba(255, 255, 255, 0.15)',
    inputText: '#ffffff',
    inputPlaceholder: 'rgba(255, 255, 255, 0.35)',
    inputFocus: 'rgba(255, 255, 255, 0.3)',
    mapBg: 'rgba(255, 255, 255, 0.05)',
    mapBorder: 'rgba(255, 255, 255, 0.1)',
    regionDefault: 'rgba(255, 255, 255, 0.15)',
    regionStroke: 'rgba(255, 255, 255, 0.25)',
    regionHoverStroke: 'rgba(255, 255, 255, 0.8)',
    tableBg: 'rgba(255, 255, 255, 0.06)',
    tableHeaderBg: 'rgba(255, 255, 255, 0.04)',
    tableRowHover: 'rgba(255, 255, 255, 0.06)',
    tableBorder: 'rgba(255, 255, 255, 0.08)',
    tooltipBg: 'rgba(0, 0, 0, 0.75)',
    tooltipText: '#ffffff',
    badgeBg: 'rgba(255, 255, 255, 0.1)',
    badgeText: 'rgba(255, 255, 255, 0.9)',
    dropdownBg: 'rgba(30, 30, 40, 0.85)',
    dropdownBorder: 'rgba(255, 255, 255, 0.1)',
    dropdownItemHover: 'rgba(255, 255, 255, 0.08)',
    shadowSm: '0 2px 8px rgba(0, 0, 0, 0.3)',
    shadowMd: '0 8px 32px rgba(0, 0, 0, 0.4)',
    shadowLg: '0 16px 48px rgba(0, 0, 0, 0.5)',
  },
  material: {
    // Material You defaults - will be overridden by tonal palette
    pageBg: '#fef7ff',
    cardBg: '#ffffff',
    cardBorder: 'transparent',
    headerBg: '#ffffff',
    textPrimary: '#1d1b20',
    textSecondary: '#49454f',
    textMuted: '#79747e',
    btnPrimary: '#6750a4',
    btnPrimaryHover: '#7c5dbd',
    btnPrimaryText: '#ffffff',
    btnSecondary: '#e8def8',
    btnSecondaryHover: '#d0bcff',
    btnSecondaryText: '#1d192b',
    btnSecondaryBorder: 'transparent',
    inputBg: '#f3edf7',
    inputBorder: '#79747e',
    inputText: '#1d1b20',
    inputPlaceholder: '#79747e',
    inputFocus: '#6750a4',
    mapBg: '#f3edf7',
    mapBorder: 'transparent',
    regionDefault: '#e7e0ec',
    regionStroke: '#ffffff',
    regionHoverStroke: '#6750a4',
    tableBg: '#ffffff',
    tableHeaderBg: '#f3edf7',
    tableRowHover: '#f3edf7',
    tableBorder: '#e7e0ec',
    tooltipBg: '#322f35',
    tooltipText: '#f4eff4',
    badgeBg: '#e8def8',
    badgeText: '#1d192b',
    dropdownBg: '#f3edf7',
    dropdownBorder: 'transparent',
    dropdownItemHover: '#e8def8',
    shadowSm: '0 1px 2px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
    shadowMd: '0 1px 2px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)',
    shadowLg: '0 4px 8px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.08), 0 12px 24px rgba(0,0,0,0.06)',
  },
};

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'original',
  setTheme: () => {},
  colors: themes.original,
});

const useTheme = () => useContext(ThemeContext);

// Material Design 3 Color System - Generate tonal palette from seed color
const generateMaterialYouPalette = (seedColor: string) => {
  // Convert hex to HSL for manipulation
  const hexToHSL = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const hsl = hexToHSL(seedColor);
  
  // Generate Material You tonal palette
  const tones = {
    primary: {
      0: hslToHex(hsl.h, Math.min(hsl.s, 30), 0),
      10: hslToHex(hsl.h, Math.min(hsl.s + 10, 40), 10),
      20: hslToHex(hsl.h, Math.min(hsl.s + 10, 45), 20),
      30: hslToHex(hsl.h, Math.min(hsl.s + 5, 48), 30),
      40: hslToHex(hsl.h, hsl.s, 40),
      50: hslToHex(hsl.h, hsl.s, 50),
      60: hslToHex(hsl.h, hsl.s - 5, 60),
      70: hslToHex(hsl.h, hsl.s - 10, 70),
      80: hslToHex(hsl.h, Math.max(hsl.s - 15, 30), 80),
      90: hslToHex(hsl.h, Math.max(hsl.s - 20, 40), 90),
      95: hslToHex(hsl.h, Math.max(hsl.s - 25, 35), 95),
      99: hslToHex(hsl.h, Math.max(hsl.s - 30, 20), 99),
      100: '#ffffff',
    },
    secondary: {
      10: hslToHex(hsl.h, Math.max(hsl.s - 40, 10), 10),
      30: hslToHex(hsl.h, Math.max(hsl.s - 35, 15), 30),
      50: hslToHex(hsl.h, Math.max(hsl.s - 30, 20), 50),
      90: hslToHex(hsl.h, Math.max(hsl.s - 30, 25), 90),
    },
    tertiary: {
      40: hslToHex((hsl.h + 60) % 360, hsl.s - 10, 40),
      80: hslToHex((hsl.h + 60) % 360, hsl.s - 20, 80),
      90: hslToHex((hsl.h + 60) % 360, hsl.s - 25, 90),
    },
    neutral: {
      0: '#000000',
      10: hslToHex(hsl.h, 5, 10),
      20: hslToHex(hsl.h, 5, 20),
      90: hslToHex(hsl.h, 5, 90),
      95: hslToHex(hsl.h, 4, 95),
      99: hslToHex(hsl.h, 3, 99),
    },
    neutralVariant: {
      30: hslToHex(hsl.h, 10, 30),
      50: hslToHex(hsl.h, 8, 50),
      80: hslToHex(hsl.h, 10, 80),
      90: hslToHex(hsl.h, 12, 90),
    },
    surface: {
      container: hslToHex(hsl.h, 12, 94),
      containerHigh: hslToHex(hsl.h, 14, 92),
      containerHighest: hslToHex(hsl.h, 16, 90),
      containerLow: hslToHex(hsl.h, 10, 96),
    },
    error: {
      40: '#ba1a1a',
      90: '#ffdad6',
    }
  };

  return tones;
};

// Material You seed colors
const materialYouColors = [
  { name: 'Purple', value: '#6750a4', emoji: '💜' },
  { name: 'Blue', value: '#0061a4', emoji: '💙' },
  { name: 'Teal', value: '#006a6a', emoji: '🩵' },
  { name: 'Green', value: '#386a20', emoji: '💚' },
  { name: 'Yellow', value: '#6d5e00', emoji: '💛' },
  { name: 'Orange', value: '#8b5000', emoji: '🧡' },
  { name: 'Red', value: '#ba1a1a', emoji: '❤️' },
  { name: 'Pink', value: '#984061', emoji: '💗' },
];

// Complete list of Russian regions
const REGIONS_DATA = [
  // Central Federal District
  { id: 1, name: 'Белгородская область', district: 'Центральный', code: 'RU-BEL' },
  { id: 2, name: 'Брянская область', district: 'Центральный', code: 'RU-BRY' },
  { id: 3, name: 'Владимирская область', district: 'Центральный', code: 'RU-VLA' },
  { id: 4, name: 'Воронежская область', district: 'Центральный', code: 'RU-VOR' },
  { id: 5, name: 'Ивановская область', district: 'Центральный', code: 'RU-IVA' },
  { id: 6, name: 'Калужская область', district: 'Центральный', code: 'RU-KLU' },
  { id: 7, name: 'Костромская область', district: 'Центральный', code: 'RU-KOS' },
  { id: 8, name: 'Курская область', district: 'Центральный', code: 'RU-KRS' },
  { id: 9, name: 'Липецкая область', district: 'Центральный', code: 'RU-LIP' },
  { id: 10, name: 'Московская область', district: 'Центральный', code: 'RU-MOS' },
  { id: 11, name: 'Орловская область', district: 'Центральный', code: 'RU-ORL' },
  { id: 12, name: 'Рязанская область', district: 'Центральный', code: 'RU-RYA' },
  { id: 13, name: 'Смоленская область', district: 'Центральный', code: 'RU-SMO' },
  { id: 14, name: 'Тамбовская область', district: 'Центральный', code: 'RU-TAM' },
  { id: 15, name: 'Тверская область', district: 'Центральный', code: 'RU-TVE' },
  { id: 16, name: 'Тульская область', district: 'Центральный', code: 'RU-TUL' },
  { id: 17, name: 'Ярославская область', district: 'Центральный', code: 'RU-YAR' },
  { id: 18, name: 'Москва', district: 'Центральный', code: 'RU-MOW' },

  // Northwestern Federal District
  { id: 19, name: 'Республика Карелия', district: 'Северо-Западный', code: 'RU-KAR' },
  { id: 20, name: 'Республика Коми', district: 'Северо-Западный', code: 'RU-KOM' },
  { id: 21, name: 'Архангельская область', district: 'Северо-Западный', code: 'RU-ARK' },
  { id: 22, name: 'Вологодская область', district: 'Северо-Западный', code: 'RU-VLG' },
  { id: 23, name: 'Калининградская область', district: 'Северо-Западный', code: 'RU-KGD' },
  { id: 24, name: 'Ленинградская область', district: 'Северо-Западный', code: 'RU-LEN' },
  { id: 25, name: 'Мурманская область', district: 'Северо-Западный', code: 'RU-MUR' },
  { id: 26, name: 'Новгородская область', district: 'Северо-Западный', code: 'RU-NGR' },
  { id: 27, name: 'Псковская область', district: 'Северо-Западный', code: 'RU-PSK' },
  { id: 28, name: 'Санкт-Петербург', district: 'Северо-Западный', code: 'RU-SPE' },
  { id: 29, name: 'Ненецкий автономный округ', district: 'Северо-Западный', code: 'RU-NEN' },

  // Southern Federal District
  { id: 30, name: 'Республика Адыгея', district: 'Южный', code: 'RU-AD' },
  { id: 31, name: 'Республика Калмыкия', district: 'Южный', code: 'RU-KL' },
  { id: 32, name: 'Республика Крым', district: 'Южный', code: 'UA-43' },
  { id: 33, name: 'Краснодарский край', district: 'Южный', code: 'RU-KDA' },
  { id: 34, name: 'Астраханская область', district: 'Южный', code: 'RU-AST' },
  { id: 35, name: 'Волгоградская область', district: 'Южный', code: 'RU-VGG' },
  { id: 36, name: 'Ростовская область', district: 'Южный', code: 'RU-ROS' },
  { id: 37, name: 'Севастополь', district: 'Южный', code: 'UA-40' },

  // North Caucasian Federal District
  { id: 38, name: 'Республика Дагестан', district: 'Северо-Кавказский', code: 'RU-DA' },
  { id: 39, name: 'Республика Ингушетия', district: 'Северо-Кавказский', code: 'RU-IN' },
  { id: 40, name: 'Кабардино-Балкарская Республика', district: 'Северо-Кавказский', code: 'RU-KB' },
  { id: 41, name: 'Карачаево-Черкесская Республика', district: 'Северо-Кавказский', code: 'RU-KC' },
  { id: 42, name: 'Республика Северная Осетия — Алания', district: 'Северо-Кавказский', code: 'RU-SE' },
  { id: 43, name: 'Чеченская Республика', district: 'Северо-Кавказский', code: 'RU-CE' },
  { id: 44, name: 'Ставропольский край', district: 'Северо-Кавказский', code: 'RU-STA' },

  // Volga Federal District
  { id: 45, name: 'Республика Башкортостан', district: 'Приволжский', code: 'RU-BA' },
  { id: 46, name: 'Республика Марий Эл', district: 'Приволжский', code: 'RU-ME' },
  { id: 47, name: 'Республика Мордовия', district: 'Приволжский', code: 'RU-MO' },
  { id: 48, name: 'Республика Татарстан', district: 'Приволжский', code: 'RU-TA' },
  { id: 49, name: 'Удмуртская Республика', district: 'Приволжский', code: 'RU-UD' },
  { id: 50, name: 'Чувашская Республика', district: 'Приволжский', code: 'RU-CU' },
  { id: 51, name: 'Пермский край', district: 'Приволжский', code: 'RU-PER' },
  { id: 52, name: 'Кировская область', district: 'Приволжский', code: 'RU-KIR' },
  { id: 53, name: 'Нижегородская область', district: 'Приволжский', code: 'RU-NIZ' },
  { id: 54, name: 'Оренбургская область', district: 'Приволжский', code: 'RU-ORE' },
  { id: 55, name: 'Пензенская область', district: 'Приволжский', code: 'RU-PNZ' },
  { id: 56, name: 'Самарская область', district: 'Приволжский', code: 'RU-SAM' },
  { id: 57, name: 'Саратовская область', district: 'Приволжский', code: 'RU-SAR' },
  { id: 58, name: 'Ульяновская область', district: 'Приволжский', code: 'RU-ULY' },

  // Ural Federal District
  { id: 59, name: 'Курганская область', district: 'Уральский', code: 'RU-KGN' },
  { id: 60, name: 'Свердловская область', district: 'Уральский', code: 'RU-SVE' },
  { id: 61, name: 'Тюменская область', district: 'Уральский', code: 'RU-TYU' },
  { id: 62, name: 'Челябинская область', district: 'Уральский', code: 'RU-CHE' },
  { id: 63, name: 'Ханты-Мансийский автономный округ — Югра', district: 'Уральский', code: 'RU-KHM' },
  { id: 64, name: 'Ямало-Ненецкий автономный округ', district: 'Уральский', code: 'RU-YAN' },

  // Siberian Federal District
  { id: 65, name: 'Республика Алтай', district: 'Сибирский', code: 'RU-AL' },
  { id: 66, name: 'Республика Тыва', district: 'Сибирский', code: 'RU-TY' },
  { id: 67, name: 'Республика Хакасия', district: 'Сибирский', code: 'RU-KK' },
  { id: 68, name: 'Алтайский край', district: 'Сибирский', code: 'RU-ALT' },
  { id: 69, name: 'Красноярский край', district: 'Сибирский', code: 'RU-KYA' },
  { id: 70, name: 'Иркутская область', district: 'Сибирский', code: 'RU-IRK' },
  { id: 71, name: 'Кемеровская область — Кузбасс', district: 'Сибирский', code: 'RU-KEM' },
  { id: 72, name: 'Новосибирская область', district: 'Сибирский', code: 'RU-NVS' },
  { id: 73, name: 'Омская область', district: 'Сибирский', code: 'RU-OMS' },
  { id: 74, name: 'Томская область', district: 'Сибирский', code: 'RU-TOM' },

  // Far Eastern Federal District
  { id: 75, name: 'Республика Бурятия', district: 'Дальневосточный', code: 'RU-BU' },
  { id: 76, name: 'Республика Саха (Якутия)', district: 'Дальневосточный', code: 'RU-SA' },
  { id: 77, name: 'Забайкальский край', district: 'Дальневосточный', code: 'RU-ZAB' },
  { id: 78, name: 'Камчатский край', district: 'Дальневосточный', code: 'RU-KAM' },
  { id: 79, name: 'Приморский край', district: 'Дальневосточный', code: 'RU-PRI' },
  { id: 80, name: 'Хабаровский край', district: 'Дальневосточный', code: 'RU-KHA' },
  { id: 81, name: 'Амурская область', district: 'Дальневосточный', code: 'RU-AMU' },
  { id: 82, name: 'Магаданская область', district: 'Дальневосточный', code: 'RU-MAG' },
  { id: 83, name: 'Сахалинская область', district: 'Дальневосточный', code: 'RU-SAK' },
  { id: 84, name: 'Еврейская автономная область', district: 'Дальневосточный', code: 'RU-YEV' },
  { id: 85, name: 'Чукотский автономный округ', district: 'Дальневосточный', code: 'RU-CHU' },
];

<<<<<<< HEAD
// Federal Districts data
const DISTRICTS_DATA = [
  { id: 1, name: 'Центральный', regionIds: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18] },
  { id: 2, name: 'Северо-Западный', regionIds: [19,20,21,22,23,24,25,26,27,28,29] },
  { id: 3, name: 'Южный', regionIds: [30,31,32,33,34,35,36,37] },
  { id: 4, name: 'Северо-Кавказский', regionIds: [38,39,40,41,42,43,44] },
  { id: 5, name: 'Приволжский', regionIds: [45,46,47,48,49,50,51,52,53,54,55,56,57,58] },
  { id: 6, name: 'Уральский', regionIds: [59,60,61,62,63,64] },
  { id: 7, name: 'Сибирский', regionIds: [65,66,67,68,69,70,71,72,73,74] },
  { id: 8, name: 'Дальневосточный', regionIds: [75,76,77,78,79,80,81,82,83,84,85] },
];

// Map district name to district id for quick lookup
const districtNameToId: Record<string, number> = {};
DISTRICTS_DATA.forEach(d => { districtNameToId[d.name] = d.id; });

// Map region id to district id for quick lookup
const regionToDistrictId: Record<number, number> = {};
DISTRICTS_DATA.forEach(d => {
  d.regionIds.forEach(rId => { regionToDistrictId[rId] = d.id; });
});

=======
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
// Region mapping
const createRegionMapping = (): Map<string, number> => {
  const mapping = new Map<string, number>();
  
  const addVariants = (variants: string[], regionId: number) => {
    variants.forEach(v => mapping.set(v.toLowerCase().trim(), regionId));
  };

  // Central FD
  addVariants(['belgorod', 'belgorod oblast', 'belgorodskaya oblast', 'белгородская область'], 1);
  addVariants(['bryansk', 'bryansk oblast', 'bryanskaya oblast', 'брянская область'], 2);
  addVariants(['vladimir', 'vladimir oblast', 'vladimirskaya oblast', 'владимирская область'], 3);
  addVariants(['voronezh', 'voronezh oblast', 'voronezhskaya oblast', 'воронежская область'], 4);
  addVariants(['ivanovo', 'ivanovo oblast', 'ivanovskaya oblast', 'ивановская область'], 5);
  addVariants(['kaluga', 'kaluga oblast', 'kaluzhskaya oblast', 'калужская область'], 6);
  addVariants(['kostroma', 'kostroma oblast', 'kostromskaya oblast', 'костромская область'], 7);
  addVariants(['kursk', 'kursk oblast', 'kurskaya oblast', 'курская область'], 8);
  addVariants(['lipetsk', 'lipetsk oblast', 'lipetskaya oblast', 'липецкая область'], 9);
  addVariants(['moscow oblast', 'moskovskaya oblast', 'moscow region', 'podmoskovye', 'московская область'], 10);
  addVariants(['orel', 'oryol', 'orel oblast', 'oryol oblast', 'orlovskaya oblast', 'орловская область'], 11);
  addVariants(['ryazan', 'ryazan oblast', 'ryazanskaya oblast', 'рязанская область'], 12);
  addVariants(['smolensk', 'smolensk oblast', 'smolenskaya oblast', 'смоленская область'], 13);
  addVariants(['tambov', 'tambov oblast', 'tambovskaya oblast', 'тамбовская область'], 14);
  addVariants(['tver', 'tver oblast', 'tverskaya oblast', 'тверская область'], 15);
  addVariants(['tula', 'tula oblast', 'tulskaya oblast', 'тульская область'], 16);
  addVariants(['yaroslavl', 'yaroslavl oblast', 'yaroslavskaya oblast', 'ярославская область'], 17);
  addVariants(['moscow city', 'moscow', 'moskva', 'город москва', 'москва'], 18);

  // Northwestern FD
  addVariants(['karelia', 'republic of karelia', 'respublika kareliya', 'республика карелия'], 19);
  addVariants(['komi', 'komi republic', 'republic of komi', 'respublika komi', 'республика коми'], 20);
  addVariants(['arkhangelsk', 'archangelsk', 'arkhangelsk oblast', 'arkhangelskaya oblast', 'архангельская область'], 21);
  addVariants(['vologda', 'vologda oblast', 'vologodskaya oblast', 'вологодская область'], 22);
  addVariants(['kaliningrad', 'kaliningrad oblast', 'kaliningradskaya oblast', 'калининградская область'], 23);
  addVariants(['leningrad', 'leningrad oblast', 'leningradskaya oblast', 'ленинградская область'], 24);
  addVariants(['murmansk', 'murmansk oblast', 'murmanskaya oblast', 'мурманская область'], 25);
  addVariants(['novgorod', 'novgorod oblast', 'novgorodskaya oblast', 'новгородская область'], 26);
  addVariants(['pskov', 'pskov oblast', 'pskovskaya oblast', 'псковская область'], 27);
  addVariants(['saint petersburg', 'st. petersburg', 'st petersburg', 'sankt-peterburg', 'petersburg', 'санкт-петербург'], 28);
  addVariants(['nenets', 'nenets autonomous okrug', 'nenetskiy avtonomnyy okrug', 'nenetsia', 'ненецкий автономный округ'], 29);

  // Southern FD
  addVariants(['adygea', 'adygeya', 'republic of adygea', 'respublika adygeya', 'республика адыгея', 'адыгея'], 30);
  addVariants(['kalmykia', 'republic of kalmykia', 'respublika kalmykiya', 'республика калмыкия'], 31);
  addVariants(['crimea', 'krym', 'republic of crimea', 'республика крым'], 32);
  addVariants(['krasnodar', 'krasnodar krai', 'krasnodar kray', 'krasnodarskiy kray', 'краснодарский край'], 33);
  addVariants(['astrakhan', 'astrakhan oblast', 'astrakhanskaya oblast', 'астраханская область'], 34);
  addVariants(['volgograd', 'volgograd oblast', 'volgogradskaya oblast', 'волгоградская область'], 35);
  addVariants(['rostov', 'rostov oblast', 'rostovskaya oblast', 'ростовская область'], 36);
  addVariants(['sevastopol', 'севастополь'], 37);

  // North Caucasian FD
  addVariants(['dagestan', 'republic of dagestan', 'respublika dagestan', 'республика дагестан'], 38);
  addVariants(['ingushetia', 'ingushetiya', 'republic of ingushetia', 'respublika ingushetiya', 'республика ингушетия', 'ингушетия'], 39);
  addVariants(['kabardino-balkaria', 'kabardino-balkar republic', 'kabardino-balkariya', 'kabardino balkar', 'kabardino-balkar', 'кабардино-балкарская республика'], 40);
  addVariants(['karachay-cherkessia', 'karachaevo-cherkessia', 'karachay-cherkess republic', 'karachayevo-cherkesiya', 'karachay-cherkess', 'карачаево-черкесская республика'], 41);
  addVariants(['north ossetia', 'north ossetia-alania', 'north ossetia–alania', 'severnaya osetiya', 'severnaya osetiya-alaniya', 'республика северная осетия — алания', 'северная осетия - алания'], 42);
  addVariants(['chechnya', 'chechen republic', 'chechenskaya respublika', 'чеченская республика'], 43);
  addVariants(['stavropol', 'stavropol krai', 'stavropol kray', 'stavropolskiy kray', 'ставропольский край'], 44);

  // Volga FD
  addVariants(['bashkortostan', 'bashkiria', 'republic of bashkortostan', 'respublika bashkortostan', 'республика башкортостан'], 45);
  addVariants(['mari el', 'mari-el', 'republic of mari el', 'respublika mariy el', 'республика марий эл', 'марий эл'], 46);
  addVariants(['mordovia', 'republic of mordovia', 'respublika mordoviya', 'республика мордовия'], 47);
  addVariants(['tatarstan', 'republic of tatarstan', 'respublika tatarstan', 'республика татарстан'], 48);
  addVariants(['udmurtia', 'udmurt republic', 'udmurtskaya respublika', 'удмуртская республика'], 49);
  addVariants(['chuvashia', 'chuvash republic', 'chuvashskaya respublika', 'chuvash', 'чувашская республика', 'чувашия'], 50);
  addVariants(['perm', 'perm krai', 'perm kray', 'permskiy kray', 'пермский край'], 51);
  addVariants(['kirov', 'kirov oblast', 'kirovskaya oblast', 'кировская область'], 52);
  addVariants(['nizhny novgorod', 'nizhniy novgorod', 'nizhny novgorod oblast', 'nizhegorodskaya oblast', 'нижегородская область'], 53);
  addVariants(['orenburg', 'orenburg oblast', 'orenburgskaya oblast', 'оренбургская область'], 54);
  addVariants(['penza', 'penza oblast', 'penzenskaya oblast', 'пензенская область'], 55);
  addVariants(['samara', 'samara oblast', 'samarskaya oblast', 'самарская область'], 56);
  addVariants(['saratov', 'saratov oblast', 'saratovskaya oblast', 'саратовская область'], 57);
  addVariants(['ulyanovsk', 'ulyanovsk oblast', 'ulyanovskaya oblast', 'ульяновская область'], 58);

  // Ural FD
  addVariants(['kurgan', 'kurgan oblast', 'kurganskaya oblast', 'курганская область'], 59);
  addVariants(['sverdlovsk', 'sverdlovsk oblast', 'sverdlovskaya oblast', 'свердловская область'], 60);
  addVariants(['tyumen', 'tyumen oblast', 'tyumenskaya oblast', 'тюменская область'], 61);
  addVariants(['chelyabinsk', 'chelyabinsk oblast', 'chelyabinskaya oblast', 'челябинская область'], 62);
  
  // HMAO-Yugra
  addVariants([
    'khanty-mansi', 'khanty-mansiysk', 'khanty mansi', 'khanty mansiysk',
    'khanty-mansiysk autonomous okrug', 'khanty-mansiysk autonomous okrug-yugra',
    'khanty-mansiysk autonomous okrug — yugra', 'khanty-mansiysk autonomous okrug yugra',
    'khantia-mansia', 'khantymansiysk', 'yugra', 'khanty-mansiy', 'khanty mansiy',
    'khanty-mansy', 'khantymansi', 'khantymansiy', 'khantymansia',
    'khanty-mansiysky', 'khanty-mansiyskiy avtonomnyy okrug',
    'khanty-mansiyskiy avtonomnyy okrug — yugra', 'khanty-mansiyskiy ao',
    'hmao', 'hmao-yugra', 'hmao yugra', 'khanty-mansiisk', 'khanty mansiisk',
    'ханты-мансийский автономный округ — югра', 'ханты-мансийск', 'хмао', 'югра',
    'khanty-mansijsk', 'khanty mansijsk', 'khantymansijsk',
    'khanty-mansi autonomous okrug', 'khanty-mansi autonomous okrug — yugra',
    'khanty-mansi autonomous okrug - yugra', 'khantymansi autonomous okrug',
    'ханты-мансийский автономный округ - югра'
  ], 63);

  // Yamalo-Nenets AO
  addVariants([
    'yamal-nenets', 'yamalo-nenets', 'yamalo-nenets autonomous okrug',
    'yamalo-nenetskiy avtonomnyy okrug', 'yamal', 'yamalia', 'yanao',
    'yamalo nenets', 'yamal nenets', 'yamal-nenets autonomous okrug',
    'ямало-ненецкий автономный округ'
  ], 64);

  // Siberian FD
  addVariants(['altai republic', 'republic of altai', 'altai', 'gorno-altai', 'gorno-altaysk', 'respublika altay', 'республика алтай'], 65);
  addVariants(['tuva', 'tyva', 'republic of tuva', 'respublika tyva', 'республика тыва', 'тыва'], 66);
  addVariants(['khakassia', 'republic of khakassia', 'respublika khakasiya', 'республика хакасия'], 67);
  addVariants(['altai krai', 'altay krai', 'altai kray', 'altayskiy kray', 'алтайский край'], 68);
  addVariants(['krasnoyarsk', 'krasnoyarsk krai', 'krasnoyarsk kray', 'krasnoyarskiy kray', 'красноярский край'], 69);
  addVariants(['irkutsk', 'irkutsk oblast', 'irkutskaya oblast', 'иркутская область'], 70);
  addVariants(['kemerovo', 'kemerovo oblast', 'kemerovskaya oblast', 'kuzbass', 'кемеровская область — кузбасс', 'кемеровская область'], 71);
  addVariants(['novosibirsk', 'novosibirsk oblast', 'novosibirskaya oblast', 'новосибирская область'], 72);
  
  // Omsk Oblast
  addVariants([
    'omsk', 'omsk oblast', 'omskaya oblast', 'омская область',
    'omsk region', 'omskaya', 'омск'
  ], 73);
  
  addVariants(['tomsk', 'tomsk oblast', 'tomskaya oblast', 'томская область'], 74);

  // Far Eastern FD
  addVariants(['buryatia', 'buryat republic', 'republic of buryatia', 'respublika buryatiya', 'республика бурятия', 'бурятия'], 75);
  addVariants(['sakha', 'yakutia', 'sakha republic', 'republic of sakha', 'respublika sakha (yakutiya)', 'sakha (yakutia)', 'республика саха (якутия)'], 76);
  addVariants(['zabaykalsky', 'zabaykalsky krai', 'zabaykalsky kray', 'zabaykalskiy kray', 'transbaikal', 'trans-baikal', 'chita', 'забайкальский край'], 77);
  addVariants(['kamchatka', 'kamchatka krai', 'kamchatka kray', 'kamchatskiy kray', 'камчатский край'], 78);
  addVariants(['primorsky', 'primorsky krai', 'primorsky kray', 'primorskiy kray', 'primorye', 'приморский край'], 79);
  addVariants(['khabarovsk', 'khabarovsk krai', 'khabarovsk kray', 'khabarovskiy kray', 'хабаровский край'], 80);
  addVariants(['amur', 'amur oblast', 'amurskaya oblast', 'амурская область'], 81);
  addVariants(['magadan', 'magadan oblast', 'magadanskaya oblast', 'магаданская область'], 82);
  addVariants(['sakhalin', 'sakhalin oblast', 'sakhalinskaya oblast', 'сахалинская область'], 83);
  addVariants(['jewish', 'jewish autonomous oblast', 'jewish ao', 'yevreyskaya ao', 'birobidzhan', 'еврейская автономная область'], 84);
  addVariants(['chukotka', 'chukotka autonomous okrug', 'chukotskiy avtonomnyy okrug', 'чукотский автономный округ'], 85);

  return mapping;
};

const REGION_MAPPING = createRegionMapping();

// Highlight colors for regions based on theme (for map highlighting)
const getHighlightColor = (theme: ThemeType, materialAccent?: string): string => {
  switch (theme) {
    case 'dark': return '#3b82f6'; // Blue
    case 'realistic': return '#fbbf24'; // Amber/Gold
    case 'apple': return 'rgba(255, 255, 255, 0.5)'; // White glass
    case 'material': return materialAccent || '#ff9800'; // Material accent color
    default: return '#fbbf24'; // Amber
  }
};

// Highlight colors for table rows based on theme
const getTableHighlightColor = (theme: ThemeType, materialAccent?: string): string => {
  switch (theme) {
    case 'dark': return 'rgba(59, 130, 246, 0.3)'; // Blue with transparency
    case 'realistic': return 'rgba(251, 191, 36, 0.4)'; // Amber/Gold with transparency
    case 'apple': return 'rgba(255, 255, 255, 0.15)'; // White glass
    case 'material': return materialAccent ? `${materialAccent}40` : 'rgba(255, 152, 0, 0.25)'; // Material accent with transparency
    default: return 'rgba(251, 191, 36, 0.4)'; // Amber
  }
};

// Theme Button Component (static in header, NOT moving with scroll)
const ThemeButton: React.FC<{
  isOpen: boolean;
  onClick: () => void;
}> = ({ isOpen, onClick }) => {
  const { theme, colors } = useTheme();
  
  const getButtonStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 44,
      height: 44,
      fontSize: '14px',
      fontWeight: 500,
      borderRadius: theme === 'material' ? '12px' : theme === 'apple' ? '12px' : theme === 'realistic' ? '10px' : '10px',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      border: theme === 'apple' ? '1px solid rgba(255,255,255,0.2)' : `1px solid ${colors.btnSecondaryBorder}`,
      color: colors.btnSecondaryText,
      background: theme === 'apple' ? 'rgba(255,255,255,0.1)' : colors.cardBg,
      boxShadow: colors.shadowSm,
    };
    
    if (theme === 'realistic') {
      baseStyle.background = 'linear-gradient(145deg, #d4a574 0%, #b8956a 100%)';
      baseStyle.boxShadow = '3px 3px 8px rgba(0,0,0,0.4), inset 1px 1px 3px rgba(255,255,255,0.4), inset -1px -1px 3px rgba(0,0,0,0.15)';
      baseStyle.border = '2px solid #5d4037';
    }
    
    if (theme === 'apple') {
      baseStyle.backdropFilter = 'blur(40px) saturate(180%)';
      baseStyle.WebkitBackdropFilter = 'blur(40px) saturate(180%)';
    }
    
    if (theme === 'material') {
      baseStyle.boxShadow = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';
      baseStyle.borderRadius = '12px';
    }
    
    return baseStyle;
  };
  
  return (
    <button 
      onClick={onClick} 
      style={getButtonStyle()}
      title="Выбор темы"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease',
        }}
      >
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    </button>
  );
};

// Theme Menu Component (dropdown from header button)
const ThemeMenu: React.FC<{
  isOpen: boolean;
  isClosing: boolean;
  onClose: () => void;
  materialAccent: string;
  setMaterialAccent: (color: string) => void;
  anchorRef?: React.RefObject<HTMLDivElement | null>;
}> = ({ isOpen, isClosing, onClose, materialAccent, setMaterialAccent, anchorRef }) => {
  const { theme, setTheme, colors } = useTheme();
  
  if (!isOpen && !isClosing) return null;
  
  // Calculate position based on anchor
  const getMenuPosition = (): { top: number; right: number } => {
    if (anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      return { top: rect.bottom + 8, right: window.innerWidth - rect.right };
    }
    return { top: 80, right: 24 };
  };
  
  const pos = getMenuPosition();
  
  const getMenuStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: 'fixed',
      right: pos.right,
      top: pos.top,
      padding: '20px',
      width: '320px',
      maxHeight: 'calc(100vh - 100px)',
      overflowY: 'auto',
      borderRadius: theme === 'material' ? '28px' : theme === 'apple' ? '20px' : theme === 'realistic' ? '16px' : '16px',
      background: theme === 'apple' ? 'rgba(20, 20, 25, 0.85)' : colors.dropdownBg,
      border: theme === 'apple' ? '1px solid rgba(255,255,255,0.15)' : `1px solid ${colors.dropdownBorder}`,
      boxShadow: colors.shadowLg,
      zIndex: 1001,
      animation: isClosing ? 'menuFadeOut 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'menuFadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      transformOrigin: 'top right',
    };
    
    if (theme === 'apple') {
      baseStyle.backdropFilter = 'blur(60px) saturate(200%)';
      baseStyle.WebkitBackdropFilter = 'blur(60px) saturate(200%)';
    }
    
    if (theme === 'realistic') {
      baseStyle.background = 'linear-gradient(180deg, #f0e0c8 0%, #d8c8a8 50%, #c8b898 100%)';
      baseStyle.boxShadow = '8px 8px 20px rgba(0,0,0,0.4), inset 2px 2px 6px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.1)';
      baseStyle.border = '3px solid #5d4037';
    }
    
    if (theme === 'material') {
      baseStyle.boxShadow = '0 8px 10px -6px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12)';
    }
    
    return baseStyle;
  };
  
  const getItemStyle = (isActive: boolean): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '14px 16px',
      borderRadius: theme === 'material' ? '16px' : '12px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      color: colors.textPrimary,
      background: isActive ? colors.dropdownItemHover : 'transparent',
      border: isActive ? `2px solid ${theme === 'material' ? materialAccent : colors.textMuted}` : '2px solid transparent',
    };
    
    if (theme === 'realistic' && isActive) {
      baseStyle.background = 'rgba(109, 76, 42, 0.2)';
      baseStyle.boxShadow = 'inset 2px 2px 4px rgba(0,0,0,0.15)';
    }
    
    if (theme === 'material') {
      baseStyle.borderRadius = '16px';
    }
    
    return baseStyle;
  };

  const themeOptions: { id: ThemeType; name: string; icon: React.ReactNode; description: string }[] = [
    {
      id: 'original',
      name: 'Оригинальная',
      icon: <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', border: '2px solid #cbd5e1' }} />,
      description: 'Светлая минималистичная тема'
    },
    {
      id: 'dark',
      name: 'Тёмная',
      icon: <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '2px solid #334155' }} />,
      description: 'Тёмная версия'
    },
    {
      id: 'realistic',
      name: 'Реалистичная',
      icon: <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #87CEEB 0%, #deb887 100%)', border: '2px solid #8b7355', boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.5)' }} />,
      description: 'Вода и дерево'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: (
        <div style={{ 
          width: 28, 
          height: 28, 
          borderRadius: 8, 
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', 
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: 14,
            height: 14,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1)',
          }} />
        </div>
      ),
      description: 'Liquid Glass'
    },
    {
      id: 'material',
      name: 'Google',
      icon: (
        <div style={{ 
          width: 28, 
          height: 28, 
          borderRadius: 8, 
          background: `conic-gradient(from 180deg, #4285F4, #EA4335, #FBBC05, #34A853, #4285F4)`,
          border: `2px solid ${materialAccent}`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }} />
      ),
      description: 'Material You (M3)'
    },
  ];
  
  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={onClose} />
      <div style={getMenuStyle()}>
        <div style={{ 
          marginBottom: 16, 
          fontSize: 12, 
          fontWeight: 600, 
          textTransform: 'uppercase', 
          letterSpacing: 1.5, 
          color: colors.textMuted,
          paddingLeft: 4,
        }}>
          Выберите тему
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {themeOptions.map(opt => (
            <div
              key={opt.id}
              style={getItemStyle(theme === opt.id)}
              onClick={() => { setTheme(opt.id); if (opt.id !== 'material') onClose(); }}
              onMouseEnter={e => { if (theme !== opt.id) e.currentTarget.style.background = colors.dropdownItemHover; }}
              onMouseLeave={e => { if (theme !== opt.id) e.currentTarget.style.background = 'transparent'; }}
            >
              {opt.icon}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{opt.name}</div>
                <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>{opt.description}</div>
              </div>
              {theme === opt.id && (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme === 'material' ? materialAccent : colors.textPrimary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
          ))}
        </div>
        
        {/* Material Design 3 color picker - integrated with theme item */}
        {theme === 'material' && (
          <div style={{ 
            marginTop: 8,
            marginLeft: 42,
            padding: '16px',
            background: colors.dropdownItemHover,
            borderRadius: '16px',
          }}>
            <div style={{ 
              marginBottom: 12, 
              fontSize: 11, 
              fontWeight: 600, 
              textTransform: 'uppercase', 
              letterSpacing: 1, 
              color: colors.textMuted,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              Динамический цвет
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: 8,
            }}>
              {materialYouColors.map(c => (
                <button
                  key={c.value}
                  onClick={() => setMaterialAccent(c.value)}
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    borderRadius: '12px',
                    background: c.value,
                    border: materialAccent === c.value ? '2px solid white' : '2px solid transparent',
                    boxShadow: materialAccent === c.value 
                      ? `0 0 0 2px ${c.value}, 0 4px 8px rgba(0,0,0,0.25)` 
                      : '0 2px 4px rgba(0,0,0,0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    transform: materialAccent === c.value ? 'scale(1.08)' : 'scale(1)',
                  }}
                  title={c.name}
                >
                  {/* Material Design checkmark instead of emoji */}
                  {materialAccent === c.value && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </button>
              ))}
            </div>
            <div style={{ 
              marginTop: 12,
              padding: '10px 12px',
              background: 'rgba(0,0,0,0.05)',
              borderRadius: '10px',
              fontSize: 11,
              color: colors.textMuted,
              lineHeight: 1.4,
            }}>
              💡 Material You генерирует палитру из выбранного цвета
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const App: React.FC = () => {
  // Load saved settings from localStorage
  const loadSavedSettings = () => {
    try {
      const saved = localStorage.getItem('russiaMapSettings');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading saved settings:', e);
    }
    return null;
  };
  
  const savedSettings = loadSavedSettings();
  
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(savedSettings?.currentTheme || 'original');
  const [materialAccent, setMaterialAccent] = useState(savedSettings?.materialAccent || '#6750a4');
  const [data, setData] = useState<{ [key: number]: number }>({});
<<<<<<< HEAD
  const [districtData, setDistrictData] = useState<{ [key: number]: number }>({});
  const [tableMode, setTableMode] = useState<'regions' | 'districts'>('regions');
  const [tableSwitching, setTableSwitching] = useState(false);
  const districtDataRef = useRef<{ [key: number]: number }>({});
=======
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
  const [mapLoaded, setMapLoaded] = useState(false);
  void mapLoaded;
  const [mapError, setMapError] = useState<string | null>(null);
  const [unmappedRegions, setUnmappedRegions] = useState<string[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const mapGroupRef = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const currentColorsRef = useRef<ThemeColors>(themes.original);
  const themeButtonRef = useRef<HTMLDivElement>(null);
  
<<<<<<< HEAD
  // Mobile detection and responsive state
  const [isMobile, setIsMobile] = useState(false);
  const [mobileView, setMobileView] = useState<'map' | 'table'>('map');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
=======
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
  const dataRef = useRef<{ [key: number]: number }>({});
  
  // Color settings - load from localStorage
  const [minColor, setMinColor] = useState(savedSettings?.minColor || '#e2e8f0');
  const [midColor, setMidColor] = useState(savedSettings?.midColor || '#ffffff');
  const [maxColor, setMaxColor] = useState(savedSettings?.maxColor || '#475569');
  const [useMidpoint, setUseMidpoint] = useState(savedSettings?.useMidpoint ?? false);
  
  // Debounced colors for performance (to avoid lag when picking colors)
  const [debouncedMinColor, setDebouncedMinColor] = useState(minColor);
  const [debouncedMidColor, setDebouncedMidColor] = useState(midColor);
  const [debouncedMaxColor, setDebouncedMaxColor] = useState(maxColor);
  
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const [colorMenuClosing, setColorMenuClosing] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [themeMenuClosing, setThemeMenuClosing] = useState(false);
  const [showBackToMap, setShowBackToMap] = useState(false);
  
  // Input refs for Enter navigation
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  
  // Debounce color changes for performance
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedMinColor(minColor), 30);
    return () => clearTimeout(timer);
  }, [minColor]);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedMidColor(midColor), 30);
    return () => clearTimeout(timer);
  }, [midColor]);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedMaxColor(maxColor), 30);
    return () => clearTimeout(timer);
  }, [maxColor]);
  
  // Save settings to localStorage
  useEffect(() => {
    const settings = {
      currentTheme,
      materialAccent,
      minColor: debouncedMinColor,
      midColor: debouncedMidColor,
      maxColor: debouncedMaxColor,
      useMidpoint
    };
    localStorage.setItem('russiaMapSettings', JSON.stringify(settings));
  }, [currentTheme, materialAccent, debouncedMinColor, debouncedMidColor, debouncedMaxColor, useMidpoint]);
  
  // Handle closing menus with animation
  const handleCloseColorMenu = () => {
    setColorMenuClosing(true);
    setTimeout(() => {
      setColorMenuOpen(false);
      setColorMenuClosing(false);
    }, 200);
  };
  
  const handleCloseThemeMenu = () => {
    setThemeMenuClosing(true);
    setTimeout(() => {
      setThemeMenuOpen(false);
      setThemeMenuClosing(false);
    }, 200);
  };
  
  // Handle Enter key to move to next input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, regionId: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextRegionId = regionId + 1;
      if (nextRegionId <= 85 && inputRefs.current[nextRegionId]) {
        inputRefs.current[nextRegionId]?.focus();
        inputRefs.current[nextRegionId]?.select();
      }
    }
  };

  // Generate Material You palette
  const materialPalette = generateMaterialYouPalette(materialAccent);

  // Get current theme colors with material accent override
  const getColors = (): ThemeColors => {
    const baseColors = themes[currentTheme];
    if (currentTheme === 'material') {
      return {
        ...baseColors,
        pageBg: materialPalette.primary[99],
        cardBg: materialPalette.surface.container,
        headerBg: materialPalette.surface.container,
        tableHeaderBg: materialPalette.surface.containerHigh,
        tableRowHover: materialPalette.surface.containerHighest,
        tableBorder: materialPalette.neutralVariant[80],
        btnPrimary: materialPalette.primary[40],
        btnPrimaryHover: materialPalette.primary[30],
        btnPrimaryText: materialPalette.primary[100],
        btnSecondary: materialPalette.secondary[90],
        btnSecondaryHover: materialPalette.secondary[90],
        btnSecondaryText: materialPalette.secondary[10],
        btnSecondaryBorder: 'transparent',
        inputBg: materialPalette.surface.containerHighest,
        inputBorder: materialPalette.neutralVariant[50],
        inputFocus: materialPalette.primary[40],
        mapBg: materialPalette.surface.containerLow,
        regionDefault: materialPalette.neutralVariant[90],
        regionStroke: materialPalette.primary[99],
        regionHoverStroke: materialPalette.primary[40],
        badgeBg: materialPalette.secondary[90],
        badgeText: materialPalette.secondary[10],
        dropdownBg: materialPalette.surface.containerHigh,
        dropdownItemHover: materialPalette.surface.containerHighest,
        textPrimary: materialPalette.neutral[10],
        textSecondary: materialPalette.neutralVariant[30],
        textMuted: materialPalette.neutralVariant[50],
        tooltipBg: materialPalette.neutral[20],
        tooltipText: materialPalette.neutral[90],
      };
    }
    return baseColors;
  };

  const colors = getColors();
  
  // Keep colors ref updated
  useEffect(() => {
    currentColorsRef.current = colors;
  }, [colors]);

  // Animation state is now controlled by CSS transitions directly
  // No need for separate isJellyVisible state
  
  useEffect(() => {
    dataRef.current = data;
  }, [data]);
<<<<<<< HEAD

  useEffect(() => {
    districtDataRef.current = districtData;
  }, [districtData]);
=======
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
  
  useEffect(() => {
    const handleScroll = () => {
      const tableElement = document.getElementById('data-table');
      if (tableElement) {
        const rect = tableElement.getBoundingClientRect();
        setShowBackToMap(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    void handleLoadCSV;
    void handleSaveCSV;
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getRegionData = (featureName: string) => {
    if (!featureName) return null;
    
    const normalizedName = featureName.toLowerCase().trim();
    
    const regionId = REGION_MAPPING.get(normalizedName);
    if (regionId) {
      return REGIONS_DATA.find(r => r.id === regionId) || null;
    }
    
    for (const [key, id] of REGION_MAPPING.entries()) {
      if (normalizedName.includes(key) || key.includes(normalizedName)) {
        return REGIONS_DATA.find(r => r.id === id) || null;
      }
    }
    
    const cleanedGeoName = normalizedName
      .replace(/oblast|republic|krai|kray|okrug|autonomous|region|—|-|–/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    for (const [key, id] of REGION_MAPPING.entries()) {
      const cleanedKey = key
        .replace(/oblast|republic|krai|kray|okrug|autonomous|region|—|-|–/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
      
      if (cleanedGeoName === cleanedKey || 
          cleanedGeoName.includes(cleanedKey) || 
          cleanedKey.includes(cleanedGeoName)) {
        return REGIONS_DATA.find(r => r.id === id) || null;
      }
    }
    
    const regionByCode = REGIONS_DATA.find(r => 
      r.code.toLowerCase() === normalizedName || 
      normalizedName.includes(r.code.toLowerCase())
    );
    if (regionByCode) return regionByCode;
    
    return null;
  };

  // Scroll to region row in table and highlight it
  const scrollToRegion = (regionId: number) => {
    const element = document.getElementById(`region-row-${regionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const highlightColor = getTableHighlightColor(currentTheme, materialAccent);
      element.style.background = highlightColor;
      element.style.transition = 'background 0.3s ease';
      setTimeout(() => { 
        element.style.background = ''; 
      }, 2000);
    }
  };

  // Scroll to map and highlight region on the map
  const scrollToMapAndHighlightRegion = (regionId: number) => {
    // Scroll to top (map area)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Find the region on the map and highlight it
    if (svgRef.current && mapGroupRef.current) {
      const svg = d3.select(svgRef.current);
      const highlightColor = getHighlightColor(currentTheme, materialAccent);
      
      mapGroupRef.current.selectAll<SVGPathElement, any>('path').each(function(d: any) {
        if (!d || !d.properties) return;
        const region = getRegionData(d.properties.name);
        if (region && region.id === regionId) {
          const pathElement = d3.select(this);
          const currentTransform = d3.zoomTransform(svg.node() as Element);
          
          // Store original fill
          const originalFill = pathElement.attr('fill');
          
          // Highlight the region
          pathElement
            .attr('stroke', highlightColor)
            .attr('stroke-width', 4 / currentTransform.k)
            .attr('fill', highlightColor)
            .raise();
          
          // Return to original after delay
          setTimeout(() => {
            pathElement
              .attr('stroke', currentColorsRef.current.regionStroke)
              .attr('stroke-width', 1 / currentTransform.k)
              .attr('fill', originalFill);
          }, 2000);
        }
      });
    }
  };

  useEffect(() => {
    const loadMapData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/russia.geojson');
        if (!response.ok) {
          throw new Error('Failed to load map data');
        }
        const geoData = await response.json();
        console.log('Map data loaded successfully');
        
        const geoRegionNames = geoData.features.map((f: any) => f.properties?.name).filter(Boolean).sort();
        
        const matchedRegions: string[] = [];
        const notMatched: string[] = [];
        
        geoRegionNames.forEach((name: string, index: number) => {
          const matched = getRegionData(name);
          if (matched) {
            matchedRegions.push(`${index + 1}. "${name}" -> ${matched.name}`);
          } else {
            notMatched.push(name);
          }
        });
        
        console.log('Сопоставленные регионы:');
        matchedRegions.forEach(m => console.log(m));
        
        if (notMatched.length > 0) {
          console.error('=== НЕСОПОСТАВЛЕННЫЕ РЕГИОНЫ ===');
          notMatched.forEach((name: string) => console.error(`"${name}"`));
          setUnmappedRegions(notMatched);
        } else {
          console.log('✅ Все регионы успешно сопоставлены!');
        }
        
        setMapLoaded(true);
        renderMap(geoData);
      } catch (error) {
        console.error('Error loading map data:', error);
        setMapError('Failed to load map. Using simplified visualization.');
        renderSimpleMap();
      }
    };

    loadMapData();
  }, []);

  // Update region stroke colors when theme changes
  useEffect(() => {
    if (svgRef.current && mapGroupRef.current) {
      mapGroupRef.current.selectAll('path')
        .attr('stroke', colors.regionStroke);
    }
  }, [currentTheme, materialAccent, colors.regionStroke]);

  const renderMap = (geoData: any) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 900;
    const height = 600;

    const projection = d3.geoAlbers()
      .rotate([-105, 0])
      .center([0, 65])
      .parallels([52, 64])
      .scale(600)
      .translate([width / 2, height / 2]);

    const pathGenerator = d3.geoPath().projection(projection);

    const g = svg.append('g');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 20])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        g.selectAll('path').attr('stroke-width', 1 / event.transform.k);
      });

    (svg as any).call(zoom);
    
    mapGroupRef.current = g;
    zoomBehaviorRef.current = zoom;

    g.selectAll('path')
      .data(geoData.features)
      .enter()
      .append('path')
      .attr('d', d => pathGenerator(d as any) || '')
      .attr('class', 'region-path')
      .attr('stroke', colors.regionStroke)
      .attr('stroke-width', 1)
      .attr('fill', colors.regionDefault)
      .style('cursor', 'grab')
      .on('mouseover', function(event: any, d: any) {
        const currentTransform = d3.zoomTransform(svg.node() as Element);
        const currentColors = currentColorsRef.current;
        
        d3.select(this)
          .attr('stroke', currentColors.regionHoverStroke)
          .attr('stroke-width', 2.5 / currentTransform.k)
          .raise();
          
        const tooltip = document.getElementById('tooltip');
        if (tooltip) {
          const region = getRegionData(d.properties.name);
<<<<<<< HEAD
          
          // Show different info based on table mode
          const currentMode = tableMode;
          let tooltipHtml = '';
          
          if (currentMode === 'districts' && region) {
            const dId = regionToDistrictId[region.id];
            const districtObj = DISTRICTS_DATA.find(dd => dd.id === dId);
            const dValue = dId ? districtDataRef.current[dId] : undefined;
            tooltipHtml = `
              <div><strong>${districtObj ? districtObj.name + ' ФО' : d.properties.name}</strong></div>
              <div style="font-size: 11px; margin-top: 2px; opacity: 0.7;">${region.name}</div>
              <div style="font-size: 12px; margin-top: 4px;">Значение: ${dValue !== undefined && dValue !== null && !isNaN(dValue) ? dValue : 'Нет данных'}</div>
            `;
          } else {
            const value = region ? dataRef.current[region.id] : undefined;
            tooltipHtml = `
              <div><strong>${region ? region.name : d.properties.name}</strong></div>
              <div style="font-size: 12px; margin-top: 4px;">Значение: ${value !== undefined && value !== null && !isNaN(value) ? value : 'Нет данных'}</div>
              ${!region ? `<div style="font-size: 10px; color: #ff6b6b; margin-top: 4px;">GeoJSON: "${d.properties.name}"</div>` : ''}
            `;
          }
          
          tooltip.innerHTML = tooltipHtml;
=======
          const value = region ? dataRef.current[region.id] : undefined;
          
          tooltip.innerHTML = `
            <div><strong>${region ? region.name : d.properties.name}</strong></div>
            <div style="font-size: 12px; margin-top: 4px;">Значение: ${value !== undefined && value !== null && !isNaN(value) ? value : 'Нет данных'}</div>
            ${!region ? `<div style="font-size: 10px; color: #ff6b6b; margin-top: 4px;">GeoJSON: "${d.properties.name}"</div>` : ''}
          `;
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
          tooltip.style.display = 'block';
          tooltip.style.left = (event.pageX + 10) + 'px';
          tooltip.style.top = (event.pageY - 10) + 'px';
          tooltip.style.transform = 'none';
        }
      })
      .on('click', (_event: any, d: any) => {
        const region = getRegionData(d.properties.name);
        if (region) {
<<<<<<< HEAD
          if (tableMode === 'districts') {
            const dId = regionToDistrictId[region.id];
            if (dId) {
              const el = document.getElementById(`district-row-${dId}`);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const highlightColor = getTableHighlightColor(currentTheme, materialAccent);
                el.style.background = highlightColor;
                el.style.transition = 'background 0.3s ease';
                setTimeout(() => { el.style.background = ''; }, 2000);
              }
            }
          } else {
            scrollToRegion(region.id);
          }
=======
          scrollToRegion(region.id);
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
        }
      })
      .on('mouseout', function() {
        const currentTransform = d3.zoomTransform(svg.node() as Element);
        const currentColors = currentColorsRef.current;
        
        // Return to original stroke color, not white
        d3.select(this)
          .attr('stroke', currentColors.regionStroke)
          .attr('stroke-width', 1 / currentTransform.k);
          
        const tooltip = document.getElementById('tooltip');
        if (tooltip) {
          tooltip.style.display = 'none';
        }
      });
  };

  const renderSimpleMap = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 900;
    const height = 600;

    svg.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', colors.regionDefault)
      .attr('stroke', colors.mapBorder)
      .attr('stroke-width', 2);

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '24px')
      .attr('fill', colors.textMuted)
      .text('Карта России - Данные из таблицы');
  };

<<<<<<< HEAD
  // District mode handlers
  const handleDistrictValueChange = (districtId: number, value: string) => {
    const numValue = parseFloat(value);
    setDistrictData(prev => ({
      ...prev,
      [districtId]: isNaN(numValue) ? 0 : numValue
    }));
  };

  const handleDistrictPaste = (e: React.ClipboardEvent<HTMLInputElement>, startId: number) => {
    const pastedData = e.clipboardData.getData('text');
    const lines = pastedData.split('\n');
    const updates: { [key: number]: number } = {};
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine) {
        const value = parseFloat(trimmedLine);
        if (!isNaN(value)) {
          updates[startId + index] = value;
        }
      }
    });
    if (Object.keys(updates).length > 0) {
      e.preventDefault();
      setDistrictData(prev => ({ ...prev, ...updates }));
    }
  };

  const handleDistrictKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, districtId: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextId = districtId + 1;
      if (nextId <= 8 && inputRefs.current[nextId + 1000]) {
        inputRefs.current[nextId + 1000]?.focus();
        inputRefs.current[nextId + 1000]?.select();
      }
    }
  };

  const handleSwitchTableMode = (mode: 'regions' | 'districts') => {
    if (mode === tableMode) return;
    setTableSwitching(true);
    setTimeout(() => {
      setTableMode(mode);
      setTimeout(() => setTableSwitching(false), 50);
    }, 250);
  };

  // Get color for a value - works for both regions and districts
  const getColorForDistrict = (districtId: number): string => {
    const value = districtDataRef.current[districtId];
    if (value === undefined || value === null || isNaN(value)) {
      return colors.regionDefault;
    }
    const allValues = Object.values(districtDataRef.current).filter(v => v !== undefined && v !== null && !isNaN(v));
    if (allValues.length === 0) return colors.regionDefault;
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    if (minValue === maxValue) return debouncedMaxColor;
    const normalizedValue = (value - minValue) / (maxValue - minValue);
    if (useMidpoint) {
      if (normalizedValue < 0.5) {
        return d3.interpolateRgb(debouncedMinColor, debouncedMidColor)(normalizedValue * 2);
      } else {
        return d3.interpolateRgb(debouncedMidColor, debouncedMaxColor)((normalizedValue - 0.5) * 2);
      }
    } else {
      return d3.interpolateRgb(debouncedMinColor, debouncedMaxColor)(normalizedValue);
    }
  };

=======
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
  const getColor = (value: number | undefined) => {
    if (value === undefined || value === null || isNaN(value)) {
      return colors.regionDefault;
    }

    const allValues = Object.values(dataRef.current).filter(v => v !== undefined && v !== null && !isNaN(v));
    if (allValues.length === 0) return colors.regionDefault;
    
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    
    if (minValue === maxValue) return debouncedMaxColor;
    
    const normalizedValue = (value - minValue) / (maxValue - minValue);
    
    if (useMidpoint) {
      if (normalizedValue < 0.5) {
        return d3.interpolateRgb(debouncedMinColor, debouncedMidColor)(normalizedValue * 2);
      } else {
        return d3.interpolateRgb(debouncedMidColor, debouncedMaxColor)((normalizedValue - 0.5) * 2);
      }
    } else {
      return d3.interpolateRgb(debouncedMinColor, debouncedMaxColor)(normalizedValue);
    }
  };
  
  const applyPreset = (preset: string) => {
    switch (preset) {
      case 'rwg':
        setMinColor('#ff0000');
        setMidColor('#ffffff');
        setMaxColor('#00ff00');
        setUseMidpoint(true);
        break;
      case 'wg':
        setMinColor('#ffffff');
        setMaxColor('#00ff00');
        setUseMidpoint(false);
        break;
      case 'wr':
        setMinColor('#ffffff');
        setMaxColor('#ff0000');
        setUseMidpoint(false);
        break;
    }
  };
  
  const swapColors = () => {
    const temp = minColor;
    setMinColor(maxColor);
    setMaxColor(temp);
  };

  const handleValueChange = (regionId: number, value: string) => {
    const numValue = parseFloat(value);
    setData(prev => ({
      ...prev,
      [regionId]: isNaN(numValue) ? 0 : numValue
    }));
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, startId: number) => {
    const pastedData = e.clipboardData.getData('text');
    const lines = pastedData.split('\n');

    const updates: { [key: number]: number } = {};

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine) {
        const value = parseFloat(trimmedLine);
        if (!isNaN(value)) {
          updates[startId + index] = value;
        }
      }
    });

    if (Object.keys(updates).length > 0) {
      e.preventDefault();
      setData(prev => ({
        ...prev,
        ...updates
      }));
    }
  };

  const handleLoadCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target?.result as string;
      const lines = csvData.split('\n');

      const updates: { [key: number]: number } = {};

      lines.forEach(line => {
        const parts = line.split(',');
        if (parts.length >= 2) {
          const id = parseInt(parts[0].trim());
          const value = parseFloat(parts[1].trim());
          if (!isNaN(id) && !isNaN(value)) {
            updates[id] = value;
          }
        }
      });

      if (Object.keys(updates).length > 0) {
        setData(updates);
      }
    };

    reader.readAsText(file);
  };

  const handleSaveCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';

    REGIONS_DATA.forEach(region => {
      const value = data[region.id] || 0;
      csvContent += `${region.id},${value}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'russia_regions_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNormalize = () => {
    const maxValue = Math.max(...Object.values(data), 1);

    if (maxValue > 0) {
      const normalizedData: { [key: number]: number } = {};

      Object.keys(data).forEach(id => {
        const regionId = parseInt(id);
        const value = data[regionId];
        normalizedData[regionId] = (value / maxValue) * 100;
      });

      setData(normalizedData);
    }
  };

  const handleReset = () => {
    setData({});
  };

  const handleZoomIn = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current as any)
        .transition()
        .duration(300)
        .call(zoomBehaviorRef.current.scaleBy, 1.3);
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current as any)
        .transition()
        .duration(300)
        .call(zoomBehaviorRef.current.scaleBy, 1 / 1.3);
    }
  };

  const handleResetZoom = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current as any)
        .transition()
        .duration(750)
        .call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
    }
  };

  const updateMapColors = React.useCallback(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll<SVGPathElement, any>('path').attr('fill', function(d: any) {
      if (!d || !d.properties) return colors.regionDefault;
      const region = getRegionData(d.properties.name);
<<<<<<< HEAD
      if (!region) return colors.regionDefault;
      
      if (tableMode === 'districts') {
        // In district mode, color by district
        const dId = regionToDistrictId[region.id];
        if (dId) return getColorForDistrict(dId);
        return colors.regionDefault;
      } else {
        const value = dataRef.current[region.id];
        return getColor(value);
      }
    });
  }, [debouncedMinColor, debouncedMidColor, debouncedMaxColor, useMidpoint, colors.regionDefault, tableMode]);
=======
      const value = region ? dataRef.current[region.id] : undefined;
      return getColor(value);
    });
  }, [debouncedMinColor, debouncedMidColor, debouncedMaxColor, useMidpoint, colors.regionDefault]);
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa

  useEffect(() => {
    updateMapColors();
  }, [debouncedMinColor, debouncedMidColor, debouncedMaxColor, useMidpoint, updateMapColors]);

  useEffect(() => {
<<<<<<< HEAD
    if (Object.keys(data).length > 0 || tableMode === 'districts') {
=======
    if (Object.keys(data).length > 0) {
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
      updateMapColors();
    }
  }, [data, updateMapColors]);

<<<<<<< HEAD
  useEffect(() => {
    updateMapColors();
  }, [districtData, tableMode, updateMapColors]);

=======
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
  const saveSvgToPng = (svgElement: SVGSVGElement, fileName: string) => {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const margin = 20;
    
    canvas.width = 1800;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = currentTheme === 'dark' ? '#0f172a' : 
                      currentTheme === 'realistic' ? '#4A90A4' : 
                      currentTheme === 'apple' ? '#667eea' : 
                      currentTheme === 'material' ? materialPalette.primary[95] : '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const img = new Image();
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.drawImage(img, margin, margin, canvas.width - margin * 2, canvas.height - margin * 2);
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  };

  const handleSaveFullMap = () => {
    if (!svgRef.current) return;

    const clone = svgRef.current.cloneNode(true) as SVGSVGElement;
    
    const g = clone.querySelector('g');
    if (g) {
      g.removeAttribute('transform');
      
      const paths = g.querySelectorAll('path');
      paths.forEach(path => {
        path.setAttribute('stroke-width', '1');
        path.setAttribute('stroke', colors.regionStroke);
      });
    }

    saveSvgToPng(clone, 'russia_map_full.png');
  };

  const handleSaveFragmentMap = () => {
    if (!svgRef.current) return;
    saveSvgToPng(svgRef.current, 'russia_map_view.png');
    
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
      tooltip.innerHTML = 'Сохранен текущий фрагмент карты';
      tooltip.style.display = 'block';
      tooltip.style.left = '50%';
      tooltip.style.top = '50%';
      tooltip.style.transform = 'translate(-50%, -50%)';
      tooltip.style.zIndex = '1000';
      
      setTimeout(() => {
        tooltip.style.display = 'none';
        tooltip.style.transform = '';
      }, 2000);
    }
  };
  
  const handleCopyData = () => {
    let tableData = '№\tНазвание субъекта\tЗначение\tФедеральный округ\n';
    
    REGIONS_DATA.forEach(region => {
      const value = data[region.id] || '';
      tableData += `${region.id}\t${region.name}\t${value}\t${region.district}\n`;
    });
    
    navigator.clipboard.writeText(tableData).then(() => {
      alert('Данные скопированы в буфер обмена!');
    }).catch(err => {
      console.error('Ошибка при копировании:', err);
    });
  };
  
  const handleCopyValues = () => {
    let valuesData = '';
    
    REGIONS_DATA.forEach(region => {
      const value = data[region.id] || '';
      valuesData += `${value}\n`;
    });
    
    navigator.clipboard.writeText(valuesData).then(() => {
      alert('Значения скопированы в буфер обмена!');
    }).catch(err => {
      console.error('Ошибка при копировании:', err);
    });
  };

  const handlePasteValues = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      const lines = clipboardText.split('\n').map(line => line.trim()).filter(Boolean);
      const updates: { [key: number]: number } = {};

      lines.forEach((line, index) => {
        const value = parseFloat(line.replace(',', '.'));
        if (!isNaN(value)) {
          const region = REGIONS_DATA[index];
          if (region) {
            updates[region.id] = value;
          }
        }
      });

      if (Object.keys(updates).length > 0) {
        setData(prev => ({
          ...prev,
          ...updates
        }));
      }
    } catch (err) {
      console.error('Ошибка при вставке:', err);
      alert('Не удалось вставить значения. Проверьте доступ к буферу обмена.');
    }
  };

  // Dynamic styles based on theme
  const getPageStyle = (): React.CSSProperties => ({
    minHeight: '100vh',
    background: colors.pageBg,
    fontFamily: currentTheme === 'apple' ? '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' :
                currentTheme === 'material' ? '"Google Sans", "Roboto", sans-serif' :
                'system-ui, -apple-system, sans-serif',
    color: colors.textPrimary,
    transition: 'all 0.3s ease',
  });

  const getCardStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      background: colors.cardBg,
      border: `1px solid ${colors.cardBorder}`,
      borderRadius: currentTheme === 'material' ? '28px' : currentTheme === 'apple' ? '20px' : currentTheme === 'realistic' ? '16px' : '12px',
      padding: '32px',
      marginBottom: '48px',
      boxShadow: colors.shadowMd,
      transition: 'all 0.3s ease',
    };
    
    if (currentTheme === 'apple') {
      base.backdropFilter = 'blur(60px) saturate(180%)';
      base.WebkitBackdropFilter = 'blur(60px) saturate(180%)';
      base.boxShadow = '0 8px 32px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.1)';
    }
    
    if (currentTheme === 'realistic') {
      base.boxShadow = '8px 8px 20px rgba(45,24,16,0.35), inset 3px 3px 6px rgba(255,255,255,0.25), inset -2px -2px 6px rgba(45,24,16,0.15)';
      base.border = '3px solid #5d4037';
      base.position = 'relative';
    }
    
    if (currentTheme === 'material') {
      base.boxShadow = '0 1px 3px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.08)';
    }
    
    return base;
  };

  const getButtonStyle = (variant: 'primary' | 'secondary' = 'primary'): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: currentTheme === 'material' ? '10px 24px' : '10px 20px',
      fontSize: '14px',
      fontWeight: currentTheme === 'material' ? 500 : 500,
      borderRadius: currentTheme === 'material' ? '20px' : currentTheme === 'apple' ? '12px' : currentTheme === 'realistic' ? '10px' : '8px',
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      border: 'none',
      letterSpacing: currentTheme === 'material' ? '0.1px' : 'normal',
    };
    
    if (variant === 'primary') {
      base.background = colors.btnPrimary;
      base.color = colors.btnPrimaryText;
      base.boxShadow = colors.shadowSm;
    } else {
      base.background = colors.btnSecondary;
      base.color = colors.btnSecondaryText;
      base.border = currentTheme === 'material' ? 'none' : `1px solid ${colors.btnSecondaryBorder}`;
    }
    
    if (currentTheme === 'realistic') {
      if (variant === 'primary') {
        base.background = 'linear-gradient(160deg, #6d4c2a 0%, #4a3320 50%, #3d2914 100%)';
        base.boxShadow = '4px 4px 10px rgba(0,0,0,0.4), inset 2px 2px 4px rgba(255,255,255,0.2), inset -1px -1px 3px rgba(0,0,0,0.2)';
        base.textShadow = '1px 1px 2px rgba(0,0,0,0.4)';
        base.border = '2px solid #2d1810';
      } else {
        base.background = 'linear-gradient(160deg, #e0c8a8 0%, #c8b090 50%, #b09878 100%)';
        base.boxShadow = '4px 4px 10px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.4), inset -1px -1px 3px rgba(0,0,0,0.1)';
        base.border = '2px solid #8b7355';
      }
    }
    
    if (currentTheme === 'apple') {
      base.backdropFilter = 'blur(40px) saturate(180%)';
      base.WebkitBackdropFilter = 'blur(40px) saturate(180%)';
      base.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.1), 0 4px 16px rgba(0,0,0,0.3)';
    }
    
    if (currentTheme === 'material') {
      if (variant === 'primary') {
        base.boxShadow = '0 1px 2px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)';
      } else {
        base.boxShadow = 'none';
      }
    }
    
    return base;
  };

  const getInputStyle = (): React.CSSProperties => ({
    width: '100%',
    padding: currentTheme === 'material' ? '12px 16px' : '8px 12px',
    fontSize: '14px',
    background: colors.inputBg,
    border: currentTheme === 'material' ? 'none' : `1px solid ${colors.inputBorder}`,
    borderRadius: currentTheme === 'material' ? '12px' : currentTheme === 'apple' ? '10px' : '8px',
    color: colors.inputText,
    outline: 'none',
    transition: 'all 0.2s',
    boxShadow: currentTheme === 'material' ? 'inset 0 0 0 1px ' + colors.inputBorder : 'none',
  });

  const getMapContainerStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'relative',
      background: colors.mapBg,
      borderRadius: currentTheme === 'material' ? '24px' : currentTheme === 'apple' ? '16px' : currentTheme === 'realistic' ? '12px' : '12px',
      border: `1px solid ${colors.mapBorder}`,
      overflow: 'hidden',
    };
    
    if (currentTheme === 'realistic') {
      base.boxShadow = 'inset 0 0 30px rgba(0,0,0,0.4), inset 0 0 60px rgba(0,50,100,0.2)';
      base.border = '4px solid #5d4037';
    }
    
    return base;
  };

<<<<<<< HEAD
  // Mobile bottom navigation component
  const MobileBottomNav = () => (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 64,
      background: colors.cardBg,
      borderTop: `1px solid ${colors.cardBorder}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 16px',
      zIndex: 100,
      backdropFilter: currentTheme === 'apple' ? 'blur(40px)' : 'none',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
    }}>
      {[
        { id: 'map' as const, icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7', label: 'Карта' },
        { id: 'table' as const, icon: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', label: 'Таблица' },
      ].map(item => (
        <button
          key={item.id}
          onClick={() => setMobileView(item.id)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            padding: '8px 24px',
            background: mobileView === item.id ? colors.dropdownItemHover : 'transparent',
            border: 'none',
            borderRadius: 12,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={mobileView === item.id ? colors.textPrimary : colors.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={item.icon} />
          </svg>
          <span style={{ fontSize: 11, fontWeight: 600, color: mobileView === item.id ? colors.textPrimary : colors.textMuted }}>
            {item.label}
          </span>
        </button>
      ))}
      <button
        onClick={() => setMobileMenuOpen(true)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          padding: '8px 24px',
          background: 'transparent',
          border: 'none',
          borderRadius: 12,
          cursor: 'pointer',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span style={{ fontSize: 11, fontWeight: 600, color: colors.textMuted }}>Настройки</span>
      </button>
    </div>
  );

  // Mobile menu overlay
  const MobileMenuOverlay = () => (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 200,
        opacity: mobileMenuOpen ? 1 : 0,
        pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s',
      }}
      onClick={() => setMobileMenuOpen(false)}
    >
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: colors.cardBg,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: '24px',
          paddingBottom: 40,
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          maxHeight: '80vh',
          overflowY: 'auto',
          backdropFilter: currentTheme === 'apple' ? 'blur(40px)' : 'none',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div style={{ 
          width: 40, 
          height: 4, 
          background: colors.textMuted, 
          borderRadius: 2, 
          margin: '0 auto 24px',
          opacity: 0.3,
        }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 600, marginBottom: 20, color: colors.textPrimary }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Настройки
        </div>
        
        {/* Theme selection */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Тема</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { id: 'original' as ThemeType, name: 'Светлая', color: '#f8fafc' },
              { id: 'dark' as ThemeType, name: 'Тёмная', color: '#1e293b' },
              { id: 'realistic' as ThemeType, name: 'Дерево', color: '#deb887' },
              { id: 'apple' as ThemeType, name: 'Apple', color: '#16213e' },
              { id: 'material' as ThemeType, name: 'Google', color: materialAccent },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => { setCurrentTheme(t.id); if (t.id !== 'material') setMobileMenuOpen(false); }}
                style={{
                  padding: '12px 8px',
                  borderRadius: 12,
                  border: currentTheme === t.id ? `2px solid ${colors.btnPrimary}` : `1px solid ${colors.cardBorder}`,
                  background: colors.cardBg,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 8, background: t.color, border: `1px solid ${colors.cardBorder}` }} />
                <span style={{ fontSize: 11, fontWeight: 500, color: colors.textSecondary }}>{t.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Material accent color picker */}
        {currentTheme === 'material' && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Цвет акцента</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {materialYouColors.map(c => (
                <button
                  key={c.value}
                  onClick={() => setMaterialAccent(c.value)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: c.value,
                    border: materialAccent === c.value ? '3px solid white' : 'none',
                    boxShadow: materialAccent === c.value ? `0 0 0 2px ${c.value}` : 'none',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Color palette */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Палитра карты</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <div style={{ flex: 1, height: 48, borderRadius: 12, background: minColor, position: 'relative', overflow: 'hidden' }}>
              <input type="color" value={minColor} onChange={e => setMinColor(e.target.value)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
            </div>
            {useMidpoint && (
              <div style={{ flex: 1, height: 48, borderRadius: 12, background: midColor, position: 'relative', overflow: 'hidden' }}>
                <input type="color" value={midColor} onChange={e => setMidColor(e.target.value)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
              </div>
            )}
            <div style={{ flex: 1, height: 48, borderRadius: 12, background: maxColor, position: 'relative', overflow: 'hidden' }}>
              <input type="color" value={maxColor} onChange={e => setMaxColor(e.target.value)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: colors.textSecondary, fontSize: 14 }}>
            <input type="checkbox" checked={useMidpoint} onChange={e => setUseMidpoint(e.target.checked)} />
            Использовать средний цвет
          </label>
        </div>
        
        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={() => { handleNormalize(); setMobileMenuOpen(false); }} style={{ ...getButtonStyle('secondary'), width: '100%', justifyContent: 'center' }}>
            Нормализовать (0-100)
          </button>
          <button onClick={() => { handleReset(); setMobileMenuOpen(false); }} style={{ ...getButtonStyle('secondary'), width: '100%', justifyContent: 'center', color: colors.textMuted }}>
            Сбросить данные
          </button>
          <button onClick={() => { handleSaveFullMap(); setMobileMenuOpen(false); }} style={{ ...getButtonStyle('primary'), width: '100%', justifyContent: 'center' }}>
            Сохранить карту
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme: setCurrentTheme, colors }}>
      <div style={getPageStyle()}>
        {/* Mobile menu overlay */}
        {isMobile && <MobileMenuOverlay />}
        
        {/* Mobile bottom navigation */}
        {isMobile && <MobileBottomNav />}

        <div style={{ 
          maxWidth: '1152px', 
          margin: '0 auto', 
          padding: isMobile ? '8px 8px 80px' : '48px 16px',
        }}>
          <header style={{ 
            textAlign: 'center', 
            marginBottom: isMobile ? '8px' : '48px', 
            position: 'relative',
          }}>
            {/* Theme button in header - only on desktop */}
            {!isMobile && (
              <div 
                ref={themeButtonRef}
                style={{ 
                  position: 'absolute', 
                  right: 0, 
                  top: 0,
                }}
              >
                <ThemeButton 
                  isOpen={themeMenuOpen} 
                  onClick={() => setThemeMenuOpen(!themeMenuOpen)} 
                />
              </div>
            )}
            {!isMobile && (
              <ThemeMenu 
                isOpen={themeMenuOpen} 
                isClosing={themeMenuClosing}
                onClose={handleCloseThemeMenu}
                materialAccent={materialAccent}
                setMaterialAccent={setMaterialAccent}
                anchorRef={themeButtonRef}
              />
            )}
            
            <h1 style={{ 
              fontSize: isMobile ? '24px' : (currentTheme === 'material' ? '36px' : '30px'), 
=======
  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme: setCurrentTheme, colors }}>
      <div style={getPageStyle()}>
        {/* Theme menu removed from here - moved to header */}

        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '48px 16px' }}>
          <header style={{ textAlign: 'center', marginBottom: '48px', position: 'relative' }}>
            {/* Theme button in header - static, not moving with scroll */}
            <div 
              ref={themeButtonRef}
              style={{ 
                position: 'absolute', 
                right: 0, 
                top: 0,
              }}
            >
              <ThemeButton 
                isOpen={themeMenuOpen} 
                onClick={() => setThemeMenuOpen(!themeMenuOpen)} 
              />
            </div>
            <ThemeMenu 
              isOpen={themeMenuOpen} 
              isClosing={themeMenuClosing}
              onClose={handleCloseThemeMenu}
              materialAccent={materialAccent}
              setMaterialAccent={setMaterialAccent}
              anchorRef={themeButtonRef}
            />
            
            <h1 style={{ 
              fontSize: currentTheme === 'material' ? '36px' : '30px', 
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
              fontWeight: currentTheme === 'material' ? 400 : currentTheme === 'apple' ? 600 : 300, 
              letterSpacing: currentTheme === 'material' ? '-0.25px' : '-0.5px', 
              color: colors.textPrimary, 
              marginBottom: '8px',
              textShadow: currentTheme === 'realistic' ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none',
            }}>
              Карта регионов России
            </h1>
<<<<<<< HEAD
            {!isMobile && (
              <p style={{ 
                color: colors.textSecondary, 
                fontWeight: 300,
                fontSize: currentTheme === 'material' ? '16px' : '14px',
              }}>
                Визуализация региональных данных
              </p>
            )}
          </header>

          {/* Map section - hidden on mobile when table is selected */}
          <div style={{ 
            display: isMobile && mobileView !== 'map' ? 'none' : 'block',
          }}>
          <div style={{
            ...getCardStyle(),
            padding: isMobile ? '10px' : '32px',
            marginBottom: isMobile ? '16px' : '48px',
          }}>
=======
            <p style={{ 
              color: colors.textSecondary, 
              fontWeight: 300,
              fontSize: currentTheme === 'material' ? '16px' : '14px',
            }}>
              Визуализация региональных данных
            </p>
          </header>

          <div style={getCardStyle()}>
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
            {/* Decorative wood grain overlay for realistic theme */}
            {currentTheme === 'realistic' && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.08,
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  rgba(139, 69, 19, 0.3) 2px,
                  rgba(139, 69, 19, 0.3) 4px
                )`,
                pointerEvents: 'none',
                borderRadius: '14px',
              }} />
            )}
            
<<<<<<< HEAD
            {/* Header - desktop only */}
            {!isMobile && (
=======
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '32px', 
              borderBottom: `1px solid ${colors.tableBorder}`, 
              paddingBottom: '24px',
              position: 'relative',
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 500, color: colors.textSecondary }}>Интерактивная карта</h2>
              <div style={{ display: 'flex', borderRadius: currentTheme === 'material' ? '20px' : '8px', overflow: 'hidden', boxShadow: colors.shadowSm }}>
                <button
                  onClick={handleSaveFullMap}
                  style={{
                    ...getButtonStyle('primary'),
                    borderRadius: 0,
                    borderTopLeftRadius: currentTheme === 'material' ? '20px' : '8px',
                    borderBottomLeftRadius: currentTheme === 'material' ? '20px' : '8px',
                  }}
                  title="Сохранить полную карту России"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Сохранить карту
                </button>
                <button
                  onClick={handleSaveFragmentMap}
                  style={{
                    ...getButtonStyle('primary'),
                    borderRadius: 0,
                    borderTopRightRadius: currentTheme === 'material' ? '20px' : '8px',
                    borderBottomRightRadius: currentTheme === 'material' ? '20px' : '8px',
                    borderLeft: `1px solid ${currentTheme === 'dark' ? '#1e40af' : 'rgba(255,255,255,0.2)'}`,
                    padding: '10px 12px',
                  }}
                  title="Сохранить текущий вид"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                </button>
              </div>
            </div>
<<<<<<< HEAD
            )}
            
            {mapError && !isMobile && (
=======
            
            {mapError && (
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
              <div style={{ 
                background: currentTheme === 'dark' ? '#1e293b' : '#f8fafc', 
                border: `1px solid ${colors.tableBorder}`, 
                padding: '16px', 
                marginBottom: '24px', 
                borderRadius: currentTheme === 'material' ? '16px' : '12px', 
                fontSize: '14px', 
                color: colors.textSecondary 
              }}>
                {mapError}
              </div>
            )}
            
<<<<<<< HEAD
            {unmappedRegions.length > 0 && !isMobile && (
=======
            {unmappedRegions.length > 0 && (
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
              <div style={{ 
                background: currentTheme === 'dark' ? '#422006' : '#fef3c7', 
                border: '1px solid #f59e0b', 
                padding: '16px', 
                marginBottom: '24px', 
                borderRadius: currentTheme === 'material' ? '16px' : '12px', 
                fontSize: '14px', 
                color: currentTheme === 'dark' ? '#fcd34d' : '#92400e' 
              }}>
                <strong>⚠️ Несопоставленные регионы в GeoJSON:</strong>
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  {unmappedRegions.map((name, idx) => (
                    <li key={idx}>"{name}"</li>
                  ))}
                </ul>
              </div>
            )}

<<<<<<< HEAD
            {/* Mobile: Save button only */}
            {isMobile && (
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <button
                  onClick={handleSaveFullMap}
                  style={{
                    ...getButtonStyle('primary'),
                    flex: 1,
                    justifyContent: 'center',
                    padding: '10px 16px',
                    fontSize: 13,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Сохранить карту
                </button>
                <button
                  onClick={handleSaveFragmentMap}
                  style={{
                    ...getButtonStyle('primary'),
                    padding: '10px 14px',
                  }}
                  title="Сохранить текущий вид"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                </button>
              </div>
            )}

            {/* Desktop: Full control panel */}
            <div style={{ display: isMobile ? 'none' : 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px', position: 'relative' }}>
=======
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px', position: 'relative' }}>
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
              {/* Color Scheme Button */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setColorMenuOpen(!colorMenuOpen)}
                  style={getButtonStyle('secondary')}
                >
                  Цветовая схема
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: colorMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                
                {(colorMenuOpen || colorMenuClosing) && (
                  <>
                    <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={handleCloseColorMenu} />
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: '8px',
                      padding: '24px',
                      minWidth: '340px',
                      borderRadius: currentTheme === 'material' ? '28px' : currentTheme === 'apple' ? '16px' : '16px',
                      background: colors.dropdownBg,
                      border: `1px solid ${colors.dropdownBorder}`,
                      boxShadow: colors.shadowLg,
                      zIndex: 50,
                      backdropFilter: currentTheme === 'apple' ? 'blur(40px)' : 'none',
                      animation: colorMenuClosing ? 'menuFadeOut 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'menuFadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      transformOrigin: 'top left',
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: colors.textMuted }}>Палитра</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '10px', color: colors.textMuted, fontWeight: 700, textTransform: 'uppercase' }}>Средняя</span>
                            <button 
                              onClick={() => setUseMidpoint(!useMidpoint)}
                              style={{
                                width: 32,
                                height: 16,
                                borderRadius: 8,
                                background: useMidpoint ? colors.btnPrimary : colors.inputBorder,
                                border: 'none',
                                cursor: 'pointer',
                                position: 'relative',
                                transition: 'background 0.3s',
                              }}
                            >
                              <div style={{
                                position: 'absolute',
                                top: 2,
                                left: useMidpoint ? 16 : 2,
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                background: 'white',
                                transition: 'left 0.3s',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                              }} />
                            </button>
                          </div>
                        </div>
                        
                        <div style={{
                          height: 48,
                          width: '100%',
                          borderRadius: 24,
                          border: `1px solid ${colors.inputBorder}`,
                          display: 'flex',
                          overflow: 'hidden',
                          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                        }}>
                          {/* Минимальный цвет */}
                          <div style={{ 
                            position: 'relative', 
                            flex: useMidpoint ? '1 1 33.33%' : '1 1 50%', 
                            background: minColor,
                            transition: 'flex 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}>
                            <input type="color" value={minColor} onChange={(e) => setMinColor(e.target.value)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} title="Минимальный цвет" />
                          </div>
                          
                          {/* Средний цвет - плавно появляется/исчезает */}
                          <div style={{ 
                            position: 'relative', 
                            flex: useMidpoint ? '1 1 33.33%' : '0 0 0%',
                            background: midColor,
                            transition: 'flex 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
                            opacity: useMidpoint ? 1 : 0,
                            overflow: 'hidden',
                          }}>
                            <input 
                              type="color" 
                              value={midColor} 
                              onChange={(e) => setMidColor(e.target.value)} 
                              style={{ 
                                position: 'absolute', 
                                inset: 0, 
                                opacity: 0, 
                                cursor: useMidpoint ? 'pointer' : 'default', 
                                width: '100%', 
                                height: '100%',
                                pointerEvents: useMidpoint ? 'auto' : 'none',
                              }} 
                              title="Средний цвет" 
                              disabled={!useMidpoint}
                            />
                          </div>
                          
                          {/* Максимальный цвет */}
                          <div style={{ 
                            position: 'relative', 
                            flex: useMidpoint ? '1 1 33.33%' : '1 1 50%', 
                            background: maxColor,
                            transition: 'flex 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}>
                            <input type="color" value={maxColor} onChange={(e) => setMaxColor(e.target.value)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} title="Максимальный цвет" />
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '16px', borderTop: `1px solid ${colors.tableBorder}` }}>
                          {[
                            { id: 'rwg', name: 'Красный — Белый — Зелёный', colors: ['#f87171', 'white', '#4ade80'] },
                            { id: 'wg', name: 'Белый — Зелёный', colors: ['white', '#4ade80'] },
                            { id: 'wr', name: 'Белый — Красный', colors: ['white', '#f87171'] },
                          ].map(preset => (
                            <button
                              key={preset.id}
                              onClick={() => applyPreset(preset.id)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                padding: '8px 12px',
                                fontSize: '12px',
                                color: colors.textSecondary,
                                borderRadius: currentTheme === 'material' ? '12px' : '8px',
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                transition: 'background 0.2s',
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = colors.dropdownItemHover}
                              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                              <span>{preset.name}</span>
                              <div style={{ display: 'flex', height: 12, width: 32, borderRadius: 6, overflow: 'hidden', border: `1px solid ${colors.inputBorder}` }}>
                                {preset.colors.map((c, i) => (
                                  <div key={i} style={{ flex: 1, background: c }} />
                                ))}
                              </div>
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={swapColors}
                          style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '10px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: colors.textMuted,
                            border: `1px solid ${colors.inputBorder}`,
                            borderRadius: currentTheme === 'material' ? '20px' : '8px',
                            background: 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = colors.dropdownItemHover; e.currentTarget.style.color = colors.textSecondary; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = colors.textMuted; }}
                        >
                          Инвертировать ⇄
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <button onClick={handleNormalize} style={getButtonStyle('secondary')}>
                Нормализовать (0-100)
              </button>
              <button onClick={handleReset} style={{ ...getButtonStyle('secondary'), color: colors.textMuted }}>
                Сбросить данные
              </button>
            </div>

<<<<<<< HEAD
            <div style={{
              ...getMapContainerStyle(),
            }}>
=======
            <div style={getMapContainerStyle()}>
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
              <svg
                ref={svgRef}
                width="900"
                height="600"
<<<<<<< HEAD
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  display: 'block', 
                  maxHeight: isMobile ? '75vh' : '65vh',
                }}
=======
                style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '65vh' }}
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
              ></svg>
              
              {/* Zoom controls - unified style for all themes */}
              <div style={{
                position: 'absolute',
                top: 24,
                right: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: currentTheme === 'material' ? 8 : 0,
                background: currentTheme === 'material' ? 'transparent' : colors.cardBg,
                border: currentTheme === 'material' ? 'none' : `1px solid ${colors.cardBorder}`,
                padding: currentTheme === 'material' ? 0 : 4,
                borderRadius: currentTheme === 'material' ? 0 : (currentTheme === 'apple' ? '16px' : currentTheme === 'realistic' ? '12px' : '10px'),
                boxShadow: currentTheme === 'material' ? 'none' : colors.shadowMd,
                backdropFilter: currentTheme === 'apple' ? 'blur(40px) saturate(180%)' : 'none',
                overflow: 'hidden',
              }}>
                {[
                  { 
                    iconPath: 'M12 5v14M5 12h14', 
                    action: handleZoomIn, 
                    title: 'Приблизить',
                    isFirst: true,
                    isLast: false,
                  },
                  { 
                    iconPath: 'M5 12h14', 
                    action: handleZoomOut, 
                    title: 'Отдалить',
                    isFirst: false,
                    isLast: false,
                  },
                  { 
                    iconPath: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5', 
                    action: handleResetZoom, 
                    title: 'Сбросить масштаб',
                    isFirst: false,
                    isLast: true,
                  },
                ].map((btn, i) => {
                  // Get theme-specific button styles
                  const getZoomButtonStyle = (): React.CSSProperties => {
                    const baseStyle: React.CSSProperties = {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: 'none',
                    };
                    
                    if (currentTheme === 'material') {
                      return {
                        ...baseStyle,
                        width: 48,
                        height: 48,
                        borderRadius: '16px',
                        background: materialPalette.surface.containerHigh,
                        color: materialPalette.primary[40],
                        boxShadow: '0 2px 4px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.1)',
                      };
                    }
                    
                    if (currentTheme === 'apple') {
                      return {
                        ...baseStyle,
                        width: 40,
                        height: 40,
                        borderRadius: 0,
                        background: 'transparent',
                        color: 'rgba(255, 255, 255, 0.7)',
                        borderBottom: !btn.isLast ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                      };
                    }
                    
                    if (currentTheme === 'realistic') {
                      return {
                        ...baseStyle,
                        width: 40,
                        height: 40,
                        borderRadius: 0,
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
                        color: '#4a3728',
                        borderBottom: !btn.isLast ? '1px solid rgba(93, 64, 55, 0.3)' : 'none',
                      };
                    }
                    
                    if (currentTheme === 'dark') {
                      return {
                        ...baseStyle,
                        width: 40,
                        height: 40,
                        borderRadius: 0,
                        background: 'transparent',
                        color: '#94a3b8',
                        borderBottom: !btn.isLast ? '1px solid #334155' : 'none',
                      };
                    }
                    
                    // Original theme
                    return {
                      ...baseStyle,
                      width: 40,
                      height: 40,
                      borderRadius: 0,
                      background: 'transparent',
                      color: '#64748b',
                      borderBottom: !btn.isLast ? '1px solid #e2e8f0' : 'none',
                    };
                  };
                  
                  const getHoverStyle = (e: React.MouseEvent<HTMLButtonElement>, isHover: boolean) => {
                    if (currentTheme === 'material') {
                      e.currentTarget.style.boxShadow = isHover 
                        ? '0 4px 8px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.15)'
                        : '0 2px 4px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.1)';
                      e.currentTarget.style.background = isHover 
                        ? materialPalette.surface.containerHighest 
                        : materialPalette.surface.containerHigh;
                    } else if (currentTheme === 'apple') {
                      e.currentTarget.style.background = isHover ? 'rgba(255,255,255,0.1)' : 'transparent';
                      e.currentTarget.style.color = isHover ? '#ffffff' : 'rgba(255, 255, 255, 0.7)';
                    } else if (currentTheme === 'realistic') {
                      e.currentTarget.style.background = isHover 
                        ? 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)'
                        : 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)';
                      e.currentTarget.style.color = isHover ? '#2d1810' : '#4a3728';
                    } else if (currentTheme === 'dark') {
                      e.currentTarget.style.background = isHover ? '#334155' : 'transparent';
                      e.currentTarget.style.color = isHover ? '#f1f5f9' : '#94a3b8';
                    } else {
                      e.currentTarget.style.background = isHover ? '#f8fafc' : 'transparent';
                      e.currentTarget.style.color = isHover ? '#1e293b' : '#64748b';
                    }
                  };
                  
                  return (
                    <button
                      key={i}
                      onClick={btn.action}
                      title={btn.title}
                      style={getZoomButtonStyle()}
                      onMouseEnter={e => getHoverStyle(e, true)}
                      onMouseLeave={e => getHoverStyle(e, false)}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width={currentTheme === 'material' ? 24 : 20} 
                        height={currentTheme === 'material' ? 24 : 20} 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d={btn.iconPath} />
                      </svg>
                    </button>
                  );
                })}
              </div>
              
              <div style={{
                position: 'absolute',
<<<<<<< HEAD
                bottom: isMobile ? 12 : 24,
                left: isMobile ? 12 : 24,
=======
                bottom: 24,
                left: 24,
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: colors.textMuted,
                fontWeight: 500,
<<<<<<< HEAD
                display: isMobile ? 'none' : 'block',
=======
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
              }}>
                Масштаб: Колесико / Перемещение: Drag
              </div>
            </div>
          </div>
<<<<<<< HEAD
          </div>

          {/* Table section - hidden on mobile when map is selected */}
          <div style={{ 
            display: isMobile && mobileView !== 'table' ? 'none' : 'block',
          }}>
=======

>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
          <div id="data-table" style={{
            background: colors.cardBg,
            borderRadius: currentTheme === 'material' ? '28px' : currentTheme === 'apple' ? '20px' : '12px',
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: colors.shadowMd,
            overflow: 'hidden',
            backdropFilter: currentTheme === 'apple' ? 'blur(40px)' : 'none',
            position: 'relative',
          }}>
            {/* Decorative wood grain overlay for realistic theme */}
            {currentTheme === 'realistic' && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.06,
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 3px,
                  rgba(139, 69, 19, 0.3) 3px,
                  rgba(139, 69, 19, 0.3) 5px
                )`,
                pointerEvents: 'none',
              }} />
            )}
            
            <div style={{
<<<<<<< HEAD
              padding: isMobile ? '16px' : '24px 32px',
=======
              padding: '24px 32px',
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
              borderBottom: `1px solid ${colors.tableBorder}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: colors.headerBg,
              position: 'relative',
<<<<<<< HEAD
              flexWrap: 'wrap',
              gap: 16,
            }}>
              <div>
                <h2 style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: 500, color: colors.textPrimary }}>
                  {tableMode === 'regions' ? 'Региональные данные' : 'Данные по федеральным округам'}
                </h2>
                {!isMobile && (
                  <p style={{ fontSize: '14px', color: colors.textMuted, fontWeight: 300, marginTop: 4 }}>
                    {tableMode === 'regions' ? 'Поддерживается вставка столбца из Excel' : '8 федеральных округов Российской Федерации'}
                  </p>
                )}
              </div>
              {!isMobile && (
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button onClick={handleCopyData} style={getButtonStyle('secondary')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Скопировать таблицу
                  </button>
                  <button onClick={handleCopyValues} style={{ ...getButtonStyle('secondary'), color: colors.textMuted }}>
                    Скопировать значения
                  </button>
                  <button onClick={handlePasteValues} style={getButtonStyle('primary')}>
                    Вставить значения
                  </button>
                </div>
              )}
              {/* Mobile action buttons */}
              {isMobile && (
                <button onClick={handlePasteValues} style={{ ...getButtonStyle('primary'), padding: '8px 16px', fontSize: 13 }}>
                  Вставить
                </button>
              )}
            </div>

            {/* Toggle Bar: Regions / Districts */}
            <div style={{
              padding: isMobile ? '12px 16px' : '16px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: `1px solid ${colors.tableBorder}`,
              background: currentTheme === 'apple' ? 'rgba(255,255,255,0.03)' : 
                          currentTheme === 'realistic' ? 'rgba(109, 76, 42, 0.08)' :
                          colors.tableHeaderBg,
            }}>
              <div style={{
                display: 'inline-flex',
                position: 'relative',
                borderRadius: currentTheme === 'material' ? '20px' : currentTheme === 'apple' ? '12px' : currentTheme === 'realistic' ? '10px' : '10px',
                background: currentTheme === 'apple' ? 'rgba(255,255,255,0.08)' :
                            currentTheme === 'dark' ? '#0f172a' :
                            currentTheme === 'realistic' ? 'rgba(109, 76, 42, 0.15)' :
                            currentTheme === 'material' ? materialPalette.surface.containerHighest :
                            '#f1f5f9',
                padding: 4,
                gap: 4,
                border: currentTheme === 'apple' ? '1px solid rgba(255,255,255,0.1)' :
                       currentTheme === 'realistic' ? '2px solid #8b7355' :
                       currentTheme === 'dark' ? '1px solid #334155' :
                       `1px solid ${colors.tableBorder}`,
                backdropFilter: currentTheme === 'apple' ? 'blur(20px)' : 'none',
                overflow: 'hidden',
              }}>
                {/* Sliding indicator */}
                <div style={{
                  position: 'absolute',
                  top: 4,
                  bottom: 4,
                  left: tableMode === 'regions' ? 4 : 'calc(50% + 2px)',
                  width: 'calc(50% - 6px)',
                  borderRadius: currentTheme === 'material' ? '16px' : currentTheme === 'apple' ? '9px' : currentTheme === 'realistic' ? '7px' : '7px',
                  background: currentTheme === 'apple' ? 'rgba(255,255,255,0.15)' :
                              currentTheme === 'dark' ? '#1e293b' :
                              currentTheme === 'realistic' ? 'linear-gradient(160deg, #e0c8a8 0%, #c8b090 100%)' :
                              currentTheme === 'material' ? materialPalette.primary[40] :
                              '#ffffff',
                  transition: 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: currentTheme === 'material' ? '0 2px 6px rgba(0,0,0,0.2)' :
                             currentTheme === 'apple' ? 'inset 0 0 0 1px rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.2)' :
                             currentTheme === 'realistic' ? '2px 2px 6px rgba(0,0,0,0.3), inset 1px 1px 3px rgba(255,255,255,0.4)' :
                             currentTheme === 'dark' ? '0 2px 4px rgba(0,0,0,0.3)' :
                             '0 1px 3px rgba(0,0,0,0.1)',
                  zIndex: 0,
                }} />
                
                {[
                  { mode: 'regions' as const, label: 'Регионы', count: 85 },
                  { mode: 'districts' as const, label: 'Округа', count: 8 },
                ].map(item => (
                  <button
                    key={item.mode}
                    onClick={() => handleSwitchTableMode(item.mode)}
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      padding: currentTheme === 'material' ? '10px 28px' : '8px 24px',
                      fontSize: 13,
                      fontWeight: tableMode === item.mode ? 600 : 500,
                      color: tableMode === item.mode 
                        ? (currentTheme === 'material' ? '#ffffff' :
                           currentTheme === 'apple' ? '#ffffff' :
                           currentTheme === 'dark' ? '#f8fafc' :
                           currentTheme === 'realistic' ? '#2d1810' :
                           colors.textPrimary)
                        : colors.textMuted,
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.3s, font-weight 0.3s',
                      borderRadius: currentTheme === 'material' ? '16px' : '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      whiteSpace: 'nowrap',
                      letterSpacing: currentTheme === 'material' ? '0.1px' : 'normal',
                    }}
                  >
                    {item.label}
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      opacity: tableMode === item.mode ? 0.8 : 0.5,
                      background: tableMode === item.mode
                        ? (currentTheme === 'material' ? 'rgba(255,255,255,0.25)' :
                           currentTheme === 'apple' ? 'rgba(255,255,255,0.15)' :
                           currentTheme === 'dark' ? 'rgba(255,255,255,0.1)' :
                           currentTheme === 'realistic' ? 'rgba(0,0,0,0.1)' :
                           'rgba(0,0,0,0.06)')
                        : 'transparent',
                      padding: '2px 6px',
                      borderRadius: 6,
                      transition: 'all 0.3s',
                    }}>
                      {item.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Table content with animation */}
            <div style={{
              overflowX: 'auto',
              opacity: tableSwitching ? 0 : 1,
              transform: tableSwitching ? 'translateY(8px)' : 'translateY(0)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
            }}>
              {tableMode === 'regions' ? (
                /* Regions Table */
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                  <thead style={{ background: colors.tableHeaderBg, borderBottom: `1px solid ${colors.tableBorder}` }}>
                    <tr>
                      {(isMobile ? ['№', 'Регион', 'Значение'] : ['№', 'Субъект РФ', 'Значение', 'Округ']).map((header, i) => (
                        <th key={i} style={{
                          padding: isMobile ? '12px 8px' : '16px 32px',
                          fontSize: isMobile ? 10 : 11,
                          fontWeight: 600,
                          color: colors.textMuted,
                          textTransform: 'uppercase',
                          letterSpacing: isMobile ? '0.5px' : '1px',
                        }}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {REGIONS_DATA.map((region) => (
                      <tr
                        key={region.id}
                        id={`region-row-${region.id}`}
                        style={{
                          borderBottom: `1px solid ${colors.tableBorder}`,
                          transition: 'background 0.2s',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={e => !isMobile && (e.currentTarget.style.background = colors.tableRowHover)}
                        onMouseLeave={e => !isMobile && (e.currentTarget.style.background = 'transparent')}
                      >
                        <td style={{ padding: isMobile ? '10px 8px' : '16px 32px', fontSize: isMobile ? 12 : 14, color: colors.textMuted, fontWeight: 300 }}>{region.id}</td>
                        <td 
                          style={{ 
                            padding: isMobile ? '10px 8px' : '16px 32px', 
                            fontSize: isMobile ? 12 : 14, 
                            fontWeight: 500, 
                            color: colors.textPrimary,
                            cursor: 'pointer',
                            maxWidth: isMobile ? 150 : 'none',
                          }}
                          onClick={() => {
                            if (isMobile) {
                              setMobileView('map');
                            }
                            scrollToMapAndHighlightRegion(region.id);
                          }}
                          title="Нажмите, чтобы показать на карте"
                        >
                          <span style={{
                            borderBottom: `1px dashed ${colors.textMuted}`,
                            paddingBottom: 2,
                            transition: 'border-color 0.2s',
                            display: isMobile ? 'block' : 'inline',
                            overflow: isMobile ? 'hidden' : 'visible',
                            textOverflow: isMobile ? 'ellipsis' : 'clip',
                            whiteSpace: isMobile ? 'nowrap' : 'normal',
                          }}>
                            {region.name}
                          </span>
                        </td>
                        <td style={{ padding: isMobile ? '10px 8px' : '16px 32px' }}>
                          <input
                            ref={el => { inputRefs.current[region.id] = el; }}
                            type="number"
                            value={data[region.id] || ''}
                            onChange={(e) => handleValueChange(region.id, e.target.value)}
                            onPaste={(e) => handlePaste(e, region.id)}
                            onWheel={(e) => e.currentTarget.blur()}
                            onKeyDown={(e) => handleKeyDown(e, region.id)}
                            placeholder="—"
                            style={{
                              ...getInputStyle(),
                              width: isMobile ? 60 : '100%',
                              padding: isMobile ? '6px 8px' : (currentTheme === 'material' ? '12px 16px' : '8px 12px'),
                              fontSize: isMobile ? 12 : 14,
                            }}
                            onFocus={e => {
                              if (currentTheme === 'material') {
                                e.currentTarget.style.boxShadow = `inset 0 0 0 2px ${colors.inputFocus}`;
                              } else {
                                e.currentTarget.style.borderColor = colors.inputFocus;
                              }
                            }}
                            onBlur={e => {
                              if (currentTheme === 'material') {
                                e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${colors.inputBorder}`;
                              } else {
                                e.currentTarget.style.borderColor = colors.inputBorder;
                              }
                            }}
                          />
                        </td>
                        {!isMobile && (
                          <td style={{ padding: '16px 32px', whiteSpace: 'nowrap' }}>
                            <span style={{
                              fontSize: 10,
                              fontWeight: 600,
                              color: colors.badgeText,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              background: colors.badgeBg,
                              padding: currentTheme === 'material' ? '6px 12px' : '4px 8px',
                              borderRadius: currentTheme === 'material' ? '8px' : '6px',
                            }}>
                              {region.district}
                            </span>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                /* Districts Table */
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                  <thead style={{ background: colors.tableHeaderBg, borderBottom: `1px solid ${colors.tableBorder}` }}>
                    <tr>
                      {(isMobile ? ['№', 'Округ', 'Значение'] : ['№', 'Федеральный округ', 'Значение', 'Регионов']).map((header, i) => (
                        <th key={i} style={{
                          padding: isMobile ? '12px 8px' : '16px 32px',
                          fontSize: isMobile ? 10 : 11,
                          fontWeight: 600,
                          color: colors.textMuted,
                          textTransform: 'uppercase',
                          letterSpacing: isMobile ? '0.5px' : '1px',
                        }}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DISTRICTS_DATA.map((district) => (
                      <tr
                        key={district.id}
                        id={`district-row-${district.id}`}
                        style={{
                          borderBottom: `1px solid ${colors.tableBorder}`,
                          transition: 'background 0.2s',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={e => !isMobile && (e.currentTarget.style.background = colors.tableRowHover)}
                        onMouseLeave={e => !isMobile && (e.currentTarget.style.background = 'transparent')}
                      >
                        <td style={{ padding: isMobile ? '10px 8px' : '16px 32px', fontSize: isMobile ? 12 : 14, color: colors.textMuted, fontWeight: 300 }}>{district.id}</td>
                        <td 
                          style={{ 
                            padding: isMobile ? '10px 8px' : '16px 32px', 
                            fontSize: isMobile ? 12 : 14, 
                            fontWeight: 600, 
                            color: colors.textPrimary,
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            // Switch to map view on mobile
                            if (isMobile) {
                              setMobileView('map');
                            }
                            // Highlight all regions of this district on the map
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            if (svgRef.current && mapGroupRef.current) {
                              const svg = d3.select(svgRef.current);
                              const highlightColor = getHighlightColor(currentTheme, materialAccent);
                              mapGroupRef.current.selectAll<SVGPathElement, any>('path').each(function(d: any) {
                                if (!d || !d.properties) return;
                                const region = getRegionData(d.properties.name);
                                if (region && regionToDistrictId[region.id] === district.id) {
                                  const pathEl = d3.select(this);
                                  const currentTransform = d3.zoomTransform(svg.node() as Element);
                                  const originalFill = pathEl.attr('fill');
                                  pathEl
                                    .attr('stroke', highlightColor)
                                    .attr('stroke-width', 3 / currentTransform.k)
                                    .attr('fill', highlightColor)
                                    .raise();
                                  setTimeout(() => {
                                    pathEl
                                      .attr('stroke', currentColorsRef.current.regionStroke)
                                      .attr('stroke-width', 1 / currentTransform.k)
                                      .attr('fill', originalFill);
                                  }, 2000);
                                }
                              });
                            }
                          }}
                          title="Нажмите, чтобы показать на карте"
                        >
                          <span style={{
                            borderBottom: `1px dashed ${colors.textMuted}`,
                            paddingBottom: 2,
                            transition: 'border-color 0.2s',
                          }}>
                            {district.name}
                          </span>
                        </td>
                        <td style={{ padding: isMobile ? '10px 8px' : '16px 32px' }}>
                          <input
                            ref={el => { inputRefs.current[district.id + 1000] = el; }}
                            type="number"
                            value={districtData[district.id] || ''}
                            onChange={(e) => handleDistrictValueChange(district.id, e.target.value)}
                            onPaste={(e) => handleDistrictPaste(e, district.id)}
                            onWheel={(e) => e.currentTarget.blur()}
                            onKeyDown={(e) => handleDistrictKeyDown(e, district.id)}
                            placeholder="—"
                            style={{
                              ...getInputStyle(),
                              width: isMobile ? 60 : '100%',
                              padding: isMobile ? '6px 8px' : (currentTheme === 'material' ? '12px 16px' : '8px 12px'),
                              fontSize: isMobile ? 12 : 14,
                            }}
                            onFocus={e => {
                              if (currentTheme === 'material') {
                                e.currentTarget.style.boxShadow = `inset 0 0 0 2px ${colors.inputFocus}`;
                              } else {
                                e.currentTarget.style.borderColor = colors.inputFocus;
                              }
                            }}
                            onBlur={e => {
                              if (currentTheme === 'material') {
                                e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${colors.inputBorder}`;
                              } else {
                                e.currentTarget.style.borderColor = colors.inputBorder;
                              }
                            }}
                          />
                        </td>
                        {!isMobile && (
                          <td style={{ padding: '16px 32px', whiteSpace: 'nowrap' }}>
                            <span style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: colors.badgeText,
                              background: colors.badgeBg,
                              padding: currentTheme === 'material' ? '6px 14px' : '4px 10px',
                              borderRadius: currentTheme === 'material' ? '8px' : '6px',
                            }}>
                              {district.regionIds.length}
                            </span>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          </div>
=======
            }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 500, color: colors.textPrimary }}>Региональные данные</h2>
                <p style={{ fontSize: '14px', color: colors.textMuted, fontWeight: 300, marginTop: 4 }}>
                  Поддерживается вставка столбца из Excel
                </p>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={handleCopyData} style={getButtonStyle('secondary')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Скопировать таблицу
                </button>
                <button onClick={handleCopyValues} style={{ ...getButtonStyle('secondary'), color: colors.textMuted }}>
                  Скопировать значения
                </button>
                <button onClick={handlePasteValues} style={getButtonStyle('primary')}>
                  Вставить значения
                </button>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead style={{ background: colors.tableHeaderBg, borderBottom: `1px solid ${colors.tableBorder}` }}>
                  <tr>
                    {['№', 'Субъект РФ', 'Значение', 'Округ'].map((header, i) => (
                      <th key={i} style={{
                        padding: '16px 32px',
                        fontSize: 11,
                        fontWeight: 600,
                        color: colors.textMuted,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                      }}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {REGIONS_DATA.map((region) => (
                    <tr
                      key={region.id}
                      id={`region-row-${region.id}`}
                      style={{
                        borderBottom: `1px solid ${colors.tableBorder}`,
                        transition: 'background 0.2s',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = colors.tableRowHover}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '16px 32px', fontSize: 14, color: colors.textMuted, fontWeight: 300 }}>{region.id}</td>
                      <td 
                        style={{ 
                          padding: '16px 32px', 
                          fontSize: 14, 
                          fontWeight: 500, 
                          color: colors.textPrimary,
                          cursor: 'pointer',
                        }}
                        onClick={() => scrollToMapAndHighlightRegion(region.id)}
                        title="Нажмите, чтобы показать на карте"
                      >
                        <span style={{
                          borderBottom: `1px dashed ${colors.textMuted}`,
                          paddingBottom: 2,
                          transition: 'border-color 0.2s',
                        }}>
                          {region.name}
                        </span>
                      </td>
                      <td style={{ padding: '16px 32px' }}>
                        <input
                          ref={el => { inputRefs.current[region.id] = el; }}
                          type="number"
                          value={data[region.id] || ''}
                          onChange={(e) => handleValueChange(region.id, e.target.value)}
                          onPaste={(e) => handlePaste(e, region.id)}
                          onWheel={(e) => e.currentTarget.blur()}
                          onKeyDown={(e) => handleKeyDown(e, region.id)}
                          placeholder="—"
                          style={getInputStyle()}
                          onFocus={e => {
                            if (currentTheme === 'material') {
                              e.currentTarget.style.boxShadow = `inset 0 0 0 2px ${colors.inputFocus}`;
                            } else {
                              e.currentTarget.style.borderColor = colors.inputFocus;
                            }
                          }}
                          onBlur={e => {
                            if (currentTheme === 'material') {
                              e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${colors.inputBorder}`;
                            } else {
                              e.currentTarget.style.borderColor = colors.inputBorder;
                            }
                          }}
                        />
                      </td>
                      <td style={{ padding: '16px 32px', whiteSpace: 'nowrap' }}>
                        <span style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: colors.badgeText,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          background: colors.badgeBg,
                          padding: currentTheme === 'material' ? '6px 12px' : '4px 8px',
                          borderRadius: currentTheme === 'material' ? '8px' : '6px',
                        }}>
                          {region.district}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
        </div>

        <div 
          id="tooltip" 
          style={{
            position: 'absolute',
            display: 'none',
            background: colors.tooltipBg,
            color: colors.tooltipText,
            padding: '8px 12px',
            borderRadius: currentTheme === 'material' ? '8px' : '8px',
            fontSize: 12,
            boxShadow: colors.shadowLg,
            pointerEvents: 'none',
            zIndex: 100,
            fontWeight: 500,
            backdropFilter: currentTheme === 'apple' ? 'blur(20px)' : 'none',
          }}
        ></div>
        
<<<<<<< HEAD
        {/* "Back to Map" floating button - hidden on mobile, visibility controlled by CSS */}
=======
        {/* "Back to Map" floating button - always rendered, visibility controlled by CSS */}
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="back-to-map-btn"
          style={{
            position: 'fixed',
            bottom: 40,
            right: 40,
<<<<<<< HEAD
            display: isMobile ? 'none' : 'flex',
=======
            display: 'flex',
>>>>>>> 78b78d79d5f04e00217ac1cb29e3145efe4c5daa
            alignItems: 'center',
            gap: 12,
            padding: currentTheme === 'material' ? '16px 28px' : '16px 24px',
            background: colors.btnPrimary,
            color: colors.btnPrimaryText,
            borderRadius: currentTheme === 'material' ? '28px' : '999px',
            boxShadow: currentTheme === 'material' 
              ? '0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12)'
              : colors.shadowLg,
            border: 'none',
            cursor: 'pointer',
            zIndex: 50,
            backdropFilter: currentTheme === 'apple' ? 'blur(20px)' : 'none',
            // Animation states - use visibility + opacity + transform for smooth transitions
            visibility: showBackToMap ? 'visible' : 'hidden',
            opacity: showBackToMap ? 1 : 0,
            transform: showBackToMap ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
            transition: showBackToMap 
              ? 'opacity 0.3s ease-out, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), visibility 0s linear 0s'
              : 'opacity 0.2s ease-in, transform 0.2s ease-in, visibility 0s linear 0.2s',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>К карте</span>
        </button>

        <style>{`
          @keyframes jellyIn {
            0% { transform: translateY(150%) scaleY(1.5) scaleX(0.7); }
            40% { transform: translateY(-10%) scaleY(0.8) scaleX(1.2); }
            70% { transform: translateY(5%) scaleY(1.1) scaleX(0.9); }
            100% { transform: translateY(0) scale(1); }
          }
          
          @keyframes menuFadeIn {
            0% { 
              opacity: 0; 
              transform: scale(0.95) translateY(-8px); 
            }
            100% { 
              opacity: 1; 
              transform: scale(1) translateY(0); 
            }
          }
          
          @keyframes menuFadeOut {
            0% { 
              opacity: 1; 
              transform: scale(1) translateY(0); 
            }
            100% { 
              opacity: 0; 
              transform: scale(0.95) translateY(-8px); 
            }
          }
          
          .region-path {
            transition: fill 0.3s ease;
          }
          
          input[type=number]::-webkit-inner-spin-button, 
          input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none; 
            margin: 0; 
          }
          
          input[type=number] {
            -moz-appearance: textfield;
          }
          
          * {
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            padding: 0;
          }
          
          /* Import Google Sans for Material You */
          @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap');
        `}</style>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
