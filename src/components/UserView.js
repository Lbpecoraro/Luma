import React from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase/config'
import { useUserContext } from '../Context/UserContext';
import { useCartContext } from '../Context/CartContext';


const UserView = () => {
    const {user} = useUserContext();
    const {clearCartStatus} = useCartContext();

  return (
    <div>
        <h2> {user.email} </h2>
        <button onClick={()=>{signOut(auth)
          clearCartStatus()}} >Cerrar sesión</button>
    </div>
  )
}

export default UserView