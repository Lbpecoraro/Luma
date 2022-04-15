import React from 'react'
import { useUserContext } from '../Context/UserContext'
import LogIn from './LogIn'
import UserView from './UserView';

const User = () => {
    const {user} = useUserContext();
  return (
    <> {
        user ? <UserView/> : <LogIn/>
    }
        
            
        
    </>
  )
}

export default User