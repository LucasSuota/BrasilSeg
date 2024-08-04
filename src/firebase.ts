// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARGT3j-frx-sXyEWteSwZI2cd50b3nMx8",
  authDomain: "brasilsegtest.firebaseapp.com",
  projectId: "brasilsegtest",
  storageBucket: "brasilsegtest.appspot.com",
  messagingSenderId: "150499264388",
  appId: "1:150499264388:web:62987be845c32060c4bfd1",
  measurementId: "G-MMDZFW9NKM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { auth };
