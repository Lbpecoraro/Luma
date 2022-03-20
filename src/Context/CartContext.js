import { createContext, useContext, useState } from "react";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

function CartContextProvider({ children }) {
  const [cartList, setcartList] = useState([]);

  const addItem = (item) => {
    setcartList([...cartList, item]);
  };

  const clear = () => {
    setcartList([]);
  };

  const isInCart = (item) => {
    return cartList.find((libro) => item.id === libro.id) === undefined;
  };

  const removeItem = (item) => {
    setcartList(cartList.filter((libro) => libro.id !== item.id));
  };

  return (
    <CartContext.Provider
      value={{ cartList, addItem, clear, isInCart, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
