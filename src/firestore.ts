import admin from 'firebase-admin';
import { env } from 'process';

const FIREBASE_SERVICE_ACCOUNT: string = env.FIREBASE_SERVICE_ACCOUNT as string;

const serviceAccount: string = JSON.parse(FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// import { initializeApp } from 'firebase-admin/app';

// initializeApp();
