import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
 

} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, } from 'firebase/firestore';
import firebase from 'firebase/compat/app';import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBWa3fhXO_lspvcoKtnJoKdpokYLugiK5E",
    authDomain: "marina-restaurant.firebaseapp.com",
    projectId: "marina-restaurant",
    storageBucket: "marina-restaurant.appspot.com",
    messagingSenderId: "1074575150632",
    appId: "1:1074575150632:web:6af2e3f1673b7a6e576f1d",
    measurementId: "G-8GSJR1W8YP"
  };
  
  export const firebaseApp = initializeApp(firebaseConfig);

  firebase.initializeApp(firebaseConfig);

 export const firestore = firebase.firestore();


  const googleProvider = new GoogleAuthProvider();
  
  googleProvider.setCustomParameters({
    prompt: "select_account",
  });
  
  export const auth = getAuth();
  export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);

  export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);
  
  export const db = getFirestore(firebaseApp);
  
  export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
  ) => {
    if (!userAuth) return;
  
    const userDocRef = doc(db, "users", userAuth.uid);
  
    const userSnapshot = await getDoc(userDocRef);

    // const address = userSnapshot.data().address;
    // console.log(address);
   console.log(userDocRef);
     
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      
      
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
        address: additionalInformation.address || "", 
        phoneNumber: additionalInformation.phoneNumber || "",
          ...additionalInformation,
        });

        const newCollectionRef = doc(userDocRef, 'orderHistory', 'documentId');

    
        const orderDetails = {
          orderId: '1', 
          amount: 0, 
          items: [],
          timestamp: new Date(), 
        };
    
    
       
       setDoc(newCollectionRef, orderDetails);
      
      } catch (error) {
        console.log("error creating the user", error.message);
      }
    }
  
    return userDocRef;
  };
  
  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  
  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await signInWithEmailAndPassword(auth, email, password);
  };


  export const signOutUser =async ()=> await signOut(auth)

  export const onAuthStateChangedListner=(callback)=>onAuthStateChanged(auth,callback)





// export const checkData=async()=>{
//   const docRef = doc(db, "users",);
//   const docSnap = await getDoc(docRef);
  
//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//   } else {
//     // docSnap.data() will be undefined in this case
//     console.log("No such document!");
//   }
// }


