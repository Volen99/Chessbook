export const environment = {
  production: true,
  apiUrl: 'https://chessbook.me/api',
  testUser: {
    token: {},
    email: '',
  },

  baseUrl: '/',
  gtmId: 'GTM-NH9FPX2',
  skipAuth: false,
  availableLanguages: ['en'],
  isEmbedded: false,
  idleTimeout: 1000 * 60 * 5, // 5 minute
  cloudHomeUrl: 'https://chessbook.me',
  favicon: '/favicon.png',
  skipOTPForDevTools: false,
};
