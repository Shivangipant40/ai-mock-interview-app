import React from 'react'
import { MessageSquare } from "lucide-react";


function QuestionCard({questions,currentIndex}) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 md:p-8 border border-slate-800">
  
    {/* uper area */}
    <div className="flex items-center gap-3 mb-6">
    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-400/10 border border-blue-400/20">
      <MessageSquare className="w-5 h-5 text-blue-400" />
     </div>

    <div>
      <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
        Question
      </span>
      <p className="text-sm text-slate-400">
        Interview Question
      </p>
    </div>
    </div>

    {/* Questions */}
     
      <h2 className="text-xl md:text-2xl leading-relaxed text-slate-100 mb-2 font-medium"> {questions[currentIndex]}    
     </h2>
     

    {/* bottom text */}
    <div className="mt-6 flex items-center gap-2 text-slate-500 text-sm">
    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
    <span>Take your time to think before answering</span>
  </div>
</div>

  )
}

export default QuestionCard