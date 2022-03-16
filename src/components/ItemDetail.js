import React,{useState} from "react";
import { Link } from "react-router-dom";
import "../styles/ItemDetail.scss";
import ItemCount from "./ItemCount";



const ItemDetail = ({ libro }) => {
  const [addOnCart, setAddOnCart] = useState(false);

  const onAdd = (cantidad) => {
    setAddOnCart(true);
  };


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
        {
        !addOnCart ?
       <ItemCount stock={libro.stock} initial={1} onAdd={onAdd} />
        : 
        <Link to="/carrito"> 
        <button className="irAlCarritoBtn" > Ir al carrito </button>
        </Link>
      }
        
      </div>
    </div>
  );

};


export default ItemDetail;
