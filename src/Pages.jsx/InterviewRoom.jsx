import React, { useEffect, useState } from 'react'
import QuestionCard from '../Components/Interview/QuestionCard'
import AnswerArea from '../Components/Interview/AnswerArea'
import axios from 'axios'
import InterviewSetup from './InterviewSetup'
import { useNavigate } from 'react-router-dom'

function InterviewRoom() {
  
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
  const[loading,setLoading] = useState(true)          //make it true while using api 
  const[currentIndex,setCurrentIndex] = useState(0)
  const[answer,setAnswer]=useState([]);

  
  
//retrieving setup data
  const setup = JSON.parse(
    localStorage.getItem("interviewSetup")
  );


  const generateQuestions= async()=>{

    // checking if user skipped setup sending them back
    if (!setup) {
      navigate("/");
      return;
    }
    setLoading(true)
    const prompt = `Generate ${setup.questionCount} interview questions for a ${setup.experience} level with  ${setup.jobRole} job role
     Return only the questions as a numbered list.`

   try{
       const getApi = import.meta.env.VITE_OPENROUTER_API_KEY;
     
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-oss-20b:free",
          messages: [
            {
              role: "system",
              content: "You are a professional interviewer. Provide a numbered list of interview questions."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        },
        {
          //  Key goes in the Authorization Header
          headers: {
            "Authorization": `Bearer ${getApi}`,
            "Content-Type": "application/json"
          }
        }
      );
      //  gemini response
      const text = response.data.choices[0].message.content;
      console.log(text)
      // spliiting response into an array
      const questionList = text.split("\n").filter((q) => q.trim() !== "");

      setQuestions(questionList)
      //adding the genrated questions in localstorage 
      //we must stringify becoz localstorage doesnt understand array only string

      localStorage.setItem("currentQuestions", JSON.stringify(questionList))
      setLoading(false)

   } catch(error){
      console.log( "Error fetching questions: ",error)
     // Fallback if API fails
      setQuestions(["Describe your most challenging project.", "How do you handle conflict in a team?"]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
   const savedQuestions = localStorage.getItem("currentQuestions")
   if (savedQuestions){
    const parsedQuestions = JSON.parse(savedQuestions)
    setQuestions(parsedQuestions)
    setLoading(false)

   } else{
     generateQuestions()
   }

   const savedAnswers = localStorage.getItem("interviewAnswers")
   if(savedAnswers){
    const parsedAnswers = JSON.parse(savedAnswers)
    setAnswer(parsedAnswers)
   }

  },[])
   
   if (loading) return<p>LOADING...</p>

// what if user refreshes state would be gone and asnwers tooo so for answers we have to store 


// function to end interview and saved data to local storage 

  const endInterview = () => {
  localStorage.setItem(
    "interviewData",
    JSON.stringify({
      questions:questions,    //dummyData
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