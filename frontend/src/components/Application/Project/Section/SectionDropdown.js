import { useRef, useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { PiTrashThin } from "react-icons/pi";
import { deleteSectionThunk } from "../../../../store/sections";
import { InfoContext } from "../../../../context/InfoContext";

function SectionDropdown({
  sectionId,
  setAllowEditSectionName,
  allowEditSectionName,
  section,
  setChangeSectionName,
}) {
  const dispatch = useDispatch();
  const { cardArr, setCardArr } = useContext(InfoContext)

  const [openDropdown, setToggleDropdown] = useState(false);
  const navRef = useRef();
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (navRef.current && navRef.current.contains(event.target)) return;
    if (dropdownRef.current && !dropdownRef.current.contains(event.target))
      setToggleDropdown(false);
  };

  const closeDropdown = () => {
    setToggleDropdown(!openDropdown);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [openDropdown]);

  const handleDeleteSection = async (e) => {
    e.preventDefault();
    const data = await dispatch(deleteSectionThunk(sectionId));

    const copy = {...cardArr}
    delete copy[data.section.id]
    console.log(copy, data.section.id)
    setCardArr({...copy})
  };

  const focusInputField = () => {
    setTimeout(() => {
      document.getElementById('section-name').focus()
    }, 50);
  }

  return (
    <>
      <BsThreeDots
        className="cursor-pointer hover:bg-[#ECEAE9] rounded-[5px] p-[5px] text-[25px]"
        onClick={(e) => {
          closeDropdown();
        }}
        forwardref={navRef}
      />

      {openDropdown && (
        <div
          className="absolute w-[180px] top-[38px] left-[110px] bg-white border-[1px] border-[#ECEAE9] rounded-[5px]"
          ref={dropdownRef}
        >
          <div
            className="mt-[4px] py-[10px] hover:bg-[#ECEAE9] cursor-pointer flex items-center px-[15px] w-full"
            onClick={(e) => {
              setAllowEditSectionName({
                sectionId: sectionId,
                allowEdit: !allowEditSectionName.allowEdit,
              });
              focusInputField()
              setChangeSectionName(section.name)
              closeDropdown()
            }}
          >
            <div>Rename Section</div>
          </div>
          <div
            className="mb-[4px] py-[10px] hover:bg-[#ECEAE9] cursor-pointer text-red-600 flex items-center px-[15px] w-full"
            onClick={(e) => {
              handleDeleteSection(e);
              closeDropdown();
            }}
          >
            <PiTrashThin className="mr-[10px] text-[18px]" />
            <div>Delete Section</div>
          </div>
        </div>
      )}
    </>
  );
}

export default SectionDropdown;
