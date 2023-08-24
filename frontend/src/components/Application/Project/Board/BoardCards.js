
import { GoCheckCircle } from "react-icons/go";
function BoardCards ({ section }) {

    return (
        <>{section.Cards.map((card, i) => {
            return (
              <div
                key={i}
                className="w-[280px] bg-white rounded-[8px] h-fit my-[5px] border-[#ECEAE9] border-solid border-[1px] shadow-sm hover:border-gray-400 hover:ease-out duration-200 cursor-pointer p-[10px]"
              >
                <span className="break-normal max-w-[270px] break-words flex">
                  <span>
                    <GoCheckCircle className="text-[18px] w-[18px] h-[18px] mr-[5px] mt-[2px]" />
                  </span>
                  <span className="break-words max-w-[230px] overflow-scroll h-[100px]">
                    {card.title}{" "}
                    dasdksjadlkasjdklasjdksaldjasdklasjdlksajdlsajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldassajdklajkldas
                  </span>
                </span>
                <div className="mt-[10px]">
                  {card.User.profileImage ? (
                    card.User.profileImage
                  ) : (
                    <div className="text-[10px] rounded-[50%] bg-yellow-300 h-[25px] w-[25px] flex items-center justify-center border-[1px] border-[#c3c3c3]">
                      {card.User.firstName[0].toUpperCase()}
                      {card.User.lastName[0].toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}</>
    )
}

export default BoardCards;
