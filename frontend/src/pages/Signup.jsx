import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

const Signup = () => {

    const [signupInfo,setSignupInfo] = useState({
        name:"",
        email:"",
        password:""
    })

    const navigate = useNavigate();

    const handleChange = (e) => {

        const {name,value} = e.target;
        setSignupInfo(prev => ({...prev,[name]:value}))
    }

    const handleSubmit = async (e) => {
        console.log(signupInfo)
        e.preventDefault();
        const {name,email,password} = signupInfo;
        if(!name || !email || !password){
            return handleError("All fields are required")
        }

        try{
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(signupInfo)
            })

            const result = await response.json();
            const {success,message,error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate("/login");
                },1000);
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }
        }catch(err){
            handleError(err)
        }
    }


    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' value={signupInfo.name} onChange={handleChange} autoFocus placeholder='Enter your name...' />
                </div>
                <div>
                    <label htmlFor='name'>Email</label>
                    <input type='email' name='email' value={signupInfo.email} onChange={handleChange} autoFocus placeholder='Enter your email...' />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={signupInfo.password} onChange={handleChange} autoFocus placeholder='Enter your password...' />
                </div>
                <div>
                    <button type='submit'>Signup</button>
                    <span>Already have an account ? 
                        <Link to="/login">Login</Link>
                    </span>
                </div>
            </form>
            <ToastContainer/>
        </div>
    )

}
export default Signup;