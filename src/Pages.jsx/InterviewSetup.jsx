import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Common/Button";

function InterviewSetup() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { isValid,errors } } = useForm({mode: "onChange"});

  const onSubmit = (data) => {
    localStorage.setItem("interviewSetup", JSON.stringify(data));
    navigate("/interview");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen bg-slate-950 text-slate-100 p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Interview Setup</h1>

      {/* job Role */}
       <label
         htmlFor="jobRole"
         className="block text-slate-300 mb-2"> Job Role
        </label>
  
      <input
        className="bg-slate-800 p-3 rounded w-full mb-2"
        placeholder="Job Role"
        {...register("jobRole", { required: "Role is required" })}/>
        {errors.role && (
        <p className="text-red-500 text-sm">{errors.jobRole.message}</p>
        )}

        {/* experience */}
        <label 
         htmlFor="experience"
         className="block text-slate-300 mb-2">Experience 
        </label>

      <select
         className="bg-slate-800 p-3 rounded w-full mb-6"
         {...register("experience", {required:"experience is  required"})}>
          <option value="5">Fresher</option>
          <option value="10">Junior</option>
          <option value="15">Mid-Level</option>
          <option value="20">Senior</option>
          </select>

        {/* total questions */}
        <label
         htmlFor="questionCount"
         className="block text-slate-300 mb-2"> Number of Questions
        </label>
        <select
         className="bg-slate-800 p-3 rounded w-full mb-6"
         {...register("questionCount", {required:"questions are required"})}>
          <option value="5">5 Questions</option>
          <option value="10">10 Questions</option>
          <option value="15">15 Questions</option>
          <option value="20">20 Questions</option>
          </select>

         {/* difficulty */}
         <label
         htmlFor="difficulty"
         className="block text-slate-300 mb-2"> Select Difficulty
         </label>

         <select
         className="bg-slate-800 p-3 rounded w-full mb-6"
         {...register("difficulty")}>
         <option value="Easy">Easy</option>
         <option value="Medium">Medium</option>
         <option value="Hard">Hard</option>
         </select>
 
        <Button type="submit" size="lg" onClick={()=>navigate("/interview")} disabled = {!isValid}>
        Start Interview
        </Button>


        
        </form>
  );
}

export default InterviewSetup;
