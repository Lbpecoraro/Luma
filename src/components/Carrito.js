import React from 'react'
import { Link } from 'react-router-dom';
import { useCartContext } from '../Context/CartContext'
import ItemCount from './ItemCount';

const Carrito = () => {

const {cartList,totalPrice, clear, removeItem, emptyCart} = useCartContext();

  return (
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
<span> Precio total: $ {totalPrice} </span>



    </div>
    }
    </>
  
  )
}

export default Carrito