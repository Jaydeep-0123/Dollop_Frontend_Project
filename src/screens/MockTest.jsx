import React, { useEffect, useState } from 'react'
import MainLayout from '../components/MainLayout'
import '../assets/styles/MockTest.css'
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'
import {IoMdArrowDropright} from 'react-icons/io'
import {IoBulbSharp} from 'react-icons/io5'
import { Link } from 'react-router-dom'
import stopWatch from '../assets/image/stopwatch.jpg'
export default function MockTest() {
  const url=process.env.REACT_APP_BASE_URL;
  
  const [data,setData]=useState([]);
  const [subject,setSubject]=useState({})
  const [subjectId,setSubjectId]=useState(null);
  const [active,setActive]=useState();


  console.log(data);
  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjcwMDExZWYzZjM4MmE4OTg2MmU0OGI0IiwiaWF0IjoxNzI5MDgwODg2LCJleHAiOjE3MjkxNjcyODZ9.iu0qT6knP42s8fAPt4AObPKe2NFnwk3olBUPNaQNhd4";
  
    
    const getMockData=async()=>
    {
        try 
        {
            const response = await axios.get(`http://13.235.121.38:5001/mockTest/viewresult`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                },
                params:{
                    mockTest_id: "67000a073f382a89862e47cb",
                   mockTestSubmissions_id: "670d11801c7b3db481d25cbd",
                  subject_id: subjectId
                }
            })
            
            if(response.status===200)
            {
                setData(response.data.data)
                setSubject(subject?subject:response.data.data.subjects[0])
                // console.log(response.data.data)
            } 
        } 
        catch (error) 
        {
            toast.error(error.response.data.error)
            
        }
       
        
    }

    function handleClick(val)
    {
        setSubject(val)
        setSubjectId(val.subjectId)
        setActive(val.subjectId)
    }
    
    

    useEffect(()=>{
        getMockData()
        
    },[subjectId])
  return (
    <MainLayout>
    <div className="container">
    <div className='text-start fs-5 fw-bold pb-3'>
     {data?.mockTestName}
    </div>
    <div className="d-flex justify-content-end">
              <Link
                className="text-decoration-none fs-4 fw-bold"
                style={{ color: "darkorange" }}
              >
                Back<IoMdArrowDropright className="fs-3 text-black" />

              </Link>
            </div>
    <div className='d-flex'>
   
    </div>
      <div className='bg-light shadow rounded-3 p-3'>
         <div className='text-start fw-bold '>
         <div className='text-start text-primary'>
                 My Overall Performance Summery
         </div>
            <div className='row d-flex align-items-center p-3 '>
                <div className='p-2 d-flex justify-content-center align-items-center col-6 col-sm-6 col-md-3 col-lg-3 '>
                <div className=' text-start text-light '>
                            {/* <i class="fa-solid fa-bell rounded-5 bg-success p-3"></i> */}
                            <img src={stopWatch} width={80} height={80} className='rounded-5' alt="watch"/>

                           
                    </div>
                    <div className='text-start px-3'>
                        <h5 className='p-0 m-0  '>{data?.score}/{data.totalMarks}</h5>
                        <span className='text-muted' style={{fontSize:'12px'}}>Marks</span>
                    </div>
                </div>
                <div className='p-2 d-flex justify-content-center align-items-center col-6 col-sm-6 col-md-3 col-lg-3 '>
                    <div className=' text-start text-light '>
                            {/* <i class="fa-solid fa-bell bg-success p-3"></i> */}
                            <img src={stopWatch} width={80} height={80} className='rounded-5' alt="watch"/>
                    </div>
                    <div className='text-start px-3'>
                        <h5 className='p-0 m-0  '>{data?.totalAttemptQuestions}/{data.totalQuestions}</h5>
                        <span className='text-muted' style={{fontSize:'12px'}}>Attempted</span>
                    </div>
                </div>
                <div className='p-2 d-flex justify-content-center align-items-center col-6 col-sm-6 col-md-3 col-lg-3 '>
                    <div className=' text-start text-light '>
                            {/* <i class="fa-solid fa-bell rounded-5 bg-success p-3"></i> */}
                            <img src={stopWatch} width={80} height={80} className='rounded-5' alt="watch"/>

                    </div>
                    <div className='text-start px-3'>
                        <h5 className='p-0 m-0  '>{data?.totalCorrectQuestions}/{data?.totalQuestions}</h5>
                        <span className='text-muted' style={{fontSize:'12px'}}>Correct</span>
                    </div>
                </div>
                <div className='p-2 d-flex justify-content-center align-items-center col-6 col-sm-6 col-md-3 col-lg-3 '>
                    <div className=' text-start text-light '>
                            {/* <i class="fa-solid fa-bell rounded-5 bg-success p-3"></i> */}
                            <img src={stopWatch} width={80} height={80} className='rounded-5' alt="watch"/>

                    </div>
                    <div className='text-start px-3'>
                        <h5 className='p-0 m-0'>{data?.totalIncorrectQuestions}/{data.totalQuestions}</h5>
                        <span className='text-muted' style={{fontSize:'12px'}}>Incorrect</span>
                    </div>
                </div>
            </div>
            </div>
            <div className='text-start fw-bold '>
         <div className='text-start text-primary'>
               Total Time Taken
         </div>
         <div className='row d-flex align-items-center p-3 ps-5'>
                <div className='p-2 d-flex justify-content-center align-items-center col-6 col-sm-6 col-md-3 col-lg-3 '>
                <div className=' text-start text-light '>
                            {/* <i class="fa-solid fa-bell rounded-5 bg-success p-3"></i> */}
                            <img src={stopWatch} width={80} height={80} className='rounded-5' alt="watch"/>

                    </div>
                    <div className='text-start px-3'>
                        <h5 className='p-0 m-0  '>{data.startTime}</h5>
                        <span className='text-muted' style={{fontSize:'12px'}}>Start Time</span>
                    </div>
                </div>
                <div className='p-2 d-flex justify-content-center align-items-center col-6 col-sm-6 col-md-3 col-lg-3 '>
                    <div className=' text-start text-light '>
                            {/* <i class="fa-solid fa-bell rounded-5 bg-success p-3"></i> */}
                            <img src={stopWatch} width={80} height={80} className='rounded-5' alt="watch"/>

                    </div>
                    <div className='text-start px-3'>
                        <h5 className='p-0 m-0  '>{data.endTime}</h5>
                        <span className='text-muted' style={{fontSize:'12px'}}>End Time</span>
                    </div>
                </div>
                <div className='p-2 d-flex justify-content-center align-items-center col-6 col-sm-6 col-md-3 col-lg-3 '>
                    <div className=' text-start text-light '>
                            {/* <i class="fa-solid fa-bell rounded-5 bg-success p-3"></i> */}
                            <img src={stopWatch} width={80} height={80} className='rounded-5' alt="watch"/>

                    </div>
                    <div className='text-start px-3'>
                        <h5 className='p-0 m-0  '>{data?.submittedTime}</h5>
                        <span className='text-muted' style={{fontSize:'12px'}}>Time Tekon</span>
                    </div>
                </div>
            </div>
            </div>
      </div>
     <div>
        <nav className="navbar navbar-expand-sm navbar-light py-3">
        <div className="container-fluid">
            <div id="navbarText">
            <ul className="navbar-nav mb-2 mb-lg-0 fw-bold">
            {data.subjects?.map((val)=>{
                return <li className="nav-item">
                    {/* <Link className="nav-link active rounded-2 m-2" aria-current="page" to="" onClick={()=>{handleClick(val)}}>{val.subjectName}</Link> */}
                    <Link className={`nav-link rounded-2 ${active===val.subjectId?'active':''}`} aria-current="page" to="" onClick={()=>handleClick(val)}>{val.subjectName}</Link>
                </li>
            })
                   
            }
            </ul>
        
            </div>
        </div>
        </nav>

     </div>
     <div className='text-start fw-bold bg-light p-3 rounded-3'>
         <div className='text-start text-primary'>
               Subject Performance Summary
         </div>
         <div className='row d-flex align-items-center pt-3 px-3 '>
                <div className='p-2 d-flex justify-content-center align-items-center col-6 col-sm-6 col-md-3 col-lg-3 '>
                <div className=' text-start text-light '>
                            {/* <i class="rounded-5  bg-success p-3"></i> */}
                            <img src={stopWatch} width={80} height={80} className='rounded-5' alt="watch"/>

                    </div>
                    <div className='text-start px-3'>
                        <h5 className='p-0 m-0  '>{subject?.score}/{subject?.totalQuestions*2}</h5>
                        <span className='text-muted' style={{fontSize:'12px'}}>Marks</span>
                    </div>
                </div>
                <div className='p-2 d-flex justify-content-center align-items-center col-6 col-sm-6 col-md-3 col-lg-3 '>
                    <div className=' text-start text-light '>
                            {/* <i class="fa-solid fa-bell rounded-5 bg-success p-3"></i> */}
                            <img src={stopWatch} width={80} height={80} className='rounded-5' alt="watch"/>

                    </div>
                    <div className='text-start px-3'>
                        <h5 className='p-0 m-0  '>{subject?.attemptedQuestions}/{subject?.totalQuestions}</h5>
                        <span className='text-muted' style={{fontSize:'12px'}}>Attempted</span>
                    </div>
                </div>
                <div className='p-2 d-flex justify-content-center align-items-center col-6 col-sm-6 col-md-3 col-lg-3 '>
                    <div className=' text-start text-light '>
                            {/* <i class="fa-solid fa-bell rounded-5 bg-success p-3"></i> */}
                            <img src={stopWatch} width={80} height={80} className='rounded-5' alt="watch"/>

                    </div>
                    <div className='text-start px-3'>
                        <h5 className='p-0 m-0  '>{subject?.correctQuestions}/{subject?.totalQuestions}</h5>
                        <span className='text-muted' style={{fontSize:'12px'}}>Correct</span>
                    </div>
                </div>
                <div className='p-2 d-flex justify-content-center align-items-center col-6 col-sm-6 col-md-3 col-lg-3 '>
                    <div className=' text-start text-light '>
                            {/* <i class="fa-solid fa-bell rounded-5 bg-success p-3"></i> */}
                            <img src={stopWatch} width={80} height={80} className='rounded-5' alt="watch"/>

                    </div>
                    <div className='text-start px-3'>
                        <h5 className='p-0 m-0  '>{subject?.incorrectQuestions}/{subject?.totalQuestions}</h5>
                        <span className='text-muted' style={{fontSize:'12px'}}>Incorrect</span>
                    </div>
                </div>
                </div>
            </div>
            {data.questions?.map((quest, index) => {
            return (
              <div className="card mb-4" key={index}>
                <div className="card-body">
                  <p>
                    <strong>Question {index + 1} (2 Marks)</strong>
                  </p> 
               
                  <p>{quest.question.replace(/<[^>]*>/g, '')}</p>

                  <form>
                    {quest.options?.map((option, optIndex) => (
                      <div className="form-check" key={optIndex}>
                        <input
                          checked={quest.correctOption===optIndex?true:false}
                          className="form-check-input"
                          type="checkbox"
                          name={`question${quest.questionId}`}
                          id={`option${optIndex}${quest.questionId}`}
                       
                        />
                        <label className="form-check-label">
                          {String.fromCharCode(65 + optIndex)}.{option}
                          {optIndex === quest.correctOption ? (
                            <span
                              className="fw-bold"
                              style={{ color: "#23bc23" }}
                            >
                              &nbsp;(Correct Answer)
                            </span> 
                          )
                          :""}
                        </label>
                      </div>
                    ))}
                  </form>

                  <button className="btn btn-link text-decoration-none mt-2 fw-bold text-dark">
                    <IoBulbSharp
                      className="fw-bold"
                      style={{ color: "#F6821F" }}
                    />
                    &nbsp; Solution &nbsp;{" "}
                    <a
                      className="btn text-decoration-none fw-bold fst-italic"
                      data-bs-toggle="collapse"
                      href={`#collapseExample${index}`}
                      role="button"
                      aria-expanded="false"
                      aria-controls={`collapseExample${index}`}
                      style={{ color: "#F6821F" }}
                    >
                      Show
                    </a>
                  </button>

                  <div className="collapse" id={`collapseExample${index}`}>
                    <div className="card card-body">
                      {quest.solution || "No solution provided."}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
                
    </div>
    <ToastContainer/>
    </MainLayout>
  )
}