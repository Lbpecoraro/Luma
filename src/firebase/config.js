
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCO50qUuBMJOEJlfFWtFGuNkFpEkvpud_M",
  authDomain: "luma-94c65.firebaseapp.com",
  projectId: "luma-94c65",
  storageBucket: "luma-94c65.appspot.com",
  messagingSenderId: "156121681201",
  appId: "1:156121681201:web:03e5d10bc0badbcd30f410"
};

const app = initializeApp(firebaseConfig);
export default function getFirestoreApp(){
    return app;
}