import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react'
import { createProjectThunk } from "../../../store/projects";
import { Redirect, useHistory} from 'react-router-dom'
import { IoArrowBackSharp } from 'react-icons/io5'

function CreateProjectPage() {
  const dispatch = useDispatch();
  const history = useHistory()

  const userSession = useSelector((state) => state.session.user);

  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  if (!userSession) return <Redirect to='/login'/>

  const handleSubmit = async (e) => {
    e.preventDefault()
    const project = await dispatch(createProjectThunk(name, type, description, null))
    return history.push(`/project/${project.id}/overview`)
  };

  return (
    <div className="bg-white w-screen h-screen">
      <div className="bg-[#d9d9d9] h-full w-[650px] ">
        <div className="px-[25px] pt-[20px] flex">
          <IoArrowBackSharp className="text-[18px] cursor-pointer" onClick={e => history.goBack()}/>
        </div>
        <div className="pl-[20px] pt-[20px] absolute flex w-full h-[600px]">
          <div className=" ml-[35px]">
            <h1 className="text-[30px] font-medium">New project</h1>
            <form onSubmit={handleSubmit} className="mt-[25px] w-[400px]">
              <div className="flex flex-col mb-[40px]">
                <label className="font-semibold text-[12px] mb-[5px]">Project Name</label>
                <input type="text" className={`outline-[1px] p-[8px] ${!name && 'border-b-[1px] border-b-red-600'}`} value={name} onChange={e => setName(e.target.value)}/>
                {!name && <div className="text-red-600 text-[12px] mt-[3px]">Project name is required</div>}
              </div>
              <div className="flex flex-col mb-[40px]">
                <label className="font-semibold text-[12px] mb-[5px]">Type of Project</label>
                <input type="text" className="outline-[1px] border-none p-[8px]" placeholder="Software project" value={type} onChange={e => setType(e.target.value)}/>
              </div>
              <div className="flex flex-col mb-[40px]">
                <label className="font-semibold text-[12px] mb-[5px]">Description of the project</label>
                <textarea className="outline-[1px] border-none resize-none p-[8px] h-[150px]" placeholder="What is this project about?" value={description} onChange={e => setDescription(e.target.value)}/>
              </div>

              <button type="submit" className="w-full border-[1px] rounded-[5px] p-[10px] bg-[#4573D1]">Continue</button>
            </form>
          </div>

          <div className="bg-red-300 w-full h-full ml-[60px] rounded-[10px]">

          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectPage;
