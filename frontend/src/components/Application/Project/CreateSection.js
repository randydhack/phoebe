import { BsPlus } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
function CreateSection() {
  const insideSectionRef = useRef();
  const outsideSectionRef = useRef(null);
  const [sectionForm, setSectionForm] = useState(false);

  const handleClickOutside = async (event) => {
    if (insideSectionRef.current && insideSectionRef.current.contains(event.target)) {
      return;
    }
    if (outsideSectionRef.current && !outsideSectionRef.current.contains(event.target)) {
      setSectionForm(!sectionForm);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="w-[300px]">
      {!sectionForm ? (
        <div
          className="p-[5px] my-[6px] flex w-fit items-center cursor-pointer text-[#6D6E6F] hover:text-black ease-in duration-100 hover:bg-[#ECEAE9] rounded-[5px]"
          onClick={(e) => setSectionForm(!sectionForm)}
          ref={insideSectionRef}
        >
          <BsPlus className="text-[25px]" />
          <div className="pr-[8px] text-[16px]">Add Section</div>
        </div>
      ) : (
        <form id="sectionForm" className="mt-[5px]">
          <input
            ref={outsideSectionRef}
            onClick={(e) => e.stopPropagation()}
            className="p-[10px] w-full rounded-[5px] h-[35px] font-semibold text-[16px]"
            placeholder="New Section"
          />
        </form>
      )}
      <div className="gradient-bg"></div>
    </div>
  );
}

export default CreateSection;
