import { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InfoContext } from "../../../../context/InfoContext";
import { RxExit } from "react-icons/rx";
import { moveSectionCardThunk, updateCardThunk } from "../../../../store/cards";
import CreateCardComments from "./CreateCardComments";
import CardComments from "./CardComments";

function CardDetails() {

  // Router Dom
  const dispatch = useDispatch();

  // Use Context
  const { cardDetail, cardRef, setCardDetail } = useContext(InfoContext);

  // Use Selectors
  const project = useSelector((state) => state.projects)[cardDetail.projectId];
  const sections = Object.values(useSelector((state) => state.sections));

  // Use States
  const [cardTitle, setCardTitle] = useState(cardDetail.title);
  const [cardDescription, setCardDescription] = useState(
    cardDetail.description || ""
  );
  const [selectSection, setSelectSection] = useState(Number(cardDetail.sectionId));


  // Card Update
  const updateCardHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateCardThunk(cardDetail.id, cardTitle, cardDescription));
  };

  // Change Section for Card
  const changeSectionHandler = async (e) => {
    e.preventDefault();
    const card = await dispatch(moveSectionCardThunk(Number(selectSection), cardDetail.id, cardDetail.projectId));
    setCardDetail(card)
    // setCardDetail(null)
  };

  return (
    cardDetail && (
      <div
        className="bg-white border-l-[1px] z-30 absolute right-0 top-0 w-[600px] h-full"
        ref={cardRef}
      >
        <div className="flex flex-col justify-between pb-[20px] h-[calc(100%_-_30px)]">
          <div className="overflow-hidden overflow-y-scroll h-full">
            <div className="flex items-center">
              <input
                type="text"
                value={cardTitle}
                onBlur={(e) => updateCardHandler(e)}
                onChange={(e) => {
                  if (e.target.value.length >= 1) {
                    setCardTitle(e.target.value);
                  }
                }}
                className="w-full my-[10px] text-[24px] py-[5px] px-[10px] mx-[10px] border-[1px] border-transparent hover:border-[#c3c1c0] rounded-[5px] ease-in duration-100 text-ellipsis whitespace-nowrap overflow-hidden"
              />
              <RxExit
                className="mr-[30px] text-[24px] cursor-pointer"
                onClick={(e) => setCardDetail(null)}
              />
            </div>
            <div className="h-[1px] w-full bg-[#ECEAE9]"></div>

            <div className="flex flex-col justify-between h-full">
              <div className="px-[22px] py-[20px]">
                {/* Assignee / Person who created the card */}
                <div className="flex items-center mb-[20px]">
                  <div className="w-[120px] text-[#6e6d6f] text-[12px]">
                    Assignee
                  </div>
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
                  <div className="w-[120px] text-[#6e6d6f] text-[12px]">
                    Project
                  </div>
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

                <div className="flex mb-[20px]">
                  <label
                    className="w-[120px] text-[#6e6d6f] text-[12px]"
                    htmlFor="section-dropdown"
                  >
                    Sections
                  </label>
                  <select
                    name="section-dropdown"
                    id="section-dropdown"
                    defaultValue={selectSection} // ADD DEFAUTL VALUE BASED ON THE SELECTED SECTION
                    onBlur={e => changeSectionHandler(e)}
                    onChange={(e) => {
                      setSelectSection(e.target.value);
                    }}
                    className="cursor-pointer hover:border-[#c3c1c0] border-[1px] border-transparent rounded-[3px] w-[120px] text-ellipsis overflow-hidden whitespace-nowrap"
                  >
                    {sections.map((section, i) => {
                      return (
                        <option
                          key={`${section}${i}`}
                          value={section.id}
                          className="text-ellipsis overflow-hidden whitespace-nowrap"
                        >
                          {section.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="relative">
                  <div className="text-[#6e6d6f] text-[12px]">Description</div>
                  <div>
                    <textarea
                      placeholder="What is this task about?"
                      value={cardDescription}
                      onBlur={(e) => updateCardHandler(e)}
                      onChange={(e) => {
                        setCardDescription(e.target.value);
                      }}
                      className="resize-none w-full h-[150px] hover:border-[#c3c1c0] border-[1px] border-transparent rounded-[8px] mt-[8px] outline-none mx-[-10px] p-[10px] leading-[1.5]"
                    />
                  </div>
                </div>
              </div>
              <CardComments/>
            </div>
          </div>
          <CreateCardComments props={cardDetail}/>
        </div>
      </div>
    )
  );
}

export default CardDetails;
