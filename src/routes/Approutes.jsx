import { Route,Routes } from "react-router-dom";
import Home from "../Pages.jsx/Home";
import InterviewSetup from "../Pages.jsx/InterviewSetup";


function Approutes(){
  return(
    <Routes>
       <Route path = "/" element= {<Home />}/>
       <Route path = "/setup" element= {<InterviewSetup/>}/>

    </Routes>
    





  )


}

export default Approutes