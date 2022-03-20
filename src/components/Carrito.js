import React from 'react'
import { useCartContext } from '../Context/CartContext'

const Carrito = () => {

const {cartList, clear, removeItem} = useCartContext();

  return (
    <div>
    {
    cartList.map(libro=><li key={libro.id}>{`${libro.nombre}, cantidad: ${libro.cantidad}`} <button type='text' onClick={()=>{removeItem(libro)}} > Eliminar libro</button></li>)
    }
    <button type='text' className='clearCarrito' onClick={clear}> Vaciar carrito </button>



    </div>
  )
}

export default Carrito