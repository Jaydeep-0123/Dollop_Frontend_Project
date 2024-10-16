import React, { Fragment, useState } from "react";
import  '../assets/styles/Signup.css'
import {Link, useLocation} from 'react-router-dom'
import axios from "axios";
import {Discuss} from 'react-loader-spinner'
import { MdArrowBackIosNew } from "react-icons/md";
import {toast, ToastContainer} from 'react-toastify'
import Layout from '../components/Layout'
function NewPassword()
{
  const [password,setPassword]=useState("");
  const [confirmPassword,setconfPassword]=useState("");
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(true)
  const location=useLocation();
    const {email}=location.state||{}
    
   async function handleNewPassword()
    {
      setError(true)
       try 
       {
        if(password!==" " && confirmPassword!=="")
        {
          let response=await axios.patch("http://localhost:8000/user//newPassword",{
            email:email,
            password:password,
            confirmPassword:confirmPassword,
          })
          if(response.status===200)
          {
            setLoading(false)
             toast.success("Password Updated Successfully")
             setTimeout(()=>{
              window.location.href="/"
            },3000)
          }
        } 
      }
      catch (error) {
        toast.error(error.response.data.error)
      }
      finally{
         setLoading(true)

       }
    }
    return(
        <Fragment>
        <Layout>
        <div className='row container'>
        <div className='col-md-6 d-xs-none d-block'></div>
        <div className='col-md-6 d-flex justify-content-end'>

       {/* <div className="signup-container" style={{height:"103%"}}> */}
     
      <div className="signup-form-section d-flex justify-content-center">
        <MdArrowBackIosNew className='fs-1 p-1'/><br></br><br/>
        <h2>New Password</h2>
        <p>Lorem ipsum dolor sit amet conseture adipising elit,sed do eiusmad tempar incididunt ut labore</p>
        <form>
          <div className="form-group">
            {/* <label for="email">New Password</label> */}
            <input type="password" name="password" className="form-control rounded-0" placeholder="New Password" required onChange={(e)=>setPassword(e.target.value)}/>&nbsp;
            {error&&!password?<label className="text-danger position-absolute">Password is required</label>:""}
          </div>
          <div className="form-group">
            {/* <label for="password">Confirm password</label> */}
            <input name="password" type="password" className="form-control rounded-0" placeholder="Confirm password" required onChange={(e)=>setconfPassword(e.target.value)}/>&nbsp;
            {error&&!confirmPassword?<label className="text-danger position-absolute">Password is required</label>:""}
          </div>
        {loading?
          <button type="button" className="btn btn-primary btn-block mt-0 rounded-0" onClick={handleNewPassword}>Set Password</button>
         : <Discuss
  visible={true}
  height="80"
  width="80"
  ariaLabel="discuss-loading"
  wrapperStyle={{}}
  wrapperClass="discuss-wrapper"
  color="#fff"
  backgroundColor="#F4442E"
  position="absolute"
  />
        }
        </form>
      </div>
    </div>
    </div>
    <ToastContainer/>
    

        </Layout>

        </Fragment>
    )
}

export default NewPassword