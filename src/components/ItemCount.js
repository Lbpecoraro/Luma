import React, { useState } from "react";
import "../styles/ItemCount.scss";

const ItemCount = ({ stock, initial, onAdd }) => {
  const [count, setcount] = useState(initial);
  

  const menos = () => {
    if (count > initial) {
      setcount(count - 1);
    } else {
      console.log("La cantidad de libros elegidos no pueden ser 0");
    }
  };

  const mas = () => {
    if (count < stock) {
      setcount(count + 1);
    } else {
      console.log(
        "La cantidad de libros elegidos no puede ser mayor al stock disponible"
      );
    }
  };
  
  return (
    <div className="contadorContainer">
      <div className="btnMasMenosContainer">
        <button className="btnMasMenos" onClick={menos}>-</button>
        <span className="contador">{count}</span>
        <button className="btnMasMenos" onClick={mas}>+</button>
      </div>
      
      
       <button className="btnAgregarCarrito"  onClick={()=>{onAdd(count)}}>Añadir al carrito</button>
     
    </div>
  );
};

export default ItemCount;
