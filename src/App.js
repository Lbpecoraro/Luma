import React from "react";
import NavBar from "./components/NavBar";
import "./App.scss";
import ItemListContainer from "./components/ItemListContainer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Carrito from "./components/Carrito";


const App = () => {
  return (
    <BrowserRouter>
      <div className="appContainer">
        <NavBar />
        <Routes>
          <Route path="/" element={<main className="main"><ItemListContainer /></main>}/>
          <Route path="/genero/:generoId" element={<main className="main"><ItemListContainer /></main>}/>
          <Route path="/detalle/:detalleId" element = {<main className="main"><ItemDetailContainer/></main>}/>
          <Route path="/*" element = {<Navigate to='/' replace/>} />
          <Route path="/carrito" element={<main className="main"><Carrito/></main>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;





