import ProjectMembers from "./ProjectMembers";

function ProjectOverviewPage() {
  return (
    <div className="flex text-black justify-between w-full h-full pt-[50px]">
        {/* Project Description */}
      <div className="w-full px-[25px]">
        <div className="flex flex-col">
          <label className="font-medium text-[18px] ml-[12px] mb-[10px]">Project Description</label>
          <div className="w-[100%] h-[150px] border-solid border-[1px] border-transparent hover:border-black rounded-[5px]">
          <textarea
            className="w-[100%] h-full p-[10px] rounded-[5px] resize-none text-[14px]"
            placeholder="What is this project about?"
          />
          </div>
        </div>
        {/* Project Members Comtainer */}
        <ProjectMembers />
      </div>

      <div className="">dasdadadaddasdasdasdjsakdsaldji2323232</div>
    </div>
  );
}

export default ProjectOverviewPage;
