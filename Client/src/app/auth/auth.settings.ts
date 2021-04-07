import {NbPasswordAuthStrategy} from "../sharebook-nebular/auth/strategies/password/password-strategy";
import {NbAuthOAuth2JWTToken} from "../sharebook-nebular/auth/services/token/token";
import {environment} from "../../environments/environment";

export const socialLinks = [
  {
    url: 'https://github.com/Volen99',
    target: '_blank',
    icon: 'github',
  },
  {
    url: 'https://www.facebook.com/people/NM-Volencho/100010730917900',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: 'https://twitter.com/volencho',
    target: '_blank',
    icon: 'twitter',
  },
];

export const authOptions = {
  strategies: [
    NbPasswordAuthStrategy.setup({
      name: 'email',
      baseEndpoint: environment.apiUrl,
      token: {
        class: NbAuthOAuth2JWTToken,
        key: 'token',
      },
      login: {
        endpoint: '/auth/login',
        method: 'post',
      },
      register: {
        endpoint: '/auth/sign-up',
        method: 'post',
      },
      logout: {
        endpoint: '/auth/sign-out',
        method: 'post',
      },
      requestPass: {
        endpoint: '/auth/request-pass',
        method: 'post',
      },
      resetPass: {
        endpoint: '/auth/reset-pass',
        method: 'post',
      },
      refreshToken: {
        endpoint: '/auth/refresh-token',
        method: 'post',
      },
    }),
  ],
  forms: {
    login: {
      socialLinks: socialLinks,
    },
    register: {
      socialLinks: socialLinks,
    },
    validation: {
      fullName: {
        required: true,
        minLength: 6,
        maxLength: 20,
      },
    },
  },
};
