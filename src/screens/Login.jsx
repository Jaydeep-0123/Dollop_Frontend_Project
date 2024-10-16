import React, { Fragment, useState } from "react";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import style from "../assets/styles/Login.module.css";
function Login() {
  const [email, setEmail] = useState("");
  const [sendEmail,setSendEmail]=useState("");
  const [password, setPassword] = useState("");
  const [change, setChange] = useState(false);
  const navigate=useNavigate();

  async function handleLogin() {
    try {
      let response = await axios.post("http://localhost:8000/user/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        toast.success("Login Successfully");

      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

 async function sendOtp()
  {
    try 
    {
      let response=await axios.patch("http://localhost:8000/user/sendOtp",{
        email:sendEmail
    });
    if(response.status===200)
    {
       toast.success("Otp send sucessfully")
       setSendEmail(" ");
       setTimeout(()=>{
         navigate('/Authenticate')
       },4000)

    } 
    } 
    catch (error) {      
      toast.error(error.response.data.msg)
    }
     
  }
  return (
    <Fragment>
      <div>
        <div className="row">
          <div className="col-sm-4 mt-4 my-5">
            <img
              className="m-4"
              src="http://learnachieve.dollopinfotech.com/static/media/studentpanel.100c1d37b5262c1a619c.png"
              alt="logo"
            ></img>
          </div>
          {!change ? (
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
                for="email"
              >
                Email Id:
              </label>
              <br />
              <input
                type="email"
                className="form-control"
                id={style.input}
                name="email"
                placeholder="Enter your email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                type="password"
                className="form-control"
                id={style.input}
                name="email"
                placeholder="Enter your Password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div id={style.link} onClick={() => setChange(!change)}>
                Forgot password?
              </div>
              <button id={style.btn} className="btn" onClick={handleLogin}>
                Login
              </button>
              <div id={style.account}>
                Don't have an account?
                <Link to="/signup" id={style.register}>Register</Link>
              </div>
            </div>
          ) : (
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
              <h3 className={style.module}>Forgot Your Password</h3>
              <p className={style.module}>
                Enter your email and we’ll send you a link to reset your
                password.
              </p>
              <label
                id={style.lable}
                style={{ marginRight: "23%" }}
                for="email"
              >
                Email Id:
              </label>
              <br />
              <input
                type="email"
                className="form-control"
                id={style.input}
                value={sendEmail}
                name="email"
                placeholder="Enter your email"
                required
                onChange={(e) => {
                  setSendEmail(e.target.value);
                }}
              />
              {/* <Link to="/Authenticate"> */}
              <button id={style.btn} className="btn" onClick={()=>{sendOtp()}}>
                Continue
              </button>
              {/* </Link> */}

              <p id={style.para} onClick={() => setChange(!change)}>
                {"<"}Back to login
              </p>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </Fragment>
  );
}
export default Login;
