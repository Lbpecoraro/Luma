import React, { useState } from "react";
import { useUserContext } from "../Context/UserContext";
import "../styles/ItemCount.scss";
import {toast} from "react-toastify";


const ItemCount = ({ stock, initial, onAdd, addOnCart, prodInfo }) => {
  const [count, setcount] = useState(initial);
  
  const {user} = useUserContext();

  const less = () => {
    if (count > initial) {
      setcount(count - 1);
    } else {
      cantBeZero();
    }
  };

  const plus = () => {
    if (count < stock) {
      setcount(count + 1);
    } else {
     noStock();
    }
  };
  
  const noStock = () => {
    toast.info('Lo lamento, no tenemos mas stock por el momento',{
      position: "top-right",
      autoClose: 2500,
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
  const cantBeZero = () => {
    toast.info('Lo lamento, no puede seleccionar 0 productos',{
      position: "top-right",
      autoClose: 2500,
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
  const logInToAddItem = () => {
    toast.info('Debes iniciar sesión o registrarte para añadir productos al carrito.',{
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
    <div className="contadorContainer">
      <div className="btnMasMenosContainer">
        <button className="btnMasMenos" onClick={less}>-</button>
        <span className="contador">{count}</span>
        <button className="btnMasMenos" onClick={plus}>+</button>
      </div>
      
       <button className="btnAgregarCarrito"  onClick={()=>{
         if (user) {
           onAdd(count,prodInfo)
           addOnCart(true)
         }else{
         logInToAddItem();
         }
         }}>Añadir al carrito</button>
     
    </div>
  );
};

export default ItemCount;
