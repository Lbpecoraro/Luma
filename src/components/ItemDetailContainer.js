import React, { useEffect, useState } from "react";
import { getLibros } from "../helpers/getLibros";
import ItemDetail from "./ItemDetail";
import "../styles/ItemDetailContainer.scss";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
  const [libro, setlibro] = useState([]);
  const [loading, setLoading] = useState(true);

const {detalleId} = useParams();


  useEffect(() => {
    getLibros
      .then((res) => {
        return res.find((libro) => libro.id === detalleId);
      })
      .then((libro) => setlibro(libro))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [detalleId]);



  return (
    <div className="itemDetailContainer">
      {loading ? (
        <h2>Cargando...</h2>
      ) : (
        <div>
          <ItemDetail libro={libro} />
        </div>
      )}
    </div>
  );
};

export default ItemDetailContainer;
