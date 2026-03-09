import React from 'react'
import Button from '../Common/Button'

function AnswerArea({questions,currentIndex,setCurrentIndex,answer,setAnswer,endInterview}) {

  if (!questions || questions.length === 0) return null;
  //to check the index of last question 
  const isLastQuestion = currentIndex === questions.length - 1;


// handling typing in text area
const handleAnswerChange = (e)=>{
  const newAnswer = [...answer];
  newAnswer[currentIndex] = e.target.value;
  setAnswer(newAnswer);

  localStorage.setItem("interviewAnswers",JSON.stringify(newAnswer))
}

  const handleNext = ()=>{
    if(currentIndex < questions.length-1){
       setCurrentIndex(currentIndex +1 );
      
    }
  }
    
    const handlePrev = ()=>{
      if(currentIndex > 0){
         setCurrentIndex(currentIndex - 1);
         
      }
    }
 
  return (
    <div className="space-y-3">
    <label className="text-sm font-medium text-slate-300 ">
    Your Answer
    </label>
    <textarea placeholder='Type your answer here'
    value={answer[currentIndex] ||""}
    onChange={handleAnswerChange}
    className='w-full
      min-h-55
      resize-none
      rounded-lg
      bg-slate-900
      border
      border-slate-700
      px-4
      py-3
      text-slate-100
      text-base
      leading-relaxed
      placeholder:text-slate-500
      focus:outline-none
      focus:border-blue-400
      focus:ring-1
      focus:ring-blue-400/40
      transition'></textarea>
    
    <span className=' text-xs text-slate-500'>Tip: Aim for a clear, structured response</span>
    <div className='flex items-center justify-between '>
    <Button size='lg' onClick={handlePrev} disabled ={currentIndex === 0}>PREVIOUS</Button>
    <Button size ="lg" onClick={endInterview} disabled={!isLastQuestion} >END INTERVIEW</Button>
    <Button size ='lg' onClick={handleNext} disabled={currentIndex===questions.length-1} >NEXT</Button>
  
    </div>
    </div>

  )
}


export default AnswerArea