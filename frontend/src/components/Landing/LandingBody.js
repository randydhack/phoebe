import { GoCheckCircle } from "react-icons/go";

function LandingBody({ resize }) {
  return (
    <div className="bg-white w-full relative h-full flex items-center z-[3]">
      <div
        className={`${
          resize ? "flex flex-col items-center" : "grid-body grid"
        } px-[150px] w-full py-[50px]`}
      >
        {/* CARD DISPLAY */}
        <div
          className={`${
            resize ? "w-[550px]" : "pr-[10px] w-full"
          } flex justify-center flex-col items-center`}
        >
          {/* CARD ONE */}
          <div
            className={`${
              resize
                ? "flex justify-start w-full"
                : "flex justify-center w-full"
            }`}
            initial={{ opacity: 0, x: -100 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ opacity: 1, ease: "easeOut", duration: 1.5 }}
          >
            <div className="bg-white rounded-[8px] h-[120px] w-[300px] p-[12px] border-[#ECEAE9] flex flex-col justify-between border-solid border-[1px] shadow-sm mt-3">
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
                  <div className="bg-[#F5F3F3] w-[200px] h-[10px] rounded-lg flex items-center">
                    Randy Hac
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="w-full flex justify-end">
            <div className="bg-white rounded-[8px] h-[120px] w-[300px] p-[12px] border-[#ECEAE9] flex flex-col justify-end border-solid border-[1px] shadow-sm mt-3">
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
                  <div className="bg-[#F5F3F3] w-[200px] h-[10px] rounded-lg flex items-center">
                    Randy Hac
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          {/* <div className="w-full flex justify-start"> */}
          <div
            className={`${
              resize
                ? "flex justify-start w-full"
                : "flex  justify-center w-full"
            }`}
          >
            <div className="bg-white rounded-[8px] h-[120px] w-[300px] p-[12px] border-[#ECEAE9] flex flex-col justify-end border-solid border-[1px] shadow-sm mt-3">
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
                  <div className="bg-[#F5F3F3] w-[200px] h-[10px] rounded-lg flex items-center">
                    Randy Hac
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="pl-[20px] flex flex-col items-center justify-center text-center"
          style={{
            paddingTop: `${resize ? "20px" : ""}`,
            paddingLeft: `${resize ? "0px" : ""}`,
          }}
        >
          <div className="text-[24px] font-light text-left">Board Tasks</div>
          <div className="text-[16px] font-extralight">
            Make it easy for your team to focus on tasks currently at hand.
            Define each stage of work to see what's important and where things
            are getting stuck.
          </div>
        </div>
      </div>
      {/* <div className="w-full bg-[#2A2B2C] h-[100px] text-white flex justify-between px-[20px] ">
        <div className="mt-[10px] flex justify-between w-full">
          <div>Phoebe 2023</div>
          <div>Developer : Randy Hac</div>
          <div className="flex">
            <div>linkedin</div>
            <div>github</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default LandingBody;
