// React
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

// Components
import CreateSection from "../Section/CreateSection";
import SectionDropdown from "../Section/SectionDropdown";
import BoardCards from "../Cards/BoardCards";
import CreateCard from "../Cards/CreateCard";

// Thunks / Context
import { createCardThunk, moveSectionCardThunk } from "../../../../store/cards";
import {
  getProjectSectionsThunk,
  updateSectionThunk,
} from "../../../../store/sections";

// CSS / Icons
import "./ProjectBoard.css";
import { BsPlus } from "react-icons/bs";
import { GoCheckCircle } from "react-icons/go";

// Drag and Drop
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function ProjectBoard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const sections = Object.values(useSelector((state) => state.sections));
  const user = useSelector((state) => state.session.user);

  const insideRef = useRef();
  const outsideRef = useRef(null);

  const [addCard, setAddCard] = useState({ id: null, status: false });
  const [title, setTitle] = useState("");
  const [createTaskBottom, setCreateTaskBottom] = useState({
    id: null,
    status: false,
    bottom: false,
  });

  const [changeSectionName, setChangeSectionName] = useState("");
  const [allowEditSectionName, setAllowEditSectionName] = useState({
    sectionId: null,
    allowEdit: false,
  });

  useEffect(() => {
    (async () => {
      const data = await dispatch(getProjectSectionsThunk(id));
      if (!data) {
        return history.push("/home");
      }

      await dispatch(getProjectSectionsThunk(id));
    })();
  }, [id]);

  // Dealing with Textarea Height
  function calcHeight(value) {
    const numberOfLineBreaks = (value.match(/.{35}/g) || 0).length;
    // const numberOfLineBreaks = (value.match(/\n/g) || []).length;
    // min-height + lines x line-height + padding + border
    const newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
    return newHeight;
  }

  const resize = () => {
    let textarea = document.querySelector(".textarea");
    textarea.addEventListener("keyup", () => {
      textarea.style.height = calcHeight(title) + "px";
    });
  };

  // UPDATE SECTION
  const handleUpdateSectionName = async (e) => {
    e.preventDefault();
    await dispatch(
      updateSectionThunk(
        allowEditSectionName.sectionId,
        changeSectionName.trim()
      )
    );
    setAllowEditSectionName({
      sectionId: null,
      allowEdit: false,
    });
  };

  const enterToSubmitSection = (e) => {
    if (e.key === "Enter") {
      handleUpdateSectionName(e);
      document.getElementById("section-name").blur();
    }
  };

  // HANDLE SUBMIT FOR CREATE CARD
  const handleClickOutside = async (event) => {
    if (insideRef.current && insideRef.current.contains(event.target)) {
      return;
    }
    if (outsideRef.current && !outsideRef.current.contains(event.target)) {
      if (title.length !== 0) {
        await dispatch(
          createCardThunk(
            title,
            (addCard && addCard.id) ||
              (createTaskBottom && createTaskBottom.id),
            id
          )
        );
      }
      setTitle("");
      setAddCard({ id: null, status: false });
      setCreateTaskBottom({ id: null, status: false, bottom: false });
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [addCard, title, createTaskBottom]);

  const handleDragDrop = async (results) => {
    const { source, destination, type, draggableId } = results;

    if (!destination) return;
    if (
      source.droppableId == destination.droppableId &&
      source.index === destination.index
    )
      return;

      console.log(results)
    await dispatch(
      moveSectionCardThunk(destination.droppableId, draggableId, id)
    );
  };

  return (
    sections && (
      <div className="py-[10px] flex flex-auto flex-col relative bg-[#F9F8F8] ">
        <div className="absolute h-full w-full overflow-auto">
          <div className="flex h-[calc(100%_-_60px)] pl-[10px] z-0 flex-auto overflow-y-hidden overflow-x-scroll">
            {/* ---------------- SECTIONS MAPPING -------------------- */}
            <DragDropContext onDragEnd={handleDragDrop}>
            {sections.map((section, i) => {
              return (
                  <Droppable droppableId={`${section.id}`} type="section" key={i}>

                    {(provided) => (
                      <div
                        className="w-[300px] rounded-t-[5px] overflow-hidden flex-[0_0_auto] relative flex flex-col items-center hover:border-[#ECEAE9] border-transparent border-solid border-[1px] scrollbar-none"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div className="h-full overflow-y-scroll overflow-x-hidden flex flex-col w-full scrollbar-none">
                          <div className="flex items-center justify-between p-[10px] w-full">
                            {allowEditSectionName.allowEdit &&
                            allowEditSectionName.sectionId === section.id ? (
                              <input
                                id={`section-name`}
                                className="font-medium text-[16px] text-ellipsis whitespace-nowrap overflow-hidden px-[5px] rounded-sm"
                                placeholder={section.name}
                                onChange={(e) => {
                                  if (e.target.value.length > 0)
                                    setChangeSectionName(e.target.value);
                                }}
                                value={changeSectionName}
                                onBlur={(e) => handleUpdateSectionName(e)}
                                onKeyDown={(e) => enterToSubmitSection(e)}
                              />
                            ) : (
                              <p className="font-medium text-[16px] text-ellipsis whitespace-nowrap overflow-hidden px-[5px]">
                                {section.name}
                              </p>
                            )}
                            <div className="flex items-center">
                              <BsPlus
                                className="mr-[10px] cursor-pointer text-[25px] hover:bg-[#ECEAE9] rounded-[5px]"
                                onClick={(e) => {
                                  setAddCard({
                                    id: section.id,
                                    status: !addCard.status,
                                  });
                                }}
                                forwardref={insideRef}
                              />
                              <SectionDropdown
                                sectionId={section.id}
                                setAllowEditSectionName={
                                  setAllowEditSectionName
                                }
                                allowEditSectionName={allowEditSectionName}
                                section={section}
                                setChangeSectionName={setChangeSectionName}
                              />
                            </div>
                          </div>

                          <div className="overflow-scroll cardContainer scrollbar-none">
                            <div className="overflow-scroll items-center flex flex-col justify-center scrollbar-none">
                              {/* ---------------------------- CREATE CARD ---------------------------- */}

                              {addCard.status && section.id === addCard.id ? (
                                <CreateCard
                                  resize={resize}
                                  i={i}
                                  section={section}
                                  setAddCard={setAddCard}
                                  title={title}
                                  setTitle={setTitle}
                                  outsideRef={outsideRef}
                                />
                              ) : null}
                              {/* ---------------------------- CARDS MAPPING ---------------------------- */}
                              <Droppable
                                droppableId={`${section.id}`}
                                type="card"
                              >
                                {(provided) => (
                                  <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                  >
                                    <BoardCards section={section} />
                                  </div>
                                )}
                              </Droppable>

                              {/* ---------------------------- ADD TASK BOTTOM -------------------------- */}

                              {provided.placeholder}
                              {createTaskBottom.status &&
                              createTaskBottom.bottom &&
                              section.id === createTaskBottom.id ? (
                                <form
                                  className="w-[280px] h-auto bg-white rounded-[8px] my-[5px] border-solid border-[1px] shadow-sm border-gray-400 hover:ease-out duration-200 p-[10px]"
                                  onClick={(e) => e.stopPropagation()}
                                  ref={outsideRef}
                                >
                                  <div className="flex">
                                    <span>
                                      <GoCheckCircle className="text-[18px] w-[18px] h-[18px] mr-[5px] mt-[2px] cursor-default" />
                                    </span>
                                    <textarea
                                      className="textarea whitespace-pre-wrap break-words line max-w-[230px] resize-none max-h-[100px] outline-none w-[240px] inline-block cursor-text createCard"
                                      value={title}
                                      onChange={(e) => {
                                        //Whatever you put here will act just like an onChange event
                                        setTitle(e.target.value);
                                        resize();
                                      }}
                                      placeholder="Write a task name"
                                    />
                                  </div>
                                  <div className="mt-[10px] flex justify-between cursor-default">
                                    {user.profileImage ? (
                                      <div className="rounded-[50%] h-[25px] w-[25px] border-[1px] border-[#c3c3c3]">
                                        {user.profileImage}
                                      </div>
                                    ) : (
                                      <div className="text-[10px] rounded-[50%] bg-yellow-300 h-[25px] w-[25px] flex items-center justify-center border-[1px] border-[#c3c3c3]">
                                        {user.firstName[0].toUpperCase()}
                                        {user.lastName[0].toUpperCase()}
                                      </div>
                                    )}
                                  </div>
                                </form>
                              ) : null}

                              <div
                                className="mb-[5px] w-[95%] text-[#6D6E6F] hover:text-black flex ease-in duration-100 cursor-pointer py-[6px] rounded-[5px] hover:bg-[#ECEAE9] items-center justify-center"
                                ref={insideRef}
                                onClick={(e) => {
                                  setCreateTaskBottom({
                                    id: section.id,
                                    status: !addCard.status,
                                    bottom: !addCard.bottom,
                                  });
                                }}
                              >
                                <BsPlus className="text-[25px]" />
                                <div>Add Task</div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}
                  </Droppable>
              );
            })}
            </DragDropContext>
            <CreateSection />
          </div>
        </div>
      </div>
    )
  );
}

export default ProjectBoard;
