import { GoCheckCircle } from "react-icons/go";
import { useContext, useRef, useEffect, useState } from "react";
import { InfoContext } from "../../../../context/InfoContext";
import "../Section/Section.css";
import { ModalContext } from "../../../../context/Modal";
import { Draggable } from "react-beautiful-dnd";

function BoardCards({ section }) {
  // Context
  const { setCardDetail } = useContext(InfoContext);
  const { cardDetailModal } = useContext(ModalContext);

  return (
    <>
      {section.Cards
        ? section.Cards.map((card, i) => {
            return (
              <Draggable key={i} draggableId={`${card.id}`} index={i}>
                {(provided) => (
                  <div
                    className="w-[280px] bg-white rounded-[8px] my-[5px] border-[#ECEAE9] border-solid border-[1px] shadow-sm hover:border-gray-400 hover:ease-out duration-200 cursor-pointer p-[10px]"
                    onClick={(e) => {
                      setCardDetail(card);
                      cardDetailModal();
                    }}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <span className="break-normal max-w-[270px] break-words flex min-w-0">
                      <GoCheckCircle className="text-[18px] w-[18px] h-[18px] mr-[5px] mt-[2px]" />
                      <div className="break-words w-[230px] max-h-[100px] textarea-cards text-ellipsis overflow-hidden">
                        {card.title}
                      </div>
                    </span>
                    <div className="mt-[10px]">
                      {card.User && card.User.profileImage ? (
                        card.User.profileImage
                      ) : (
                        <div className="text-[10px] rounded-[50%] bg-yellow-300 h-[25px] w-[25px] flex items-center justify-center border-[1px] border-[#c3c3c3]">
                          {card.User && card.User.firstName[0].toUpperCase()}
                          {card.User && card.User.lastName[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Draggable>
            );
          })
        : null}
    </>
  );
}

export default BoardCards;
