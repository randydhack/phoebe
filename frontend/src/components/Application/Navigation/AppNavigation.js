import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { ModalContext } from "../../../context/Modal";

function AppNavigation(props) {
  const { createProjectModal, type } = useContext(ModalContext);
  const { setCloseSideMenu, closeSideMenu } = props;


  return (
    <section className="bg-[#d9d9d9] h-[50px] flex items-center justify-between border-solid border-gray-400 border-[1px]">
      <div className="ml-[20px] flex items-center">
        {closeSideMenu ? (
          <AiOutlineMenuUnfold
            className="text-black h-[25px] w-[25px] cursor-pointer"
            onClick={(e) => setCloseSideMenu(!closeSideMenu)}
          />
        ) : (
          <AiOutlineMenuFold
            className="text-black h-[25px] w-[25px] cursor-pointer"
            onClick={(e) => setCloseSideMenu(!closeSideMenu)}
          />
        )}
        <div className="ml-[20px] rounded-[50px] border-solid border-white border-[1px] bg-[#D9D9D9] text-[12px] flex items-center px-[10px] py-[8px] font-medium cursor-pointer" onClick={e => createProjectModal()}>
          CREATE PROJECT
        </div>
      </div>
      <div className="text-white">Profile Picture</div>
    </section>
  );
}

export default AppNavigation;
