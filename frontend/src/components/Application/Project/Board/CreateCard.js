import { useState } from "react";
import { GoCheckCircle } from "react-icons/go";
import { useSelector } from "react-redux";

function CreateCard(props) {

    const {resize, i, section, setTitle, title } = props
    const user = useSelector(state => state.session.user)

    const cardHandleSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <>
      <form className="w-[280px] h-auto bg-white rounded-[8px] my-[5px] border-solid border-[1px] shadow-sm border-gray-400 hover:ease-out duration-200 cursor-pointer p-[10px]">
        <div className="flex">
          <span>
            <GoCheckCircle className="text-[18px] w-[18px] h-[18px] mr-[5px] mt-[2px]" />
          </span>
          <span
            className="textarea break-words max-w-[230px] max-h-[100px] outline-none w-[240px] inline-block"
            role="textbox"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              resize();
            }}
            contentEditable
          ></span>
        </div>
        <div className="mt-[10px] flex justify-between">
          {user.profileImage ? (
            <div className="rounded-[50%] h-[25px] w-[25px] border-[1px] border-[#c3c3c3]">{user.profileImage}</div>
          ) : (
            <div className="text-[10px] rounded-[50%] bg-yellow-300 h-[25px] w-[25px] flex items-center justify-center border-[1px] border-[#c3c3c3]">
              {user.firstName[0].toUpperCase()}
              {user.lastName[0].toUpperCase()}
            </div>
          )}
          <div onClick={e => cardHandleSubmit(e)} className="hover:bg-gray-500">create task</div>
        </div>
      </form>
    </>
  );
}

export default CreateCard;
