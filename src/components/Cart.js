import { Formik } from 'formik';
import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useCartContext } from '../Context/CartContext'
import { useUserContext } from '../Context/UserContext';
import { toast } from 'react-toastify';
import "../styles/cart.scss"

const Cart = () => {
  const [bought, setBought] = useState(false);
  const [isErrors,setIsErrors] = useState(true);
const {cartList,totalPrice, clear, removeItem, emptyCart, buyCart, orderId,clearWithoutEmptyCart} = useCartContext();
const {user} = useUserContext();
const changesetBought = ()=>{
  if (isErrors) {
    console.log("Debes completar todo el formulario");
  }else{
   setTimeout(() => {
    setBought(true)
    clearWithoutEmptyCart();
  }, 4000); 
  }
  };
const errorsInForm=(e)=>{
  e.preventDefault();
errorsInFormNotification()
};
const errorsInFormNotification = () => {
  toast.info('Lo lamento, debes completar los campos de forma correcta.',{
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
          background: '#2B494B',
          color: '#FDFFFA'
      }
  })
}
  return (
    <div className='cartContainer'>
    <div className='bienvenida'><h3>Bienvenid@ a Carrito</h3></div>
    {!user ? 
    <h3> Para agregar productos al carrito, debes iniciar sesión primero</h3> 
    : 
    <>
    {
      emptyCart ? 
      <div className='carritoVacio' >
        <h3> Aún no has agregado nada a tu carrito, si quieres hacerlo, haz click en el botón de abajo. </h3>
        <Link to="/">
        <button className='irInicioBtn' type='text'> Ir a inicio </button>
        </Link>
        
      </div>
      :
      <div>
      <div className="liCartContainer">
    {
cartList.map(libro=>
      <li key={libro.id} className="liCart">
          <img src={libro.img} alt="" />
          {`${libro.nombre}, cantidad: ${libro.quantity},precio:$ ${libro.precio * libro.quantity}`} 
          <button className='removeItem' type='text' onClick={()=> {removeItem(libro)}}>Eliminar libro</button>
        </li>
      )
    }
      </div>
    <button type='text' className='clearCarrito' onClick={clear}> Vaciar carrito </button>

{ !bought ?
<div>
   <span className='totalPrice'> Precio total: $ {totalPrice} </span>
   <Formik
   initialValues={{
    name: '',
    phone: '',
    email: ''
}}
validate={(valores) => {
    let errores = {};
    // Validar password
    if (!valores.name) {
        errores.name = 'Porfavor ingrese un nombre';
    } else if (!/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/.test(valores.name)) {
        errores.name = 'Ingrese un nombre válido, iniciando con mayúscula, ej: Camila';
    }
    if (!valores.phone) {
        errores.phone = 'Porfavor ingrese un telefono celular';
    } else if (!/^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/.test(valores.phone)) {
        errores.phone = 'El número de teléfono debe tener 10 dígitos';
    }
    // Validar correo
    if (!valores.email) {
        errores.email = 'Porfavor, ingrese un correo electrónico';
    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
        errores.email = 'El correo solo puede contener letras, números, puntos, guiones y guión bajo. Y no te olvides del @';
    }
    if (Object.keys(errores).length > 0) {
        setIsErrors(true);
    } else {
        setIsErrors(false);
    }
    return errores;
}}
   >
     {({values, errors, touched, handleSubmit, handleChange, handleBlur})=>(
     <form onSubmit={isErrors ? errorsInForm : buyCart }>
       <div className='inputContainer'>
          <div>
            <input values={values.name} onChange={handleChange} onBlur={handleBlur} id='name' type="text" placeholder='Ingrese su nombre' />
            {touched.name && errors.name && <p>{errors.name}</p>}
          </div>
          <div>
            <input values={values.phone} onChange={handleChange} onBlur={handleBlur} id='phone' type="number" placeholder='Ingrese su teléfono' />
            {touched.phone && errors.phone && <p>{errors.phone}</p>}

          </div>
          <div>
            <input values={values.email} onChange={handleChange} onBlur={handleBlur} id='email' type="email" placeholder='Ingrese su e-mail' />
            {touched.email && errors.email && <p>{errors.email}</p>}
          </div>   
       </div>
    
     <button className="buyBtn" type='submit' onClick={()=>{
       changesetBought()
     }}> Comprar </button>
   </form>  
     )}
    </Formik>
  </div>
 :
<div>
  <h3>¡muchas gracias por adquirir nuestros libros!</h3>
  <p>{`Este es el código único de tu compra:${orderId}`}</p>
</div>
}
    </div>
    }
    </>
    } 
        </div>
    )
}
export default Cart