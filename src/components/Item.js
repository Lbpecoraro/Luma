import React from "react";
import ItemCount from "./ItemCount";
import "../styles/Item.scss";
import { Link } from "react-router-dom";

const item = ({ id, img, nombre, autor, precio, stock }) => {
  const onAdd = (cantidad) => {
    console.log(cantidad);
  };
  return (
    <Link className="itemContainer" to={`/detalle/${id}`}>
 
      <div className="itemImgContainer">
        <img src={img} alt="" />
      </div>
      <h2>{nombre}</h2>
      <h3>{autor}</h3>
      <span> ${precio} </span>
      <ItemCount stock={stock} initial={1} onAdd={onAdd} />
  
    </Link>
  );
};

export default item;
