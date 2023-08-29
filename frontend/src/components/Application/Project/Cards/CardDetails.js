import { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InfoContext } from "../../../../context/InfoContext";
import { RxExit } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { getProjectSectionsThunk } from "../../../../store/sections";

function CardDetails() {
    const { id } = useParams()
    const dispatch = useDispatch()
  const { cardDetail, cardRef, setCardDetail } = useContext(InfoContext);
  const [cardTitle, setCardTitle] = useState(cardDetail.title);

  const project = useSelector((state) => state.projects)[cardDetail.projectId];
  const sections = Object.values(useSelector((state) => state.sections))

  return (
    <div
      className="bg-white border-l-[1px] z-30 absolute right-0 top-0 h-full w-[600px]"
      ref={cardRef}
    >
      <div>
        <div className="flex items-center">
          <input
            type="text"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            className="w-full my-[10px] text-[24px] py-[5px] px-[10px] mx-[10px] border-[1px] border-transparent hover:border-[#c3c1c0] rounded-[5px] ease-in duration-100"
          />
          <RxExit
            className="mr-[30px] text-[24px] cursor-pointer"
            onClick={(e) => setCardDetail(null)}
          />
        </div>
        <div className="h-[1px] w-full bg-[#ECEAE9]"></div>

        <div className="px-[22px] py-[20px]">
          {/* Assignee / Person who created the card */}
          <div className="flex items-center mb-[20px]">
            <div className="w-[120px] text-[#6e6d6f] text-[12px]">Assignee</div>
            <div className="flex items-center">
              {cardDetail.User.profileImage ? (
                <img src={cardDetail.User.profileImage} />
              ) : (
                <div className="text-[12px] rounded-[50%] bg-yellow-300 h-[30px] w-[30px] flex items-center justify-center border-[1px] border-[#c3c3c3] text-black">
                  {cardDetail.User.firstName[0].toUpperCase()}
                  {cardDetail.User.lastName[0].toUpperCase()}
                </div>
              )}
              <div className="ml-[10px]">
                {cardDetail.User.firstName} {cardDetail.User.lastName}
              </div>
            </div>
          </div>

          <div className="flex mb-[20px]">
            <div className="w-[120px] text-[#6e6d6f] text-[12px]">Project</div>
            <div className="flex items-center ml-[10px]">
              <div>
                {project.projectImage ? (
                  <img src={project.profileImage} />
                ) : (
                  <div className="text-[12px] rounded-[3px] bg-yellow-300 h-[12px] w-[12px] flex items-center justify-center border-[1px] border-[#c3c3c3] text-black"></div>
                )}
              </div>
              <div className="ml-[17px]">{project.name}</div>
            </div>
          </div>

          <div className="flex">
            <label className="w-[120px] text-[#6e6d6f] text-[12px]" for='section-dropdown'>
              Sections
            </label>
            <select name='section-dropdown' id='section-dropdown' className="cursor-pointer hover:border-[#c3c1c0] border-[1px] border-transparent rounded-[3px] w-[100px]">
              {sections.map((section, i) => {
                return (
                    <option key={`${section}${i}`} >{section.name}</option>
                )
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
