import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { getProjectSectionsThunk } from "../../../../store/sections";
import { HiPlus } from "react-icons/hi";
import { GoCheckCircle } from "react-icons/go";

function ProjectBoard() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const sections = Object.values(useSelector((state) => state.sections));

  useEffect(() => {
    dispatch(getProjectSectionsThunk(id));
  }, [id]);

  console.log(sections);

  return (
    <div className="pt-[20px] px-[10px] h-full flex bg-[#F9F8F8]">
      {sections.map((section, i) => {
        return (
          <div
            key={i}
            className="h-full w-[300px] mx-[10px] rounded-[5px] flex flex-col items-center border-[#ECEAE9] border-solid border-[1px]"
          >
            <div className="flex items-center justify-between p-[10px] w-full">
              <p className="font-medium text-[16px]">{section.name}</p>
              <div className="flex">
                <HiPlus className="mr-[10px] cursor-pointer" />
                <BsThreeDots className="cursor-pointer" />
              </div>
            </div>
            <div className="overflow-x-hidden overflow-y-scroll">
              {section.Cards.map((card, i) => {
                return (
                  <div className="w-[280px] bg-white rounded-[8px] h-fit my-[5px] border-[#ECEAE9] border-solid border-[1px] shadow-sm hover:border-gray-400 hover:ease-out duration-200 cursor-pointer p-[10px]">
                    <span className="break-normal max-w-[270px] break-words">
                      <GoCheckCircle className="text-[18px] mr-[5px]" />
                      kdjasldkj
                      sadliwkdsajdaklsdjaskdjlsakdjlksajdlksajdkasjkldasldjaskldjksaljdklasjdlkasjdlj
                    </span>
                    <div>
                      {card.User.profileImage ? (
                        card.User.profileImage
                      ) : (
                        <div className="text-[10px] rounded-[50%] bg-yellow-300 h-[25px] w-[25px] flex items-center justify-center border-[1px] border-[#c3c3c3] ml-[10px]">
                          {card.User.firstName[0].toUpperCase()}
                          {card.User.lastName[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectBoard;
