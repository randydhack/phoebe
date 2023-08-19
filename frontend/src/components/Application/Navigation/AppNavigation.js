import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { ModalContext } from "../../../context/Modal";
import { NavLink } from "react-router-dom";

function AppNavigation(props) {
  const { createProjectModal, type } = useContext(ModalContext);
  const { setCloseSideMenu, closeSideMenu } = props;


  return (
    <section className="bg-[#2E2E30] h-[50px] flex items-center justify-between border-solid border-[#424244] border-b-[1px]">
      <div className="ml-[20px] flex items-center">
        {closeSideMenu ? (
          <AiOutlineMenuUnfold
            className="text-[#f5f4f3] h-[25px] w-[25px] cursor-pointer"
            onClick={(e) => setCloseSideMenu(!closeSideMenu)}
          />
        ) : (
          <AiOutlineMenuFold
            className="text-[#f5f4f3] h-[25px] w-[25px] cursor-pointer"
            onClick={(e) => setCloseSideMenu(!closeSideMenu)}
          />
        )}
        <NavLink to='/new-project' className="ml-[20px] rounded-[50px] border-solid border-[#6a696a] text-white border-[1px] bg-[#2E2E30] text-[12px] flex items-center px-[10px] py-[8px] font-medium cursor-pointer">
          CREATE PROJECT
        </NavLink>
      </div>
      <div className="text-white">Profile Picture</div>
    </section>
  );
}

export default AppNavigation;
