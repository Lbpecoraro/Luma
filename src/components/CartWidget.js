import React from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import '../styles/CartWidget.scss'

const CartWidget = () => {
  return (
    <div className="cartWidget" >
      <Link className='rutaCarrito' to="/Carrito">
         <AiOutlineShoppingCart className="cart"/>
      </Link>
       
    </div>
  )
}

export default CartWidget