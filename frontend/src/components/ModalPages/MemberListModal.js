import { useDispatch, useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { useContext, useRef, useState, useEffect } from "react";
import { InfoContext } from "../../context/InfoContext";
import "./MemberList.css";
import { transferProjectOwnerThunk } from "../../store/projects";
import { getAllProjectMembersThunk, removeMemberThunk } from "../../store/members";
import { getSingleProjectThunk } from "../../store/projects";

function MemberListModal() {
  const dispatch = useDispatch();
  const { project } = useContext(InfoContext);
  const members = Object.values(useSelector((state) => state.members));
  const user = useSelector((state) => state.session.user);

  const [memberDropdown, setMemberDropdown] = useState({
    memberId: null,
    isActive: false,
    projectId: null,
    userId: null
  });
  const memberDropdownRef = useRef();
  const exitDropdownRef = useRef(null);

  const handleClickOutside = async (event) => {
    if (
      memberDropdownRef.current &&
      memberDropdownRef.current.contains(event.target)
    ) {
      return;
    }
    if (
      exitDropdownRef.current &&
      !exitDropdownRef.current.contains(event.target)
    ) {
      setMemberDropdown({ memberId: null, isActive: false });
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    dispatch(getAllProjectMembersThunk(project.id));
  }, [project.id]);

  const resetState = () => {
    setMemberDropdown({ memberId: null, isActive: false, projectId: null });
  }

  const handleUpdateOwnership = async (e) => {
    await dispatch(
      transferProjectOwnerThunk(
        memberDropdown.projectId,
        memberDropdown.memberId
      )
    );
    resetState()
  };

  const handleRemoveMember = async (e) => {
    e.preventDefault()
    await dispatch(removeMemberThunk(memberDropdown.projectId, memberDropdown.userId))
    resetState()
  }

  return (
    <div>
      <div className="p-[10px] w-[400px] bg-[#FFFFFF] rounded-t-[10px] relative">
        <div className="p-3 font-medium text-[24px]">Members List</div>
      </div>

      <div className="bg-[#ECEAE9] w-full h-[1px]"></div>

      <div className="w-[400px] p-3 overflow-hidden bg-[#FFFFFF] h-[500px] overflow-y-auto rounded-b-[10px] rounded-scroll-bar">
        {members.map((member, i) => {
          return (
            <div
              className="px-2 py-3 hover:bg-[#e3e3e35a] rounded-[10px] cursor-pointer memberlist"
              key={`${member.id}${i}`}
            >
              <div className="flex items-center flex-auto">
                <div className="rounded-[50%] h-[35px] w-[35px] bg-yellow-300 text-[14px] flex items-center justify-center border-[#c3c3c3] border">
                  <div className="w-[35px] flex items-center justify-center">
                    {member.User.firstName[0].toUpperCase()}
                    {member.User.lastName[0].toUpperCase()}
                  </div>
                </div>
                <div className="flex items-center justify-between w-full ml-[10px] relative">
                  {member.User.firstName} {member.User.lastName}
                  {/* OWNER: IF OWNER, SHOWS DROP FOR ALL MEMBERS BESIDE THEMSELVES */}
                  {user.id === project.ownerId && (
                    <div>
                      {user.id !== member.userId ? (
                        <div
                          className="mr-1 member-dropdown hover:bg-gray-300 p-[2px] rounded-[3px] cursor-pointer"
                          onClick={(e) =>
                            setMemberDropdown({
                              memberId: member.id,
                              isActive: !memberDropdown.isActive,
                              projectId: member.projectId,
                              userId: member.userId
                            })
                          }
                          ref={memberDropdownRef}
                        >
                          <BsThreeDots />
                        </div>
                      ) : (
                        <div>Owner</div>
                      )}
                    </div>
                  )}
                  {/* IF NOT OWNER, ONLY SHOW DROPDOWN FOR THEMSLEVES */}
                  {user.id === member.userId && user.id !== project.ownerId && (
                    <div
                      className="mr-1 member-dropdown hover:bg-gray-300 p-[2px] rounded-[3px] cursor-pointer"
                      onClick={(e) =>
                        setMemberDropdown({
                          memberId: member.id,
                          isActive: !memberDropdown.isActive,
                          projectId: member.projectId,
                        })
                      }
                      ref={memberDropdownRef}
                    >
                      <BsThreeDots />
                    </div>
                  )}
                  {memberDropdown.isActive &&
                    memberDropdown.memberId === member.id && (
                      <div
                        ref={exitDropdownRef}
                        className="absolute bg-white border-[#ECEAE9] border-[1px] w-[184px] rounded-[3px] z-[100] font-normal text-[12px] right-0 top-[20px]"
                      >
                        <div className="">
                          {user.id !== member.userId ? (
                            <>
                              <div
                                className="w-full flex my-[4px] flex-col px-[15px] py-[5px] hover:bg-[#ECEAE9]"
                                onClick={(e) => handleUpdateOwnership(e)}
                              >
                                Transfer Ownership
                              </div>
                              <div className="text-[#c92f54] w-full flex my-[4px] flex-col px-[15px] py-[5px] hover:bg-[#ECEAE9]" onClick={e => handleRemoveMember(e)}>
                                Remove Member
                              </div>
                            </>
                          ) : (
                            <div className="text-[#c92f54] w-full flex my-[4px] flex-col px-[15px] py-[5px] hover:bg-[#ECEAE9] ">
                              Leave Project
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MemberListModal;
