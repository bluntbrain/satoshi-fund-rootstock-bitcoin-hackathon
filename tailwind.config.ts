/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-900': '#000000',
        'dark-800': '#0A0A0A',
        'dark-700': '#141414',
        'dark-600': '#1C1C1C',
        'dark-500': '#262626',
        'dark-400': '#333333',
        'bitcoin': {
          DEFAULT: '#F7931A',
          light: '#F9A847',
          dark: '#E88A16'
        },
        'accent-blue': {
          DEFAULT: '#3B82F6',
          dark: '#2563EB'
        },
        'accent-green': {
          DEFAULT: '#10B981',
          dark: '#059669'
        },
        'accent-yellow': {
          DEFAULT: '#F59E0B',
          dark: '#D97706'
        },
        'accent-red': {
          DEFAULT: '#EF4444',
          dark: '#DC2626'
        },
        'accent-purple': {
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED'
        },
        'accent-indigo': {
          DEFAULT: '#6366F1',
          dark: '#4F46E5'
        }
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'mesh-pattern': 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z\' fill=\'%23333\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.bitcoin.DEFAULT), 0 0 20px theme(colors.bitcoin.DEFAULT)',
        'neon-green': '0 0 5px theme(colors.accent-green.DEFAULT), 0 0 20px theme(colors.accent-green.DEFAULT)',
        'neon-purple': '0 0 5px theme(colors.accent-purple.DEFAULT), 0 0 20px theme(colors.accent-purple.DEFAULT)',
      },
    },
  },
  plugins: [],
};