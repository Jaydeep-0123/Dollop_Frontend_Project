import React, { useState } from 'react'
import '../assets/styles/Signup.css'
import  {Link, useLocation, useNavigate}  from "react-router-dom"
import OtpInput from 'react-otp-input';
import Layout from '../components/Layout'
import {Discuss} from 'react-loader-spinner'
import {toast, ToastContainer} from 'react-toastify'
import { MdArrowBackIosNew } from "react-icons/md";
import axios from 'axios';
function Otp() {
    const [otp,setOtp]=useState("");
    const [error,setError]=useState(false)
    const [loading,setLoading]=useState(true)
    
    const navigate=useNavigate();
    const location=useLocation();
    const {email}=location.state||{}
    
    async function handleVerify()
    {
      setError(true)
      try 
      {  
        if(otp!=="")
        {
          let response=await axios.post("http://localhost:8000/user/submitOtp",{
            otp:otp,
            email:email
          })

          if(response.status===200)
          {
            setLoading(false)
              toast.success("OTP verify successfully");
              setTimeout(()=>{
                  navigate("/new_Password",{state:{
                    email
                  }})
                  setLoading(true)
              },2000)

          }
      }
    }
      catch (error) 
      {
        console.log(error);
        
        toast.error(error.response.data.msg)
      }
    }

    function forgot()
    {
      navigate("/forgot_Password")
    }
  return (
    <div>
       <div>
       <Layout>
       <div className='row container'>
       <div className='col-md-6 d-xs-none d-block'></div>
        <div className='col-md-6 d-flex justify-content-end'>

       {/* <div className="signup-container" style={{height:"103%"}}> */}
     
      <div className="signup-form-section d-flex justify-content-center">
      <MdArrowBackIosNew onClick={()=>{forgot()}} className='fs-1 p-1'/><br></br><br/>
        <h2>Verify OTP</h2>
        <p>Enter the verification code send on<span><br/>{email}   </span>
        <Link to="/forgot_Password" className='text-decoration-none'>
        Edit here
        </Link>
        </p>
        <form>
          
          <div className="form-group mx-1">
          <OtpInput 
         value={otp}
       inputStyle={{width:"3rem",height:"3rem",margin:"1%"}}
      onChange={setOtp}   
      numInputs={4}
      className="form-control"
      // renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
    {error && !otp?<lable className="text-danger position-absolute">OTP is Required</lable>:" "}

          </div>
          {loading?
          <button type="button" className="btn btn-primary btn-block rounded-0" onClick={handleVerify}>Verify</button>
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
       
    </Layout>

    </div>
    <ToastContainer/>
    </div>
  )
}

export default Otp
