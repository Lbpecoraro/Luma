import React from 'react'
import "../styles/NavBar.scss"
import CartWidget from './CartWidget'

const NavBar = () => {
  return (
    <div className="menu">
        <h3>Luma</h3>
        <ul>
            <li> <a href=""> Inicio</a> </li>
            <li> <a href=""> Géneros</a> </li>
            <li> <a href=""> Ofertas</a> </li>
            <li> <a href=""> Contacto</a> </li>
        </ul>
        <CartWidget/>
    </div>
  )
}

export default NavBar