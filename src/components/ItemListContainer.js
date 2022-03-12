import React, { useEffect, useState } from "react";
import "../styles/ItemListContainer.scss";
import { getLibros } from "../helpers/getLibros";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";

const ItemListContainer = () => {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  const {generoId} = useParams();


  useEffect(() => {
if (generoId) {
  getLibros
  .then((res) => {
    return res.filter((libro) => libro.genero === generoId);
  })
  .then((libros) => setLibros(libros))
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    setLoading(false);
  });
}
    getLibros
      .then(libros => setLibros(libros))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
    }, [generoId]);

  const onAdd = (cantidad) => {
    console.log(cantidad);
  };

  return (
    <div className="listContainer">
         {
      loading ? 
      <h2>Cargando...</h2> 
      :
      <div>
         <ItemList libros={libros}  /> 
      </div>
      
    }

      
    </div>
  );
};

export default ItemListContainer;
