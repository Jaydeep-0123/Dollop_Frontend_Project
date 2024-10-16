import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MainLayout from "../components/MainLayout";
import "../assets/styles/ShowUser.css";
import AddUserModal from "./AddUserModal";
import ViewModal from "./ViewModal";
function ShowUser() {
  const [viewmodal, setViewModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [updateImage,setupdateImage]=useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);
  const [totalPages,setTotalPages]=useState(1)
  const [userData,setUserData]=useState({});
  const [id, setId] = useState(null);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const pageData=Array.from({ length: totalPages }, (_, index) => index + 1)

  const viewshowModal = () => setViewModal(true);
  const viewcloseModal = () => setViewModal(false);

  const showModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const handleShow = (id) => {
    setShow(true);
    getUser(id);
    setId(id);
  };

 function handleView(id)
 {
  setShow(true);
  getUser(id);

 }


  const setuser=(user)=>
  {
    setUserData(user)
      viewshowModal();

  }
  const handleClose = () => {
    setShow(false);
  };
  function handleCancle() {
    setShow(false);
  }

  
  




  const auth = JSON.parse(localStorage.getItem("user"));

  const handleUpdateUser = async () => {
    try {
      setError(!error);
      if (name !== "" && email !== "" && contact !== "" && address !== "" && updateImage!=="") {
        const result1 = await axios.patch(
          `http://localhost:8000/user/updateUser/${id}`,
          {
            name: name,
            email: email,
            address: address,
            contact: contact,
            image:updateImage
          }
        );
        if (result1.status === 200) {
          toast.success("User Updated Successfully");
          setShow(false);
        }
      }
    } catch (error) {
      toast.error("user not Updated");
    }
    getAllData();
  };

  const getUser = async (id) => {
    try {
      const result = await axios.get(
        `http://localhost:8000/user/getOneUser/${id}`
      );
      if (result.status === 200) {
        setName(result.data.data.name);
        setEmail(result.data.data.email);
        setContact(result.data.data.contact);
        setAddress(result.data.data.address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function getAllData() {
    try {
      const response = await axios.get("http://localhost:8000/user/getUser", 
        {
        headers: {
          authorization: `bearer ${auth.token}`,
        },
        params:{
        page:page,
        limit:limit,
        }
      });

      if (response.status === 200) {
        setData(response.data.data);
        setTotalPages(response.data.totalPages)
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occured");
    }
  }

  async function deleteUser(id) {
    try {
      if (window.confirm("Are you sure you want to delete this user")) {
        const response = await axios.delete(
          `http://localhost:8000/user/deleteUser/${id}`
        );
        if (response.status === 200) {
          toast.success("Deleted Successfully");
          viewcloseModal()
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      getAllData();
    }
  }

  async function searchUser(e) {
    try 
    {
      const key = e.target.value.trim();
      if (key) {
      let response1 = await axios.get(
        `http://localhost:8000/user/searchUser/${key}`
      );
      if (response1.status === 200) {
        setData(response1.data.data);
      }
    } else {
      getAllData();
    }
    } 
    catch (error) 
    {
      console.log(error.response1.data.error);
      
    }
    
  }

  async function updateStatus(id, status) {
    try {
      let updateResult = await axios.patch(
        `http://localhost:8000/user/updateStatus/${id}`,
        {
          status: !status,
        }
      );
      if (updateResult.status === 200) {
        toast.success("Status Updated Successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }

    getAllData();
  }

 async function handleUpdateImage(e)
  {
    const formData=new FormData();
    formData.append('image',e.target.files[0]);
       let result= await fetch('http://localhost:8000/user//upload/image',{
          method:'post',
          body:formData,
          dataType:"jsonp"
       })
       result=await result.json();
       
    setupdateImage(result.data)
  }


  // async function handleView(id)
  // {

  //   const result=await axios.get(`http://localhost:8000/user/getOneUser/${id}`)

  //   if(result.status===200)
  //   {

  //   const doc = new jsPDF();

  //   // PDF content ko yahan likhen
  //   doc.text("User Data PDF", 10, 10);

  //   doc.text(`Name: ${result.data.data.name}`, 10, 20);
  //   doc.text(`Email: ${result.data.data.email}`, 10, 30);
  //   doc.text(`Phone: ${result.data.data.contact}`, 10, 40);
  //   doc.text(`Address: ${result.data.data.address}`, 10, 50);

  //   // PDF ko naye tab me open karna
  //   const pdfData = doc.output('blob');
  //   const pdfURL = URL.createObjectURL(pdfData);
  //   window.open(pdfURL, "_blank");
  // }
  // }

  useEffect(() => {
   
    
    if (!auth) {
      navigate("/");
    } else {
      navigate("/showUser");
      getAllData();
    }
  }, [page,limit]);
  return (
    <div>
      <MainLayout>
        {/* <Button variant="primary" >
        Launch demo modal
      </Button> */}

        <>
          <div id="contain">
            <div className="d-flex justify-content-between  mb-3 w-100 gap-3">
              <h2>User Data</h2>
              
              <div  className="">
                <input
                  id="input1"
                  type="search"
                  className="form-control w-100 mt-5"
                  onChange={(e) => {
                    searchUser(e);
                  }}
                  placeholder="Search User"
                />
              </div>
              <button id="btn" className="btn btn-primary text-truncate" onClick={showModal}>
                + Add Agency
              </button>
              <AddUserModal
                showData={getAllData}
                show={showModal}
                hide={closeModal}
                state={modal}
              ></AddUserModal>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped align-middle">
                <thead className="table-success">
                  <tr className="text-center">
                    <th>User Logo</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {data.length!==0?
                  data.map((user, index) => ( 
                    <tr key={index} className="text-center">
                     <th><img width={45} src={user.image} alt="logo"></img></th>
                      <th>{user.name}</th>
                      <td>{user.email}</td>
                      <td>{user.contact}</td>
                      <td>{user.address}</td>
                      <td>
                        <div className="form-check form-switch d-flex justify-content-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onClick={() => {
                              updateStatus(user._id, user.status);
                            }}
                            checked={user.status}
                          />
                        </div>
                      </td>
                      <td id="table-Button" className="overflow">
                      <div className="d-flex justify-content-center">
                        <button type="button"
                          className="btn btn-success btn-sm m-1"
                          onClick={() => {
                            setuser(user)
                          }}
                          data-toggle="tooltip" data-placement="left" title="view"

                        >
                          <i className="bi bi-eye fill"></i>
                        </button>
                        {/* <ViewModal
                        viewshow={viewmodal}
                        viewhide={viewcloseModal}
                      /> */}
                        <button type="button"
                          className="btn btn-success btn-sm me-2 m-1"
                          data-toggle="tooltip" data-placement="right" title="Edit"
                          onClick={() => {
                            handleShow(user._id);
                          }}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button type="button"
                          className="btn btn-danger btn-sm"
                          data-toggle="tooltip" data-placement="right" title="Delete"

                          onClick={() => {
                            deleteUser(user._id);
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                        </div>
                      </td>
                    </tr>
                  ))
                  :<div className="text-center">User Not Found</div>
                }
                </tbody>
              </table>
            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center mt-4">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous" >
                    <span className={`${page===0?'disabled':''}`} onClick={()=>setPage(page!==0?page-1:1)} aria-hidden="true">&laquo; Previous</span>
                  </a>
                </li>
               {pageData.map((val)=>{

                 return <li className="page-item">
                  <a className="page-link" href="#" onClick={()=>{setPage(val)}}>
                    {val}
                  </a>
                </li>
              })
               }
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span className={`${page===totalPages?'disabled':''}`} onClick={()=>setPage(page!==totalPages?page+1:totalPages)}aria-hidden="true" >Next &raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
         
            <ToastContainer /> 
          </div>
          <Modal
            className="modal-lg modal-dialog-centered"
            backdrop="static" keyboard={false}
            style={{ marginLeft: "10%" }}
            show={show}
            onHide={handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                <div className="row mb-3 align-items-center">
                  <div className="col-md-3">
                    <label htmlFor="agencyName" className="form-label fw-bold">
                      Name
                    </label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      value={name}
                      className="form-control m-2"
                      placeholder="Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    {error && !name ? (
                      <lable
                        className="text-danger  mx-2"
                        style={{ position: "absolute" }}
                      >
                        Fleid can not be empty
                      </lable>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="row mb-3 align-items-center">
                  <div className="col-md-3">
                    <label htmlFor="agencyImage" className="form-label fw-bold">
                      Image
                    </label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="file"
                      
                      className="form-control m-2"
                      placeholder="Image"
                      onChange={
                        handleUpdateImage
                      }
                    />
                    {error && !updateImage ? (
                      <lable
                        className="text-danger  mx-2"
                        style={{ position: "absolute" }}
                      >
                        Fleid can not be empty
                      </lable>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="row mb-3 align-items-center">
                  <div className="col-md-3">
                    <label htmlFor="email" className="form-label fw-bold">
                      Email
                    </label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="email"
                      value={email}
                      className="form-control m-2"
                      placeholder="E-mail"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    {!email && error ? (
                      <lable
                        className="text-danger mx-2"
                        style={{ position: "absolute" }}
                      >
                        Fleid can not be empty
                      </lable>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="row mb-3 align-items-center">
                  <div className="col-md-3">
                    <label htmlFor="contactNo" className="form-label fw-bold">
                      Contact
                    </label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="contact"
                      value={contact}
                      className="form-control m-2"
                      placeholder="Contact"
                      onChange={(e) => {
                        setContact(e.target.value);
                      }}
                    />
                    {!contact && error ? (
                      <lable
                        className="text-danger  mx-2"
                        style={{ position: "absolute" }}
                      >
                        Fleid can not be empty
                      </lable>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="row mb-3 align-items-center">
                  <div className="col-md-3">
                    <label htmlFor="address" className="form-label fw-bold">
                      Address
                    </label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      value={address}
                      className="form-control m-2"
                      placeholder="Address"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                    {!address && error ? (
                      <lable className="text-danger  mx-2">
                        Fleid can not be empty
                      </lable>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {/* <div className="row mb-3 align-items-center">
                <div className="col-md-3">
                    <label htmlFor="note" className="form-label">Note (Optional)</label>
                </div>
                <div className="col-md-9">
                    <input type="text" className="form-control" id="note" placeholder="Note"/>
                </div>
            </div> */}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button id="cancelBtn" variant="secondary" onClick={handleCancle}>
                Cancel
              </Button>
              <Button id="doneBtn" variant="primary" onClick={handleUpdateUser}>
                Done
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
  className="modal-lg modal-dialog-centered"
  backdrop="static"
  style={{ marginLeft: "10%" }}
  centered
  show={viewmodal}
>
  <Modal.Header  onHide={viewcloseModal}>
    <div className="d-flex justify-content-between w-100">
      <div className="d-flex align-items-center">
        <img
          width={78} height={80}
          src={userData.image}
          alt="Profile"
        />
        <div className="ms-2 d-flex" >
          <h5>{userData.name}</h5>
          {userData.status===true?
          <ul>
          <li  className="text-success">Active</li>
          </ul>
          :
          <ul>
          <li className="text-danger">D-Active</li>
          </ul>
          }
          {/* <p>Team Member</p> */}
        </div>
      </div>
      <div>
        <button className="btn btn-success btn-sm m-1" onClick={()=>{viewcloseModal()}}>
          <i className="bi bi-eye" ></i>
        </button>   
        <button className="btn btn-success btn-sm m-1" onClick={()=>handleView(userData._id)}>
          <i className="bi bi-pencil"></i>
        </button>
        <button className="btn btn-danger btn-sm m-1" onClick={()=>{deleteUser(userData._id)}}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  </Modal.Header>
  <Modal.Body>
    <div className="row">
      <div className="col-6">
        <p>Email :  <strong>{userData.email}</strong></p>
        <p>Password:  <strong>123@gmail.com</strong></p>
      </div>
      <div className="col-6">
        <p>Contact: <strong>{userData.contact}</strong></p>
        <p>
           Last login date: <strong>
             {new Date(userData.updatedAt).toLocaleDateString('en-GB')}
              </strong>
</p>      </div>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={viewcloseModal}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

        </>
      </MainLayout>
    </div>
  );
}

export default ShowUser;
