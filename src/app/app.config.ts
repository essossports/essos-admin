import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCP29nVcnjbsOXNeSXVZgRlVjhCJNCcYgY',
  authDomain: 'essos-13593.firebaseapp.com',
  projectId: 'essos-13593',
  storageBucket: 'essos-13593.appspot.com',
  messagingSenderId: '234509148552',
  appId: '1:234509148552:web:19e5316606e6a5eaeb1a3d',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
    ]),
  ],
};
