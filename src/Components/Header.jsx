import React from 'react'
import { Brain} from "lucide-react";
import Navbar from './Navbar'


function Header() {
  return (
    <header className='w-full  bg-slate-900 border-slate-800'>
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Brain className="  text-blue-400 " />
        

        <Navbar/>
    
    </div>    
    </header>
  )
}

export default Header