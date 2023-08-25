import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoCheckCircle } from "react-icons/go";
import { createCardThunk } from "../../../../store/cards";
import { useParams } from "react-router-dom";

function CreateCard(props) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { resize, i, section, setAddCard } = props;
  const user = useSelector((state) => state.session.user);

  const [ title, setTitle ] = useState('')

  const cardHandleSubmit = async (e) => {
    e.preventDefault();
    // title, sectionId, projectId
    if (title.length !== 0) {
        await dispatch(createCardThunk(title, section.id, id));
    }
  };

  console.log(title)

  return (
    <>
      <form className="w-[280px] h-auto bg-white rounded-[8px] my-[5px] border-solid border-[1px] shadow-sm border-gray-400 hover:ease-out duration-200 p-[10px]">
        <div className="flex">
          <span>
            <GoCheckCircle className="text-[18px] w-[18px] h-[18px] mr-[5px] mt-[2px] cursor-default" />
          </span>
          <textarea
            className="textarea break-words max-w-[230px] h-auto resize-none max-h-[100px] outline-none w-[240px] inline-block cursor-text createCard"
            type='text'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              resize();
            }}
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
          <div
            onClick={(e) => {
              cardHandleSubmit(e);
              setAddCard({id: null, status: false})
            }}
            className="hover:bg-gray-500 cursor-pointer"
          >
            create task
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateCard;
