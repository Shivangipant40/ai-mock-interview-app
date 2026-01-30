import React, { useEffect, useState } from 'react'
import QuestionCard from '../Components/Interview/QuestionCard'
import AnswerArea from '../Components/Interview/AnswerArea'
import axios from 'axios'
import InterviewSetup from './InterviewSetup'
import { useNavigate } from 'react-router-dom'

function InterviewRoom() {
  console.log("API KEY:", import.meta.env.VITE_GEMINI_API_KEY);


  const navigate = useNavigate()
// dummy data

// const dummyData = [
//        "What are Semantic elements in HTML?",
//        "What is JSX?",
//        "What is virtual DOM in React?",
//        "What are fragments in React?",
//        "What are Hooks in React and why were they introduced?",
 
// ]
  const[questions,setQuestions] = useState([])
  const[loading,setLoading] = useState(true)     //make it true while using api 
  const[currentIndex,setCurrentIndex] = useState(0)
  const[answer,setAnswer]=useState([]);
  
  

  const setup = JSON.parse(
    localStorage.getItem("interviewSetup")
  );


  const generateQuestions= async()=>{
    setLoading(true)
    const prompt = `Generate ${setup.questionCount} interview questions for a ${setup.experience} level with  ${setup.jobRole} job role
     Return only the questions as a numbered list.`

   try{
       const getApi = import.meta.env.VITE_GEMINI_API_KEY;
       console.log(getApi)
       const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${getApi}`, 
         {
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          
       })
      //  gemini response
      const text = response.data.candidates[0].content.parts[0].text
      console.log(text)
      const questionList = text.split("\n").filter((q) => q.trim() !== "");

      setQuestions(questionList)
      setLoading(false)
   } catch(error){
      console.log( "Error fetching questions: ",error)
   }
  }

  useEffect(()=>{
    generateQuestions()
  },[])
   
   if (loading) return<p>LOADING...</p>

// function to end interview and saved data to local storage 

  const endInterview = () => {
  localStorage.setItem(
    "interviewData",
    JSON.stringify({
      questions:questions,  //dummyData
      answers: answer,
      setup:setup,
    })
  );
navigate("/feedback");
  
};

   

  return (
    <>
   
  <QuestionCard questions ={questions}   //dummyData
                currentIndex={currentIndex}/>
  <AnswerArea currentIndex={currentIndex} 
              setCurrentIndex={setCurrentIndex}
               questions ={questions} //dummyData
               loading={loading} 
               answer={answer}
              setAnswer={setAnswer}
              endInterview={endInterview}/>

  {/* {/* for generating questions through ai  */}
       {/* <QuestionCard questions={questions}
                        loading={loading} /> */}

    
   
  
  </>
  )
}

export default InterviewRoom