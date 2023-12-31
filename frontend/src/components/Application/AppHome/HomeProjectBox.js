import { AiOutlinePlus } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { LiaProjectDiagramSolid} from 'react-icons/lia'

function HomeProjectBox({projects }) {

  return (
    projects && (
      <div className="w-[550px] bg-white m-[5px] max-h-[350px] h-[350px] rounded-[10px] hover:border-[1px] hover:border-[#42424467] hover:ease-out duration-100 overflow-scroll hover:shadow-lg shadow-[0_0_1px_1px_white] hide-scroll-bar">
        <div className="m-[20px]">
          <p className="font-medium text-[20px] text-black">Projects</p>
          <div className="grid grid-cols-2 mt-[10px]">
            <NavLink
              to="/new/blank/project"
              className="mt-[10px] flex items-center p-[10px] cursor-pointer hover:bg-[#e3e3e35a] rounded-[10px]"
            >
              <div className="flex items-center justify-center rounded-[10px] border-dotted border-2 border-black w-[40px] h-[40px]">
                <AiOutlinePlus className="w-[25px] h-[25px] text-black" />
              </div>
              <p className="ml-[10px] text-black text-ellipsis whitespace-nowrap overflow-hidden">Create Project</p>
            </NavLink>
            {projects.map((project, i) => {
              return (
                <NavLink
                  key={i}
                  className="mt-[10px] flex items-center p-[10px] cursor-pointer hover:bg-[#e3e3e35a] rounded-[10px]"
                  to={`/project/${project.id}/overview`}
                >
                  <div className={`flex items-center justify-center rounded-[10px] w-[40px] h-[40px]`} style={{backgroundColor: `${project.backgroundColor}`}}>
                  <LiaProjectDiagramSolid className="text-white text-[24px]"/></div>
                  <div className="ml-[10px] text-black w-[150px] text-ellipsis whitespace-nowrap overflow-hidden">{project.name}</div>
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
