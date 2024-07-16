
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOuwBafg9uZcBQspKps6SaPX7TrK_DlDY",
  authDomain: "teamg68-5e76e.firebaseapp.com",
  projectId: "teamg68-5e76e",
  storageBucket: "teamg68-5e76e.appspot.com",
  messagingSenderId: "884046727836",
  appId: "1:884046727836:web:7426f8ac5ff1c9b6fbbb59",
  measurementId: "G-18B05RMWXD"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
