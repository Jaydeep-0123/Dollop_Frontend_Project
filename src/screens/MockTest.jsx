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
  const [subject,setSubject]=useState(null)
  const [subjectId,setSubjectId]=useState(null);
  const [active,setActive]=useState();
  const [show, setShow] = useState(Array(data.length).fill(false));

const handleToggle = (index) => {
  setShow((prevState) => {
    const newShowState = [...prevState];
    newShowState[index] = !newShowState[index];
    return newShowState;
  });
};



  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZhYTJmYmI3NTNkODA1YTlhYTAzNzkwIiwiaWF0IjoxNzI5MjQxOTI0LCJleHAiOjE3MjkzMjgzMjR9.8qHw_XMgIIOZirN57ZfVomCBYhz6mDssWtSOKFcTkrE";
  
    
    const getMockData=async()=>
    {
        try 
        {
            const response = await axios.get(`http://192.168.0.15:5003/mockTest/viewresult`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                },
                params:{
                    mockTest_id: "66d99c5778fcecd7f027d081",
                    mockTestSubmissions_id: "6708d56a39bd1c847d7b97f3",
                  subject_id: subjectId
                }
            })
            
            if(response.status===200)
            {
                setData(response.data.data)
                setActive(subjectId?subjectId:response.data.data.subjects[0].subjectId)
                setSubject(subject?subject:response.data.data.subjects[0])
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
                            <img src={stopWatch} width={65} height={65} className='rounded-5' alt="watch"/>

                           
                    </div>
                    <div className='text-start px-3'>
                        <h5 className='p-0 m-0  '>{data?.score}/{data.totalMarks}</h5>
                        <span className='text-muted' style={{fontSize:'12px'}}>Marks</span>
                    </div>
                </div>
                <div className='p-2 d-flex justify-content-center align-items-center col-6 col-sm-6 col-md-3 col-lg-3 '>
                    <div className=' text-start text-light '>
                            {/* <i class="fa-solid fa-bell bg-success p-3"></i> */}
                            <img src={stopWatch} width={65} height={65} className='rounded-5' alt="watch"/>
                    </div>
                    <div className='text-start px-3'>
                        <h5 className='p-0 m-0  '>{data?.totalAttemptQuestions}/{data.totalQuestions}</h5>
                        <span className='text-muted' style={{fontSize:'12px'}}>Attempted</span>
                    </div>
                </div>
                <div className='p-2 d-flex justify-content-center align-items-center col-6 col-sm-6 col-md-3 col-lg-3 '>
                    <div className=' text-start text-light '>
                            {/* <i class="fa-solid fa-bell rounded-5 bg-success p-3"></i> */}
                            <img src={stopWatch} width={65} height={65} className='rounded-5' alt="watch"/>

                    </div>
                    <div className='text-start px-3'>
                        <h5 className='p-0 m-0  '>{data?.totalCorrectQuestions}/{data?.totalQuestions}</h5>
                        <span className='text-muted' style={{fontSize:'12px'}}>Correct</span>
                    </div>
                </div>
                <div className='p-2 d-flex justify-content-center align-items-center col-6 col-sm-6 col-md-3 col-lg-3 '>
                    <div className=' text-start text-light '>
                            {/* <i class="fa-solid fa-bell rounded-5 bg-success p-3"></i> */}
                            <img src={stopWatch} width={65} height={65} className='rounded-5' alt="watch"/>

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
                            <img src={stopWatch} width={65} height={65} className='rounded-5' alt="watch"/>

                    </div>
                    <div className='text-start px-3'>
                      <div className='text-muted'>hh:mm:ss</div> 
                        <h5 className='p-0 m-0  '>{data.startTime}</h5>
                        <span className='text-muted' style={{fontSize:'12px'}}>Start Time</span>
                    </div>
                </div>
                <div className='p-2 d-flex justify-content-center align-items-center col-6 col-sm-6 col-md-3 col-lg-3 '>
                    <div className=' text-start text-light '>
                            {/* <i class="fa-solid fa-bell rounded-5 bg-success p-3"></i> */}
                            <img src={stopWatch} width={65} height={65} className='rounded-5' alt="watch"/>

                    </div>
                    <div className='text-start px-3'>
                     <div className='text-muted'> hh:mm:ss</div>
                        <h5 className='p-0 m-0  '>{data.endTime}</h5>
                        <span className='text-muted' style={{fontSize:'12px'}}>End Time</span>
                    </div>
                </div>
                <div className='p-2 d-flex justify-content-center align-items-center col-6 col-sm-6 col-md-3 col-lg-3 '>
                    <div className=' text-start text-light '>
                            {/* <i class="fa-solid fa-bell rounded-5 bg-success p-3"></i> */}
                            <img src={stopWatch}width={65} height={65} className='rounded-5' alt="watch"/>

                    </div>
                    <div className='text-start px-3'>
                    <div className='text-muted'>hh:mm:ss</div>
                        <h5 className='p-0 m-0  '>{data?.submittedTime}</h5>
                        <span className='text-muted' style={{fontSize:'12px'}}>Time Tekon</span>
                    </div>
                </div>
            </div>
            </div>
      </div>
     <div>
        <nav className="navbar navbar-expand navbar-light py-3">
        <div className="container-fluid">
            <div id="navbarText">
            <ul className="navbar-nav  fw-bold">
            {data.subjects?.map((val,index)=>{
                return <li className="nav-item px-2" key={index}>
                    {/* <Link className="nav-link active rounded-2 m-2" aria-current="page" to="" onClick={()=>{handleClick(val)}}>{val.subjectName}</Link> */}
                    <Link  className={`nav-link rounded-2 ${active===val.subjectId?'active':''}`} aria-current="page" to="" onClick={()=>handleClick(val)}>{val.subjectName}</Link>
                </li>
            })
                   
            }
            </ul>
        
            </div>
        </div>
        </nav>

     </div>
     <div className='text-start fw-bold shadow bg-light p-3 rounded-3'>
         <div className='text-start text-primary'>
               Subject Performance Summary
         </div>
         <div className='row d-flex align-items-center pt-3 px-3 '>
                <div className='p-2 d-flex justify-content-center align-items-center col-6 col-sm-6 col-md-3 col-lg-3 '>
                <div className=' text-start text-light '>
                            {/* <i class="rounded-5  bg-success p-3"></i> */}
                            <img src={stopWatch} width={65} height={65} className='rounded-5' alt="watch"/>

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
            <div className='p-2'>
            {data.questions?.map((quest, index) => {
            return (
              <div>
              <div className="mb-4 px-3" key={index}>
                <div className="">
                  <p>
                  <strong>
                        Question {index + 1}{" "}
                        {quest.subQuestions.length ? (
                          ""
                        ) : quest.selectedOption !== null ? (
                          quest.correctOption === quest.selectedOption ? (
                            <label className="mx-2" style={{color:"#23bc23"}}>
                              {" "}
                              (+2 Marks)
                            </label>
                          ) : (
                            <label className=" text-danger mx-2"> (0.5 Marks)</label>
                          )
                        ) : (
                          <label className=" text-danger"> (not attempted)</label>
                        )}
                      </strong>
                  </p> 
               
                  <p>{quest.question.replace(/<[^>]*>/g, '')}</p>
                    {quest.subQuestions?.map((val,index)=>
                    {
                      return  <div className="mb-4" key={index}>
                <div className="card-body">
                  <p>
                  <strong> Question {index + 1}
                                {val.selectedOption !== null ? (
                                  val.correctOption ===
                                  val.selectedOption ? (
                                    <label className="mx-2" style={{color:"#23bc23"}}>
                                      (+2 Marks){" "}
                                    </label>
                                  ) : (
                                    <label className=" text-danger mx-2">
                                      (0.5 Marks){" "}
                                    </label>
                                  )
                                ) : (
                                  <label className=" text-danger">
                                    (not attempted)
                                  </label>
                                )}
                              </strong>
                  </p> 
               
                  <p>{val.question.replace(/<[^>]*>/g, '')}</p>
                   
                  <form>
                    {val.options?.map((option, optIndex) => (
                      <div className="form-check" key={optIndex}>
                      <label className="checkbox-wrapper">
                                {val.correctOption === optIndex? <input
                                    className="custom-icon-checkbox "
                                    type="checkbox"
                                    checked={
                                         true
                                    }
                                    name={`question${val.questionId}`}
                                    id={`option${optIndex}${val.questionId}`}
                                  />:'' }
                                  {val.correctOption !== optIndex && optIndex === val.selectedOption? (
                                    <input
                                    className="custom-icon-checkbox"
                                    type="checkbox"
                                    checked={
                                     false
                                    }
                                    name={`question${val.questionId}`}
                                    id={`option${optIndex}${val.questionId}`}
                                  />
                                  ):''}
                                  {val.correctOption !== optIndex && optIndex === val.selectedOption?<span className="checkbox-icon"></span>:val.correctOption === optIndex?<span className="checkbox-icon"></span>:  <span className="empty"></span>}
                                </label>
                        <label className="form-check-label">
                        {<label className={val.correctOption===optIndex?'correct-option':" "}> {String.fromCharCode(65 + optIndex)}.{option.replace(/<[^>]*>/g, '').replace(/&nbsp;/g,'')}</label>}
                          {/* {optIndex === val.correctOption ? (
                            <span
                              className="fw-bold fst-italic"
                              style={{ color: "#23bc23" }}
                            >
                              &nbsp;(Correct Answer)
                            </span> 
                          )
                          :(""
                         )} */}
                          {
                              optIndex !== val.correctOption && 
                              optIndex===val.selectedOption&&(
                                <span
                              className="fw-bold fst-italic"
                              style={{ color: "red" }}
                            >
                              &nbsp; incorrect Answer
                            </span> 
                              )
                            }
                            {
                              optIndex === val.correctOption && 
                              optIndex===val.selectedOption?(
                                <span
                              className="fw-bold"
                                style={{ color: "#23bc23" }}
                            >
                              &nbsp; your Answer
                            </span> 
                              ):optIndex === val.correctOption ? (
                            <span
                              className="fw-bold fst-italic"
                              style={{ color: "#23bc23" }}
                            >
                              &nbsp;(Correct Answer)
                            </span> 
                          )
                          :(""
                         )
                            }
                        </label>
                        
                      </div>
                      
                    ))}
                   
                   
                    <button className="btn btn-link text-decoration-none mt-2 fw-bold text-dark">
                    <IoBulbSharp
                      className="fw-bold"
                      style={{ color: "#F6821F" }}
                    />
                    &nbsp; Solution &nbsp;{" "}
                    <Link
                      onClick={() => handleToggle(index)}
                      className="btn text-decoration-none fw-bold fst-italic"
                      role="button"
                      style={{ color: "#F6821F" }}
                      aria-expanded={show[index] ? "true" : "false"}
                      aria-controls={`collapseExample${index}`}
                      key={index}
                    >
                      {show[index] ? "Hide" : "Show"}
                    </Link>
                  </button>

                  
                      <div className={`collapse ${show[index] ? 'show' : ''}`} id={`collapseExample${index}`}>
                        <div className="card-body">
                          {val.solution?.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ") || "No solution provided."}
                        </div>
                      </div>
                 
                        <hr/>
                  </form>

                </div>
              </div>
              
                    })}


                  <form>
                    {quest.options?.map((option, optIndex) => (
                      <div className="form-check " key={optIndex}>
                      <label className="checkbox-wrapper">
                                {quest.correctOption === optIndex? <input
                                    className="custom-icon-checkbox"
                                    type="checkbox"
                                    checked={
                                         true
                                    }
                                    name={`question${quest.questionId}`}
                                    id={`option${optIndex}${quest.questionId}`}
                                  />:'' }
                                  {quest.correctOption !== optIndex && optIndex === quest.selectedOption? (
                                    <input
                                    className="custom-icon-checkbox"
                                    type="checkbox"
                                    checked={
                                     false
                                    }
                                    name={`question${quest.questionId}`}
                                    id={`option${optIndex}${quest.questionId}`}
                                  />
                                  ):''}
                                  {quest.correctOption !== optIndex && optIndex === quest.selectedOption?<span className="checkbox-icon"></span>:quest.correctOption === optIndex?<span className="checkbox-icon"></span>:  <span className="empty"></span>}
                                </label>
                        
                        <label className="form-check-label ">
                        {<label className={quest.correctOption===optIndex?'correct-option':" "}> {String.fromCharCode(65 + optIndex)}.{option.replace(/<[^>]*>/g, '')}</label>}
                          
                          {
                              optIndex !== quest.correctOption && 
                              optIndex===quest.selectedOption&&(
                                <span
                              className="fw-bold fst-italic"
                              style={{ color: "red" }}
                            >
                              &nbsp; incorrect Answer
                            </span> 
                              )
                            }
                            {
                              optIndex === quest.correctOption && 
                              optIndex===quest.selectedOption?(
                                <span
                              className="fw-bold"
                              style={{ color: "green" }}
                            >
                              &nbsp; your Answer
                            </span> 
                              ):optIndex === quest.correctOption ? (
                            <span
                              className="fw-bold fst-italic"
                              style={{ color: "#23bc23" }}
                            >
                              &nbsp;Correct Answer
                            </span> 
                          )
                          :" "  
                            }
                            
                        </label>
                      </div>
                    ))}
                  </form>
                  {quest.typeOfQuestion==="General"?
                <div>
                  <button className="btn btn-link text-decoration-none mt-2 fw-bold text-dark">
                    <IoBulbSharp
                      className="fw-bold"
                      style={{ color: "#F6821F" }}
                    />
                    &nbsp; Solution &nbsp;{" "}
                    <Link
                      onClick={() => handleToggle(index)}
                      className="btn text-decoration-none fw-bold fst-italic"
                      role="button"
                      style={{ color: "#F6821F" }}
                      aria-expanded={show[index] ? "true" : "false"}
                      aria-controls={`collapseExample${index}`}
                      key={index}
                    >
                      {show[index] ? "Hide" : "Show"}
                    </Link>
                  </button>

                  
                      <div className={`collapse ${show[index] ? 'show' : ''}`} id={`collapseExample${index}`}>
                        <div className="card-body">
                          {quest.solution?.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")|| "No solution provided."}
                        </div>
                      </div>
                
                      <hr/>
                      </div>:" "
                }
                </div>
              </div>
            
              </div>
                      
              
            );
          })}
          </div>
                
    </div>
    <ToastContainer/>
    </MainLayout>
  )
}