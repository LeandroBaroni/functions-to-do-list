import admin from 'firebase-admin';
import { env } from 'process';

const clientEmail = env.clientEmail;
const privateKey = env.privateKey;
const projectId = env.projectId;

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail,
    privateKey,
    projectId
  }),
});
