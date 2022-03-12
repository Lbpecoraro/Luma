import React from "react";
import "../styles/ItemDetail.scss";



const ItemDetail = ({ libro }) => {
console.log(libro.img);


  return (
    <div className="itemDetail">
      <div className="itemDetailImg">
        <img src={libro.img} alt="" />
      </div>
      <div className="itemDetailInfo">
        <h3>{libro.nombre}</h3>
        <h4>{libro.autor}</h4>
        <h5>${libro.precio}</h5>
        <p>{libro.descripcion}</p>
      </div>
    </div>
  );
};

export default ItemDetail;
