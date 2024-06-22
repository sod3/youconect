import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0piuGZoK9uPgVawoV3Bme_a7lXbdb8jc",
  authDomain: "video-7a37e.firebaseapp.com",
  projectId: "video-7a37e",
  storageBucket: "video-7a37e.appspot.com",
  messagingSenderId: "661224226859",
  appId: "1:661224226859:web:a4abbb9bd6603934266a6e",
  measurementId: "G-L3W82W2ER8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
