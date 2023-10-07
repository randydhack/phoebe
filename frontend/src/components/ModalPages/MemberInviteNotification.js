import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./MemberInviteNotification.css";

function MemberInviteNotification({ member, setMember }) {
  const [transition, setTransition] = useState(true);
  const show = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    transition: { ease: "easeOut", duration: 0.5 },
  };

  const hide = {
    animate: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
    transition: { ease: "easeOut", duration: 1 },
  };

    useEffect(() => {
      setTimeout(() => {
        setTransition(false);
      }, 3000);

      setTimeout(() => {
        setMember(null);
      }, 4000);
    }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="absolute bottom-3 left-3 z-[10000] bg-white rounded-xl"
        variants={transition ? show : hide}
        initial="initial"
        animate="animate"
        transition="transition"
      >
        <div className="invite-notification-content">
          <div className="rounded-[50%] h-[35px] w-[35px] bg-yellow-300 text-[14px] flex items-center justify-center border-[#c3c3c3] border">
            <div className="w-[35px] flex items-center justify-center">
              {member.User.firstName[0].toUpperCase()}
              {member.User.lastName[0].toUpperCase()}
            </div>
          </div>
          <div>
            <div className="capitalize">
              {member.User.firstName} {member.User.lastName}
            </div>
            <div>has been invited</div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default MemberInviteNotification;
