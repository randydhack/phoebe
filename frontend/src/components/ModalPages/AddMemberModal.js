import { useContext, useEffect, useState } from "react";
import { InfoContext } from "../../context/InfoContext";
import { ModalContext } from "../../context/Modal";
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from "react-redux";
import { inviteMemberThunk } from "../../store/members";


function AddMemberModal() {
  const dispatch = useDispatch()
  const { project, setMember} = useContext(InfoContext);
  const { setType } = useContext(ModalContext)

  const members = Object.values(useSelector(state => state.members))

  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(null)
  const [errors, setErrors] = useState({})

  const handleInvite = async (e) => {
    e.preventDefault()
    setErrors({})
    setSuccess({})

    const member = await dispatch(inviteMemberThunk(project.id, email)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    })

    if (member) {
      setSuccess({msg: 'User has been invited.'})
      setMember(member)
    } else {
      setMember(null)
    }
  }

  console.log(members)


  return (
    <div className="w-[500px] h-[350px] bg-white rounded-[10px]">
      {/* HEADER OF THE FORM BY PROJECT NAME */}
      <div className="p-[20px] flex items-center justify-between">
        <div className="font-medium text-[24px] truncate w-[400px]">{project.name}</div>
        <IoMdClose className="mr-[10px] w-[20px] h-[20px] text-[#6d6e6f] cursor-pointer" onClick={e => setType(null)}/>
      </div>
      <div className="bg-[#ECEAE9] w-full h-[1px]"></div>

      {/* FORM FOR INVITING USER TO PROJECT */}
      <div className="px-[20px] py-[20px]">
        <form className="flex flex-col mb-[10px] relative" onSubmit={e => handleInvite(e)}>
          <label className="font-medium mb-[10px]">Invite with email</label>
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="Add members by email..."
              className="w-full mr-[10px] px-[15px] py-[8px] outline-none border-[1px] border-[#aeabaa] rounded-[10px] text-[14px]"
              value={email}
              onChange={e=> setEmail(e.target.value)}
            />
            <button className="bg-[#4573D1] text-white rounded-[10px] px-[10px] text-[14px]" type="submit">
              Invite
            </button>
          </div>
          <div className="text-[12px] text-[#c92f54] absolute top-[72px]">{errors && errors.email}</div>
          <div className="text-[12px] text-green-500 absolute top-[72px]">{success && success.msg}</div>
        </form>
      </div>
      <div className="bg-[#ECEAE9] w-full h-[1px]"></div>

      {/* INFORMATION OF PROJECT ADMIN AND NUMBER OF MEMBERS */}
      <div className="px-[20px] py-[20px]">
        <div className="font-medium">Members ({members.length})</div>
        <div className="flex items-center mt-[15px]">
          <div className="rounded-[50%] w-[40px] h-[40px] bg-yellow-300 flex items-center justify-center mr-[15px]">
            {project.Owner.firstName[0].toUpperCase()}
            {project.Owner.lastName[0].toUpperCase()}
          </div>
          <div className="flex items-center justify-between w-[80%]">
            <div>
              <div className="font-medium text-[14px]">
                {project.Owner.firstName} {project.Owner.lastName}
              </div>
              <div className="text-[#6D6E6F] text-[12px]">
                {project.Owner.email}
              </div>
            </div>
            <div className="text-[12px] text-[#6D6E6F]">
              Project Admin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMemberModal;
