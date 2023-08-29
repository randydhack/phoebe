import { useContext, useState } from "react";
import { InfoContext } from "../../../../context/InfoContext";
import { RxExit } from 'react-icons/rx'

function CardDetails() {
  const { cardDetail, cardRef, setCardDetail } = useContext(InfoContext);
  const [cardTitle, setCardTitle] = useState(cardDetail.title)

  return (
    <div
      className="bg-white border-l-[1px] z-30 absolute right-0 top-0 h-full w-[600px]"
      ref={cardRef}
    >
      <div>
        <div className="flex items-center">
          <input
            type="text"
            value={cardTitle}
            onChange={e => setCardTitle(e.target.value)}
            className="w-full my-[10px] text-[24px] px-[10px] py-[5px] mx-[10px] border-[1px] border-transparent hover:border-[#c3c1c0] rounded-[5px] ease-in duration-100"
          />
          <RxExit className="mr-[30px] text-[24px] cursor-pointer" onClick={e => setCardDetail(null)}/>
        </div>
        <div className="h-[1px] w-full bg-[#ECEAE9]"></div>

        <div>
            assignee
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
