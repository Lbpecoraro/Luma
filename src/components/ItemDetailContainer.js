import React, { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import "../styles/ItemDetailContainer.scss";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const ItemDetailContainer = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);

const {detalleId} = useParams();


  useEffect(() => {
    const db = getFirestore();
    const queryDb = doc(db, "libros", detalleId);
    getDoc(queryDb)
      .then(res => setBook({id:res.id, ...res.data()}) )
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [detalleId]);



  return (
    <div className="itemDetailContainer">
      {loading ? (
        <h2>Cargando...</h2>
      ) : (
        <div>
          <ItemDetail libro={book} />
        </div>
      )}
    </div>
  );
};

export default ItemDetailContainer;
