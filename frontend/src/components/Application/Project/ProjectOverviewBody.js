import ProjectMembers from "./ProjectMembers";
import ProjectTasks from "./ProjectTasks";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProjectThunk } from "../../../store/projects";
import { useHistory, useParams } from "react-router-dom";

import './Project.css'

function ProjectOverviewBody({ props }) {
  const { project, setDescription, description, handleSubmit } = props;
  const user = useSelector((state) => state.session.user);
  const { id } = useParams();
  const [allowEdit, setAllowEdit] = useState(false);

  const changeDecriptionHeight = () => {
    const element = document.querySelector(`${".project-description"}`);
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  useEffect(() => {
    (async () => {
      const element = document.querySelector(`${".project-description"}`);
      if (element) {
        element.style.height = "auto";
        element.style.height = `${element.scrollHeight}px`;
      }
    })();
  }, [id]);

  const focusDescription = () => {
    setTimeout(() => {
      document.getElementById('project-description').focus()
    }, 100);
  }

  const enterDescription = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
      document.getElementById('project-description').blur()
    }
  }

  return (
    project && (
      <div className="flex text-black justify-between overflow-y-scroll h-[calc(100%_-_151px)] bg-white">
        {/* Project Description */}
        <div className="w-full px-[25px] mt-[50px] overflow-y-scroll overview-scroll-hidden">
          <div className="flex flex-col">
            <label className="font-medium text-[18px] ml-[12px] mb-[10px]">
              Project Description
            </label>
            {user.id === project.ownerId ? (
              <>
                {allowEdit ? (
                  <textarea
                  id="project-description"
                    className={`w-[100%] h-fit p-[10px] rounded-[5px] border-blue-700 border-[2px] border-solid resize-none text-[14px] ${`project-description`}`}
                    placeholder="What is this project about?"
                    value={description}
                    onBlur={(e) => {
                      handleSubmit(e);
                      setAllowEdit(false)
                    }}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      changeDecriptionHeight();
                    }}
                    onKeyDown={e => enterDescription(e)}
                    rows={6}
                    maxLength={750}
                  />
                ) : (
                  <div className="border-solid border-[1px] border-transparent hover:border-black rounded-[5px] box-border flex-auto overflow-ellipsis break-words cursor-text"
                  onClick={e => {setAllowEdit(true); focusDescription()}} onBlur={e => setAllowEdit(false)}>
                    <div
                      className=" h-full p-[10px] rounded-[5px] resize-none
                  text-[14px] bg-inherit"
                      style={{ overflowWrap: "anywhere" }}
                    >
                      {description ? description : <div className="text-[#9BA3AF]">What is this project about?</div>}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="border-solid border-[1px] border-transparent rounded-[5px] box-border flex-auto overflow-ellipsis break-words">
                <div
                  className=" h-full p-[10px] rounded-[5px] resize-none
                  text-[14px] bg-inherit"
                  style={{ overflowWrap: "anywhere" }}
                >
                  {description ? description : <div className="text-[#9BA3AF]">What is this project about?</div>}
                </div>
              </div>
            )}
          </div>
          {/* Project Members Comtainer */}
          <ProjectMembers project={project} />
        </div>

        {/* <ProjectTasks /> */}
      </div>
    )
  );
}

export default ProjectOverviewBody;
