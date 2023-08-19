import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userProjectsThunk } from "../../../store/projects";
import { NavLink } from "react-router-dom";

function HomeProjectBox({projects}) {
  const dispatch = useDispatch();

  return (
    projects && (
      <div className="w-[550px] bg-[#2A2B2D] m-[5px] max-h-[350px] h-[350px] rounded-[10px] border-[1px] border-[#424244] overflow-scroll">
        <div className="m-[20px]">
          <p className="font-medium text-[20px] text-white">Projects</p>
          <div className="grid grid-cols-2 mt-[10px]">
            <NavLink
              to="/new-project"
              className="mt-[10px] flex items-center p-[10px] cursor-pointer hover:bg-[#424244] rounded-[10px]"
            >
              <div className="flex items-center justify-center rounded-[10px] border-dotted border-2 border-white w-[50px] h-[50px]">
                <AiOutlinePlus className="w-[25px] h-[25px] text-white" />
              </div>
              <p className="ml-[10px] text-white text-ellipsis whitespace-nowrap overflow-hidden">Create Project</p>
            </NavLink>
            {projects.map((project, i) => {
              return (
                <NavLink
                  key={i}
                  className="mt-[10px] flex items-center p-[10px] cursor-pointer hover:bg-[#424244] rounded-[10px]"
                  to={`/project/${project.id}/overview`}
                >
                  <div className="flex items-center justify-center rounded-[10px] border-dotted border-2 border-white w-[50px] h-[50px]">
                    <AiOutlinePlus className="w-[25px] h-[25px] text-white" />
                  </div>
                  <div className="ml-[10px] text-white w-[150px] text-ellipsis whitespace-nowrap overflow-hidden">{project.name}</div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
}

export default HomeProjectBox;
