import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = ({setCurrentUser}) => {
     const navigate = useNavigate()
     const handleLogout = ()=>{
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            // setCurrentUser(null)
            if (setCurrentUser) {
               setCurrentUser(null)
          }
            navigate('/login',{replace:true})
     }
  return ( 
    <>
      <button 
      onClick={handleLogout}
      >Logout...</button>
    </>
  )
}

export default Logout
