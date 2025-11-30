import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz-JvIY2Ll180vHOhV8WDCg1K3NlXAXaU",
  authDomain: "ai-interview-coach-5e503.firebaseapp.com",
  projectId: "ai-interview-coach-5e503",
  storageBucket: "ai-interview-coach-5e503.firebasestorage.app",
  messagingSenderId: "622866464442",
  appId: "1:622866464442:web:3d7f29260966b94efa8c83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);