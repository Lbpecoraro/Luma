import React,{useState} from 'react'
import {auth} from "../firebase/config";
import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth';
import { useUserContext } from '../Context/UserContext';
import {Formik} from "formik";
import "../styles/LogIn.scss";

const LogIn = () => {

const [isSignIn, setIsSignIn] = useState(false);
const{signUpUser} = useUserContext();
const submitHandler = (email,password)=>{
    if (isSignIn) {
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
    <div className='logIn'>
<Formik 
    initialValues={{
        email: '',
        password: ''
    }}
    validate={(valores) => {
        let errores = {};

        // Validar password
        if (!valores.password) {
            errores.password = 'Porfavor ingrese una contraseña';
        } else if (!/^(?=.*\d)(?=.*[a-zA-Z]).{6,15}$/.test(valores.password)) {
            errores.password = 'La contraseña debe tener entre 6 y 15 caracteres, debe contener al menos, 1 número y 1 minúscula o 1 mayúscula.';
        }

        // Validar correo
        if (!valores.email) {
            errores.email = 'Porfavor, ingrese un correo electrónico';
        } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
            errores.email = 'El correo solo puede contener letras, números, puntos, guiones y guión bajo. Y no te olvides del @';
        }
        return errores;
    }}
    onSubmit={(valores) => {
        console.log('formulario enviado');
        submitHandler(valores.email,valores.password);
    }}
    >
        {({values, errors, touched, handleSubmit, handleChange, handleBlur})=>(
          <form className='logInForm' onSubmit={handleSubmit}>
              <div className='labelInputEmail'>
            <label> Correo electrónico: <input values={values.email} onChange={handleChange} onBlur={handleBlur}  id='email' type="email" placeholder='Ingresa tu E-mail' /></label>
            {touched.email && errors.email && <p>{errors.email}</p>}
              </div>
              <div className='labelInputPassword'>
            <label> Contraseña: <input values={values.password} onChange={handleChange} onBlur={handleBlur} id='password' type="password" placeholder='Ingresa tu contraseña' /></label>
            {touched.password && errors.password && <p>{errors.password}</p>}
              </div>
            <input className='inputIniciarSesion' type="submit" value={isSignIn ? "Registrar" : "Iniciar sesión"} />
        </form>     
        )}
</Formik>
        <button className='btnRegistrar' onClick={()=>{setIsSignIn(!isSignIn)}} >{isSignIn ? "Ya tengo una cuenta" : "Quiero registrarme"}</button>
    </div>
  )
}

export default LogIn