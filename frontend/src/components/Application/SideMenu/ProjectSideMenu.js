import { useSelector, useDispatch } from "react-redux";
import { BiSolidRightArrow, BiSolidDownArrow } from "react-icons/bi";
import { HiPlus } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { userProjectsThunk } from "../../../store/projects";
import './SideMenu.css'

function ProjectSideMenu() {
  const dispatch = useDispatch();

  const projects = Object.values(useSelector((state) => state.projects));

  const [projectDropdown, setProjectDown] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(userProjectsThunk());
    })();
  }, [dispatch]);

  useEffect(() => {
    const data = window.localStorage.getItem("HIDE_PROJECT");
    setProjectDown(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "HIDE_PROJECT",
      JSON.stringify(projectDropdown)
    );
  }, [projectDropdown]);

  return (
    projects && (
      <div className="flex-auto overflow-hidden relative mt-[10px]">
        <div className="overflow-y-auto absolute top-0 bottom-0 left-0 w-full h-[calc(100%_-_30px)] hide-scroll-bar">
          <div className="flex flex-col box-border min-h-full relative">
            <div className="flex-[1]">
              <div className="cursor-pointer flex items-center justify-between">
                <div
                  className="m-[5px] flex items-center w-full project-dropdown"
                  onClick={(e) => setProjectDown(!projectDropdown)}
                >
                  {projectDropdown ? (
                    <BiSolidDownArrow className="text-white text-[10px] arrow-dropdown" />
                  ) : (
                    <BiSolidRightArrow className="text-white text-[10px] arrow-dropdown" />
                  )}
                  <div className="mx-[8px] text-white text-[14px] font-medium">
                    Projects
                  </div>
                </div>
                <NavLink
                  className="text-white hover:bg-[#454547af] mr-[10px] p-[3px] rounded-[3px]"
                  to={"/new-project"}
                >
                  <HiPlus />
                </NavLink>
              </div>

                <div className="pb-[5px]">
                  {projects.map((project, i) => {
                    return (
                      projectDropdown && (
                        <NavLink
                          key={i}
                          to={`/project/${project.id}/overview`}
                          className="flex items-center mx-[12px] hover:bg-[#454547af] rounded-[8px] px-[10px] py-[3px] cursor-pointer hover:ease-out duration-100"
                        >
                          <div className="h-[16px] w-[16px] bg-blue-200 rounded-[5px] mr-[10px]"></div>
                          <div className="text-white text-[14px] text-ellipsis overflow-hidden whitespace-nowrap w-[140px]">
                            {project.name}
                          </div>
                        </NavLink>
                      )
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ProjectSideMenu;
