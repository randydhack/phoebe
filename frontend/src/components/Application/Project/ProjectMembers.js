import { AiOutlinePlus } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { ModalContext } from "../../../context/Modal";
import { InfoContext } from "../../../context/InfoContext";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectMembersThunk } from "../../../store/members";
import "./ProjectMember.css";

function ProjectMembers({ project }) {
  const dispatch = useDispatch();
  const { addMemberModal, memberListModal } = useContext(ModalContext);
  const { setProject } = useContext(InfoContext);
  const members = Object.values(useSelector((state) => state.members));
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllProjectMembersThunk(project.id));
  }, [project]);

  return (
    <div className="mt-[30px] ml-[10px] mb-[10px]">
      <div className="flex items-center justify-between">
        <div className="mr-[5px] font-medium text-[18px] ">Project Roles</div>
        <div className="text-[12px] text-blue-500 hover:underline cursor-pointer" onClick={e=> {memberListModal(); setProject(project)}}>see all</div>
      </div>
      <div className="grid member-grid w-[100%] box-content h-[80px] items-center">
        {user.id === project.ownerId && (
          <div
            className="hover:bg-[#e3e3e35a] p-[10px] rounded-[10px] cursor-pointer"
            onClick={(e) => {
              addMemberModal();
              setProject(project);
            }}
          >
            <div className="flex items-center text-[#6D6E6F] font-medium">
              <div className="border-dotted border-[2px] border-[#c3c3c3] h-[35px] w-[35px] rounded-[50%] flex items-center justify-center">
                <AiOutlinePlus />
              </div>
              <p className="ml-[10px]">Add Member</p>
            </div>
          </div>
        )}
        {members.map((member, i) => {
          return (
            <div
              key={i}
              className="p-[10px] hover:bg-[#e3e3e35a] rounded-[10px] flex items-center"
            >
              <div className="flex items-center">
                {member.User.profileImage ? (
                  <img src={member.User.profileImage} />
                ) : (
                  <div className="text-[14px] rounded-[50%] bg-yellow-300 h-[35px] w-[35px] flex items-center justify-center border-[1px] border-[#c3c3c3]">
                    {member.User.firstName[0].toUpperCase()}
                    {member.User.lastName[0].toUpperCase()}
                  </div>
                )}
                <div className="ml-[10px] flex flex-col">
                  <p className=" overflow-hidden text-ellipsis whitespace-nowrap font-medium text-[14px]">
                    {member.User.firstName} {member.User.lastName}
                  </p>
                  <div className="text-[12px] text-[#6D6E6F]">
                    {member.User.id === project.ownerId
                      ? "Project Owner"
                      : "Member"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectMembers;
