import { useContext } from "react";
import { InfoContext } from "../../../../context/InfoContext";
import moment from 'moment'

function CardComments({ comments }) {

    const { cardDetail } = useContext(InfoContext)

  return (
    <div className="bg-[#F9F8F8] w-full">
      <div className="px-[22px]">
        <div className=" text-[#6e6d6f] font-medium pt-[20px] text-[14px]">
          Comments
        </div>
        <div className="py-[20px]">
            <div>
            <div className="flex">
                  <div className="text-[12px] rounded-[50%] bg-yellow-300 h-[32px] w-[32px] flex items-center justify-center border-[1px] border-[#c3c3c3] text-black">
                    {cardDetail.User.firstName[0].toUpperCase()}
                    {cardDetail.User.lastName[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium">
                        {cardDetail.User.firstName} {cardDetail.User.lastName} <span className="text-[#6e6d6f]">created this task.
                        </span><span className="text-[#6e6d6f] text-[12px] font-normal"> {moment(cardDetail.createdAt).format('MMM Do, YYYY')} at {moment(cardDetail.createdAt).format('LT')}</span>
                    </div>
                  </div>
                </div>
            </div>
          {comments.map((comment, i) => {
            return (
              <div key={`${comment.id}${i}`}>
                <div className="flex">
                  <div className="text-[12px] rounded-[50%] bg-yellow-300 h-[32px] w-[32px] flex items-center justify-center border-[1px] border-[#c3c3c3] text-black">
                    {comment.User.firstName[0].toUpperCase()}
                    {comment.User.lastName[0].toUpperCase()}
                  </div>
                  <div>
                    <div>
                        {comment.User.firstName} {comment.User.lastName}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CardComments;
