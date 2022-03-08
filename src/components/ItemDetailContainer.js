import React,{useEffect,useState} from 'react'
import { getLibros } from '../helpers/getLibros';
import ItemDetail from './ItemDetail'
import "../styles/ItemDetailContainer.scss"


const ItemDetailContainer = () => {
const [libro, setlibro] = useState([]);
    useEffect(() => {
        
    getLibros.then((res)=>{
        return (
          res.find(libro => libro.id === 1) 
        )
       
    }).then(libro=>setlibro(libro))    
       
    }, []);

  return (
    <div className='itemDetailContainer'>
        <ItemDetail libro={libro}/>
    </div>
  )
}

export default ItemDetailContainer