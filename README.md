🎯 AI Mock Interview Platform

A web-based AI-powered mock interview application built with React that helps users practice interview questions in a structured, real-world interview environment.

This project is designed to simulate an interview flow where users:

Generate interview questions based on role & experience

Navigate questions one by one (Previous / Next)

Write and track answers per question

 AI-based evaluation and feedback

🚀 Features

 Step-by-step interview flow (one question at a time)

 Previous / Next navigation with disabled states

 Answer tracking per question using indexed state

 Persistent interview setup using localStorage

 Clean & modern UI using Tailwind CSS


🛠️ Tech Stack

Frontend: React (Vite)

Styling: Tailwind CSS

State Management: React Hooks (useState, useEffect)

AI Orchestration: OpenRouter API

Note: I utilized OpenRouter to access the GPT-OSS-20B and Gemini Flash models via a unified OpenAI-compatible interface. This allows for model-switching and improved latency.

HTTP Client: Axios

Build Tool: Vite


🔮 Future Improvements

   Voice-based interviews

   Save interview history

   Timed interview mode

