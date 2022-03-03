import React, { useEffect, useState } from "react";
import ItemCount from "./ItemCount";
import "../styles/ItemListContainer.scss";
import { getLibros } from "../helpers/getLibros";
import ItemList from "./ItemList";

const ItemListContainer = () => {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLibros
      .then((libros) => {
        setLibros(libros);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onAdd = (cantidad) => {
    console.log(cantidad);
  };

  return (
    <div className="listContainer">
         {
      loading ? 
      <h2>Cargando...</h2> 
      :
        <ItemList libros={libros}  />
    }

      
    </div>
  );
};

export default ItemListContainer;
