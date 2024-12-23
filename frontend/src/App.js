import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import 'react-toastify/ReactToastify.css';
import RefreshHandler from './RefreshHandler'

const App = () => {

  const [isAuthenticated,setIsAuthenticated] = useState(false);

  const PrivateRoute = ({element}) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
    <Routes>  
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>}/>} />
      <Route path='/*' element={<Navigate to="/login"/>} />
    </Routes>
    </>
  )
}

export default App