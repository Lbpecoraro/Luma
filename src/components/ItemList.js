import React from 'react'
import Item from './Item'
import "../styles/ItemList.scss"
const ItemList = ({libros}) => {
  return (
    <div className='itemList'>

    {
        libros.map((libro,i)=>{
            return(
                <Item key={i} id={libro.id} img={libro.img} nombre={libro.nombre} autor={libro.autor} precio={libro.precio} stock={libro.stock} />
            )
        })
    }

    </div>
  )
}

export default ItemList