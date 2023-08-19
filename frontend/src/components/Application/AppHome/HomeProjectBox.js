import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userProjectsThunk } from "../../../store/projects";


function HomeProjectBox() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const projects = useSelector(state => state.projects)


    useEffect(() =>{
            dispatch(userProjectsThunk())
    }, [])

    console.log(projects, user)


  return (
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
          <div className="mt-[20px] flex items-center p-[10px] cursor-pointer hover:bg-neutral-700 rounded-[10px]">dasdadad</div>
        </div>
      </div>
    </div>
  );
}

export default HomeProjectBox;
