import { useContext, useEffect, useState, useRef } from "react";
import { InfoContext } from "../../../../context/InfoContext";
import { useDispatch, useSelector } from "react-redux";
import { getCommentByCardIdThunk } from "../../../../store/comments";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";

import "./Comments.css";

function CardComments() {
  const dispatch = useDispatch();
  const { cardDetail, bottomEl } = useContext(InfoContext);
  const comments = Object.values(useSelector((state) => state.comments));

  useEffect(() => {
    (async () => {
      await dispatch(getCommentByCardIdThunk(cardDetail.id));
    })();
  }, [dispatch]);

  return (
    comments && (
      <div className="bg-[#F9F8F8] w-full">
        <div className="px-[22px]">
          <div className=" text-[#6e6d6f] font-medium pt-[20px] text-[14px]">
            Comments
          </div>
          <div className="py-[20px]">
            <div className="mb-[15px]">
              <div className="flex items-center">
                <div className="text-[12px] rounded-[50%] bg-yellow-300 h-[32px] w-[32px] flex items-center justify-center border-[1px] border-[#c3c3c3] text-black">
                  {cardDetail.User.firstName[0].toUpperCase()}
                  {cardDetail.User.lastName[0].toUpperCase()}
                </div>
                <div className="ml-[10px]">
                  <div className="font-medium">
                    {cardDetail.User.firstName} {cardDetail.User.lastName}{" "}
                    <span className="text-[#6e6d6f]">created this task.</span>
                    <span className="text-[#6e6d6f] text-[12px] font-normal">
                      {" "}
                      {moment(cardDetail.createdAt).format(
                        "MMM Do, YYYY"
                      )} at {moment(cardDetail.createdAt).format("LT")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {comments.map((comment, i) => {
              return (
                <div
                  key={`${comment.id}${i}`}
                  className="flex items-center hover-comment"
                >
                  <div className="flex my-[10px] w-full">
                    <div className="mt-[2px]">
                      <div className="text-[12px] rounded-[50%] bg-yellow-300 h-[32px] w-[32px] flex items-center justify-center border-[1px] border-[#c3c3c3] text-black">
                        {comment["User.firstName"][0].toUpperCase()}
                        {comment["User.lastName"][0].toUpperCase()}
                      </div>
                    </div>
                    <div className="ml-[10px]">
                      <div className="font-medium flex justify-between">
                        <div>
                          {comment["User.firstName"]} {comment["User.lastName"]}
                          <span className="text-[#6e6d6f] text-[12px] font-normal">
                            {" "}
                            {moment(comment.createdAt).format(
                              "MMM Do, YYYY"
                            )}{" "}
                            at {moment(comment.createdAt).format("LT")}
                          </span>
                        </div>
                        <div className="comment-options cursor-pointer hover:bg-[#ECEAE9] p-[3px] rounded-[3px]">
                          <BsThreeDots />
                        </div>
                      </div>
                      <div className="w-[500px] whitespace-break-spaces break-words overflow text-clip">
                        {comment.comment}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomEl}></div>
          </div>
        </div>
      </div>
    )
  );
}

export default CardComments;
