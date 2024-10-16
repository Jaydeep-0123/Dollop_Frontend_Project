import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from '../assets/styles/AddUser.module.css'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
function AddUserModal({show,hide,state,showData}) {

  const [error,setError]=useState(false);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [image,setImage]=useState("");
  const [password,setPassword]=useState("");
  const [confPassword,setconfPassword]=useState("");
  const [contact,setContact]=useState("");
  const [address,setAddress]=useState("");


 async function AddUser()
  {
    setError(!error)
    try 
    {
      if(name!=="" && email!=="" &&  password!=="" && confPassword!=="" && contact!=="" && address!=="" && image!=="")
        { 
        
        let response=await axios.post("http://localhost:8000/user/register",{
          name:name,
          email:email,
          password:password,
          address:address,
          contact:contact,
          image:image,
          conf_Password:confPassword,
          isVerified:true
          
        })
        if(response.status===200)
        {
          toast.success("User Added Successfully");
          hide();
        }
      }
      
    } 
    catch (error) 
    {
       toast.error(error.response.data.error)
       
    }
    showData();
  
  }

 async function updateImage(e)
  {
    const formData=new FormData();
    formData.append('image',e.target.files[0]);
       let result= await fetch('http://localhost:8000/user//upload/image',{
          method:'post',
          body:formData,
          dataType:"jsonp"
       })
       result=await result.json();
    setImage(result.data)
   
  }
  return (
    <>
   
      <Modal className='modal-lg modal-dialog-centered'  backdrop="static" keyboard={false} style={{marginLeft:"10%"}} show={state} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>ADD USER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container">
            <div className="row mb-3 align-items-center">
                <div className="col-md-3">
                    <label htmlFor="agencyName" for='name' className="form-label fw-bold">Name</label>
                </div>
                <div className="col-md-9">
                    <input type="text" name='name'  className="form-control m-2"  placeholder="Name" onChange={(e)=>{setName(e.target.value)}}/>
                    {error && !name?<lable  className='text-danger  mx-2' style={{position:"absolute"}}>Fleid can not be empty</lable>:""}
                </div>
            </div>
            <div className="row mb-3 align-items-center">
                <div className="col-md-3">
                    <label htmlFor="agencyName" for='Image' className="form-label fw-bold">Image</label>
                </div>
                <div className="col-md-9">
                    <input type="file" name='Image'  className="form-control m-2"  placeholder="Image" onChange={updateImage}/>
                    {error && !image?<lable  className='text-danger  mx-2' style={{position:"absolute"}}>Fleid can not be empty</lable>:""}
                </div>
            </div>
            <div className="row mb-3 align-items-center">
                <div className="col-md-3">
                    <label htmlFor="agencyName" for="password" className="form-label fw-bold">Password</label>
                </div>
                <div className="col-md-9">
                    <input type="text"  name='password' className="form-control m-2"  placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    {error && !password?<lable  className='text-danger  mx-2' style={{position:"absolute"}}>Fleid can not be empty</lable>:""}
                </div>
            </div>
            <div className="row mb-3 align-items-center">
                <div className="col-md-3">
                    <label htmlFor="agencyName" for="conf_password" className="form-label fw-bold">Conf_Password</label>
                </div>
                <div className="col-md-9">
                    <input type="password" name="conf_password"  className="form-control m-2"  placeholder="Conf_Password" onChange={(e)=>{setconfPassword(e.target.value)}}/>
                    {error && !confPassword?<lable  className='text-danger  mx-2' style={{position:"absolute"}}>Fleid can not be empty</lable>:""}
                </div>
            </div>
            <div className="row mb-3 align-items-center">
                <div className="col-md-3">
                    <label htmlFor="email" for="email" className="form-label fw-bold">Email</label>
                </div>
                <div className="col-md-9">
                    <input type="email" name="email"  className="form-control m-2"  placeholder="E-mail" onChange={(e)=>{setEmail(e.target.value)}}/>
                    {!email && error?<lable  className='text-danger mx-2' style={{position:"absolute"}}>Fleid can not be empty</lable>:""}

                </div>
                
            </div>
            <div className="row mb-3 align-items-center">
                <div className="col-md-3">
                    <label htmlFor="contactNo" for="contact" className="form-label fw-bold">Contact</label>
                </div>
                <div className="col-md-9">
                    <input type="contact" name="contact"  className="form-control m-2"  placeholder="Contact" onChange={(e)=>{setContact(e.target.value)}}/>
                    {!contact&&error?<lable  className='text-danger  mx-2' style={{position:"absolute"}}>Fleid can not be empty</lable>:""}

                </div>
            </div>
            <div className="row mb-3 align-items-center">
                <div className="col-md-3">
                    <label htmlFor="address" for="address" className="form-label fw-bold">Address</label>
                </div>
                <div className="col-md-9">
                    <input type="text"  name="address" className="form-control m-2"  placeholder="Address" onChange={(e)=>{setAddress(e.target.value)}}/>
                    {!address&&error?<lable  className='text-danger  mx-2' >Fleid can not be empty</lable>:""}

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
    <Button className={style.cancelBtn} variant="secondary" onClick={hide}>
            Close
          </Button>
          <Button className={style.doneBtn} variant="primary" onClick={AddUser}>
            Add user
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddUserModal;