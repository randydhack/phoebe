import { RiMenuLine } from "react-icons/ri";
import { NavLink, useHistory, Redirect} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileIcon from "../Profile/ProfileIcon";
import {TiPlus} from 'react-icons/ti'

function AppNavigation(props) {
  const { setCloseSideMenu, closeSideMenu } = props;
  const user = useSelector(state=>state.session.user)

  return (
    <section className="bg-[#2E2E30] h-[50px] flex items-center justify-between border-solid border-[#424244] border-b-[1px]">
      <div className="ml-[25px] flex items-center">
        {closeSideMenu ? (
          <RiMenuLine
            className="text-[#f5f4f3] h-[20px] w-[20px] cursor-pointer "
            onClick={(e) => setCloseSideMenu(!closeSideMenu)}
          />
        ) : (
          <RiMenuLine
            className="text-[#f5f4f3] h-[20px] w-[20px] cursor-pointer"
            onClick={(e) => setCloseSideMenu(!closeSideMenu)}
          />
        )}
        <NavLink
          to="/new/blank/project"
          className="ml-[20px] rounded-[50px] border-solid border-[#6a696a] text-white border-[1px] bg-[#2E2E30] flex items-center px-[10px] py-[7px] font-medium cursor-pointer"
        >
          <div className="rounded-[50%] h-[20px] w-[20px] bg-[#F06A6A] mr-[10px] flex items-center justify-center">
          <TiPlus className="text-white text-[16px]"/>
          </div>
          <span className="font-normal pr-[5px]">Create</span>
        </NavLink>
      </div>
      <ProfileIcon />
    </section>
  );
}

export default AppNavigation;
