import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProjectThunk } from "../../store/projects";
import { leaveProjectThunk } from "../../store/members";

import "./DeleteLeaveProjectModal.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { InfoContext } from "../../context/InfoContext";
import { ModalContext } from "../../context/Modal";
import { IoMdClose } from "react-icons/io";

function DeleteLeaveProjectModal() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { project } = useContext(InfoContext);
  const { setType } = useContext(ModalContext);
  const user = useSelector((state) => state.session.user);

  const handleDeleteProject = async () => {
    await dispatch(deleteProjectThunk(project.id));
    setType(null);
    return history.push("/home");
  };

  const handleLeaveProject = async () => {
    await dispatch(leaveProjectThunk(project.id));
    setType(null);
    return history.push("/home");
  };

  return (
    <div className="leave-delete-wrapper">
      <div className="leave-delete-header">
        <h2 className="w-full truncate text-[20px]">
          Delete the "{project.name}" project?
        </h2>{" "}
        <IoMdClose className="text-xl cursor-pointer" onClick={e => setType(null)}/>
      </div>
      <div className="leave-delete-item-wrapper">
        <ul>
          <li>This will delete the project, along with any:</li>
          <ul className="leave-delete-ul">
            <li>Unassigned tasks that are only in this project</li>
            <li>Custom fields that are local to this project</li>
            <li>Removal of all members</li>
            <li>Section templates in this project</li>
          </ul>
        </ul>
      </div>
      <div className="leave-delete-buttons">
        <div
        onClick={e =>setType(null)}
          className="border px-[14px] h-[36px] items-center border-[#cfcbcb] bg-[#fff] text-[#1e1f21] fill-[#6d6e6f] flex rounded-[5px] cursor-pointer"
        >
          Cancel
        </div>
        {user.id !== project.userId ? (
          <div className="border px-[14px] h-[36px] items-center border-[#d33e5d] bg-[#d33e5d] text-[#fff] fill-[#6d6e6f] rounded-[5px] flex cursor-pointer"onClick={handleLeaveProject} >
            Leave
          </div>
        ) : (
          <div className="border px-[14px] h-[36px] items-center border-[#d33e5d] bg-[#d33e5d] text-[#fff] fill-[#6d6e6f] rounded-[5px] flex cursor-pointer" onClick={handleDeleteProject}>
            Delete
          </div>
        )}
      </div>
    </div>
  );
}

export default DeleteLeaveProjectModal;
