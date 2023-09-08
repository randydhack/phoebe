import { useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { LuBird } from 'react-icons/lu'

function Landing() {
  const userSession = useSelector((state) => state.session.user);

  if (userSession) return <Redirect to="/home" />;

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#EDEBEA]">
      <div className="mx-[100px] flex flex-col">
        <div className="flex items-center box-border h-[80px] justify-between">
          <NavLink to="/" className="font-medium text-[24px] flex items-center justify-center">
            <LuBird className="mr-[10px]"/>
            Phoebe
          </NavLink>
          <div className="flex text-[16px] items-center">
            <NavLink to='/login' className="mr-[20px] text-[#727272] font-normal hover:text-black duration-200 ease-in">Login</NavLink>
            <NavLink to='/signup' className="bg-black text-white h-[36px] w-[116px] rounded-[5px] flex items-center justify-center">
              Get Started
            </NavLink>
          </div>
        </div>
        <div className="flex items-center flex-col my-auto w-full justify-center">
          <div className="w-full items-center flex justify-center flex-col h-[200px] ">
            <div className="flex flex-col text-center justify-evenly h-full w-[600px]">
              <h1 className="text-[52px] w-full text-center leading-[50px] font-light tracking-wider h-full flex justify-center items-center">
                Productivity platform for task management
              </h1>
              <p className="text-center text-[18px] tracking-wide w-full">
                Want more efficiency in your organization? Phoebe is easy for
                all teams and personal use, so you can deliver quality work,
                faster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
