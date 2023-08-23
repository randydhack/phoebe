import { IoMdClose } from "react-icons/io";
import { InfoContext } from "../../context/InfoContext";
import { ModalContext } from "../../context/Modal";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateProjectThunk,
} from "../../store/projects";

function EditProject() {
  const dispatch = useDispatch();
  const { project, setProject } = useContext(InfoContext);
  const { setType } = useContext(ModalContext);

  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);

  useEffect(() => {
    dispatch(updateProjectThunk(name, description, project.id));
  }, [name, description, project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      updateProjectThunk(name, description, project.id)
    );
    setProject(data);
  };

  console.log(project);

  return (
    <div className="w-[560px] h-[500px] bg-white rounded-[10px]">
      {/* HEADER OF THE FORM BY PROJECT NAME */}
      <div className="px-[20px] py-[15px] flex items-center justify-between">
        <div className="font-medium text-[20px]">Project Details</div>
        <IoMdClose
          className="mr-[10px] w-[20px] h-[20px] text-[#6d6e6f] cursor-pointer"
          onClick={(e) => setType(null)}
        />
      </div>
      <div className="bg-[#ECEAE9] w-full h-[1px]"></div>

      {/* FORM FOR INVITING USER TO PROJECT */}
      <div className="px-[20px] py-[20px]">
        <div className="flex flex-col mb-[10px]">
          <label className="font-medium mb-[10px] text-[#6d6e6f] text-[12px]">
            Name
          </label>
          <div className="flex justify-between">
            <input
              type="text"
              placeholder={project.name}
              value={name}
              onChange={(e) => {
                if (e.target.value.length >= 1) {
                  setName(e.target.value);
                  handleSubmit(e);
                }
              }}
              className="w-full mr-[10px] px-[15px] py-[8px] outline-none border-[1px] border-[#aeabaa] rounded-[10px] text-[14px] "
            />
          </div>

          {/* OWNER DETAILS */}
          <div className=" py-[20px]">
            <div className="font-medium text-[12px] text-[#6d6e6f]">Owner</div>
            <div className="flex items-center mt-[15px] mb-[20px]">
              <div className="rounded-[50%] w-[30px] h-[30px] text-[12px] bg-yellow-300 flex items-center justify-center mr-[10px] border-[#6d6e6f2b] border-solid border-[1px]">
                {project.Owner.firstName[0].toUpperCase()}
                {project.Owner.lastName[0].toUpperCase()}
              </div>
              <div className="flex items-center justify-between">
                <div className="font-normal text-[14px]">
                  {project.Owner.firstName} {project.Owner.lastName}
                </div>
              </div>
            </div>
            <div className="bg-[#ECEAE9] w-full h-[1px]"></div>
          </div>

          <div>
            <div className="text-[20px] font-medium">Project description</div>
            {/* <div className=" w-full h-full"> */}
            <textarea
              className="w-full h-[160px] p-[10px] rounded-[5px] resize-none text-[14px] border-solid border-[1px] hover:border-black"
              placeholder="What is this project about?"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                handleSubmit(e);
              }}
            />
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProject;
