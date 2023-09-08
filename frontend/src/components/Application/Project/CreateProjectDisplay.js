import { BsPlus, BsThreeDots } from "react-icons/bs";
import { GoCheckCircle } from "react-icons/go";

function CreateProjectDisplay({ name }) {
  return (
    <div className="bg-white w-[1010px] h-full ml-[60px] rounded-[10px] border-[#F5F3F3] border shadow-[0_0_0_1px_#edeae9,_0_5px_20px_0_rgba(109,_110,_111,_0.08)] cursor-default">
      <div className="w-full border-b border-[#F5F3F3]">
        <div className="p-[20px] pb-0">
          <div className="flex">
            <div className="mr-[20px] w-[45px] h-[45px] rounded-[10px] flex justify-start bg-[#F5F3F3]"></div>
            <div>
              {name ? (
                <div className="font-medium text-[18px] w-[750px] truncate">
                  {name}
                </div>
              ) : (
                <div className="opacity-0 text-[18px]">.</div>
              )}
              <div className="text-[#3F6AC4] border-b-4 border-[#3F6AC4] w-fit font-semibold pb-[10px]">
                Board
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F9F8F8] h-[495px] rounded-b-[10px] p-[20px]">
        <div className="flex">
          <div className="w-[300px] mr-5">
            <div className="flex justify-between">
              <div className="text-[16px] font-semibold ">To do</div>
              <div className="flex items-center justify-center">
                <BsPlus className="text-[24px] mr-1" />
                <BsThreeDots className="text-[18px]" />
              </div>
            </div>
            <div>
              <div className="bg-white rounded-[8px] h-[120px] p-[12px] border-[#ECEAE9] flex flex-col justify-betweenborder-solid border-[1px] shadow-sm mt-3">
                <span className="flex">
                  <div className="flex justify-center">
                    <GoCheckCircle className="text-[18px] w-[18px] h-[18px] mr-3 mt-[2px]" />
                  </div>
                  <div>
                    <div className="bg-[#F5F3F3] w-[240px] h-[10px] rounded-lg my-1"></div>
                    <div className="bg-[#F5F3F3] w-[240px] h-[10px] rounded-lg my-1"></div>
                    <div className="bg-[#F5F3F3] w-[240px] h-[10px] rounded-lg my-1"></div>
                  </div>
                </span>
                <div className="mt-[10px] h-full flex items-end">
                  <div className="flex items-center justify-center">
                    <div className="rounded-[50%] bg-[#D1AFDB] mr-3 text-white h-[25px] w-[25px] text-[10px] flex items-center justify-center">
                      RH
                    </div>
                    <div className="bg-[#F5F3F3] w-[200px] h-[10px] rounded-lg"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[8px] h-[120px] p-[12px] border-[#ECEAE9] flex flex-col justify-betweenborder-solid border-[1px] shadow-sm mt-3">
                <span className="flex">
                  <div className="flex justify-center">
                    <GoCheckCircle className="text-[18px] w-[18px] h-[18px] mr-3 mt-[2px]" />
                  </div>
                  <div>
                    <div className="bg-[#F5F3F3] w-[240px] h-[10px] rounded-lg my-1"></div>
                    <div className="bg-[#F5F3F3] w-[240px] h-[10px] rounded-lg my-1"></div>
                  </div>
                </span>
                <div className="mt-[10px] h-full flex items-end">
                  <div className="flex items-center justify-center">
                    <div className="rounded-[50%] bg-[#5C2B2D] mr-3 text-white h-[25px] w-[25px] text-[10px] flex items-center justify-center">
                      HN
                    </div>
                    <div className="bg-[#F5F3F3] w-[200px] h-[10px] rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[300px] mr-5">
            <div className="flex justify-between">
              <div className="text-[16px] font-semibold ">In Progress</div>
              <div className="flex items-center justify-center">
                <BsPlus className="text-[24px] mr-1" />
                <BsThreeDots className="text-[18px]" />
              </div>
            </div>
            <div>
              <div className="bg-white rounded-[8px] h-[120px] p-[12px] border-[#ECEAE9] flex flex-col justify-betweenborder-solid border-[1px] shadow-sm mt-3">
                <span className="flex">
                  <div className="flex justify-center">
                    <GoCheckCircle className="text-[18px] w-[18px] h-[18px] mr-3 mt-[2px]" />
                  </div>
                  <div>
                    <div className="bg-[#F5F3F3] w-[240px] h-[10px] rounded-lg my-1"></div>
                    <div className="bg-[#F5F3F3] w-[240px] h-[10px] rounded-lg my-1"></div>
                    <div className="bg-[#F5F3F3] w-[240px] h-[10px] rounded-lg my-1"></div>
                  </div>
                </span>
                <div className="mt-[10px] h-full flex items-end">
                  <div className="flex items-center justify-center">
                    <div className="rounded-[50%] bg-[#FBAD15] mr-3 text-white h-[25px] w-[25px] text-[10px] flex items-center justify-center">
                      JA
                    </div>
                    <div className="bg-[#F5F3F3] w-[200px] h-[10px] rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[300px]">
            <div className="flex justify-between">
              <div className="text-[16px] font-semibold ">Completed</div>
              <div className="flex items-center justify-center">
                <BsPlus className="text-[24px] mr-1" />
                <BsThreeDots className="text-[18px]" />
              </div>
            </div>
            <div>
              <div className="bg-white rounded-[8px] h-[120px] p-[12px] border-[#ECEAE9] flex flex-col justify-betweenborder-solid border-[1px] shadow-sm mt-3">
                <span className="flex">
                  <div className="flex justify-center">
                    <GoCheckCircle className="text-[18px] w-[18px] h-[18px] mr-3 mt-[2px]" />
                  </div>
                  <div>
                    <div className="bg-[#F5F3F3] w-[240px] h-[10px] rounded-lg my-1"></div>
                    <div className="bg-[#F5F3F3] w-[240px] h-[10px] rounded-lg my-1"></div>
                    <div className="bg-[#F5F3F3] w-[240px] h-[10px] rounded-lg my-1"></div>
                  </div>
                </span>
                <div className="mt-[10px] h-full flex items-end">
                  <div className="flex items-center justify-center">
                    <div className="rounded-[50%] bg-[#096625] mr-3 text-white h-[25px] w-[25px] text-[10px] flex items-center justify-center">
                      AF
                    </div>
                    <div className="bg-[#F5F3F3] w-[200px] h-[10px] rounded-lg"></div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-[8px] h-[120px] p-[12px] border-[#ECEAE9] flex flex-col justify-betweenborder-solid border-[1px] shadow-sm mt-3">
                <span className="flex">
                  <div className="flex justify-center">
                    <GoCheckCircle className="text-[18px] w-[18px] h-[18px] mr-3 mt-[2px]" />
                  </div>
                  <div>
                    <div className="bg-[#F5F3F3] w-[240px] h-[10px] rounded-lg my-1"></div>
                    <div className="bg-[#F5F3F3] w-[240px] h-[10px] rounded-lg my-1"></div>
                  </div>
                </span>
                <div className="mt-[10px] h-full flex items-end">
                  <div className="flex items-center justify-center">
                    <div className="rounded-[50%] bg-[#D1AFDB] mr-3 text-white h-[25px] w-[25px] text-[10px] flex items-center justify-center">
                      RH
                    </div>
                    <div className="bg-[#F5F3F3] w-[200px] h-[10px] rounded-lg"></div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-[8px] h-[120px] p-[12px] border-[#ECEAE9] flex flex-col justify-betweenborder-solid border-[1px] shadow-sm mt-3">
                <span className="flex">
                  <div className="flex justify-center">
                    <GoCheckCircle className="text-[18px] w-[18px] h-[18px] mr-3 mt-[2px]" />
                  </div>
                  <div>
                    <div className="bg-[#F5F3F3] w-[240px] h-[10px] rounded-lg my-1"></div>
                    <div className="bg-[#F5F3F3] w-[240px] h-[10px] rounded-lg my-1"></div>
                    <div className="bg-[#F5F3F3] w-[240px] h-[10px] rounded-lg my-1"></div>
                  </div>
                </span>
                <div className="mt-[10px] h-full flex items-end">
                  <div className="flex items-center justify-center">
                    <div className="rounded-[50%] bg-[#94CFDC] mr-3 text-white h-[25px] w-[25px] text-[10px] flex items-center justify-center">
                      WV
                    </div>
                    <div className="bg-[#F5F3F3] w-[200px] h-[10px] rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectDisplay;
