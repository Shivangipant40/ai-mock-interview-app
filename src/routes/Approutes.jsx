import { Route,Routes } from "react-router-dom";
import Home from "../Pages.jsx/Home";
import InterviewSetup from "../Pages.jsx/InterviewSetup";
import InterviewRoom from "../Pages.jsx/InterviewRoom";


function Approutes(){
  return(
    <Routes>
       <Route path = "/" element= {<Home />}/>
       <Route path = "/setup" element= {<InterviewSetup/>}/>
       <Route path = "/interview" element = {<InterviewRoom/>}/>

    </Routes>
    





  )


}

export default Approutes