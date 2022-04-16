import React from "react";
import "../styles/Item.scss";
import { Link } from "react-router-dom";

const item = ({ id, img, nombre, autor, precio }) => {
  return (
    <Link className="itemContainer" to={`/detalle/${id}`}>
       <div className="itemImgContainer">
        <img src={img} alt="" />
      </div>
      <div className="itemInfo">
        <h2>{nombre}</h2>
        <h3>{autor}</h3> 
      </div>
     <span> ${precio} </span>
      </Link>
  );
};

export default item;
