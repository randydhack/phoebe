import { useSelector, useDispatch } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { logout } from "../../../store/session";
import { IoIosLogOut} from 'react-icons/io'

import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

function ProfileIcon() {
  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector((state) => state.session.user);

  const [openDropdown, setToggleDropdown] = useState(false);
  const navRef = useRef();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setToggleDropdown(!openDropdown);
  };

  const handleClickOutside = (event) => {
    if (navRef.current && navRef.current.contains(event.target)) {
      return;
    }

    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setToggleDropdown(false);
    }
  };

  const logoutHandler = async (e) => {
    e.preventDefault()
    await dispatch(logout())
    return history.push('/login')
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [openDropdown, toggleDropdown]);

  const navActive = openDropdown ? "profile-dropdown-active" : "";

  return (
    <div className="cursor-pointer text-white mr-[20px]">
      <div className="flex items-center">
        <div
          id={navActive}
          className="flex items-center"
          onClick={(e) => toggleDropdown(!openDropdown)}
          ref={navRef}
        >
          <div className="text-[12px] rounded-[50%] bg-yellow-300 h-[30px] w-[30px] flex items-center justify-center border-[1px] border-[#000000] text-black">
            {user.firstName[0].toUpperCase()}
            {user.lastName[0].toUpperCase()}
          </div>
          <MdKeyboardArrowDown className="text-[18px]" />
        </div>

        {!openDropdown ? null : (
          <div
            className="absolute top-[45px] right-[20px] bg-[#1E1F21] border-[#454547] border-solid border-[1px] w-[240px] rounded-[2px] z-[100]"
            onClick={(e) => e.stopPropagation()}
            ref={dropdownRef}
          >
            <div className="w-full flex my-[4px] px-[15px] py-[10px] hover:bg-[#454547af] text-[#A2A0A2] hover:text-white">
              <BsPersonWorkspace className="mr-[10px] mt-[4px]" />
              <div>
                <div className="text-white">My workspace</div>
                <div className="text-[#A2A0A2]">
                  {user.firstName} {user.lastName}
                </div>
              </div>
            </div>

            <div className="bg-[#454547] h-[1px] w-full my-[5px]"></div>

            <div className="w-full flex mt-[4px] px-[15px] py-[10px] hover:bg-[#454547af] items-center hover:text-white text-[#A2A0A2]">
              <HiOutlineUserCircle className="mr-[10px] text-[18px]" />
              <div className="text-white">Profile</div>
            </div>
            <div className="w-full flex mb-[4px] px-[15px] py-[10px] hover:bg-[#454547af] items-center hover:text-white text-[#A2A0A2]">
              <IoSettingsOutline className="mr-[10px] text-[18px]" />
              <div className="text-white">Settings</div>
            </div>

            <div className="bg-[#454547] h-[1px] w-full my-[5px]"></div>

            <div onClick={e => logoutHandler(e)} className="w-full flex mb-[4px] px-[15px] py-[10px] hover:bg-[#454547af] items-center hover:text-white text-[#A2A0A2]">
              <IoIosLogOut className="mr-[10px] text-[18px]"/>
              <div className="text-white">

              Logout
              </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileIcon;
