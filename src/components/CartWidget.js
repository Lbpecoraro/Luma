import React from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import '../styles/CartWidget.scss'

const CartWidget = () => {
  return (
    <div className="cartWidget" >
        <AiOutlineShoppingCart className="cart"/>
    </div>
  )
}

export default CartWidget