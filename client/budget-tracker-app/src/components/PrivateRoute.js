import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
function PrivateRoute() {
    const user = Cookies.get('user') 
  return (
    (user) ? <Outlet/> : <Navigate to="/user/login"/>
  )
}

export default PrivateRoute