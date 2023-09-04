import ProjectMembers from "./ProjectMembers";
import ProjectTasks from "./ProjectTasks";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProjectThunk } from "../../../store/projects";
import { useHistory } from "react-router-dom";

function ProjectOverviewBody({ props }) {
  const { project, setDescription, description, handleSubmit } = props;
  const user = useSelector((state) => state.session.user);

  const [activeDescription, setActiveDescription] = useState(false);

  useEffect(() => {
    (async () => {
      const element = document.querySelector(".project-description");
      const container = document.querySelector(
        ".project-description-container"
      );
      if (element) {
        const elementHeight =
          (element.style.height = `${element.scrollHeight}px`);

        element.style.height = "auto";
        element.style.height = `${element.scrollHeight}px`;
        container.style.height = elementHeight;
      }
    })();
  });

  const changeDecriptionHeight = () => {
    const element = document.querySelector(".project-description");
    const container = document.querySelector(".project-description-container");
    const elementHeight = (element.style.height = `${element.scrollHeight}px`);

    element.addEventListener("input", (event) => {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    });
    container.style.height = elementHeight;
  };

  return (
    project && (
      <div className="flex text-black justify-between overflow-y-scroll h-[calc(100%_-_151px)]">
        {/* Project Description */}
        <div className="w-full px-[25px] mt-[50px] overflow-y-scroll">
          <div className="flex flex-col">
            <label className="font-medium text-[18px] ml-[12px] mb-[10px]">
              Project Description
            </label>
            {user.id === project.ownerId ? (
              <div className="w-[100%] h-[149px] border-solid border-[1px] border-transparent hover:border-black rounded-[5px] relative project-description-container">
                <textarea
                  className="w-[100%] p-[10px] rounded-[5px] resize-none text-[14px] absolute top-0 project-description mb-1"
                  placeholder="What is this project about?"
                  value={description}
                  onBlur={(e) => {
                    handleSubmit(e);
                    setActiveDescription(false);
                  }}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    changeDecriptionHeight();
                  }}
                  rows={6}
                />
              </div>
            ) : (
              <div className="border-solid border-[1px] border-transparent rounded-[5px] box-border flex-auto overflow-ellipsis break-words">
                <div
                  className=" h-full p-[10px] rounded-[5px] resize-none
                  text-[14px] bg-inherit"
                  style={{ overflowWrap: "anywhere" }}
                >
                  {description}
                </div>
              </div>
            )}
          </div>
          {/* Project Members Comtainer */}
          <ProjectMembers project={project} />
        </div>

        <ProjectTasks />
      </div>
    )
  );
}

export default ProjectOverviewBody;
