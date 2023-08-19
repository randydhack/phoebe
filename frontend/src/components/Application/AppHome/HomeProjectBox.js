import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userProjectsThunk } from "../../../store/projects";
import { NavLink } from "react-router-dom";

function HomeProjectBox() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [projects, setProjects] = useState(null)


    useEffect(() =>{
           (async () => {
            const data = await dispatch(userProjectsThunk())
            setProjects(data)
           })()
    }, [dispatch])


  return (
    projects &&
    <div className="w-[600px] bg-gray-400 m-[5px] max-h-[350px] h-[350px] rounded-[10px]">
      <div className="m-[20px]">
        <p className="font-medium text-[20px]">Projects</p>
        <div className="grid grid-cols-2">
          <div className="mt-[20px] flex items-center p-[10px] cursor-pointer hover:bg-gray-500 rounded-[10px]">
            <div className="flex items-center justify-center rounded-[10px] border-dotted border-2 border-white w-[50px] h-[50px]">
              <AiOutlinePlus className="w-[25px] h-[25px] text-white" />
            </div>
            <p className="ml-[10px] text-white">Create Project</p>
          </div>
          {projects.map((project, i) => {
            return (
              <NavLink key={i} className="mt-[20px] flex items-center p-[10px] cursor-pointer hover:bg-neutral-700 rounded-[10px]" to={`/project/${project.id}`}>
                <div>IMAGE HERE</div>
                <div>{project.name}</div>
              </NavLink>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default HomeProjectBox;
