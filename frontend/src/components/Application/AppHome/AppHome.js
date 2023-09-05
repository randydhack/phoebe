import moment from "moment";
import HomeProjectBox from "./HomeProjectBox";
import "./AppHome.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { userProjectsThunk } from "../../../store/projects";

function AppHome() {
  const dispatch = useDispatch();
  const projects = Object.values(useSelector((state) => state.projects));

  useEffect(() => {
    (async () => {
      await dispatch(userProjectsThunk());
    })()
  }, []);

  return (
    projects && (
      <div className="w-full px-[32px] background-gradient overflow-scroll pb-[20px] h-full background-home">
        <div className="h-full">
          <div className="my-[20px]">
            <h1 className="font-medium text-[20px] text-black">Home</h1>
          </div>
          <div className="flex items-center flex-col mb-[20px]">
            <div className="font-semibold text-black">
              {moment().format("dddd, MMMM Do")}
            </div>
            <h2 className="text-[32px] font-semibold text-black">
              Welcome Home, Randy
            </h2>
            <p className="text-black">You have some work to do!</p>
            <div className="flex bg-white px-[30px] py-[15px] rounded-[20px] mt-[15px] text-black">
              <p className="">{projects.length} Project</p>
              <p className="ml-[20px]">100 task incompleted</p>
            </div>
          </div>

          <div className="flex justify-center">
            <HomeProjectBox projects={projects} />
            <div className="w-[550px] bg-white m-[5px] rounded-[10px] max-h-[350px] h-[350px] hover:border-[1px] hover:border-[#42424467] hover:ease-out duration-100 hover:shadow-lg shadow-[0_0_1px_1px_white]">
              <div className="m-[20px] text-black">My Tasks</div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default AppHome;
