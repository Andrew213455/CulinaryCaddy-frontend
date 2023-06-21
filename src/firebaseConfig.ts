import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDKbODm5bUIJ4XPtrzJ42qO1G4sJkuARtM",
  authDomain: "culinary-caddy.firebaseapp.com",
  projectId: "culinary-caddy",
  storageBucket: "culinary-caddy.appspot.com",
  messagingSenderId: "1038326118349",
  appId: "1:1038326118349:web:c5cf7e94dfe35d2850f684",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
