import { useSelector, useDispatch } from "react-redux";
import { BsPencil, BsThreeDots } from "react-icons/bs";
import { PiTrashThin } from "react-icons/pi";
import { useState, useEffect, useRef, useContext } from "react";
import { LiaRunningSolid } from 'react-icons/lia'
import {
  deleteProjectThunk,
  getSingleProjectThunk,
} from "../../../store/projects";
import { useParams, useHistory } from "react-router-dom";
import { InfoContext } from "../../../context/InfoContext";
import { leaveProjectThunk } from "../../../store/members";

function ProjectDropdown({ project }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { setProject } = useContext(InfoContext);
  const user = useSelector((state) => state.session.user);

  const [openDropdown, setToggleDropdown] = useState(false);
  const navRef = useRef();
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (navRef.current && navRef.current.contains(event.target)) return;
    if (dropdownRef.current && !dropdownRef.current.contains(event.target))
      setToggleDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [openDropdown]);

  const handleDeleteProject = async () => {
    await dispatch(deleteProjectThunk(id));
    return history.push("/home");
  };

  const handleLeaveProject = async () => {
    await dispatch(leaveProjectThunk(id))
    return history.push('/home')
  }

  return (
    <div className="cursor-pointer text-white ml-[20px] hover:bg-[#ECEAE9] px-[5px] py-[2px] rounded-[5px]">
      <div className="flex items-center">
        <BsThreeDots
          className="flex items-center text-black"
          onClick={(e) => {
            setToggleDropdown(!openDropdown);
            setProject(project);
          }}
          forwardref={navRef}
        />

        {!openDropdown ? null : (
          <div
            className="absolute top-[102px] right-[32px] bg-white border-[#EEECEB] border-solid border-[1px] w-[220px] rounded-[3px]"
            onClick={(e) => e.stopPropagation()}
            ref={dropdownRef}
          >
            {user.id === project.ownerId ? (
              <div
                className="w-full flex my-[4px] px-[10px] py-[5px] hover:bg-[#ECEAE9] items-center text-[#c92f54]"
                onClick={(e) => handleDeleteProject()}
              >
                <PiTrashThin className="mr-[10px] text-[18px]" />
                <div className="text-[14px] font-normal">Delete Project</div>
              </div>
            ) : (
              <div
                className="w-full flex mb-[4px] px-[15px] py-[10px] hover:bg-[#F5F3F3] items-center text-red-600"
                onClick={(e) => handleLeaveProject()}
              >
                <LiaRunningSolid className="mr-[10px] text-[18px]"/>
                <div className="text-[14px] font-normal">Leave Project</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDropdown;
