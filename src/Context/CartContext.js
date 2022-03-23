import { createContext, useContext, useState } from "react";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

function CartContextProvider({ children }) {
  const [cartList, setcartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [emptyCart, setEmptyCart] = useState(true);
const [cantidad, setCantidad] = useState(0);

  const addItem = (item) => {
    setcartList([...cartList, item]);
    setEmptyCart(false);
  };

  const clear = () => {
    setcartList([]);
    setEmptyCart(true);
    setTotalPrice(0);
    setCantidad(0);
  };

  const isInCart = (item) => {
    return cartList.find((libro) => item.id === libro.id) === undefined;
  };

  const removeItem = (item) => {
    setcartList(cartList.filter((libro) => libro.id !== item.id));
    precioTotal = totalPrice - (item.precio * item.cantidad);
    setTotalPrice(precioTotal);
    setCantidad(cantidad - item.cantidad);
    if (cartList.length === 1) {
      setEmptyCart(true);
    }
  };

const getCantidad = (cant)=>{
  setCantidad(cantidad+cant)
};
let stockSobrante = (0);
const isStock = (libro, cant)=>{
let libroElegido = cartList.find(elLibro=> libro.id === elLibro.id )
stockSobrante = libroElegido.stock - libroElegido.cantidad;
if (cant>stockSobrante) {
  return false;
}else{
  return true;
}
}

let precioTotal = 0;
  const onAdd = (cant, libro) => {
   if( isInCart(libro)){
       addItem({...libro, cantidad: cant})
precioTotal = totalPrice + (libro.precio * cant);
setTotalPrice(precioTotal);
getCantidad(cant);
    } else {
      if (isStock(libro,cant)) {
          cartList.find(item=>item.id === libro.id).cantidad +=cant
      precioTotal = totalPrice + (libro.precio * cant);
setTotalPrice(precioTotal);
getCantidad(cant);
      } else {
        console.log("Tu cantidad supera el stock disponible");
      }
    
    }

          
};

  return (
    <CartContext.Provider
      value={{ cartList, totalPrice,emptyCart,cantidad, addItem, clear, isInCart, removeItem, onAdd }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
