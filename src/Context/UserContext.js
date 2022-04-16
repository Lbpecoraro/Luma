import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React, { createContext,useContext,useState } from 'react'
import { auth } from '../firebase/config';
import {doc, getDoc, getFirestore, setDoc} from "firebase/firestore";

const UserContext = createContext();
export const useUserContext = ()=>useContext(UserContext);

const UserContextProvider = ({children}) => {
const [user, setUser] = useState(false);
const [cart, setCart] = useState([]);
const [userOrders, setUserOrders] = useState([]);


  const db = getFirestore();  

    const getCartAndOrders = async (uid)=>{
        const docuRef = doc(db,`usuarios/${uid}`)
        const docuCif  = await getDoc(docuRef);
        const finalCart = docuCif.data().cart;
        const finalOrders = docuCif.data().orders;
        setUserOrders(finalOrders);
        setCart(finalCart);
        return [finalCart, finalOrders];
    }

const setUserWithFirebase = (userFirebase)=>{
    let cartAndOrders = getCartAndOrders(userFirebase.uid)
    const userData = {
        uid: userFirebase.uid,
        email: userFirebase.email,
        cart: cartAndOrders[0],
        orders: cartAndOrders[1]
    }
    setUser(userData);
};

  onAuthStateChanged(auth, (userFirebase)=>{
if (userFirebase) {
    if (!user) {
        setUserWithFirebase(userFirebase);
    } 
}else{
    setUser(null);

}
  })  

async function signUpUser(email,password) {
    const infoUser = await createUserWithEmailAndPassword(auth,email,password).then((userFirebase)=>{
        return userFirebase;
    });
const docRef = doc(db,`usuarios/${infoUser.user.uid}`);
setDoc(docRef,{email:email, cart:[], orders:[]});
}

  return (
    <UserContext.Provider value={
        {
            user,
            cart,
            userOrders,
            signUpUser
          }}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;