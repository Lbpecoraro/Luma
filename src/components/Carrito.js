import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useCartContext } from '../Context/CartContext'
import { useUserContext } from '../Context/UserContext';


const Carrito = () => {

  const [comprado, setComprado] = useState(false);
const {cartList,totalPrice, clear, removeItem, emptyCart, buyCart, orderId,clearWithoutEmptyCart} = useCartContext();

const {user} = useUserContext();

const changeSetComprado = ()=>{
  setTimeout(() => {
    setComprado(true)
    clearWithoutEmptyCart();
  }, 4000);
};

  return (
    <>
    {!user ? 
    <h3> Para agregar productos al carrito, debes iniciar sesión primero</h3> 
    : 
    <>
    {
      emptyCart ? 
      <div>
        <h3> Aún no has agregado nada a tu carrito, si quieres hacerlo, haz click en el botón de abajo. </h3>
        <Link to="/">
        <button type='text'> Ir a inicio </button>
        </Link>
        
      </div>
      :
      <div>
    {
    cartList.map(libro=><li key={libro.id}>{`${libro.nombre}, cantidad: ${libro.cantidad},precio: ${libro.precio * libro.cantidad}`} <button type='text' onClick={()=>{removeItem(libro)}} > Eliminar libro</button></li>)
    }
    <button type='text' className='clearCarrito' onClick={clear}> Vaciar carrito </button>

{ !comprado ?
<div>
   <span> Precio total: $ {totalPrice} </span>
   <form onSubmit={buyCart}>
     <input id='name' type="text" placeholder='Ingrese su nombre' />
     <input id='phone' type="number" placeholder='Ingrese su teléfono' />
     <input id='email' type="email" placeholder='Ingrese su e-mail' />
     <button type='submit' onClick={()=>{
       changeSetComprado()
     }}> Comprar </button>
   </form>
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
    
    </>
    )
}

export default Carrito