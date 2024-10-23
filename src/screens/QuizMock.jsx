import React, { useEffect, useState } from 'react'
import axios from 'axios';

import parse from 'html-react-parser';
import {IoMdArrowDropright} from 'react-icons/io'
import '../assets/styles/QuizMock.css'
import {Link} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import MainLayout from '../components/MainLayout';
function QuizMock() {
    const [data,setData]=useState('');
    const [subId,setSubId]=useState(null)
    const [currentQue,setCurrentQue]=useState(0);
    const [currentSub,setCurrentSub]=useState(0)
    const [time, setTime] = useState({
        hours: 0,
        minutes: 45,
        seconds: 23,
      });
    

   const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZhYTJmYmI3NTNkODA1YTlhYTAzNzkwIiwiaWF0IjoxNzI5NjY2OTk5LCJleHAiOjE3Mjk3NTMzOTl9.dVv_tNg3lQle8bbJTiGIQCQ4h2y7O216McjlUXsJcwg";

    const handleQuizData=async()=>
    {
        try 
        {
            const response=await axios.get(`http://192.168.0.15:5003/mockTest/getAllQuestionById`,{
                headers:{
                   Authorization: `Bearer ${token}`
                },
                params:{
                    mockTest_id: "66f5356f6259b7aa88a60ded",
                    subject_id: subId
                }
               })
               if(response.status===200)
               {
                  setData(response.data.data)
                  setSubId(subId?subId:response.data.data.subjects[0]?.subjectId)
               }  
        } 
        catch (error) 
        {
            toast.error(error.response.data.error)
        }
    }

    const handleClickSubject = (sub,i) => {
       
        setSubId(sub.subjectId);
        setCurrentSub(i);
        setCurrentQue(0)
        
      };

      const handleSubAndQue=(i)=>
      {
          if(data.subjectQuestions[currentSub].questions.length-1<i)
            {
                setCurrentQue(0)
                setCurrentSub(currentSub+1)
                setSubId(data.subjectQuestions[currentSub+1].subjectId)
            }
            else if(i<0)
                {
                    setCurrentSub(currentSub-1)
                    setCurrentQue(data.subjectQuestions[currentSub-1].questions.length-1)
                    setSubId(data.subjectQuestions[currentSub-1].subjectId)
            }
            else{
                setCurrentQue(i)
            }                   
      }

      const options = {
        replace: (domNode) => {
          // Handle <img> tags
          if (domNode.name === 'img') {
            const { src, width, height } = domNode.attribs;
            return <img src={src} width={700} height={700} className="img-fluid" alt="Content Image" />;
          }
          // Handle <oembed> for videos
          if (domNode.name === 'oembed') {
            const videoUrl = domNode.attribs.url;
            const embedUrl = videoUrl.replace('youtu.be/', 'youtube.com/embed/');
            return (
              <div className="">
           
                <iframe
                     width="560"
                     height="315"
                       className="container w-75"
     
                  src={embedUrl}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
          
            </div>
    
    //         <div className="container">
    //   <div className="embed-responsive embed-responsive-16by9" >
    //     <iframe
    //       className="embed-responsive-item"
    //       src={embedUrl}
    //       width="560"
    //       height="315"
    //       title="YouTube video"
    //       frameBorder="0"
    //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //       allowFullScreen
    //     ></iframe>
    //   </div>
    // </div>
            );
          }
        },
      };
    

      useEffect(() => {
        handleQuizData();
        const interval = setInterval(() => {
          setTime(prevTime => {
            let { hours, minutes, seconds } = prevTime;
            if (seconds > 0) seconds--;
            else if (minutes > 0) {
              minutes--;
              seconds = 59;
            } else if (hours > 0) {
              hours--;
              minutes = 59;
              seconds = 59;
            }
            return { hours, minutes, seconds };
          });
        }, 1000);
        return () => clearInterval(interval);
      }, [subId]);
    
  return (
    <MainLayout>
      <div className='p-3'>
      <div className="d-flex p-0 justify-content-between fs-3 fw-bold">
       {data.mockTestName}
       
        <div className="d-flex">
              <Link
                className="text-decoration-none fs-4 fw-bold"
                style={{ color: "darkorange" }}
              >
                Back<IoMdArrowDropright className="fs-3 text-black" />

              </Link>
            </div>
  </div>
  <div className='row'>
  <div className='col-md-8'>
  <div>
          <nav className="navbar navbar-expand navbar-light py-3">
              <div>
                <ul className="navbar-nav fw-medium">
                  {data.subjects?.map((sub, index) => {
                    return (
                      <li className="nav-item py-3" key={index}>
                        <Link
                          className={`nav-link rounded-2 px-4 ${
                            subId === sub.subjectId ? "active" : ""
                          }`}
                          aria-current="page"
                          to=""
                          onClick={() => handleClickSubject(sub,index)}
                        >
                          {sub.subjectName}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
           
          </nav>
        </div>


        <div className=' text-start fw-bold'>
            Question {currentQue+1}
          </div>
          <hr />
          <div className='text-start'>
            {data?parse(data.subjectQuestions[currentSub].questions[currentQue]?.question,options):''}
          </div>

          {data?data.subjectQuestions[currentSub].questions[currentQue]?.options.map((option,optIndex)=>{
             return    <div className="form-check py-1 d-flex justify-content-md-start" key={optIndex}>
                  <label className="form-check-label d-flex align-items-center">
                    <label className="checkbox-wrapper">
                  
                        <input
                          className="d-flex"
                          type="checkbox"
                         
                        />
                    </label>
                    <label className="d-flex">
                      
                      {String.fromCharCode(65 + optIndex)}.
                      &nbsp;{option.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "")}
                    </label>
                  </label>
                  
                </div>
          }):" "
          }
          <hr />
          <div className='d-flex justify-content-between align-items-center'>
            <button className='btn text-white' style={{backgroundColor:"#cf5d2c"}} disabled={currentQue===0 && currentSub===0} onClick={()=>setCurrentQue(currentQue-1)}>Previous</button>
            <button className='btn active text-white' style={{backgroundColor:"#cf5d2c"}}   onClick={()=>handleSubAndQue(currentQue+1)}>Next</button>
          </div>
          </div>
        


           <div className="col-md-4 col-sm-4  rounded-2 position-fixed-container" style={{backgroundColor:"lightgray"}}>
  <div className="container p-3">
    {/* Timer Section */}
    <div className="text-center p-3 mb-3 rounded-4" style={{backgroundColor: "blue"}}>
      <h5 className="text-white text-start ">
        <i className="bi bi-clock-fill me-2"></i> {/* Clock Icon */}
        Time Left
      </h5>
      <div className="display-6  text-start  text-white fw-bold">
        <span>{time.hours.toString().padStart(2, '0')}</span>{" "}
        <span>{time.minutes.toString().padStart(2, '0')}</span> 
        <span>{time.seconds.toString().padStart(2, '0')}</span>
      </div>
      {/* Labels for Hours, Minutes, Seconds */}
      <div className="text-white mt-2 d-flex">
        <div className="me-4">
          <span>Hours</span>
        </div>
        <div className="me-4">
          <span>Minutes</span>
        </div>
        <div>
          <span>Seconds</span>
        </div>
      </div>
    </div>

    {/* Question Grid Section */}
    <div className="row g-2 mb-3 ">
      {Array.from({ length: 30 }, (_, index) => (
        <div key={index} className="col-2 text-center">
          <button
            className={`btn w-100 ${
              index % 6 === 0
                ? 'btn-success'
                : index % 4 === 0
                ? 'btn-warning'
                : 'btn-secondary'
            }`}
          >
            {index + 1}
          </button>
        </div>
      ))}
    </div>

    {/* Legend Section */}
    <div className="d-flex flex-column">
      <span className="mb-2">
        <span className="badge bg-success">&nbsp;</span> Answered
      </span>
      <span className="mb-2">
        <span className="badge bg-warning">&nbsp;</span> Not Answered
      </span>
      <span className="mb-2">
        <span className="badge bg-secondary">&nbsp;</span> Not Viewed
      </span>
    </div>

    {/* Submit Button */}
    <div className="d-grid d-flex justify-content-end">
      <button id="button1" className="btn btn-success text-truncate">Submit Test</button>
    </div>
  </div>
</div>

        
          </div>
      </div>
      <ToastContainer/>
    </MainLayout>
  )
}

export default QuizMock
