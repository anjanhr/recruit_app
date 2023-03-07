import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHbCog9Wdgd2GIHXbeztoYqE61STK-4IY",
  authDomain: "recruitment-8d159.firebaseapp.com",
  projectId: "recruitment-8d159",
  storageBucket: "recruitment-8d159.appspot.com",
  messagingSenderId: "1021471390462",
  appId: "1:1021471390462:web:9236049c113b4fd70403af",
  measurementId: "G-MJ837BLD26",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };
