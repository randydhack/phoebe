import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { getProjectSectionsThunk } from "../../../../store/sections";
import { HiPlus } from "react-icons/hi";

import "./ProjectBoard.css";
import BoardCards from "./BoardCards";
import CreateCard from "./CreateCard";
import { createCardThunk } from "../../../../store/cards";

function ProjectBoard() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const sections = Object.values(useSelector((state) => state.sections));

  const insideRef = useRef();
  const outsideRef = useRef(null);

  const [addCard, setAddCard] = useState({ id: null, status: false });
  const [title, setTitle] = useState('');

  useEffect(() => {
    dispatch(getProjectSectionsThunk(id));
  }, [id]);

  // Dealing with Textarea Height
  function calcHeight(value) {
    console.log(value, 'value')
    let numberOfLineBreaks = 0;
    numberOfLineBreaks = (value.match(/.{35}/g) || 0).length
    // const numberOfLineBreaks = (value.match(/\n/g) || []).length;
    // min-height + lines x line-height + padding + border
    console.log(numberOfLineBreaks)
    const newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
    console.log(newHeight)
    return newHeight;
  }

  const resize = () => {
    let textarea = document.querySelector(".textarea");

    console.log(title)
    textarea.addEventListener("keyup", () => {
      textarea.style.height = calcHeight(title) + "px";
    });

    console.log(textarea.style.height)
  };

  const handleClickOutside = async (event) => {
    if (insideRef.current && insideRef.current.contains(event.target)) {
      return;
    }

    if (outsideRef.current && !outsideRef.current.contains(event.target)) {

        if (title !== null) {
            await dispatch(createCardThunk(title, addCard.id, id));
        }
        setAddCard({ id: null, status: false });
        setTitle('')
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [addCard, title]);

  return (
    sections && (
      <div className="pt-[20px] px-[10px] h-full flex bg-[#F9F8F8]">
        {/* ---------------- SECTIONS MAPPING -------------------- */}
        {sections.map((section, i) => {
          return (
            <div
              key={i}
              className="h-full w-[300px] mx-[10px] rounded-[5px] flex flex-col items-center border-[#ECEAE9] border-solid border-[1px]"
            >
              <div className="flex items-center justify-between p-[10px] w-full">
                <p className="font-medium text-[16px]">{section.name}</p>
                <div className="flex">
                  <HiPlus
                    className="mr-[10px] cursor-pointer"
                    onClick={(e) => {
                      setAddCard({ id: section.id, status: !addCard.status });
                      //   scrollToCreateCard();
                    }}
                    forwardRef={insideRef}
                  />
                  <BsThreeDots className="cursor-pointer" />
                </div>
              </div>
              <div className="overflow-y-auto h-full overflow-x-hidden cardContainer">
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
              </div>
            </div>
          );
        })}
      </div>
    )
  );
}

export default ProjectBoard;
