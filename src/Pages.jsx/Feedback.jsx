import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Feedback() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [aiFeedback, setAiFeedback] = useState("");

  //  Get interview data from localStorage
  const interviewData = JSON.parse(
    localStorage.getItem("interviewData")
  );

  // Safety check
  if (!interviewData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <p>No interview data found.</p>
      </div>
    );
  }

  const { questions, answers, setup } = interviewData;

  //handling exit

  const handleExit = ()=>{
    localStorage.removeItem("currentQuestions")
    localStorage.removeItem("interviewAnswers")
    localStorage.removeItem("interviewData")
    localStorage.removeItem("interviewSetup")
    console.log("Storage cleared!");
  }

  // Basic stats
  const answeredCount = answers.filter(
    (ans) => ans && ans.trim() !== ""
  ).length;

  const completionPercentage = Math.round(
    (answeredCount / questions.length) * 100
  );

  //  Generate AI feedback
  const generateFeedback = async () => {
    setLoading(true);

    const prompt = `
You are an interview evaluator.

Job Role: ${setup.jobRole}
Experience Level: ${setup.experience}

Evaluate the following Q&A session. 
  
  STRICT FORMATTING RULES:
  - DO NOT USE TABLES.
  - Use clear Headings (###) for each section.
  - Use Bullet points for lists.
  - Use Bold text for key terms.
  
  Provide the following sections:
  1. Overall Performance: Give a score out of 10 and a 2-sentence summary.
  2. Strengths: List 3-4 specific things the candidate did well.
  3. Areas of Improvement: List specific technical gaps found in the answers.
  4. Better Answers: For any weak response, provide a "Model Answer" in a few sentences.

Questions and Answers:
${questions
  .map(
    (q, i) =>
      `Q${i + 1}: ${q}\nAnswer: ${
        answers[i] || "No answer provided"
      }`
  )
  .join("\n\n")}
`;

    try {
      const getApi = import.meta.env.VITE_OPENROUTER_API_KEY;

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-oss-20b:free",
          messages: [
            {
              role: "system",
              content: "You are a professional technical recruiter providing constructive feedback."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        },
        {
          // FIXED: Key goes in the Authorization Header
          headers: {
            "Authorization": `Bearer ${getApi}`,
            "Content-Type": "application/json"
          }
        }
      );
//parsing 
      const text = response.data.choices[0].message.content;
       
      setAiFeedback(text);
      
    } catch (error) {
      console.error("Feedback API error:", error);
      setAiFeedback("Sorry, we couldn't generate detailed feedback at this moment. Please check your answers above.");
    } finally {
      setLoading(false);
    }
  };

  //  Run feedback generation on load
  useEffect(() => {
    generateFeedback();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <p className="text-blue-400 uppercase tracking-widest text-sm">
            Interview Completed
          </p>
          <h1 className="text-3xl font-bold mt-2">
            Your Interview Feedback
          </h1>
        </div>

        {/* Summary Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">
            Summary
          </h2>
          <p className="text-slate-300">
            Questions Answered:{" "}
            <span className="text-white font-medium">
              {answeredCount} / {questions.length}
            </span>
          </p>
          <p className="text-slate-300 mt-1">
            Completion Rate:{" "}
            <span className="text-white font-medium">
              {completionPercentage}%
            </span>
          </p>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-800 rounded-full mt-4">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* AI Feedback */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">
            AI Evaluation
          </h2>

          {loading ? (
            <p className="text-slate-400">
              Generating feedback...
            </p>
          ) : (
            <pre className="whitespace-pre-wrap text-slate-300 leading-relaxed">
              {aiFeedback}
            </pre>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() =>{handleExit();navigate("/setup")}}
            className="px-6 py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition"
          >
            Retry Interview
          </button>

          <button
            onClick={() =>{handleExit();navigate("/")}}
            className="px-6 py-2 rounded-md border border-slate-600 hover:bg-slate-800 transition"
          >
            Exit Interview
          </button>

          
        </div>
      </div>
    </div>
  );
}

export default Feedback;
