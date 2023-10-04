import { GoCheckCircle } from "react-icons/go";
import { motion } from "framer-motion";

const cardAnimationLeft = {
  initial: { opacity: 0, x: -100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.05 * 1,
      duration: 1,
    },
    threshold: 3,
  },
};

const cardAnimationRight = {
  initial: { opacity: 0, x: 100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.05 * 0,
      duration: 1,
    },
    threshold: 3,
  },
};

const cardDescriptionAnimation = {
  initial: { opacity: 0, y: -100 },
  animate: (idx)=>({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.02 * idx,
    },
  }),
};

function LandingBody({ resize }) {
  return (
    <div className="bg-[#EDEBEA] w-full relative h-full flex items-center z-[3]">
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
          <motion.div
            className={`${
              resize
                ? "flex justify-start w-full"
                : "flex justify-center w-full"
            }`}
            variants={cardAnimationLeft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-[8px] h-[120px] w-[300px] p-[12px] border-[#ECEAE9] flex flex-col justify-between border-solid border-[1px] shadow-sm mt-3">
              <span className="flex">
                <div className="flex justify-center">
                  <GoCheckCircle className="text-[18px] w-[18px] h-[18px] mr-3 mt-[2px]" />
                </div>
                <div>
                  <div className="w-[240px] h-[10px] rounded-lg">Implement real time messaging between users</div>
                </div>
              </span>
              <div className="mt-[10px] h-full flex items-end">
                <div className="flex items-center justify-center">
                  <div className="rounded-[50%] bg-[#6C7059] mr-3 text-white h-[25px] w-[25px] text-[10px] flex items-center justify-center">BW</div>
                  <div className="w-[200px] h-[10px] rounded-lg flex items-center">Bruce Wayne</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            className="w-full flex justify-end"
            variants={cardAnimationRight}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-[8px] h-[120px] w-[300px] p-[12px] border-[#ECEAE9] flex flex-col justify-end border-solid border-[1px] shadow-sm mt-3">
              <span className="flex">
                <div className="flex justify-center">
                  <GoCheckCircle className="text-[18px] w-[18px] h-[18px] mr-3 mt-[2px]" />
                </div>
                <div>
                  <div className="w-[240px] h-[10px] rounded-lg">Set up lead generation campaign tracking</div>
                </div>
              </span>
              <div className="mt-[10px] h-full flex items-end">
                <div className="flex items-center justify-center">
                  <div className="rounded-[50%] bg-[#C93C20] mr-3 text-white h-[25px] w-[25px] text-[10px] flex items-center justify-center">RS</div>
                  <div className="w-[200px] h-[10px] rounded-lg flex items-center">Ron Stewart</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className={`${
              resize
                ? "flex justify-start w-full"
                : "flex  justify-center w-full"
            }`}
            variants={cardAnimationLeft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-[8px] h-[120px] w-[300px] p-[12px] border-[#ECEAE9] flex flex-col justify-end border-solid border-[1px] shadow-sm mt-3">
              <span className="flex">
                <div className="flex justify-center">
                  <GoCheckCircle className="text-[18px] w-[18px] h-[18px] mr-3 mt-[2px]" />
                </div>
                <div>
                  <div className="w-[240px] h-[10px] rounded-lg">Redesign and launch updated web application</div>
                </div>
              </span>
              <div className="mt-[10px] h-full flex items-end">
                <div className="flex items-center justify-center">
                  <div className="rounded-[50%] bg-[#2C5545] mr-3 text-white h-[25px] w-[25px] text-[10px] flex items-center justify-center">MP</div>
                  <div className=" w-[200px] h-[10px] rounded-lg flex items-center">Mary Poppin</div>
                </div>
              </div>
            </div>
          </motion.div>
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
            {`Make it easy for your team to focus on tasks currently at hand.
            Define each stage of work to see what's important and where things
            are getting stuck.`
              .split('')
              .map((char, idx) => {
                return (
                  <motion.span
                    key={idx}
                    variants={cardDescriptionAnimation}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    custom={idx}
                  >
                    {char}
                  </motion.span>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingBody;
