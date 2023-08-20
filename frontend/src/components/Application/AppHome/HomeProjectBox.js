import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function HomeProjectBox({projects}) {

  return (
    projects && (
      <div className="w-[550px] bg-white m-[5px] max-h-[350px] h-[350px] rounded-[10px] border-[1px] border-[#424244] overflow-scroll">
        <div className="m-[20px]">
          <p className="font-medium text-[20px] text-black">Projects</p>
          <div className="grid grid-cols-2 mt-[10px]">
            <NavLink
              to="/new-project"
              className="mt-[10px] flex items-center p-[10px] cursor-pointer hover:bg-[#e3e3e35a] rounded-[10px]"
            >
              <div className="flex items-center justify-center rounded-[10px] border-dotted border-2 border-black w-[50px] h-[50px]">
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
                  <div className="flex items-center justify-center rounded-[10px] border-dotted border-2 border-black w-[50px] h-[50px]">
                    <AiOutlinePlus className="w-[25px] h-[25px] text-black" />
                  </div>
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
