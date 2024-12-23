import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

const Login = () => {

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const handleChange = (e) => {

    const { name, value } = e.target;
    setLoginInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {email, password } = loginInfo;
    if (!email || !password) {
      return handleError("All fields are required")
    }

    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      })

      const result = await response.json();
      const { success, message,jwtToken,name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser',name)
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err)
    }
  }


  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Email</label>
          <input type='email' name='email' value={loginInfo.email} onChange={handleChange} autoFocus placeholder='Enter your email...' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' value={loginInfo.password} onChange={handleChange} autoFocus placeholder='Enter your password...' />
        </div>
        <div>
          <button type='submit'>Login</button>
          <span>Don't have an account ?
            <Link to="/singup">Singup</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  )

}
export default Login;