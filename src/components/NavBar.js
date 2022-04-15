import React,{useState} from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.scss";
import CartWidget from "./CartWidget";

const NavBar = () => {

const [genHeight, setgenHeight] = useState("0%");

const growGeneros = {
  height: genHeight
} ;

  return (
    <div className="menu">
      <div className="logoContainer">
        <Link to="/" >
          <img className="logo" src="../../images/logo.png" alt="" />
        </Link>
        
      </div>
    
      <ul>
        <Link to="/">
          <li>
            {" "}
            <a href=""> Inicio</a>{" "}
          </li>
        </Link>
        <li 
        className="generosLi" 
        onMouseOver={()=>{setgenHeight("5rem")}}
        onMouseLeave={()=>{setgenHeight("0%")}}
        >
          <p> Géneros</p>
          <div className="generosDiv" style={growGeneros}>
          <Link to="/genero/novela">Novela</Link>
          <Link to="/genero/ficcion">Ficción</Link>
          <Link to="/genero/fantasia">Fantasía</Link>
          </div>
         
        </li>
        <Link to="/user">
        <li>
          {" "}
          <a href=""> iniciar sesión</a>{" "}
        </li>
        </Link>
        
        <li>
          {" "}
          <a href=""> Ofertas</a>{" "}
        </li>
        <li>
          {" "}
          <a href=""> Contacto</a>{" "}
        </li>
      </ul>
       <CartWidget />  
    </div>
  );
};

export default NavBar;
