import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAo2PscvKJoAJx1u5XefyAApNEc2_BuRws",
  authDomain: "movies-c9034.firebaseapp.com",
  projectId: "movies-c9034",
  storageBucket: "movies-c9034.appspot.com",
  messagingSenderId: "199230174254",
  appId: "1:199230174254:web:72f1e76c9767133a63dbbf",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addDataToFirestore() {
  try {
    const docRef = await addDoc(collection(db, "movies"), {
      id: Date.now(),
      initialText: "Задача 3",
      text: "Задача 3",
      checked: false,
      changed: false,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "movies"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().text}`);
  });
}

addDataToFirestore();
getDataFromFirestore();
