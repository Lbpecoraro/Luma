import React from 'react'
import ItemCount from './ItemCount'
import Titulo from './Titulo'
import "../styles/ItemListContainer.scss"


const ItemListContainer = () => {

const onAdd = (cantidad) => {
  console.log(cantidad);
}

  return (
    <div className="listContainer">
  
        <ItemCount stock={5} initial={1} onAdd={onAdd}/>
    </div>
  )
}

export default ItemListContainer