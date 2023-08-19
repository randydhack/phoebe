import { useDispatch } from "react-redux";
import { BsClipboardData } from "react-icons/bs";
import { LiaProjectDiagramSolid } from 'react-icons/lia'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleProjectThunk } from "../../../store/projects";
import ProjectOverviewBody from "./ProjectOverviewBody";

function ProjectOverviewPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [project, setProject] = useState(null);
  useEffect(() => {
    (async () => {
      const data = await dispatch(getSingleProjectThunk(id));
      setProject(data);
    })();
  }, []);

  return (
    project && (
      <div className="bg-[#1f1e21] w-full h-full">
        {/* Overview Info and Navigation */}
        <div className="bg-[#1f1e21] w-full h-[100px] px-[20px] border-b-[1px] border-[#424244]">
          <div className="flex p-[12px] items-center">
            <img
              src="https://i.imgur.com/aNTNv.jpeg"
              className="mr-[20px] w-[50px] h-[50px] rounded-[10px]"
            />
            <div className="text-white">{project.name}</div>
          </div>
          {/* TAB TO MOVE AROUND PROJECT */}
          <div className="flex mt-[1px] ml-[12px]">
            <div className="flex items-center border-b-2 px-[5px] pt-[2px] hover:bg-gray-600 rounded-t-[5px] cursor-pointer">
              <BsClipboardData className="text-[14px] text-white" />{" "}
              <span className="text-[14px] ml-[5px] text-white">Overview</span>
            </div>
            <div className="ml-[20px] flex items-center px-[5px] pt-[2px] hover:bg-gray-600 rounded-t-[5px] cursor-pointer">
              <LiaProjectDiagramSolid className="text-[14px] text-white" />{" "}
              <span className="text-[14px] ml-[5px] text-white">Project Board</span>
            </div>
          </div>
        </div>
        {/* Overview Contents */}
        <ProjectOverviewBody />
      </div>
    )
  );
}

export default ProjectOverviewPage;
