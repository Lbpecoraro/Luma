import React, {useState} from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase/config'
import { useUserContext } from '../Context/UserContext';
import { useCartContext } from '../Context/CartContext';
import "../styles/UserView.scss";


const UserView = () => {
  const [recharge, setRecharge] = useState(true);
    const {user, userOrders} = useUserContext();
    const {clearCartStatus} = useCartContext();

  return (
    <div className='userViewContainer'>
        <h2> {user.email} </h2>
        <div className='orders'>
                <h2>Ordenes de compra</h2>
                <div className='ordersContainer'>
                    {userOrders === undefined ?
                        setTimeout(() => {
                            setRecharge(!recharge)
                        },4000)
                        :
                        userOrders.map((order,index) => {
                            return (
                                <div key={index} className='order'>
                                    <div className='orderAndDate'>
                                        <h5>
                                            Orden #{index + 1}
                                        </h5>
                                        <h6>{order.date}</h6>
                                    </div>
                                    <ul>
                                        {order.items.map((item,i) => {
                                            return (
                                                <li className="liOrder" key={i}>
                                                    <img src={item.image} alt="" />
                                                    <div>
                                                        <h5>{item.tittle}</h5>
                                                        <span>{item.amount} unidades</span>
                                                    </div>
                                                </li>
                                            )
                                        })
                                        }
                                    </ul>
                                    <p>Precio total: $ {order.total}</p>
                                </div>
                            )
                        })}
                </div>
            </div>
        <button className="btnCerrarSesion" onClick={()=>{signOut(auth)
          clearCartStatus()}} >Cerrar sesión</button>
    </div>
  )
}

export default UserView