import React, { useState } from 'react'
import '../assets/styles/Signup.css'
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify"
import Layout from '../components/Layout'
import { MdArrowBackIosNew } from "react-icons/md";
import { Link,useNavigate} from 'react-router-dom'

function Signup() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirm_Password,setconfPassword]=useState("");
  const [address,setAddress]=useState("")
  const [error,setError]=useState(false)
   const navigate=useNavigate();
  function login()
  {
     navigate("/login")
  }

 async function handleSignup()
  {
    setError(!error)
    try 
    {

      let response=await  axios.post("http://localhost:8000/user/register",{
       name:name,
       email:email,
       password:password,
       address:address,
       conf_Password:confirm_Password
      }) 
      if(response.status===200)
      {
         toast.success("Registerd Successfully")
         setTimeout(()=>{
           navigate("/login")
         },3000)
      }
      
    } 
    catch (error) 
    {
      toast.error(error.response.data.error)
    }
     
        
  }
  return (
    <Layout>
    <div className='row container'>
    <div className='col-md-6 d-xs-none d-block'></div>
    <div className='col-md-6 d-flex justify-content-end'>
    {/* <div className="signup-container" style={{marginTop:"-4%",height:"80%"}}> */}
     
      <div className="signup-form-section d-flex justify-content-center"> 
      <MdArrowBackIosNew  onClick={(()=>{login()})} className='fs-1 p-1'/><br></br>
        <h2>Sign Up</h2><hr/>
          <div className="form-group">
            {/* <label for="name">Name:</label> */}
            <input type="text" name="name" className="form-control rounded-0" placeholder="Enter your name" required onChange={(e)=>{setName(e.target.value)}}/>
            {error && !name?<lable className="text-danger">Name is Required</lable>:" "}
          </div>
          <div className="form-group">
            {/* <label for="email">Email</label> */}
            <input type="email" name="email" className="form-control rounded-0" placeholder="Enter your email" required onChange={(e)=>setEmail(e.target.value)}/>
            {error && !email?<lable className="text-danger">Email is Required</lable>:" "}

          </div>
          <div className="form-group">
            {/* <label for="password">Password</label> */}
            <input name="password" type="password" className="form-control rounded-0" placeholder="Enter your password" required onChange={(e)=>setPassword(e.target.value)}/>
            {error && !password?<lable className="text-danger">Password is Required</lable>:" "}

          </div>
          <div className="form-group">
            {/* <label>Confirm Password</label> */}
            <input type="password" className="form-control rounded-0" placeholder="Confirm your password" onChange={(e)=>{setconfPassword(e.target.value)}}/>
            {error && !confirm_Password?<lable className="text-danger">conf_Password is Required</lable>:" "}

          </div>
          <div className="form-group">
            {/* <label for="address">Address</label> */}
            <input name='address' type="text" className="form-control rounded-0" placeholder="Enter your address" onChange={(e)=>setAddress(e.target.value)} required/>
            {error && !address?<lable className="text-danger">Address is Required</lable>:" "}

          </div>
          {/* <Link to="/login"> */}
          <button type="button" className="btn btn-primary btn-block rounded-0" onClick={()=>{handleSignup()}}>Sign Up</button>
      </div>
    </div>
    </div>
    <ToastContainer/>
    {/* </div> */}
    </Layout>

  )
}

export default Signup
