import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {ToastContainer,toast} from "react-toastify"
import {Discuss} from 'react-loader-spinner'
import axios from 'axios'
import  '../assets/styles/Signup.css'
import { MdArrowBackIosNew } from "react-icons/md";
import Layout from '../components/Layout'
function LoginUser() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(false);
  const  [loading,setLoading]=useState(true);

  const navigate=useNavigate();


 async function handleLogin(e)
  {
    setLoading(false)
    e.preventDefault();
    setError(!error)
      try {
      if(email!==""  && password!==""){

        let response = await axios.post("http://localhost:8000/user/login", {
          email: email,
          password: password,
        });
  
        if (response.status===200) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
          toast.success("Login Successfully");
          setTimeout(()=>{
            navigate("/home");
          },2000)
         
        }
      }
      } catch (error) {
        toast.error(error.response.data.error);
      }
      finally{
        setLoading(true)
      }
    
    }
    
  return (
    <Layout>
    <div className='row container'>
        <div className='col-md-6 d-xs-none d-block'></div>
        <div className='col-md-6 d-flex justify-content-end'>

       {/* <div className="signup-container" style={{height:"103%"}}> */}
     
      <div className="signup-form-section d-flex justify-content-center">
        {/* <MdArrowBackIosNew onClick={()=>{signup()}} className='fs-1'/><br></br> */}
        <h2>Login to your account</h2>
        <p>Lorem ipsum dolor sit amet conseture adipising elit,sed do eiusmad tempar incididunt ut labore</p>

        <form>
          <div className="form-group">
            <input   type="email" name="email" className="form-control rounded-0 " placeholder="E-mail" required onChange={(e)=>{setEmail(e.target.value)}}/>&nbsp;
            {
             error&& !email?<label className='text-danger ' style={{position:"absolute"}}>Email is Required</label>
              :" "}
          </div>
          <div className="form-group">
            <input    name="password" type="password" className="form-control rounded-0" placeholder="Password" required onChange={(e)=>{setPassword(e.target.value)}}/>
            {
              
             error && !password?<label className='text-danger' style={{position:"absolute"}}>Password is Required</label>:" "
            }
          </div>
         
          <div className="form-group d-flex justify-content-end">
             <Link to="/forgot_Password" className='text-decoration-none'>Forgot Password</Link>
          </div>
          {loading?
          <button type="submit" className="btn btn-primary btn-block mt-0 rounded-0" onClick={handleLogin}>Sign in</button>
          : <Discuss
  visible={true}
  height="80"
  width="80"
  ariaLabel="discuss-loading"
  wrapperStyle={{}}
  wrapperClass="discuss-wrapper"
  color="#fff"
  backgroundColor="#F4442E"
  />
          }
        </form>
      </div>
    {/* </div> */}
    </div>
    <ToastContainer/>
    </div>
    </Layout>

  )
}

export default LoginUser
