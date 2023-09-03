import { useSelector, useDispatch } from "react-redux";
import { BiSolidRightArrow } from "react-icons/bi";
import { HiPlus } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { userProjectsThunk } from "../../../store/projects";

function ProjectSideMenu() {
  const dispatch = useDispatch();

  const projects = Object.values(useSelector((state) => state.projects));

  useEffect(() => {
    (async () => {
      await dispatch(userProjectsThunk());
    })();
  }, [dispatch]);

  return (
    projects && (
      <div className="mt-[20px]">
        <div className="m-[5px] flex items-center cursor-pointer">
          <BiSolidRightArrow className="text-white text-[10px]" />
          <div className="mx-[8px] text-white text-[14px] font-medium">
            Projects
          </div>
          <HiPlus className="text-white" />
        </div>
        {projects.map((project, i) => {
          return (
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
          );
        })}

      </div>
    )
  );
}

export default ProjectSideMenu;
