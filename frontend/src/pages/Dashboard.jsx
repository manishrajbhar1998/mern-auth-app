import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Dashboard = () => {

  const [loggedoInUser,setLoggedInUser] = useState('');

  const navigate = useNavigate();

  useEffect(()=>{
      setLoggedInUser(localStorage.getItem('loggedInUser'));
  },[])

  const handleLogout = () => {
      localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('logout successfully')
    setTimeout(()=>{
      navigate('/login');
    },1000)
  }

  return (
    <div>
      <p>{loggedoInUser}</p>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer />
    </div>
  )
}

export default Dashboard