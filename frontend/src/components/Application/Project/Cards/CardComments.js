import { useContext, useEffect, useState, useRef } from "react";
import { InfoContext } from "../../../../context/InfoContext";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommentThunk,
  getCommentByCardIdThunk,
  updateCommentThunk,
} from "../../../../store/comments";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";
import CreateCardComments from "./CreateCardComments";
import { IoCloseOutline } from "react-icons/io5";

import "./Comments.css";
import { ModalContext } from "../../../../context/Modal";

function CardComments() {
  const dispatch = useDispatch();
  const { cardDetail, bottomEl, setCardDetail } = useContext(InfoContext);
  const { setType } = useContext(ModalContext);
  const comments = Object.values(useSelector((state) => state.comments));
  const user = useSelector((state) => state.session.user);

  const commentRef = useRef();
  const outsideRef = useRef(null);

  const [commentDropdown, setCommentDropdown] = useState({
    commentId: null,
    active: false,
  });
  const [editComment, setEditComment] = useState({
    commentId: null,
    active: false,
    comment: null,
  });
  const [editCommentUnshow, setEditCommentUnshow] = useState(true);

  useEffect(() => {
    (async () => {
      await dispatch(getCommentByCardIdThunk(cardDetail.id));
    })();
  }, [dispatch, cardDetail]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [commentDropdown]);

  const handleClickOutside = async (event) => {
    if (commentRef.current && commentRef.current.contains(event.target)) {
      return;
    }
    if (outsideRef.current && !outsideRef.current.contains(event.target)) {
      setCommentDropdown({ commentId: null, active: false });
    }
  };

  const handleDeleteComment = async (e, comment) => {
    e.preventDefault();
    await dispatch(deleteCommentThunk(comment));
    await dispatch(getCommentByCardIdThunk(cardDetail.id));
    setCommentDropdown({ commentId: null, active: false });
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    await dispatch(
      updateCommentThunk(editComment.commentId, editComment.comment.trim())
    );
    await dispatch(getCommentByCardIdThunk(cardDetail.id));
    setEditComment({ commentId: null, active: false, comment: null });
    setEditCommentUnshow(true);
  };

  return (
    comments && (
      <div className="bg-[#F9F8F8] rounded-r-[10px]">
        <div className=" h-[300px] overflow-auto ">
          <div className="px-[22px]">
            <div className=" text-[#6e6d6f] font-medium pt-[20px] text-[14px] flex justify-between relative">
              <div>Comments</div>
              <IoCloseOutline
                className="text-[20px] cursor-pointer absolute right-0"
                onClick={(e) => setType(null)}
              />
            </div>
            <div className="py-[20px] ">
              <div className="mb-[15px] flex justify-between w-[542px]">
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
                <div className="opacity-0">dsad</div>
              </div>
              {comments.map((comment, i) => {
                return (
                  <div
                    key={`${comment.id}${i}`}
                    className="flex items-center hover-comment"
                  >
                    <div className="flex my-[10px]">
                      <div className="mt-[2px]">
                        <div className="text-[12px] rounded-[50%] bg-yellow-300 h-[32px] w-[32px] flex items-center justify-center border-[1px] border-[#c3c3c3] text-black">
                          {comment["User.firstName"][0].toUpperCase()}
                          {comment["User.lastName"][0].toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-[10px]">
                        <div className="font-medium flex justify-between">
                          <div>
                            {comment["User.firstName"]}{" "}
                            {comment["User.lastName"]}
                            <span className="text-[#6e6d6f] text-[12px] font-normal">
                              {" "}
                              {moment(comment.createdAt).format(
                                "MMM Do, YYYY"
                              )}{" "}
                              at {moment(comment.createdAt).format("LT")}
                            </span>
                          </div>
                          {user.id === comment.userId && editCommentUnshow && (
                            <div
                              className={`${
                                commentDropdown.active &&
                                commentDropdown.commentId === comment.id
                                  ? "block"
                                  : "comment-options"
                              } cursor-pointer hover:bg-[#ECEAE9] p-[3px] rounded-[px] relative`}
                              forwardref={commentRef}
                              onClick={(e) =>
                                setCommentDropdown({
                                  commentId: comment.id,
                                  active: true,
                                })
                              }
                            >
                              <BsThreeDots />
                              {commentDropdown.active &&
                              commentDropdown.commentId === comment.id ? (
                                <div
                                  className="absolute right-[25px] top-[0px] bg-white border-[#ECEAE9] border-solid border-[1px] w-[184px] rounded-[3px] z-[200] font-normal text-[12px]"
                                  onClick={(e) => e.stopPropagation()}
                                  ref={outsideRef}
                                >
                                  <div
                                    className="w-full flex mt-[4px] px-[15px] py-[5px] hover:bg-[#ECEAE9] items-center text-[#A2A0A2]"
                                    onClick={(e) => {
                                      setEditComment({
                                        commentId: comment.id,
                                        active: true,
                                        comment: comment.comment,
                                      });
                                      setCommentDropdown({
                                        commentId: null,
                                        active: null,
                                      });
                                      setEditCommentUnshow(false);
                                    }}
                                  >
                                    <div className="text-black">
                                      Edit comment
                                    </div>
                                  </div>
                                  <div
                                    className="w-full flex mb-[4px] px-[15px] py-[5px] hover:bg-[#ECEAE9] items-center text-[#A2A0A2]"
                                    onClick={(e) =>
                                      handleDeleteComment(e, comment.id)
                                    }
                                  >
                                    <div className="text-[#c92f54]">
                                      Delete comment
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          )}
                        </div>
                        <div className="w-[500px] whitespace-break-spaces break-words overflow text-clip">
                          {editComment.active &&
                          editComment.commentId === comment.id ? (
                            <>
                              <textarea
                                className="resize-none h-[150px] w-full border-[#c3c1c0] border-[1px] rounded-[8px] outline-none mx-[-10px] p-[10px] leading-[1.5] ml-0"
                                value={editComment.comment}
                                onChange={(e) =>
                                  setEditComment({
                                    commentId: comment.id,
                                    active: true,
                                    comment: e.target.value,
                                  })
                                }
                              />
                              <div className="flex mt-[5px] items-center justify-end">
                                <div
                                  onClick={(e) => {
                                    setEditComment({
                                      commentId: null,
                                      active: false,
                                      comment: null,
                                    });
                                    setEditCommentUnshow(true);
                                  }}
                                  className="mr-[10px] cursor-pointer bg-white text-black px-[8px] py-[3px] rounded-[3px] border-[#c3c1c0] border-[1px] "
                                >
                                  Cancel
                                </div>
                                <div
                                  onClick={(e) => handleUpdateComment(e)}
                                  className="bg-[#4573D0] text-white px-[5px] py-[3px] rounded-[3px] cursor-pointer border-[#4573d2] border-[1px]"
                                >
                                  Save Changes
                                </div>
                              </div>
                            </>
                          ) : (
                            comment.comment
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div ref={bottomEl}></div>
          </div>
        </div>
        <CreateCardComments props={cardDetail} />
      </div>
    )
  );
}

export default CardComments;
