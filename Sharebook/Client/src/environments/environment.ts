// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// In order to load these polyfills early enough (before app code), polyfill.ts imports this file to
// to change the order in the final bundle.
// import 'core-js/features/reflect'

export const environment = {
  production: true,
  hmr: false,
  apiUrl: '',
  originServerUrl: ''
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
