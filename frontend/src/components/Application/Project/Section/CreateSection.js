import { BsPlus } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createSectionThunk } from "../../../../store/sections";


function CreateSection() {
    const dispatch = useDispatch()

  const insideSectionRef = useRef();
  const outsideSectionRef = useRef(null);
  const [sectionForm, setSectionForm] = useState(false);
  const [sectionName, setSectionName] = useState('')
  const { id } = useParams()

  const handleClickOutside = async (event) => {
    if (insideSectionRef.current && insideSectionRef.current.contains(event.target)) {
      return;
    }
    if (outsideSectionRef.current && !outsideSectionRef.current.contains(event.target)) {
        if (sectionName.length > 0) {
            await dispatch(createSectionThunk(id, sectionName))
        }
      setSectionForm(!sectionForm);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [sectionName]);

  return (
    <div className="w-full">
    <div className="w-[300px]">
      {!sectionForm ? (
        <div
          className="p-[5px] my-[6px] flex w-fit items-center cursor-pointer text-[#6D6E6F] hover:text-black ease-in duration-100 hover:bg-[#ECEAE9] rounded-[5px]"
          onClick={(e) => setSectionForm(!sectionForm)}
          ref={insideSectionRef}
        >
          <BsPlus className="text-[25px]" />
          <div className="pr-[8px] text-[16px] overflow-hidden">Add Section</div>
        </div>
      ) : (
        <form id="sectionForm" className="mt-[5px]">
          <input
            ref={outsideSectionRef}
            value={sectionName}
            onClick={(e) =>
                e.stopPropagation()}
            onChange={e =>  setSectionName(e.target.value)}
            className="p-[10px] w-full rounded-[5px] h-[35px] font-semibold text-[16px]"
            placeholder="New Section"
          />
        </form>
      )}
      <div className="gradient-bg"></div>
    </div>
    </div>
  );
}

export default CreateSection;
