import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { getProjectSectionsThunk } from "../../../../store/sections";
import { BsPlus } from "react-icons/bs";
import { GoCheckCircle } from "react-icons/go";
import CreateSection from "../CreateSection";

import "./ProjectBoard.css";
import BoardCards from "./BoardCards";
import CreateCard from "./CreateCard";
import { createCardThunk } from "../../../../store/cards";

function ProjectBoard() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const sections = Object.values(useSelector((state) => state.sections));
  const user = useSelector((state) => state.session.user);

  const insideRef = useRef();
  const outsideRef = useRef(null);

  const [addCard, setAddCard] = useState({ id: null, status: false });
  const [title, setTitle] = useState("");
  const [createTaskBottom, setCreateTaskBottom] = useState({ id: null, status: false, bottom: false });

  useEffect(() => {
    dispatch(getProjectSectionsThunk(id));
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

  const handleClickOutside = async (event) => {
    if (insideRef.current && insideRef.current.contains(event.target)) {
      return;
    }
    if (outsideRef.current && !outsideRef.current.contains(event.target)) {
      if (title.length !== 0) {
        await dispatch(createCardThunk(title, (addCard && addCard.id || createTaskBottom && createTaskBottom.id), id));
      }
      setAddCard({ id: null, status: false });
      setCreateTaskBottom({ id: null, status: false, bottom: false })
      setTitle("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [addCard, title, createTaskBottom]);

  return (
    sections && (
      <div className="pt-[20px] pb-[20px] px-[10px] flex flex-auto flex-col relative bg-[#F9F8F8]">
        <div className="absolute h-full w-full">
          <div className="flex h-[calc(100%_-_80px)] z-0 flex-auto overflow-hidden mb-[20px]">
            {/* ---------------- SECTIONS MAPPING -------------------- */}
            {sections.map((section, i) => {
              return (
                <div
                  key={i}
                  className="w-[300px] mx-[10px] rounded-[5px] overflow-hidden flex-[0_0_auto] relative flex flex-col items-center hover:border-[#ECEAE9] border-transparent border-solid border-[1px]"
                >
                  <div className="h-full overflow-scroll flex flex-col">
                    <div className="flex items-center justify-between p-[10px] w-full">
                      <p className="font-medium text-[16px]">{section.name}</p>
                      <div className="flex items-center">
                        <BsPlus
                          className="mr-[10px] cursor-pointer text-[25px] hover:bg-[#ECEAE9] rounded-[5px]"
                          onClick={(e) => {
                            setAddCard({
                              id: section.id,
                              status: !addCard.status,
                            });
                            //   scrollToCreateCard();
                          }}
                          forwardRef={insideRef}
                        />
                        <BsThreeDots className="cursor-pointer hover:bg-[#ECEAE9] rounded-[5px] p-[5px] text-[25px]" />
                      </div>
                    </div>
                    <div className="overflow-scroll cardContainer">
                      <div className="overflow-scroll">
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
                        <BoardCards section={section} />

                        {/* ---------------------------- ADD TASK BOTTOM -------------------------- */}
                        {(createTaskBottom.status && createTaskBottom.bottom &&
                        section.id === createTaskBottom.id)
                         ? (
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
                          className="mb-[5px] text-[#6D6E6F] hover:text-black flex ease-in duration-100 cursor-pointer py-[6px] rounded-[5px] hover:bg-[#ECEAE9] items-center justify-center"
                          ref={insideRef}
                          onClick={(e) => {
                            console.log(section.id, title, id)
                            setCreateTaskBottom({
                                id: section.id,
                                status: !addCard.status,
                                bottom: !addCard.bottom
                              });
                          }}
                        >
                          <BsPlus className="text-[25px] " />
                          <div>Add Task</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <CreateSection />

          </div>
        </div>
      </div>
    )
  );
}

export default ProjectBoard;
