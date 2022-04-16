import React from "react";
import NavBar from "./components/NavBar";
import "./App.scss";
import ItemListContainer from "./components/ItemListContainer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart";
import CartContextProvider from "./Context/CartContext";
import UserContextProvider from "./Context/UserContext";
import User from "./components/User";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
<UserContextProvider> 
  <CartContextProvider>
       <BrowserRouter>
      <div className="appContainer">

      <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />

        <NavBar />
        <Routes>
          <Route path="/" element={<main className="main"><ItemListContainer /></main>}/>
          <Route path="/genero/:generoId" element={<main className="main"><ItemListContainer /></main>}/>
          <Route path="/detalle/:detalleId" element = {<main className="main"><ItemDetailContainer/></main>}/>
          <Route path="/*" element = {<Navigate to='/' replace/>} />
          <Route path="/carrito" element={<main className="main"><Cart/></main>} />
          <Route path="/user" element={<main className="main"><User/></main>} />
        </Routes>
      </div>
    </BrowserRouter>
    </CartContextProvider>
   </UserContextProvider>
  
  );
};

export default App;





