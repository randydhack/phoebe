import React, { useContext, useEffect } from "react";
import { ModalContext } from "../../context/Modal";
import "./modal.css";
import AddMemberModal from "../ModalPages/AddMemberModal";
import CardDetails from "../ModalPages/CardDetails";
import MemberListModal from "../ModalPages/MemberListModal";
import DeleteLeaveProjectModal from "../ModalPages/DeleteLeaveProjectModal";
import MemberInviteNotification from "../ModalPages/MemberInviteNotification";
import { InfoContext } from "../../context/InfoContext";

export default function Modal(props) {
  const { type, setType } = useContext(ModalContext);
  const { member, setMember } = useContext(InfoContext)

  let content = null;

  const handleContent = () => {
    setType(null);
  };

  // Allows ESC key to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) handleContent();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (type) {
    content = (
      <div className="modalWrapper">
        {member && <MemberInviteNotification member={member} setMember={setMember}/>}
        <div className="modalContent">
          <div className="closeButtonWrapper"></div>
          {/* EXAMPLE HOW TO SET UP A MODAL PAGE */}
          {type === "Add Member" && <AddMemberModal />}
          {type === 'Card Details' && <CardDetails />}
          {type === 'Member List' && <MemberListModal />}
          {type === 'Leave Delete' && <DeleteLeaveProjectModal />}
        </div>
        <div className="modalBackdrop" onClick={handleContent} />
      </div>
    );
  }
  return <>{content}</>;
}
