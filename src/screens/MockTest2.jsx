import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import "../assets/styles/MockTest.css";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';

import {CirclesWithBar} from 'react-loader-spinner'
import axios from "axios";
import {IoMdArrowDropright} from 'react-icons/io'

import {ToastContainer,toast} from 'react-toastify'
import stopWatch from '../assets/image/stopwatch.jpg'
import { IoBulbSharp } from "react-icons/io5";

export default function MockTest() {
  const [data, setData] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [show, setShow] = useState('');
  const [showSub, setShowSub] = useState('');
  const [subId, setSubId] = useState(null);
  const [loader,setLoader]=useState(false)
const url=process.env.REACT_APP_BASE_URL;

  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZhYTJmYmI3NTNkODA1YTlhYTAzNzkwIiwiaWF0IjoxNzI5NjY2OTk5LCJleHAiOjE3Mjk3NTMzOTl9.dVv_tNg3lQle8bbJTiGIQCQ4h2y7O216McjlUXsJcwg    "
  // Make an API request to fetch the mock test result
  const hendleGetData = async () => {
    try
    {
       setLoader(true)
    const result = await axios.get(`http://192.168.0.15:5003/mockTest/viewresult`, {
        headers: {
          Authorization:`Bearer ${token}`
        },
        params: {
          mockTest_id: "66d99c5778fcecd7f027d081",
          mockTestSubmissions_id: "6708d56a39bd1c847d7b97f3",
          subject_id: subId,
        },  
      }
    );
    if (result.status === 200) {
      //set all data
      setData(result.data.data);
      //set active subject
      setSubId(subId ? subId : result.data.data.subjects[0]?.subjectId);
      // set select subject details
      setSelectedSubject(
        selectedSubject ? selectedSubject : result.data.data.subjects[0]
      );
      console.log(result.data.data)
    }
}
catch (error) 
{
    toast.error(error.response.data.error)
  
    
    
}
finally{
  setLoader(false)  
}
  };

  useEffect(() => {
    hendleGetData();
  }, [subId]);//runs when subId changes

  const handleClickSubject = (sub) => {
    // setLoader(true)
    // click subject and set data in states
    setSelectedSubject(sub);
    setSubId(sub.subjectId);
    
  };
  const handleToggle = (index) => {
    setShow((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle the specific index
    }));
  };
  const handleToggleSub = (index) => {
    setShowSub((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle the specific index
    }));
  };


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


  return (
    <MainLayout>
      <div className="p-4">
        <div className="text-start fs-5 fw-bold pb-3   ">
       {data.mockTestName}
        </div>
        <div className="d-flex justify-content-end">
              <Link
                className="text-decoration-none fs-4 fw-bold"
                style={{ color: "darkorange" }}
              >
                Back<IoMdArrowDropright className="fs-3 text-black" />

              </Link>
            </div>
        <div className="bg-light rounded-3 p-3 shadow-mainbox pt-3">
        {/* show all subject Performance */}
          <div className="text-start fw-bold ">
            <div className="text-start text-primary">
              My Overall Performance Summery
            </div>
            <div className="row d-flex align-items-start p-3 ">
              <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
                <div className=" text-start text-light ">
                <img src={stopWatch}  width={50} height={50} className='rounded-5' alt="watch"/>
                </div>
                <div className="text-start px-3">
                  <h5 className="p-0 m-0  ">
                    {data.score}/{data.totalMarks}
                  </h5>
                  <span className="text-muted" style={{ fontSize: "12px" }}>
                    Marks
                  </span>
                </div>
              </div>
              <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
                <div className=" text-start text-light ">
                <img src={stopWatch} width={50} height={50} className='rounded-5' alt="watch"/>
                </div>
                <div className="text-start px-3">
                  <h5 className="p-0 m-0  ">
                    {data.totalAttemptQuestions}/{data.totalQuestions}
                  </h5>
                  <span className="text-muted" style={{ fontSize: "12px" }}>
                    Attempted
                  </span>
                </div>
              </div>
              <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
                <div className=" text-start text-light ">
                <img src={stopWatch}  width={50} height={50} className='rounded-5' alt="watch"/>
                </div>
                <div className="text-start px-3">
                  <h5 className="p-0 m-0  ">
                    {data.totalCorrectQuestions}/{data.totalQuestions}
                  </h5>
                  <span className="text-muted" style={{ fontSize: "12px" }}>
                    Correct
                  </span>
                </div>
              </div>
              <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
                <div className=" text-start text-light ">
                <img src={stopWatch} width={50} height={50} className='rounded-5' alt="watch"/>
                </div>
                <div className="text-start px-3">
                  <h5 className="p-0 m-0  ">
                    {data.totalIncorrectQuestions}/{data.totalQuestions}
                  </h5>
                  <span className="text-muted" style={{ fontSize: "12px" }}>
                    Incorrect
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* show total time deurestion */}
          <div className="text-start fw-bold ">
            <div className="text-start text-primary">Total Time Taken</div>
            <div className="row d-flex align-items-center p-3 ">
              <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
                <div className=" text-start text-light ">
                <img src={stopWatch}  width={50} height={50} className='rounded-5' alt="watch"/>
                </div>
                <div className="text-start px-3">
                <span className="text-muted" style={{ fontSize: "13px" }}>
                      hh:mm:ss
                    </span>
                  <div>
                  <h5 className="p-0 m-0  ">{data.startTime}</h5>
                    <span className="text-muted" style={{ fontSize: "12px" }}>
                      Start Time
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
                <div className=" text-start text-light ">
                <img src={stopWatch}  width={50} height={50} className='rounded-5' alt="watch"/>
                </div>
                <div className="text-start px-3">
                <span className="text-muted" style={{ fontSize: "13px" }}>
                      hh:mm:ss
                    </span>
                    <div>
                  <h5 className="p-0 m-0">{data.endTime}</h5>
                  <span className="text-muted" style={{ fontSize: "12px" }}>
                    End Time
                  </span>
                  </div>
                </div>
              </div>
              <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
                <div className=" text-start text-light ">
                <img src={stopWatch}  width={50} height={50} className='rounded-5' alt="watch"/>
                </div>
                <div className="text-start px-3">
                <span className="text-muted" style={{ fontSize: "13px" }}>
                      hh : mm : ss
                    </span>
                  <h5 className="p-0 m-0  ">{data.submittedTime}</h5>
                  <span className="text-muted" style={{ fontSize: "12px" }}>
                    Time Tekon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* show subjects name  */}
        <div>
          <nav className="navbar navbar-expand navbar-light py-3">
            <div className="container-fluid">
              <div>
                <ul className="navbar-nav fw-medium">
                  {data.subjects?.map((sub, index) => {
                    return (
                      <li className="nav-item px-2 py-3" key={index}>
                        <Link
                          className={`nav-link rounded-2 px-3 py-2 ${
                            subId === sub.subjectId ? "active" : ""
                          }`}
                          aria-current="page"
                          to=""
                          onClick={() => handleClickSubject(sub)}
                        >
                          {sub.subjectName}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </nav>
        </div>
        {/* show selected subject details  */}
        <div className="text-start fw-bold bg-light p-3 rounded-3 shadow-mainbox">
          <div className="text-start text-primary">Total Time Taken</div>
          <div className="row d-flex align-items-center pt-3 px-3 ">
            <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
              <div className=" text-start text-light ">
              <img src={stopWatch}  width={50} height={50} className='rounded-5' alt="watch"/>
              </div>
              <div className="text-start px-3">
                <h5 className="p-0 m-0  ">
                  {selectedSubject?.score}/{selectedSubject?.totalQuestions * 2}
                </h5>
                <span className="text-muted" style={{ fontSize: "12px" }}>
                  Marks
                </span>
              </div>
            </div>
            <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
              <div className=" text-start text-light ">
              <img src={stopWatch}  width={50} height={50} className='rounded-5' alt="watch"/>
              </div>
              <div className="text-start px-3">
                <h5 className="p-0 m-0  ">
                  {selectedSubject?.attemptedQuestions}/
                  {selectedSubject?.totalQuestions}
                </h5>
                <span className="text-muted" style={{ fontSize: "12px" }}>
                  Attempted
                </span>
              </div>
            </div>
            <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
              <div className=" text-start text-light ">
              <img src={stopWatch}  width={50} height={50} className='rounded-5' alt="watch"/>
              </div>
              <div className="text-start px-3">
                <h5 className="p-0 m-0  ">
                  {selectedSubject?.correctQuestions}/
                  {selectedSubject?.totalQuestions}
                </h5>
                <span className="text-muted" style={{ fontSize: "12px" }}>
                  Correct
                </span>
              </div>
            </div>
            <div className="p-2 d-flex justify-content-start align-items-center col-6 col-sm-6 col-md-3 col-lg-3 ">
              <div className=" text-start text-light ">
              <img src={stopWatch}  width={50} height={50}   className='rounded-5' alt="watch"/>
              </div>
              <div className="text-start px-3">
                <h5 className="p-0 m-0  ">
                  {selectedSubject?.incorrectQuestions}/
                  {selectedSubject?.totalQuestions}
                </h5>
                <span className="text-muted" style={{ fontSize: "12px" }}>
                  Incorrect
                </span>
              </div>
            </div>
          </div>
        </div>


               { loader? <div className="pt-5">
               <CirclesWithBar 
          height="50"
          width="50"
          color="#4fa94d"
          
          outerCircleColor="#4fa94d"
          innerCircleColor="#4fa94d"
          barColor="#4fa94d"
          ariaLabel="circles-with-bar-loading"
          wrapperStyle={{marginTop:"3%"}}
          wrapperClass=""
          visible={true}
          /></div>:
      
       <div className="pt-5">
  {data.questions?.map((questionData, index) => {
    return (
      <div key={index}>
        <div className="text-start">
          <div
            className="card-body px-3"
            style={{
           
              "--bs-card-border-color": "transparent",
            }}
          >
            <p>
              <strong>
                Question {index + 1}
                {questionData.subQuestions.length ? (
                  ""
                ) : questionData.selectedOption !== null ? (
                  questionData.correctOption === questionData.selectedOption ? (
                    <label className="mx-1" style={{ color: "rgb(84 231 86)" }}>
                      (+2 Marks)
                    </label>
                  ) : (
                    <label className="text-danger mx-1"> (0.5 Marks)</label>
                  )
                ) : (
                  <label className="text-info"> (Not Answered)</label>
                )}
              </strong>
            </p>


          {/* <p>{questionData.question.replace(/<[^>]*>/g, "")}</p> */}
          {/* <p>{questionData.question.replace(/<[^>]*>/g, "")}{questionData.question.match(/([^">]+\.(jpg|png|svg|jfif))/)?<img src={JSON.stringify(data.question.match(/([^">]+\.(jpg|png|svg|jfif))/)).replace('192.168.0.21','192.168.0.22').split(/"/)[1]} alt="cxdfx" />:''}</p> */}
          <div className="fw-medium">{ parse(questionData.question,options)}</div>
      



            {/* Show Subquestions */}
            {questionData.subQuestions?.map((subQuestion, subIndex) => {
              return (
                <div className="text-start" key={subIndex}>
                  <div
                    className="card-body"
                    style={{
                    
                      "--bs-card-border-color": "transparent",
                    }}
                  >
                    <p>
                      <strong>
                        question {subIndex + 1}
                        {subQuestion.selectedOption !== null ? (
                          subQuestion.correctOption === subQuestion.selectedOption ? (
                            <label className="mx-1" style={{ color: "rgb(84 231 86)" }}>
                              (+2 Marks)
                            </label>
                          ) : (
                            <label className="text-danger mx-1"> (0.5 Marks)</label>
                          )
                        ) : (
                          <label className="text-danger mx-1"> (Not Answered)</label>
                        )}
                      </strong>
                    </p>
                    {/* <p>{subQuestion.question.replace(/<[^>]*>/g, "")}</p> */}
                   <div className="fw-medium"> { parse(subQuestion.question,options)}</div>

                    <form>
                      {subQuestion.options?.map((option, optIndex) => (
                        <div className="form-check py-1 d-flex justify-content-md-start" key={optIndex}>
                          <label className="form-check-label d-flex align-items-center">
                            <label className="checkbox-wrapper">
                              {/* Correct Answer */}
                              {subQuestion.correctOption === optIndex ? (
                                <input
                                  className="custom-icon-checkbox"
                                  type="checkbox"
                                  checked={true}
                                  name={`question${subQuestion.questionId}`}
                                  id={`option${optIndex}${subQuestion.questionId}`}
                                />
                              ) : null}
                              {/* Incorrect Answer */}
                              {subQuestion.correctOption !== optIndex &&
                                optIndex === subQuestion.selectedOption ? (
                                <input
                                  className="custom-icon-checkbox"
                                  type="checkbox"
                                  checked={false}
                                  name={`question${subQuestion.questionId}`}
                                  id={`option${optIndex}${subQuestion.questionId}`}
                                />
                              ) : null}
                              {/* Show boxes for wrong or right */}
                              {subQuestion.correctOption !== optIndex &&
                                optIndex === subQuestion.selectedOption ? (
                                <span className="checkbox-icon"></span>
                              ) : subQuestion.correctOption === optIndex ? (
                                <span className="checkbox-icon"></span>
                              ) : (
                                <span className="empty"></span>
                              )}
                            </label>
                            <label
                              className={
                                subQuestion.correctOption === optIndex ? "correct-option" : ""
                              }
                            >
                              {String.fromCharCode(65 + optIndex)}.&nbsp;
                              {option.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")}
                            </label>
                          </label>
                          <div className="fst-italic fw-medium">
                            {/* Check correct answer */}
                            {optIndex === subQuestion.correctOption &&
                              optIndex === subQuestion.selectedOption ? (
                              <label style={{ color: "#22e822" }}>
                                &nbsp; your Answer
                              </label>
                            ) : optIndex === subQuestion.correctOption ? (
                              <label style={{ color: "#22e822" }}>
                                &nbsp; Correct Answer
                              </label>
                            ) : null}
                            {/* Check incorrect answer */}
                            {subQuestion.correctOption !== optIndex &&
                              optIndex === subQuestion.selectedOption && (
                                <label style={{ color: "red" }}>
                                  &nbsp; Incorrect Answer
                                </label>
                              )}
                          </div>
                        </div>
                      ))}
                    </form>
                    {subQuestion.solution ? (
                      <div>
                        <button className="btn btn-link text-decoration-none mt-2 fw-bold text-dark">
                          <IoBulbSharp className="fw-bold" style={{ color: "#F6821F" }} />
                          &nbsp; Solution &nbsp;{" "}
                          <Link
                            onClick={() => handleToggleSub(subQuestion.subQuestionId)}
                            className="fw-bold fst-italic"
                            data-bs-toggle="collapse"
                            to={`#collapseExample${subQuestion.subQuestionId}`}
                            role="button"
                            aria-expanded="false"
                            aria-controls={`collapseExample${subQuestion.subQuestionId}`}
                            style={{ color: "#F6821F" }}
                          >
                            {showSub[subQuestion.subQuestionId] ? 'Hide' : 'Show'}
                          </Link>
                        </button>

                        <div className="collapse" id={`collapseExample${subQuestion.subQuestionId}`}>
                          <div className="card-body">
                            {/* {subQuestion.solution.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ") || "No solution provided."} */}
                            { parse(subQuestion.solution,options)}
                          </div>
                        </div>
                      </div>
                    ) : null}
                    <hr />
                  </div>
                </div>
              );
            })}

            {/* Show options for main question */}
            <form>
              {questionData.options?.map((option, optIndex) => (
                <div className="form-check py-1 d-flex justify-content-md-start" key={optIndex}>
                  <label className="form-check-label d-flex align-items-center">
                    <label className="checkbox-wrapper">
                      {/* Correct Answer */}
                      {questionData.correctOption === optIndex ? (
                        <input
                          className="custom-icon-checkbox"
                          type="checkbox"
                          checked={true}
                          name={`question${questionData.questionId}`}
                          id={`option${optIndex}${questionData.questionId}`}
                        />
                      ) : null}
                      {/* Incorrect Answer */}
                      {questionData.correctOption !== optIndex &&
                        optIndex === questionData.selectedOption ? (
                        <input
                          className="custom-icon-checkbox"
                          type="checkbox"
                          checked={false}
                          name={`question${questionData.questionId}`}
                          id={`option${optIndex}${questionData.questionId}`}
                        />
                      ) : null}
                      {questionData.correctOption !== optIndex &&
                        optIndex === questionData.selectedOption ? (
                        <span className="checkbox-icon"></span>
                      ) : questionData.correctOption === optIndex ? (
                        <span className="checkbox-icon"></span>
                      ) : (
                        <span className="empty"></span>
                      )}
                    </label>
                    <label
                      className={
                        questionData.correctOption === optIndex ? 'correct-option' : ''
                      }
                    >
                      {String.fromCharCode(65 + optIndex)}.&nbsp;{option.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "")}
                    </label>
                  </label>
                  <div className="fst-italic fw-medium">
                    {optIndex === questionData.correctOption &&
                      optIndex === questionData.selectedOption ? (
                      <label style={{ color: "#22e822" }}>
                        &nbsp; your Answer
                      </label>
                    ) : optIndex === questionData.correctOption ? (
                      <label style={{ color: "#22e822" }}>
                        &nbsp; Correct Answer
                      </label>
                    ) : null}
                    {/* Check incorrect Answer */}
                    {questionData.correctOption !== optIndex &&
                      optIndex === questionData.selectedOption && (
                        <span style={{ color: "red" }}>
                          &nbsp; Incorrect Answer
                        </span>
                      )}
                  </div>
                </div>
              ))}
            </form>

            {questionData.typeOfQuestion === 'General' && questionData.solution ? (
              <div>
                <button className="btn btn-link text-decoration-none mt-2 fw-bold text-dark">
                  <IoBulbSharp className="fw-bold" style={{ color: "#F6821F" }} />
                  &nbsp; Solution &nbsp;{" "}
                  <Link
                    onClick={() => handleToggle(questionData.questionId)}
                    className="fw-bold fst-italic"
                    data-bs-toggle="collapse"
                    to={`#collapseExample${questionData.questionId}`}
                    role="button"
                    aria-expanded="false"
                    aria-controls={`collapseExample${questionData.questionId}`}
                    style={{ color: "#F6821F" }}
                  >
                    {show[questionData.questionId] ? 'Hide' : 'Show'}
                  </Link>
                </button>

                <div className="collapse" id={`collapseExample${questionData.questionId}`}>
                  <div className="card-body">
                    {/* {questionData.solution?.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ") || "No solution provided."} */}
                    { parse(questionData.solution,options)}

                  </div>
                </div>
                <hr />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  })}
</div>
   }
  

<ToastContainer/>
      </div>
    </MainLayout>
  )
}
