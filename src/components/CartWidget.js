import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useCartContext } from "../Context/CartContext";
import "../styles/CartWidget.scss";

const CartWidget = () => {
  const { emptyCart, cantidad } = useCartContext();
  return (
    <>
      {emptyCart ? (
        <div className="cartWidget">
          <Link className="rutaCarrito" to="/Carrito">
            <AiOutlineShoppingCart className="cart" />
          </Link>
        </div>
      ) : (
        <div className="cartWidget">
          <Link className="rutaCarrito" to="/Carrito">
            <AiOutlineShoppingCart className="cart" />
          </Link>
          <span className="icnCarrito">{cantidad}</span>
        </div>
      )}
    </>
  );
};

export default CartWidget;
