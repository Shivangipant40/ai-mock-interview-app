import React from 'react'


function Navbar() {
  return (
    <nav>

        <ul className="hidden md:flex items-center gap-8">
        <li className=" text-slate-300 hover:text-blue-400 cursor-pointer" >Home</li>
         
        <li className="text-slate-300 hover:text-blue-400 cursor-pointer">Contact Us</li>
        
        <li className=" text-slate-300 hover:text-blue-400 cursor-pointer ">About Us</li> 
        <li className=" text-slate-300 hover:text-blue-400 cursor-pointer">Services</li>  
        
        </ul>
        
  
    </nav>
  )
}

export default Navbar