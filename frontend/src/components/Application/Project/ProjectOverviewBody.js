import ProjectMembers from "./ProjectMembers";

function ProjectOverviewPage() {
  return (
    <div className="flex text-black justify-between w-full h-full pt-[50px]">
        {/* Project Description */}
      <div className="w-full pl-[50px]">
        <div className="flex flex-col">
          <label className="text-[14px]">Project Description</label>
          <textarea
            className="w-[80%] h-[150px] p-[10px] border-solid border-[1px] border-black resize-none"
            placeholder="Give your project a description..."
          />
        </div>
        {/* Project Members Comtainer */}
        <ProjectMembers />
      </div>

      <div className="">dasdadadaddasdasdasdjsakdsaldji2323232</div>
    </div>
  );
}

export default ProjectOverviewPage;
