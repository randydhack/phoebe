import { useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { LuBird } from "react-icons/lu";
import boardExample from "../../images/board-example.png";
import LandingBody from "./LandingBody";
import { motion } from 'framer-motion'
import './Landing.css'
import { useEffect, useState } from "react";


function widthChange() {
  return window.innerWidth <= 1366
}

function checkHeight() {
  return window.innerHeight >= 1000
}


function Landing() {
  const userSession = useSelector((state) => state.session.user);
  const [resize, setResize] = useState(null)
  const [height, setHeight] = useState(null)

  useEffect(() => {
    const resizable = () => setResize(widthChange())
    window.addEventListener('resize', resizable)
    return () => window.removeEventListener("resize", resizable);
  }, [resize, setResize])

  useEffect(() => {
    const handleHeight = () => setHeight(checkHeight())
    window.addEventListener('resize', handleHeight)
    handleHeight()
    return () => window.removeEventListener("resize", handleHeight);
  }, [height, setHeight])


  if (userSession) return <Redirect to="/home" />;



  return (
    <div className="flex flex-col min-h-screen h-screen w-full bg-[#EDEBEA] mt-[60px]">
      <div className="h-full overflow-y-scroll overflow-x-hidden">
        <div className="flex box-border flex-col h-full bg-[#EDEBEA] w-full">
          <div className="flex items-center justify-between fixed w-full bg-[#EDEBEA] z-10 h-[60px] top-0 px-[100px] mb-[]">
            <NavLink
              to="/"
              className="font-medium text-[24px] flex items-center justify-center"
            >
              <LuBird className="mr-[10px]" />
              Phoebe
            </NavLink>
            <div className="flex text-[16px] items-center">
              <NavLink
                to="/login"
                className="mr-[20px] text-[#727272] font-normal hover:text-black duration-200 ease-in"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-black text-white h-[36px] w-[116px] rounded-[5px] flex items-center justify-center"
              >
                Get Started
              </NavLink>
            </div>
          </div>
          <div className="px-[100px] pt-[40px] flex flex-col w-full" id='landing-body'>
            <div className="flex items-center flex-col w-full justify-center">
              <div className="w-full items-center flex justify-center flex-col h-[200px] ">
                <div className="flex flex-col text-center justify-evenly h-full w-[600px]">
                  <h1 className="text-[52px] w-full text-center leading-[50px] font-light tracking-wider h-full flex justify-center items-center">
                    Productivity platform for task management
                  </h1>
                  <p className="text-center text-[18px] tracking-wide w-full font-light">
                    Want more efficiency in your organization? Phoebe is easy
                    for all teams and personal use, so you can deliver quality
                    work, faster.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-center relative pb-[380px]">
              <motion.img
                src={boardExample}
                className="w-[1000px] max-w-[1000px] rounded-xl absolute top-[50px] overflow-hidden"
                initial={{ width:'900px', opacity: 0, scale: 0.5 }}
                  animate={{ width: '1000px',
                  opacity: 1, scale: 1}}
                transition={{
                  opacity: {
                    duration: 2},
                  width: {
                    duration: 1.5
                  },
                  ease: "easeOut", duration: 1.5
                }}
              />
            </div>
          </div>
          <LandingBody resize={resize}/>
        </div>
      </div>
    </div>
  );
}

export default Landing;
