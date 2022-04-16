import React, { useEffect, useState } from "react";
import "../styles/ItemListContainer.scss";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import {collection, getDocs, getFirestore, query, where} from 'firebase/firestore'

const ItemListContainer = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { generoId } = useParams();
  useEffect(() => {
    const db = getFirestore();
const queryCollection = collection(db,"libros");
const getQueryDocs = (query) => {
  getDocs(query)
      .then((books) => setBooks(books.docs.map(item => ({id:item.id, ...item.data()}))))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false)); 
}
    if (generoId) {
      const queryFilter = query(queryCollection, where("genero", "==", generoId));
      getQueryDocs(queryFilter);

    }else{
      getQueryDocs(queryCollection);
    }
     }, [generoId]);
  return (
    <div className="listContainer">
      {loading ? (
        <h2>Cargando...</h2>
      ) : (
        <div>
          <ItemList libros={books} />
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;
