import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

function InterviewSetup() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem("interviewSetup", JSON.stringify(data));
    navigate("/interview");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen bg-slate-950 text-slate-100 p-6 max-w-xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6">Interview Setup</h1>

      {/* Job Role */}
      <input
        className="bg-slate-800 p-3 rounded w-full mb-2"
        placeholder="Job Role"
        {...register("role", { required: "Role is required" })}
      />
      {errors.role && (
        <p className="text-red-500 text-sm">{errors.role.message}</p>
      )}

      {/* Difficulty */}
      <select
        className="bg-slate-800 p-3 rounded w-full mb-6"
        {...register("difficulty")}
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <Button type="submit" size="lg">
        Start Interview
      </Button>
    </form>
  );
}

export default InterviewSetup;
