import { addDoc, collection, doc, documentId, getDoc, getDocs, getFirestore, query, where, writeBatch } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";
import { useUserContext } from "./UserContext";
import {toast} from "react-toastify";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

function CartContextProvider({ children }) {
  const [cartList, setcartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [emptyCart, setEmptyCart] = useState(true);
const [quantity, setQuantity] = useState(0);
const [orderId, setOrderId] = useState("");

const {user,cart} = useUserContext();
const db = getFirestore();

useEffect(() => {
  if (cart.length>=1) {
    setcartList(cart);
    let cantidad = cart.reduce((total,item)=> total+item.quantity,0);
    setQuantity(cantidad);
    setTotalPrice(cart.reduce((acc,item)=>acc+(item.precio*item.quantity),0));
    setEmptyCart(false);
  }else{
    setcartList([]);
    setQuantity(0);
    setTotalPrice(0);
    setEmptyCart(true);
  }
  }, [cart]);

  const addItem = (item) => {
    setcartList([...cartList, item]);
    setEmptyCart(false);
    const queryDb = doc(db, 'usuarios', user.uid);
    const batch = writeBatch(db);
    batch.update(queryDb, {'cart':[...cartList,item]})
    batch.commit();
  };

  const clear = () => {
    setcartList([]);
    setEmptyCart(true);
    setTotalPrice(0);
    setQuantity(0);
    const queryDb = doc(db, 'usuarios', user.uid);
    const batch = writeBatch(db);
    batch.update(queryDb, {'cart':[]})
    batch.commit();
  };

const clearCartStatus = () =>  {
setcartList([]);
setEmptyCart(true);
setQuantity(0);
setTotalPrice(0);
}

const clearWithoutEmptyCart = ()=>{
setcartList([]);
setQuantity(0);
setTotalPrice(0);
const queryDb = doc(db, 'usuarios', user.uid);
const batch = writeBatch(db);
batch.update(queryDb, {'cart':[]})
batch.commit();
setTimeout(() => {
  setEmptyCart(true);
}, 20000);
};

  const isInCart = (item) => {
    return cartList.find((libro) => item.id === libro.id) === undefined;
  };

  const removeItem = (item) => {
    setcartList(cartList.filter((libro) => libro.id !== item.id));
    precioTotal = totalPrice - (item.precio * item.quantity);
    setTotalPrice(precioTotal);
    setQuantity(quantity - item.quantity);
    const queryDb = doc(db, 'usuarios', user.uid);
    const batch = writeBatch(db);
    batch.update(queryDb, {'cart': cartList.filter(libro=>libro.id !== item.id)})
    batch.commit();
    if (cartList.length === 1) {
      setEmptyCart(true);
    }
  };

const getquantity = (cant)=>{
  setQuantity(quantity+cant)
};

let leftStock = (0);
const isStock = (libro, cant)=>{
let libroElegido = cartList.find(elLibro=> libro.id === elLibro.id )
leftStock = libroElegido.stock - libroElegido.quantity;
if (cant>leftStock) {
  return false;
}else{
  return true;
}
}

let precioTotal = 0;
  const onAdd = (cant, libro) => {
   if( isInCart(libro)){
       addItem({...libro, quantity: cant})
precioTotal = totalPrice + (libro.precio * cant);
setTotalPrice(precioTotal);
getquantity(cant);
addItemNotification(cant,libro.nombre);
    } else {
      if (isStock(libro,cant)) {
          cartList.find(item=>item.id === libro.id).quantity +=cant
      precioTotal = totalPrice + (libro.precio * cant);
setTotalPrice(precioTotal);
getquantity(cant);
addItemNotification(cant, libro.nombre);
const queryDb = doc(db, 'usuarios', user.uid);
const batch = writeBatch(db);
batch.update(queryDb, {'cart':[...cartList]})
batch.commit();
      } else noMoreStockNotification();
    }    
};

const buyCart = async (e)=>{
e.preventDefault()
let name = e.target.name.value;
let phone = e.target.phone.value;
let email = e.target.email.value;
const order = {
  buyer : {
    name : name,
    phone : phone,
    email : email
  },
  items : 
    cartList.map((item)=>(
      {id:item.id, tittle:item.nombre, amount:item.quantity, price:(item.precio*item.quantity), image:item.img}
    )),
date : new Date().toLocaleDateString(),
total: totalPrice
}

const db = getFirestore();
const queryCollection = collection(db,'orders');
addDoc(queryCollection,order)
.then(res => setOrderId(res.id) )
.catch(err=> console.log(err))
.finally(console.log("terminado"))


const queryDb = doc(db, 'usuarios', user.uid);
const batch = writeBatch(db);
batch.update(queryDb, {'cart':[]})
getDoc(queryDb)
.then(res=> batch.update(queryDb,{"orders": [...res.data().orders,order]}))

const queryBooksCollection = collection(db,"libros")
const queryUpdateStock = await query(queryBooksCollection, where(documentId(),"in", cartList.map(item=>item.id)))
await getDocs(queryUpdateStock)
.then (resp=> resp.docs.forEach(res=>batch.update(res.ref,
  {
    stock: res.data().stock - cartList.find(item=>item.id===res.id).quantity
  }
  )))
batch.commit();

};

const addItemNotification = (count,nombre) => {
  toast.success(`Se ${count === 1 ? 'ha' : 'han'} agregado ${count} ${count === 1 ? 'libro' : 'libros'} de ${nombre} al carrito`,{
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
          background: '#FDFFFA',
          color: '#2B494B'
      }
  })
}
const noMoreStockNotification = () => {
  toast.info('Lo lamento, la cantidad que quieres agregar supera al stock disponible',{
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
          background: '#2B494B',
          color: '#FDFFFA'
      }
  })
}

  return (
    <CartContext.Provider
      value={{ cartList, totalPrice,orderId, emptyCart, quantity, addItem, clear, isInCart, removeItem, onAdd, buyCart, clearCartStatus,clearWithoutEmptyCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;

