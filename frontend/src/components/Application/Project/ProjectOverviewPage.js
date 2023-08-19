import { useDispatch } from "react-redux";
import { BsClipboardData } from "react-icons/bs";
import { LiaProjectDiagramSolid } from 'react-icons/lia'
import { NavLink, Redirect, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleProjectThunk } from "../../../store/projects";
import ProjectOverviewBody from "./ProjectOverviewBody";
import { getAllProjectMembersThunk } from "../../../store/members";


function ProjectOverviewPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [project, setProject] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await dispatch(getSingleProjectThunk(id));

      if (data) setProject(data);

    })();
  }, []);

  // console.log(project)

//   bg-[#1f1e21]
  return (
    project && (
      <div className="bg-[white] w-full h-full">
        {/* Overview Info and Navigation */}
        <div className="bg-[white] w-full h-[100px] px-[20px] border-b-[1px] border-[#ECEAE9]">
          <div className="flex p-[12px] items-center">
            <img
              src="https://i.imgur.com/aNTNv.jpeg"
              className="mr-[20px] w-[50px] h-[50px] rounded-[10px]"
            />
            <div className="text-black font-medium">{project.name}</div>
          </div>
          {/* TAB TO MOVE AROUND PROJECT */}
          <div className="flex mt-[1px] ml-[12px]">
            <div className="flex items-center border-b-2 border-[#6D6E6F] px-[5px] pt-[2px] hover:bg-[#e3e3e35a] rounded-t-[5px] cursor-pointer">
              <BsClipboardData className="text-[14px] text-black" />
              <span className="text-[14px] ml-[5px] text-black font-medium">Overview</span>
            </div>
            <NavLink to={`/project/${id}/board`} className="ml-[20px] flex items-center px-[5px] pt-[2px] hover:bg-[#e3e3e35a] rounded-t-[5px] cursor-pointer hover:border-b-2 border-[#6D6E6F]">
              <LiaProjectDiagramSolid className="text-[14px] text-black" />
              <span className="text-[14px] ml-[5px] text-black">Project Board</span>
            </NavLink>
          </div>
        </div>
        {/* Overview Contents */}
        <ProjectOverviewBody projectId={id}/>
      </div>
    )
  );
}

export default ProjectOverviewPage;
