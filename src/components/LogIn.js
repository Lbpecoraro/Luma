import React,{useState} from 'react'
import {auth} from "../firebase/config";
import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth';
import { useUserContext } from '../Context/UserContext';


const LogIn = () => {

const [isRegistrando, setIsRegistrando] = useState(false);

const{signUpUser} = useUserContext();

const submitHandler = (e)=>{
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (isRegistrando) {
        signUpUser(email,password);
    } else {
        setPersistence(auth,browserSessionPersistence)
        .then(()=>{
            return signInWithEmailAndPassword(auth,email,password)
        })
        .catch(error=>{
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            console.log(errorMessage);
        })
    }
};

  return (

    <div>

        <form onSubmit={submitHandler}>
            <label> Correo electrónico: <input id='email' type="email" placeholder='Ingresa tu E-mail' /></label>
            <label> Contraseña: <input id='password' type="password" placeholder='Ingresa tu contraseña' /></label>
            <input type="submit" value={isRegistrando ? "Registrar" : "Iniciar sesión"} />
        </form>
        <button onClick={()=>{setIsRegistrando(!isRegistrando)}} >{isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}</button>


    </div>
  )
}

export default LogIn