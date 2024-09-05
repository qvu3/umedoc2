// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://stage-api.umedoc.com',
  apiHub: 'https://stage-api.umedoc.com/prmc_hub',
  companyId: '14067787-00F8-4F9B-82A9-0ACE1BFB9DB7',
  mode: 'sandbox',
  embededId: 'a602afc6-b042-4601-873f-4337842ba07a',
  stripePublicKey: 'pk_test_sr8775MOzovRXvnqY6GHc6D700l5h1p9oH',
  DailyCoUrl: "https://synapsecoding.daily.co",
  DoseUrl: ' https://my.staging.dosespot.com/LoginSingleSignOn.aspx',
  firebaseConfig: {
    apiKey: "AIzaSyCpIf7NEfdl8qBbEDakG2iXKfEKNjI0c9o",
    authDomain: "umedoc-dev-658a6.firebaseapp.com",
    databaseURL: "https://umedoc-dev-658a6.firebaseio.com",
    projectId: "umedoc-dev-658a6",
    storageBucket: "umedoc-dev-658a6.appspot.com",
    messagingSenderId: "950081577156",
    appId: "1:950081577156:web:b7d2c382ea37ec199f6991",
    measurementId: "G-S25SVBPY03"
  },
  firebaseUser: "umedoc_firebase@gmail.com",
  firebasePassword: "abcde12345-",
  envSuffix: "",
  travelJotFormID: '211183855071049',
  covidScreeningJotFormID: '211216360922042',
  coinbaseUrl: 'https://commerce.coinbase.com/charges'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
