require("dotenv").config();
const {
  FB_apiKey,
  FB_authDomain,
  FB_projectId,
  FB_storageBucket,
  FB_messagingSenderId,
  FB_appId,
  FB_measurementId,
  FBA_type,
  FBA_project_id,
  FBA_private_key_id,
  FBA_private_key,
  FBA_client_email,
  FBA_client_id,
  FBA_auth_uri,
  FBA_token_uri,
  FBA_auth_provider_x509_cert_url,
  FBA_client_x509_cert_url,
} = process.env;

const { initializeApp } = require('firebase/app');
const admin = require("firebase-admin");

const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = {
  apiKey: FB_apiKey,
  authDomain: FB_authDomain,
  projectId: FB_projectId,
  storageBucket: FB_storageBucket,
  messagingSenderId: FB_messagingSenderId,
  appId: FB_appId,
  measurementId: FB_measurementId,
};

const serviceAccount = {
    type: FBA_type,
    project_id: FBA_project_id,
    private_key_id: FBA_private_key_id,
    private_key: FBA_private_key,
    client_email: FBA_client_email,
    client_id: FBA_client_id,
    auth_uri: FBA_auth_uri,
    token_uri: FBA_token_uri,
    auth_provider_x509_cert_url: FBA_auth_provider_x509_cert_url,
    client_x509_cert_url: FBA_client_x509_cert_url
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

module.exports = { auth, createUserWithEmailAndPassword, db, signInWithEmailAndPassword };