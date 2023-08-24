import { NavLink } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import { AiOutlineCheckCircle } from 'react-icons/ai'
import ProjectSideMenu from "./ProjectSideMenu";
import { useState } from "react";

function SideMenu() {


  return (
    <div className="w-[250px] bg-[#2E2E30] border-solid border-l-[1px] border-r-[1px] border-[#424244]">
      <div className="list-none p-[15px]">
        <li className="list-none p-[8px] bg-[#454547] rounded-[10px] mb-[2px]">
        <NavLink to="/home" className="text-white flex items-center">
          <BiHomeAlt2 className="w-[20px] h-[20px] text-[#A2A0A2] mr-[10px]"/> <span className="text-[14px] font-medium">Home</span>
        </NavLink>
      </li>
        <li className="list-none p-[8px] hover:bg-[#454547af] rounded-[10px] hover:ease-out duration-100">
        <NavLink to="/home" className="text-white flex items-center">
          <AiOutlineCheckCircle className="w-[20px] h-[20px] text-[#A2A0A2] mr-[10px]"/> <span className="text-[14px] font-medium">My Tasks</span>
        </NavLink>
      </li>
      </div>
      <div className="h-[1px] w-full bg-[#454547]"></div>
      <ProjectSideMenu />
    </div>
  );
}

export default SideMenu;
