import { useContext, useState } from "react";
import { InfoContext } from "../../../../context/InfoContext";
import { useDispatch } from "react-redux";
import { createCommentThunk } from "../../../../store/comments";

function CreateCardComments() {
  const dispatch = useDispatch()
  const { cardDetail, bottomEl } = useContext(InfoContext);

  const [comment, setComment ] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    await dispatch(createCommentThunk(cardDetail.id, comment.trim()))
    bottomEl?.current?.scrollIntoView({ behavior: 'smooth' })
    setComment('')
  }

  const handleChange = (e) => {
    if (e.key === "Enter") {
      handleCommentSubmit(e)
    }
  }

  return (
    <div className="border-[#ECEAE9] border-t-[1px] w-full flex py-[10px] px-[20px] bg-[#F9F8F8] shadow-[0px_-1px_3px_rgba(0,0,0,0.10)]">
      <div className="mr-[20px]">
        {cardDetail.User.profileImage ? (
          <img
            src={cardDetail.User.profileImage}
            className="rounded-[50%] h-[30px] w-[30px] border-[1px] border-[#c3c3c3]"
          />
        ) : (
          <div className="text-[12px] rounded-[50%] bg-yellow-300 h-[30px] w-[30px] flex items-center justify-center border-[1px] border-[#c3c3c3] text-black">
            {cardDetail.User.firstName[0].toUpperCase()}
            {cardDetail.User.lastName[0].toUpperCase()}
          </div>
        )}
      </div>
        <textarea
          placeholder="Add a comment"
          className="resize-none h-[150px] w-full border-[#c3c1c0] border-[1px] border-transparent rounded-[8px] outline-none mx-[-10px] p-[10px] leading-[1.5]"
          value={comment}
          onBlur={e => {
            if (comment.trim().length < 1) {
              setComment('')
              }
            }
          }
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (comment.trim().length > 0) {
              handleChange(e)}}
            }
        />
    </div>
  );
}

export default CreateCardComments;
