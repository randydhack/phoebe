import { useSelector, useDispatch } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { logout } from "../../../store/session";
import { IoIosLogOut } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

function ProfileIcon() {
  const dispatch = useDispatch();
  const history = useHistory();

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
    e.preventDefault();
    await dispatch(logout());
    return history.push("/login");
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [openDropdown, toggleDropdown]);

  const profileAnimation = {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.1 } },
  };

  const profileTextAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.05 } },
  }

  return (
    <motion.div className="cursor-pointer text-white mr-[20px]">
      <div className="flex items-center">
        <div
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

        <AnimatePresence>
          {!openDropdown ? null : (
            <motion.div
              className="absolute top-[45px] right-[20px] bg-[#1E1F21] border-[#454547] border-solid border-[1px] w-[240px] rounded-[2px] z-[100]"
              onClick={(e) => e.stopPropagation()}
              ref={dropdownRef}
              {...profileAnimation}
            >
              <motion.div className="w-full flex my-[4px] px-[15px] py-[10px] hover:bg-[#454547af] text-[#A2A0A2] hover:text-white" {...profileTextAnimation}>
                <BsPersonWorkspace className="mr-[10px] mt-[4px]" />
                <div>
                  <div className="text-white">My workspace</div>
                  <div className="text-[#A2A0A2]">
                    {user.firstName} {user.lastName}
                  </div>
                </div>
              </motion.div>

              <div className="bg-[#454547] h-[1px] w-full my-[5px]"></div>

              <motion.div {...profileTextAnimation} className="w-full flex mt-[4px] px-[15px] py-[10px] hover:bg-[#454547af] items-center hover:text-white text-[#A2A0A2]">
                <HiOutlineUserCircle className="mr-[10px] text-[18px]" />
                <div className="text-white">Profile</div>
              </motion.div>
              <motion.div {...profileTextAnimation} className="w-full flex mb-[4px] px-[15px] py-[10px] hover:bg-[#454547af] items-center hover:text-white text-[#A2A0A2]">
                <IoSettingsOutline className="mr-[10px] text-[18px]" />
                <div className="text-white">Settings</div>
              </motion.div>

              <div className="bg-[#454547] h-[1px] w-full my-[5px]"></div>

              <motion.div
              {...profileTextAnimation}
                onClick={(e) => logoutHandler(e)}
                className="w-full flex mb-[4px] px-[15px] py-[10px] hover:bg-[#454547af] items-center hover:text-white text-[#A2A0A2]"
              >
                <IoIosLogOut className="mr-[10px] text-[18px]" />
                <div className="text-white">Logout</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default ProfileIcon;
