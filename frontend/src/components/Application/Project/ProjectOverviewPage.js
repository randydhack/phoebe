import { useDispatch, useSelector } from "react-redux";
import { BsClipboardData } from "react-icons/bs";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import { getSingleProjectThunk } from "../../../store/projects";
import ProjectOverviewBody from "./ProjectOverviewBody";
import { InfoContext } from "../../../context/InfoContext";
import ProjectDropdown from "./ProjectDropdown";
import ProjectBoard from "./Board/ProjectBoard";
import { updateProjectThunk } from "../../../store/projects";

function ProjectOverviewPage({ compType }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();
  const { setProject, project } = useContext(InfoContext);
  const user = useSelector(state => state.session.user)

  const project1 = useSelector((state) => state.projects)[id];
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    (async () => {
        const data = await dispatch(getSingleProjectThunk(id));
        if (!data) {
          return history.push('/home')
        }
        setProject(data);
        setProjectName(data.name);
        setDescription(data.description);
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProjectThunk(projectName, description, project.id));
  };

  //   bg-[#1f1e21]

  return (
    project && (
      <>
        {/* Overview Info and Navigation */}
        <div className="bg-[white] w-full h-[100px] px-[20px] border-b-[1px] border-[#ECEAE9]">
          <div className="flex p-[12px] items-center w-full">
            <img
              src="https://i.imgur.com/aNTNv.jpeg"
              className="mr-[20px] w-[50px] h-[50px] rounded-[10px]"
            />
            <div className="text-black font-semibold text-[20px] flex items-center w-full">
              {user.id === project.ownerId ?
              <input
                  type="text"
                  value={projectName}
                  onBlur={e => handleSubmit(e)}
                  onChange={(e) => {
                    if (e.target.value.length >= 1) {
                      setProjectName(e.target.value);
                    }
                  }}
                  minLength={1}
                  className="p-[2px] w-full overflow-hidden text-ellipsis whitespace-nowrap"
                /> :
                <div className="p-[2px] w-full overflow-hidden text-ellipsis whitespace-nowrap">{projectName}</div>

            }
              <ProjectDropdown project={project} />
            </div>
          </div>
          {/* TAB TO MOVE AROUND PROJECT */}
          <div className="flex mt-[1px] ml-[12px]">
            <NavLink
              to={`/project/${id}/overview`}
              className={`flex items-center border-b-2 px-[5px] pt-[2px] hover:bg-[#e3e3e35a] rounded-t-[5px] cursor-pointer ${
                compType === "overview" && "border-[#6D6E6F]"
              }`}
            >
              <BsClipboardData className="text-[14px] text-black" />
              <span className="text-[14px] ml-[5px] text-black font-medium">
                Overview
              </span>
            </NavLink>
            <NavLink
              to={`/project/${id}/board`}
              className="ml-[20px] flex items-center px-[5px] pt-[2px] hover:bg-[#e3e3e35a] rounded-t-[5px] cursor-pointer hover:border-b-2 border-[#6D6E6F]"
            >
              <LiaProjectDiagramSolid className="text-[14px] text-black" />
              <span className="text-[14px] ml-[5px] text-black">
                Project Board
              </span>
            </NavLink>
          </div>
        </div>
        {/* Overview Contents */}
        {compType === "overview" && (
          <ProjectOverviewBody
            props={{ project, description, setDescription, handleSubmit }}
          />
        )}
        {compType === "board" && <ProjectBoard />}
        </>
    )
  );
}

export default ProjectOverviewPage;
