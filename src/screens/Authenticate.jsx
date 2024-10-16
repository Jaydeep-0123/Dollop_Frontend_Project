import React, { useState } from 'react'
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'
import style from '../assets/styles/Login.module.css';
function Authenticate() {
    const [otp,setOtp]=useState("");
    const [password,setPassword]=useState("");

   async function submitOtp()
    {
        try 
        {
            let response=await axios.patch("http://localhost:8000/user/submitOtp",{
                otp:otp,
                password:password
               })
               if(response.status===200)
               {
                 toast.success("Password Update Successfully")
                 setTimeout(()=>{
                  window.location.href="/"
                 },3000)
               } 
        } 
        catch (error) {
            console.log(error);
            
            toast.error(error.response.data.msg)
        }
       
    }
  return (
    <div>
       <div className="row">
          <div className="col-sm-4 mt-4 my-5">
            <img
              className="m-4"
              src="http://learnachieve.dollopinfotech.com/static/media/studentpanel.100c1d37b5262c1a619c.png"
              alt="logo" ></img>
          </div>
          <div
              className="col-sm-7"
              style={{ marginLeft: "7%", marginTop: "8%" }}
            >
              <img
                style={{ height: "70px" }}
                className={style.module}
                src="	http://learnachieve.dollopinfotech.com/static/media/logo.c45a8dd1585c4ad5b18ae3af02cfebba.svg"
                alt="logo2"
              ></img>
              <h3 className={style.module}>Welcome Back!</h3>
              <p className={style.module}>
                Enter your Credentials to access your account
              </p>
              <label
                id={style.lable}
                style={{ marginRight: "23%" }}
                
              >
                OTP:
              </label>
              <br />
              <input
                type="email"
                className="form-control"
                id={style.input}
                placeholder="Enter your Otp"
                required
               onChange={(e)=>setOtp(e.target.value)}
              />
              <label
                id={style.lable}
                style={{ marginRight: "23%" }}
                for="email"
              >
               Password:
              </label>
              <br />
              <input
                type="email"
                className="form-control"
                id={style.input}
                name="email"
                placeholder="Change Password"
                required
                onChange={(e)=>setPassword(e.target.value)}
              />
             
              <button id={style.btn} className="btn"  onClick={()=>{submitOtp()}}>
                Submit
              </button>
            </div>
          </div>
          <ToastContainer></ToastContainer>
    </div>
  )
}

export default Authenticate
