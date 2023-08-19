import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSingleProjectThunk } from "../../../store/projects";
import { useParams } from "react-router-dom";

function ProjectMembers() {
    const dispatch = useDispatch();
    const { id } = useParams()

    console.log(id)
    const members = useSelector(state => state.projects.project.Members)

    useEffect(() => {
      (async () => {
       await dispatch(getSingleProjectThunk(id));
      })()
    }, []);

    console.log(members)

    return (
        <div className="mt-[20px]">
          <div>Project Members</div>
          <div className="grid grid-cols-4 w-[80%] box-content h-[120px] items-center">
            <div className="hover:bg-[#e3e3e35a] p-[5px] rounded-[10px] cursor-pointer" onClick={""}>
              <div className="flex items-center">
                <div className="border-dotted border-[2px] border-[#c3c3c3] h-[35px] w-[35px] rounded-[50%] flex items-center justify-center">
                  <AiOutlinePlus />
                </div>
                <p className="ml-[10px]">Add Member</p>
              </div>
            </div>
            {members.map((member, i) => {
              return (
                <div key={i} className="p-[5px]">
                  <div className="flex items-center">
                    {member.User.profileImage ? (
                      <img src={member.User.profileImage} />
                    ) : (
                      <div className="rounded-[50%] bg-yellow-300 h-[35px] w-[35px] flex items-center justify-center border-[1px] border-[#c3c3c3]">
                        {member.User.firstName[0].toUpperCase()}
                        {member.User.lastName[0].toUpperCase()}
                      </div>
                    )}
                    <p className="ml-[10px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {member.User.firstName} {member.User.lastName}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    )
}

export default ProjectMembers
