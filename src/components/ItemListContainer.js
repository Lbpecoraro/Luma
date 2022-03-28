import React, { useEffect, useState } from "react";
import "../styles/ItemListContainer.scss";
import { getLibros } from "../helpers/getLibros";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import {collection, getDocs, getFirestore, query, where} from 'firebase/firestore'

const ItemListContainer = () => {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  const { generoId } = useParams();


  useEffect(() => {
    const db = getFirestore();
const queryCollection = collection(db,"libros");


    if (generoId) {
      const queryFilter = query(queryCollection, where("genero", "==", generoId));
      getDocs(queryFilter)
      .then((libros) => setLibros(libros.docs.map(item => ({id:item.id, ...item.data()}))))
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }else{
      getDocs(queryCollection)
      .then((libros) => setLibros(libros.docs.map(item => ({id:item.id, ...item.data()}))))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false)); 
    }
   
  }, [generoId]);

  return (
    <div className="listContainer">
      {loading ? (
        <h2>Cargando...</h2>
      ) : (
        <div>
          <ItemList libros={libros} />
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;
