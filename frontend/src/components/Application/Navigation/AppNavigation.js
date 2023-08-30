import { RiMenuLine } from "react-icons/ri";
import { useContext, useEffect } from "react";
import { ModalContext } from "../../../context/Modal";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/session";
import ProfileIcon from "../Profile/ProfileIcon";
import { reactLocalStorage } from "reactjs-localstorage";

function AppNavigation(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setCloseSideMenu, closeSideMenu } = props;



  return (
    <section className="bg-[#2E2E30] h-[50px] flex items-center justify-between border-solid border-[#424244] border-b-[1px]">
      <div className="ml-[25px] flex items-center">
        {closeSideMenu ? (
          <RiMenuLine
            className="text-[#f5f4f3] h-[20px] w-[20px] cursor-pointer "
            onClick={(e) => {
              setCloseSideMenu(!closeSideMenu);
              reactLocalStorage.set("sideMenu", closeSideMenu);
            }}
          />
        ) : (
          <RiMenuLine
            className="text-[#f5f4f3] h-[20px] w-[20px] cursor-pointer"
            onClick={(e) => {
              setCloseSideMenu(!closeSideMenu);
              reactLocalStorage.set('sideMenu', closeSideMenu)
            }}
          />
        )}
        <NavLink
          to="/new-project"
          className="ml-[20px] rounded-[50px] border-solid border-[#6a696a] text-white border-[1px] bg-[#2E2E30] text-[12px] flex items-center px-[10px] py-[8px] font-medium cursor-pointer"
        >
          CREATE PROJECT
        </NavLink>
      </div>
      <ProfileIcon />
    </section>
  );
}

export default AppNavigation;
