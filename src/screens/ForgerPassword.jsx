import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import  '../assets/styles/Signup.css'
import {Discuss} from 'react-loader-spinner'
import axios from 'axios';
import { MdArrowBackIosNew } from "react-icons/md";
import Layout from '../components/Layout'

function ForgerPassword() {
  const [email,setEmail]=useState("");
  const [error,setError]=useState(false);
  const  [loading,setLoading]=useState(true);

  
 const navigate=useNavigate();

  async function handleOtp()
   {
    setError(true)
      try 
      {
        if(email!=="")
        {
         let response=await axios.patch("http://localhost:8000/user/sendOtp",{
          email:email
         })
         if(response.status===200)
         {
          setLoading(false)
            toast.success("OTP send successfully")
            setTimeout(()=>{
              setError(true)
                navigate("/Verify_Otp",{state:{
                  email:email
                }})
            },3000)
         }
        }
      } 
      catch (error) 
      {
         toast.error(error.response.data.error)
      }
   }

  function verifyOtp()
  {
     navigate("/Verify_Otp")
  }
  return (
    <div>
       <Layout>
       <div className='row container'>
       <div className='col-md-6 d-xs-none d-block'></div>
        <div className='col-md-6 d-flex justify-content-end' >
       {/* <div className="signup-container" style={{height:"107%"}}> */}
      <div className="signup-form-section d-flex justify-content-center">
      <MdArrowBackIosNew onClick={()=>{verifyOtp()}} className='fs-1 p-1'/><br></br><br/>
       <div>
        <h2>Forgot Password</h2>
        <p>Lorem ipsum dolor sit amet conseture adipising elit,sed do eiusmad tempar incididunt ut labore</p>

        <form>
          <div className="form-group">
            {/* <label for="email">Email</label> */}
            <input  type="email" name="email" className="form-control rounded-0" placeholder="Enter your email" required onChange={(e)=>setEmail(e.target.value)}/>
            {error && !email?<lable className="text-danger position-absolute">Email is Required</lable>:" "}

          </div>
         {loading?
          <button type="button" className="btn btn-primary rounded-0" onClick={handleOtp}>Send OTP</button>
          :
          <Discuss
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
      </div>
    </div>
    </div>
    <ToastContainer/>
      {/* </div> */}
    </Layout>
   
    </div>
  )
}

export default ForgerPassword
