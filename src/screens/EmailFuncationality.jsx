import React, { useEffect, useState } from 'react'
import MainLayout from '../components/MainLayout'
import { ToastContainer,toast } from 'react-toastify'
import logo from '../assets/image/download.jpg'
import axios from 'axios';
import {Link} from "react-router-dom"
import { CiStar } from "react-icons/ci";
import { IoArrowRedoOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { MdCloseFullscreen } from "react-icons/md";
import { FaRegWindowMinimize } from "react-icons/fa";
import '../assets/styles/EmailFuncationality.css'
import {IoIosArrowDown} from 'react-icons/io'

function EmailFuncationality() {
    const [data,setData]=useState([])
    const [addBtn, setAddBtne] = useState(false);
   const[userInfo,setUserInfo] = useState({})
    const auth = JSON.parse(localStorage.getItem("user"));

    const addShowModel = () => {
      setAddBtne(true);
    };
  
    const handleClose = () => {
      setAddBtne(false);
    };

   async function getAllData()
    {
        try {
            const response = await axios.get("http://localhost:8000/user/getUser", 
              {
              headers: {
                authorization: `bearer ${auth.token}`,
              },
            });
      
            if (response.status === 200) {
              setData(response.data.data);
              setUserInfo(response.data.data[0])
            }
          } catch (error) {
            toast.error(error.response?.data?.error || "An error occured");
          }
    }

    useEffect(()=>{
        getAllData()        
    },[])
  return (
    <div>
    <MainLayout >
      <div className="mt-2 p-3">
        <div className="row user-email " style={{ marginRight: "0px" }}>
          <div className="col-md-4 col-sm-4   col-lg-4">
            <div className="d-flex justify-content-around align-items-center p-3 ">
              <img
                src={logo}
                height={40}
                width={40}
                alt="User"
                className=" me-2"
              />
              <div className="d-flex justify-content-center align-items-center " style={{ color: "#07284B" }}>
                <h5>Inbox</h5>{" "}
                <IoIosArrowDown
                  className="dropdown-toggle "
                  style={{ cursor: "pointer" }}
                  data-bs-toggle="dropdown"
                />
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button class="dropdown-item" type="button">
                    New Email
                  </button>
                  <button class="dropdown-item" type="button">
                    Spam
                  </button>
                  <button class="dropdown-item" type="button">
                    Delete
                  </button>
                </div>
              </div>

              <button
                className="btn border-0 text-truncate"
                style={{ backgroundColor: "#21b7b5" }}
                onClick={addShowModel}
              >
                Compose
              </button>
            </div>
            <div className="p-1">
              <input
                type="text"
                className="form-control mb-3 input-color"
                placeholder="Search"
                // onChange={(e) => searchUser(e)}
              />
              <div className="email-list ">
                {data.map((info, index) => (
                   <Link onClick={()=>setUserInfo(info)} className="text-decoration-none ">
                   <div key={index}
                    className="d-flex justify-content-between align-items-center email-contain p-2 border mb-2">
                    <div className="d-flex">
                      <img
                        src={info.image}
                        height={40}
                        width={45}
                        alt="User"
                        className=" me-2"
                      />
                      <div>
                        <div className="d-flex justify-content-between ">
                          <h6 className="mb-1 ">
                            {info.name.charAt(0).toUpperCase() +
                              info.name.slice(1)}
                          </h6>
                          <span className="text-muted ">
                            {info.createdAt.toString().slice(11, 19)}
                          </span>
                        </div>

                        <p className="mb-0 text-muted">
                          Short email description goes here Lorem ipsum dolor
                          sit amet consectetur
                        </p>
                      </div>
                    </div>
                    <div className="mt-5">
                      <CiStar className="fs-4" />
                    </div>
                  </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-8 col-sm-8 col-lg-8">
            {/* {/ <div className="email-list"> /} */}
            <div className="d-flex justify-content-between align-items-center  p-2 border mb-2">
              <div className="d-flex">
                <img
                  src={userInfo.image}
                  height={40}
                  width={45}
                  alt="User"
                  className=" me-2 "
                />
                 {userInfo.status === true ? (
                          <ul>
                             <li className="text-success"></li>
                          </ul>
                        ) : (
                          <ul>
                            <li className="text-danger"></li>
                          </ul>
                        )}

                <div>
                  <div className="d-flex justify-content-between ">
                    <h6 className="mb-1">{userInfo.name}</h6>
                    <span className="text-muted ">{userInfo.createdAt ? userInfo.createdAt.toString().slice(11, 19) : ''}
                  </span>
                  </div>
                  <p>{userInfo.email}</p>
                  <hr />
                  Dear , <br />I hope this email finds you well. I apply for
                    Mern stack developer position at your company .I am truly
                    excited about the prospect of contributing my skills and
                    expertise to your esteemed team. Please feel free to reach
                    out if you need any additional information from me. I
                    would welcome the opportunity to discuss further how my
                    qualifications and experiences align perfectly with the
                    requirements of this role and Company's values. Thank you
                    again for your consideration. I eagerly look forward to
                    the chance to join your accomplished organisation.{" "}
                    <p className="text-black">
                     {" "}
                      Best regards, <br /> Sohel khan
                    </p>

                  <hr />
                  {/* {/ Attechement Section/ /} */}
                  <div className="attachments">
                    <h5>2 Attachments</h5>
                    <div className="attachment-list">
                        <input type="file" />
                    </div>
                  </div>
                  <hr />
                  <div className="reply-section">
                    <div className="reply-header">
                      <p>
                        <span className="fs-4"><IoArrowRedoOutline /> </span> Jaydeep Panwar (jaydep@gmail.com)
                      </p>
                    </div>
                    <textarea className="reply-textarea"  style={{height:"25vh"}} placeholder="Write your reply here" ></textarea>
                      <div className="d-flex justify-content-between">
                       <MdDeleteOutline 
                            style={{
                              backgroundColor: "#efd7da",
                              color: "#e82e44",
                              borderRadius: "3px",
                              padding: "3px",
                              cursor: "pointer",
                              fontSize:"28px"
                            }}
                            
                          />
                        <button className="send-btn">Send</button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       {/* </div>  */}
      <div className="container ">
        {addBtn && (
          <div
            className="modal show  "
            style={{ display: "block", backdropFilter: "contrast(0.3)" }}
            id="exampleModalToggle"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel"
          >
            <div className="modal-dialog  position-absolute bottom-0 end-0 pe-4  "  style={{width:"100%"}} >
              <div className="modal-content">
                <div className="modal-header">
                <Link
                    className="text-decoration-none"
                    style={{ color: "#000",fontWeight:"800" }}>
                    {" "}
                    <h5 className="modal-title">New Message</h5>
                  </Link>
                  <hr />
                  <div className="d-flex gap-3" style={{cursor:"pointer"}}>
                  <FaRegWindowMinimize  style={{ color: "black", fontSize: "23px" }} />

                  <MdCloseFullscreen  style={{ color: "black", fontSize: "23px" }}/>

                  <RxCross1
                    style={{ color: "black", fontSize: "25px" }}
                    onClick={handleClose}
                    />
                    </div>
                </div>
                <div className="modal-body ">
                  <form>
                
                  <div className=" d-flex  ">
                         <label htmlFor="" className="label-name text-muted ">To : </label> 
                         <input type="text" className="form-control w-75  border-0" />
                    </div>
                    <hr className="m-0" />
                    <div className=" d-flex  ">
                         <label htmlFor="" className="label-name text-muted ">Subject : </label> 
                         <input type="text" className="form-control w-75  border-0" />
                    </div>
                    <hr className="m-0" />
                    <div className=" d-flex  ">
                         <label htmlFor="" className="label-name text-muted ">Cc : </label> 
                         <input type="text" className="form-control w-75  border-0" />
                    </div>
                    <hr className="m-0" />
                    <div className=" d-flex  ">
                         <label htmlFor="" className="label-name text-muted ">Bcc : </label> 
                         <input type="text" className="form-control w-75  border-0" />
                    </div>
                    <hr className="m-0" />
                    <textarea className="form-control border-0" style={{height:"25vh"}} id="message-text" defaultValue={""} />         
                  </form>
                </div>

                <div className="modal-footer">
                 
                    <button
                      type="submit"
                      className="btn "
                      style={{ backgroundColor: "#21b7b5",color:"#fff" }}
                    
                    >
                      {" "}
                      Send {" "}
                    </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  </div>
  )
}

export default EmailFuncationality
