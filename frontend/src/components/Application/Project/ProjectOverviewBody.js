import ProjectMembers from "./ProjectMembers";
import ProjectTasks from "./ProjectTasks";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSingleProjectThunk } from "../../../store/projects";
import { useHistory } from "react-router-dom";

function ProjectOverviewBody({props}) {
  const { project, setDescription, description, handleSubmit } = props

  return (
    project &&
    <div className="flex text-black justify-between w-full h-full">
        {/* Project Description */}
      <div className="w-full px-[25px] mt-[50px]">
        <div className="flex flex-col">
          <label className="font-medium text-[18px] ml-[12px] mb-[10px]">Project Description</label>
          <div className="w-[100%] h-[150px] border-solid border-[1px] border-transparent hover:border-black rounded-[5px]">
          <textarea
            className="w-[100%] h-full p-[10px] rounded-[5px] resize-none text-[14px]"
            placeholder="What is this project about?"
            value={description}
            onChange={e => {
              setDescription(e.target.value)
            handleSubmit(e)
            }}
          />
          </div>
        </div>
        {/* Project Members Comtainer */}
        <ProjectMembers project={project}/>
      </div>

      <ProjectTasks />
    </div>
  );
}

export default ProjectOverviewBody;
