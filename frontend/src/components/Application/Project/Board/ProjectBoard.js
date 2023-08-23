import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { getProjectSectionsThunk } from "../../../../store/sections";

function ProjectBoard() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const sections = Object.values(useSelector((state) => state.sections));

  useEffect(() => {
    dispatch(getProjectSectionsThunk(id));
  }, [id]);

  console.log(sections);

  return (
    <div className="pt-[20px] px-[10px] h-full flex">
      {sections.map((section, i) => {
        return (
          <div
            key={i}
            className="bg-gray-500 h-full w-[300px] mx-[10px] rounded-[5px] flex flex-col items-center"
          >
            <div className="flex items-center justify-between p-[10px] w-full">
              <p className="font-medium text-[16px]">{section.name}</p>
              <BsThreeDots className="cursor-pointer"/>
            </div>

            {section.Cards.map((card, i) => {
              return <div className="w-[280px] rounded-[8px] h-[90px] border-[1px] border-solid border-black my-[5px]">{card.title}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default ProjectBoard;
