import React from 'react'
import hero from '../assets/images/hero.webp'
import Button from '../Components/Common/Button';
import {useNavigate} from 'react-router-dom';

function Home() {

const navigate = useNavigate();

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

          <Button 
          className="mt-6 px-6 py-3 transform hover:scale-105 transition duration-200 shadow hover:shadow-lg"
          onClick={()=>navigate("/setup")}>
            Start Mock Interview
          </Button>
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

   