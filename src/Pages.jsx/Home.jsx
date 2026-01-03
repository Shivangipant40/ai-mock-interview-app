import React from 'react'
import hero from '../assets/images/hero.webp'

function Home() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-24 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE — TEXT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold  leading-tight">
            Practice Interviews Smarter with AI
          </h1>

          <p className="mt-4 text-slate-400 text-lg">
            Prepare for real interviews with AI-powered mock sessions,
            instant feedback, and performance insights.
          </p>

          <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600
              transform hover:scale-105 transition duration-200 shadow hover:shadow-lg">
            Start Mock Interview
          </button>
        </div>

        {/* RIGHT SIDE — IMAGE */}
        <div className="flex justify-center">
          <img
            src={hero}
            alt="AI-powered mock interview"
            className="w-full max-w-lg rounded-2xl shadow-lg"
          />
        </div>

      </div>
    </section>
  );
}

export default Home;

   