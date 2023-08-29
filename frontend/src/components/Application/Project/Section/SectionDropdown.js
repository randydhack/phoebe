import { useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { PiTrashThin } from "react-icons/pi";

function SectionDropdown() {
  const history = useHistory();
  const { id } = useParams();

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

  const handleDeleteSection = async () => {

  };

  return (
    <>
      <BsThreeDots
        className="cursor-pointer hover:bg-[#ECEAE9] rounded-[5px] p-[5px] text-[25px]"
        onClick={(e) => {
          setToggleDropdown(!openDropdown);
        }}
        forwardref={navRef}
      />

      {openDropdown && (
        <div className="absolute w-[180px] top-[38px] left-[110px] bg-white border-[1px] border-[#ECEAE9] rounded-[5px]"
        ref={dropdownRef}>
          <div className="mt-[4px] py-[10px] hover:bg-[#ECEAE9] cursor-pointer flex items-center px-[15px] w-full">

            <div>Rename Section</div>
          </div>
          <div className="mb-[4px] py-[10px] hover:bg-[#ECEAE9] cursor-pointer text-red-600 flex items-center px-[15px] w-full">
            <PiTrashThin className="mr-[10px] text-[18px]" />
            <div>Delete Section</div>
          </div>
        </div>
      )}
    </>
  );
}

export default SectionDropdown;
