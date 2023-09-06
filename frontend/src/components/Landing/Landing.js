import { useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

function Landing() {
  const userSession = useSelector((state) => state.session.user);

  if (userSession) return <Redirect to="/home" />;

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#EDEBEA]">
      <div className="mx-[100px] flex flex-col">
        <div className="flex items-center box-border h-[80px] justify-between">
          <NavLink to="/" className="font-medium text-[24px]">
            phoebe
          </NavLink>
          <div className="flex text-[16px] items-center">
            <div className="mr-[20px] text-[#727272] font-medium">Login</div>
            <div className="bg-black text-white h-[36px] w-[116px] rounded-[5px] flex items-center justify-center">Get Started</div>
          </div>
        </div>
        <div className="flex items-center flex-col my-auto w-full justify-center">
            <div className="w-full items-center flex justify-center flex-col">
            <h1 className="text-[52px] w-[480px] text-center leading-[50px] font-light">Productivity platform for task management</h1>
            <p>Want more efficiency in your organization? Phoebe is easy for all teams to use, so you can deliver quality work, faster.</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
